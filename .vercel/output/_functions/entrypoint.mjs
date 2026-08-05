import './chunks/virtual_VfsNPsmb.mjs';
import * as z from 'zod';
import { o as defineAction } from './chunks/server_B34kQgrm.mjs';
import { A as ActionError } from './chunks/astro-designed-error-pages_CKIh0Rtv.mjs';
import { a as getAdminClient, b as getPreferenceClient } from './chunks/supabase-admin_Dbzk6FeS.mjs';

const auth = {
  signIn: defineAction({
    accept: "form",
    input: z.object({
      email: z.string().email("Ingresá un email válido."),
      password: z.string().min(1, "Ingresá tu contraseña.")
    }),
    handler: async ({ email, password }, context) => {
      const { error } = await context.locals.supabase.auth.signInWithPassword({
        email,
        password
      });
      if (error) {
        throw new ActionError({
          code: "UNAUTHORIZED",
          message: "Email o contraseña incorrectos."
        });
      }
      return { success: true };
    }
  }),
  signOut: defineAction({
    handler: async (_input, context) => {
      await context.locals.supabase.auth.signOut();
      return { success: true };
    }
  })
};

const TALLAS = ["S", "M", "L", "XL", "XXL"];
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
  stock: z.array(z.coerce.number().int().min(0)).optional()
};
function requireAdmin(context) {
  if (context.locals.profile?.role !== "admin") {
    throw new ActionError({
      code: "UNAUTHORIZED",
      message: "Necesitás una sesión de administrador para hacer esto."
    });
  }
}
async function uploadIfPresent(supabase, file, pathPrefix) {
  if (!file || file.size === 0) return void 0;
  const extension = file.name.split(".").pop() || "jpg";
  const path = `${pathPrefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${extension}`;
  const { error } = await supabase.storage.from("product-images").upload(path, file, {
    upsert: true,
    contentType: file.type || void 0
  });
  if (error) {
    throw new ActionError({
      code: "INTERNAL_SERVER_ERROR",
      message: `No se pudo subir la imagen: ${error.message}`
    });
  }
  const { data } = supabase.storage.from("product-images").getPublicUrl(path);
  return data.publicUrl;
}
function zipVariants(tallas, stocks) {
  if (!tallas || tallas.length === 0) return [];
  return tallas.map((talla, i) => ({ talla, stock: stocks?.[i] ?? 0 }));
}
async function replaceVariants(supabase, productId, tallas, stocks) {
  const submitted = zipVariants(tallas, stocks);
  const submittedTallas = new Set(submitted.map((v) => v.talla));
  if (submitted.length > 0) {
    const { error: upsertError } = await supabase.from("product_variants").upsert(
      submitted.map((v) => ({ product_id: productId, talla: v.talla, stock: v.stock })),
      { onConflict: "product_id,talla" }
    );
    if (upsertError) {
      throw new ActionError({
        code: "INTERNAL_SERVER_ERROR",
        message: `No se pudo guardar el stock por talla: ${upsertError.message}`
      });
    }
  }
  const { data: existing, error: existingError } = await supabase.from("product_variants").select("id, talla").eq("product_id", productId);
  if (existingError) {
    throw new ActionError({
      code: "INTERNAL_SERVER_ERROR",
      message: `No se pudo revisar el stock por talla existente: ${existingError.message}`
    });
  }
  const idsToZero = (existing ?? []).filter((v) => !submittedTallas.has(v.talla)).map((v) => v.id);
  if (idsToZero.length > 0) {
    const { error: zeroError } = await supabase.from("product_variants").update({ stock: 0 }).in("id", idsToZero);
    if (zeroError) {
      throw new ActionError({
        code: "INTERNAL_SERVER_ERROR",
        message: `No se pudo actualizar el stock por talla: ${zeroError.message}`
      });
    }
  }
}
const products = {
  create: defineAction({
    accept: "form",
    input: z.object(productFields),
    handler: async (input, context) => {
      requireAdmin(context);
      const supabase = context.locals.supabase;
      const [imagen_frente, imagen_espalda] = await Promise.all([
        uploadIfPresent(supabase, input.imagen_frente, "frente"),
        uploadIfPresent(supabase, input.imagen_espalda, "espalda")
      ]);
      const { data: product, error } = await supabase.from("products").insert({
        club_seleccion: input.club_seleccion,
        liga: input.liga,
        temporada: input.temporada,
        tipo: input.tipo,
        version: input.version,
        precio: input.precio,
        activo: input.activo,
        imagen_frente: imagen_frente ?? null,
        imagen_espalda: imagen_espalda ?? null
      }).select("id").single();
      if (error || !product) {
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: `No se pudo crear el producto: ${error?.message ?? "error desconocido"}`
        });
      }
      await replaceVariants(supabase, product.id, input.talla, input.stock);
      return { id: product.id };
    }
  }),
  update: defineAction({
    accept: "form",
    input: z.object({ id: z.string().uuid(), ...productFields }),
    handler: async (input, context) => {
      requireAdmin(context);
      const supabase = context.locals.supabase;
      const [imagen_frente, imagen_espalda] = await Promise.all([
        uploadIfPresent(supabase, input.imagen_frente, "frente"),
        uploadIfPresent(supabase, input.imagen_espalda, "espalda")
      ]);
      const updatePayload = {
        club_seleccion: input.club_seleccion,
        liga: input.liga,
        temporada: input.temporada,
        tipo: input.tipo,
        version: input.version,
        precio: input.precio,
        activo: input.activo
      };
      if (imagen_frente) updatePayload.imagen_frente = imagen_frente;
      if (imagen_espalda) updatePayload.imagen_espalda = imagen_espalda;
      const { error } = await supabase.from("products").update(updatePayload).eq("id", input.id);
      if (error) {
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: `No se pudo actualizar el producto: ${error.message}`
        });
      }
      await replaceVariants(supabase, input.id, input.talla, input.stock);
      return { id: input.id };
    }
  }),
  remove: defineAction({
    accept: "form",
    input: z.object({ id: z.string().uuid() }),
    handler: async ({ id }, context) => {
      requireAdmin(context);
      const { error } = await context.locals.supabase.from("products").delete().eq("id", id);
      if (error) {
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: `No se pudo eliminar el producto: ${error.message}`
        });
      }
      return { success: true };
    }
  })
};

const orders = {
  markShipped: defineAction({
    accept: "form",
    input: z.object({
      id: z.string().uuid(),
      numero_seguimiento: z.string().min(1, "Ingresá un número de seguimiento.")
    }),
    handler: async ({ id, numero_seguimiento }, context) => {
      if (context.locals.profile?.role !== "admin") {
        throw new ActionError({
          code: "UNAUTHORIZED",
          message: "Necesitás una sesión de administrador para hacer esto."
        });
      }
      const { error } = await context.locals.supabase.from("orders").update({ estado_envio: "enviado", numero_seguimiento }).eq("id", id);
      if (error) {
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: `No se pudo actualizar el pedido: ${error.message}`
        });
      }
      return { success: true };
    }
  })
};

const checkout = {
  create: defineAction({
    input: z.object({
      email: z.string().email("Ingresá un email válido."),
      items: z.array(
        z.object({
          productId: z.string().uuid(),
          talla: z.string().min(1),
          cantidad: z.number().int().positive()
        })
      ).min(1, "El carrito está vacío.")
    }),
    handler: async ({
      email,
      items
    }) => {
      const supabase = getAdminClient();
      const productIds = [...new Set(items.map((i) => i.productId))];
      const { data, error: productsError } = await supabase.from("products").select("id, club_seleccion, activo, precio, product_variants(id, talla, stock)").in("id", productIds);
      if (productsError) {
        throw new ActionError({ code: "INTERNAL_SERVER_ERROR", message: "No se pudo validar el carrito." });
      }
      const products = data ?? [];
      const productsById = new Map(products.map((p) => [p.id, p]));
      const lineItems = [];
      for (const item of items) {
        const product = productsById.get(item.productId);
        if (!product || !product.activo) {
          throw new ActionError({ code: "BAD_REQUEST", message: "Uno de los productos ya no está disponible." });
        }
        const variant = (product.product_variants ?? []).find((v) => v.talla === item.talla);
        if (!variant || variant.stock < item.cantidad) {
          throw new ActionError({
            code: "BAD_REQUEST",
            message: `No hay stock suficiente de ${product.club_seleccion} talle ${item.talla}.`
          });
        }
        lineItems.push({
          productId: product.id,
          variantId: variant.id,
          talla: item.talla,
          cantidad: item.cantidad,
          precio: Number(product.precio),
          titulo: `${product.club_seleccion} — Talle ${item.talla}`
        });
      }
      const total = lineItems.reduce((sum, li) => sum + li.precio * li.cantidad, 0);
      const { data: order, error: orderError } = await supabase.from("orders").insert({ email, total, estado_pago: "pendiente" }).select("id").single();
      if (orderError || !order) {
        throw new ActionError({ code: "INTERNAL_SERVER_ERROR", message: "No se pudo crear el pedido." });
      }
      const { error: itemsError } = await supabase.from("order_items").insert(
        lineItems.map((li) => ({
          order_id: order.id,
          product_id: li.productId,
          product_variant_id: li.variantId,
          talla: li.talla,
          cantidad: li.cantidad,
          precio_unitario: li.precio
        }))
      );
      if (itemsError) {
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: "No se pudo guardar el detalle del pedido."
        });
      }
      const siteUrl = "http://localhost:4321".replace(/\/$/, "");
      const isLocalhost = siteUrl.includes("localhost") || siteUrl.includes("127.0.0.1");
      let checkoutUrl;
      try {
        const preference = getPreferenceClient();
        const result = await preference.create({
          body: {
            items: lineItems.map((li) => ({
              id: li.productId,
              title: li.titulo,
              quantity: li.cantidad,
              unit_price: li.precio,
              currency_id: "ARS"
            })),
            payer: { email },
            external_reference: order.id,
            back_urls: {
              success: `${siteUrl}/pedido/exito`,
              failure: `${siteUrl}/pedido/error`,
              pending: `${siteUrl}/pedido/pendiente`
            },
            ...isLocalhost ? {} : { auto_return: "approved" },
            notification_url: `${siteUrl}/api/webhooks/mercadopago`
          }
        });
        checkoutUrl = result.sandbox_init_point || result.init_point;
      } catch (mpError) {
        console.error("[Lester] Error creando la preferencia de Mercado Pago:", mpError);
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: "No se pudo iniciar el pago con Mercado Pago. Probá de nuevo en un momento."
        });
      }
      if (!checkoutUrl) {
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Mercado Pago no devolvió un link de pago."
        });
      }
      return { checkoutUrl };
    }
  })
};

const server = {
  auth,
  products,
  orders,
  checkout
};

export { server };
