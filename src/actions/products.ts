import { defineAction, ActionError } from "astro:actions";
import { z } from "astro/zod";
import type { SupabaseClient } from "@supabase/supabase-js";

const TALLAS = ["S", "M", "L", "XL", "XXL"] as const;

const productFields = {
  club_seleccion: z.string().min(1, "Ingresá el club o selección."),
  liga: z.string().min(1, "Ingresá la liga."),
  temporada: z.string().min(1, "Ingresá la temporada."),
  tipo: z.enum(["local", "visitante", "alternativa"]),
  version: z.enum(["jugador", "aficionado"]),
  precio: z.coerce.number().min(0, "El precio no puede ser negativo."),
  // Checkbox — ver "Using validators with form inputs" en la guía de Astro Actions.
  activo: z.coerce.boolean(),
  // Los <input type="file"> vacíos igual llegan como File(size=0), no como
  // undefined — por eso el chequeo real de "¿vino imagen nueva?" pasa por
  // tamaño en uploadIfPresent(), no por .optional() acá.
  imagen_frente: z.instanceof(File).optional(),
  imagen_espalda: z.instanceof(File).optional(),
  talla: z.array(z.enum(TALLAS)).optional(),
  stock: z.array(z.coerce.number().int().min(0)).optional(),
};

/** Cada action de escritura repite este chequeo — las actions son endpoints
 * públicos por nombre (/_actions/products.create), así que no alcanza con
 * que el middleware oculte el link en el panel. La defensa real es RLS,
 * pero cortar acá evita hacer round-trips innecesarios a la base. */
function requireAdmin(context: { locals: App.Locals }) {
  if (context.locals.profile?.role !== "admin") {
    throw new ActionError({
      code: "UNAUTHORIZED",
      message: "Necesitás una sesión de administrador para hacer esto.",
    });
  }
}

async function uploadIfPresent(
  supabase: SupabaseClient,
  file: File | undefined,
  pathPrefix: string
): Promise<string | undefined> {
  if (!file || file.size === 0) return undefined;

  const extension = file.name.split(".").pop() || "jpg";
  const path = `${pathPrefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${extension}`;

  const { error } = await supabase.storage
    .from("product-images")
    .upload(path, file, {
      upsert: true,
      contentType: file.type || undefined,
    });

  if (error) {
    throw new ActionError({
      code: "INTERNAL_SERVER_ERROR",
      message: `No se pudo subir la imagen: ${error.message}`,
    });
  }

  const { data } = supabase.storage.from("product-images").getPublicUrl(path);
  return data.publicUrl;
}

function zipVariants(tallas: string[] | undefined, stocks: number[] | undefined) {
  if (!tallas || tallas.length === 0) return [];
  return tallas.map((talla, i) => ({ talla, stock: stocks?.[i] ?? 0 }));
}

async function replaceVariants(
  supabase: SupabaseClient,
  productId: string,
  tallas: string[] | undefined,
  stocks: number[] | undefined
) {
  const submitted = zipVariants(tallas, stocks);
  const submittedTallas = new Set(submitted.map((v) => v.talla));

  // Insertamos o actualizamos (por producto + talla) cada fila que el admin
  // dejó cargada en el formulario. No borramos y recreamos todo como antes:
  // si una talla ya fue vendida alguna vez, su fila queda referenciada
  // desde order_items y Postgres no deja borrarla — con upsert evitamos
  // pisar ese id.
  if (submitted.length > 0) {
    const { error: upsertError } = await supabase.from("product_variants").upsert(
      submitted.map((v) => ({ product_id: productId, talla: v.talla, stock: v.stock })),
      { onConflict: "product_id,talla" }
    );

    if (upsertError) {
      throw new ActionError({
        code: "INTERNAL_SERVER_ERROR",
        message: `No se pudo guardar el stock por talla: ${upsertError.message}`,
      });
    }
  }

  // Las tallas que existían pero el admin sacó del formulario se ponen en
  // stock 0 en vez de eliminarse — por la misma razón: puede haber un
  // pedido apuntando a esa fila, y aunque no lo haya, es más seguro no
  // borrar nunca una variante desde acá. Con stock 0 ya deja de aparecer
  // como disponible en la tienda.
  const { data: existing, error: existingError } = await supabase
    .from("product_variants")
    .select("id, talla")
    .eq("product_id", productId);

  if (existingError) {
    throw new ActionError({
      code: "INTERNAL_SERVER_ERROR",
      message: `No se pudo revisar el stock por talla existente: ${existingError.message}`,
    });
  }

  const idsToZero = (existing ?? [])
    .filter((v: { talla: string }) => !submittedTallas.has(v.talla))
    .map((v: { id: string }) => v.id);

  if (idsToZero.length > 0) {
    const { error: zeroError } = await supabase
      .from("product_variants")
      .update({ stock: 0 })
      .in("id", idsToZero);

    if (zeroError) {
      throw new ActionError({
        code: "INTERNAL_SERVER_ERROR",
        message: `No se pudo actualizar el stock por talla: ${zeroError.message}`,
      });
    }
  }
}

export const products = {
  create: defineAction({
    accept: "form",
    input: z.object(productFields),
    handler: async (input, context) => {
      requireAdmin(context);
      const supabase = context.locals.supabase;

      const [imagen_frente, imagen_espalda] = await Promise.all([
        uploadIfPresent(supabase, input.imagen_frente, "frente"),
        uploadIfPresent(supabase, input.imagen_espalda, "espalda"),
      ]);

      const { data: product, error } = await supabase
        .from("products")
        .insert({
          club_seleccion: input.club_seleccion,
          liga: input.liga,
          temporada: input.temporada,
          tipo: input.tipo,
          version: input.version,
          precio: input.precio,
          activo: input.activo,
          imagen_frente: imagen_frente ?? null,
          imagen_espalda: imagen_espalda ?? null,
        })
        .select("id")
        .single();

      if (error || !product) {
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: `No se pudo crear el producto: ${error?.message ?? "error desconocido"}`,
        });
      }

      await replaceVariants(supabase, product.id, input.talla, input.stock);

      return { id: product.id as string };
    },
  }),

  update: defineAction({
    accept: "form",
    input: z.object({ id: z.string().uuid(), ...productFields }),
    handler: async (input, context) => {
      requireAdmin(context);
      const supabase = context.locals.supabase;

      const [imagen_frente, imagen_espalda] = await Promise.all([
        uploadIfPresent(supabase, input.imagen_frente, "frente"),
        uploadIfPresent(supabase, input.imagen_espalda, "espalda"),
      ]);

      const updatePayload: Record<string, unknown> = {
        club_seleccion: input.club_seleccion,
        liga: input.liga,
        temporada: input.temporada,
        tipo: input.tipo,
        version: input.version,
        precio: input.precio,
        activo: input.activo,
      };
      // Sólo pisamos la imagen si se subió una nueva — si el admin no toca
      // ese campo al editar, se conserva la que ya estaba.
      if (imagen_frente) updatePayload.imagen_frente = imagen_frente;
      if (imagen_espalda) updatePayload.imagen_espalda = imagen_espalda;

      const { error } = await supabase
        .from("products")
        .update(updatePayload)
        .eq("id", input.id);

      if (error) {
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: `No se pudo actualizar el producto: ${error.message}`,
        });
      }

      await replaceVariants(supabase, input.id, input.talla, input.stock);

      return { id: input.id };
    },
  }),

  remove: defineAction({
    accept: "form",
    input: z.object({ id: z.string().uuid() }),
    handler: async ({ id }, context) => {
      requireAdmin(context);

      const { error } = await context.locals.supabase
        .from("products")
        .delete()
        .eq("id", id);

      if (error) {
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: `No se pudo eliminar el producto: ${error.message}`,
        });
      }

      return { success: true };
    },
  }),
};
