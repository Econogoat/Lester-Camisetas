import { defineAction, ActionError } from "astro:actions";
import { z } from "astro/zod";

export const orders = {
  markShipped: defineAction({
    accept: "form",
    input: z.object({
      id: z.string().uuid(),
      numero_seguimiento: z.string().min(1, "Ingresá un número de seguimiento."),
    }),
    handler: async ({ id, numero_seguimiento }, context) => {
      if (context.locals.profile?.role !== "admin") {
        throw new ActionError({
          code: "UNAUTHORIZED",
          message: "Necesitás una sesión de administrador para hacer esto.",
        });
      }

      const { error } = await context.locals.supabase
        .from("orders")
        .update({ estado_envio: "enviado", numero_seguimiento })
        .eq("id", id);

      if (error) {
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: `No se pudo actualizar el pedido: ${error.message}`,
        });
      }

      return { success: true };
    },
  }),
};
