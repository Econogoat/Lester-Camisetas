import { defineAction, ActionError } from "astro:actions";
import { z } from "astro/zod";
import { getAdminClient } from "../lib/supabase-admin";
import { getPreferenceClient } from "../lib/mercadopago";

interface VariantRow {
  id: string;
  talla: string;
  stock: number;
}

interface ProductRow {
  id: string;
  club_seleccion: string;
  activo: boolean;
  precio: number;
  product_variants: VariantRow[] | null;
}

export const checkout = {
  create: defineAction({
    input: z.object({
      email: z.string().email("Ingresá un email válido."),
      items: z
        .array(
          z.object({
            productId: z.string().uuid(),
            talla: z.string().min(1),
            cantidad: z.number().int().positive(),
          })
        )
        .min(1, "El carrito está vacío."),
    }),
    handler: async ({
      email,
      items,
    }: {
      email: string;
      items: { productId: string; talla: string; cantidad: number }[];
    }) => {
      const supabase = getAdminClient();

      // Nunca confiar en precio/nombre que venga del cliente — se
      // recalcula todo contra lo que hay hoy en la base.
      const productIds = [...new Set(items.map((i) => i.productId))];

      const { data, error: productsError } = await supabase
        .from("products")
        .select("id, club_seleccion, activo, precio, product_variants(id, talla, stock)")
        .in("id", productIds);

      if (productsError) {
        throw new ActionError({ code: "INTERNAL_SERVER_ERROR", message: "No se pudo validar el carrito." });
      }

      const products = (data ?? []) as ProductRow[];
      const productsById = new Map<string, ProductRow>(products.map((p) => [p.id, p]));

      const lineItems: {
        productId: string;
        variantId: string;
        talla: string;
        cantidad: number;
        precio: number;
        titulo: string;
      }[] = [];

      for (const item of items) {
        const product = productsById.get(item.productId);
        if (!product || !product.activo) {
          throw new ActionError({ code: "BAD_REQUEST", message: "Uno de los productos ya no está disponible." });
        }

        const variant = (product.product_variants ?? []).find((v) => v.talla === item.talla);
        if (!variant || variant.stock < item.cantidad) {
          throw new ActionError({
            code: "BAD_REQUEST",
            message: `No hay stock suficiente de ${product.club_seleccion} talle ${item.talla}.`,
          });
        }

        lineItems.push({
          productId: product.id,
          variantId: variant.id,
          talla: item.talla,
          cantidad: item.cantidad,
          precio: Number(product.precio),
          titulo: `${product.club_seleccion} — Talle ${item.talla}`,
        });
      }

      const total = lineItems.reduce((sum, li) => sum + li.precio * li.cantidad, 0);

      // Orden en estado "pendiente". El stock recién se descuenta cuando el
      // pago se confirma (ver confirm-payment.ts) — así un carrito
      // abandonado nunca deja stock "reservado" para siempre.
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({ email, total, estado_pago: "pendiente" })
        .select("id")
        .single();

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
          precio_unitario: li.precio,
        }))
      );

      if (itemsError) {
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: "No se pudo guardar el detalle del pedido.",
        });
      }

const siteUrl = (import.meta.env.PUBLIC_SITE_URL ?? "http://localhost:4321").replace(/\/$/, "");
const isLocalhost = siteUrl.includes("localhost") || siteUrl.includes("127.0.0.1");

let checkoutUrl: string | undefined;
try {
  const preference = getPreferenceClient();
  const result = await preference.create({
    body: {
      items: lineItems.map((li) => ({
        id: li.productId,
        title: li.titulo,
        quantity: li.cantidad,
        unit_price: li.precio,
        currency_id: "ARS",
      })),
      payer: { email },
      external_reference: order.id,
      back_urls: {
        success: `${siteUrl}/pedido/exito`,
        failure: `${siteUrl}/pedido/error`,
        pending: `${siteUrl}/pedido/pendiente`,
      },
      ...(isLocalhost ? {} : { auto_return: "approved" }),
      notification_url: `${siteUrl}/api/webhooks/mercadopago`,
    },
  });

        // sandbox_init_point sólo viene poblado cuando se usan credenciales
        // de prueba — con credenciales de producción, sólo viene init_point.
        checkoutUrl = (result as any).sandbox_init_point || (result as any).init_point;
      } catch (mpError) {
        console.error("[Lester] Error creando la preferencia de Mercado Pago:", mpError);
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: "No se pudo iniciar el pago con Mercado Pago. Probá de nuevo en un momento.",
        });
      }

      if (!checkoutUrl) {
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Mercado Pago no devolvió un link de pago.",
        });
      }

      return { checkoutUrl };
    },
  }),
};
