import { defineAction, ActionError } from "astro:actions";
import { z } from "astro/zod";

export const auth = {
  signIn: defineAction({
    accept: "form",
    input: z.object({
      email: z.string().email("Ingresá un email válido."),
      password: z.string().min(1, "Ingresá tu contraseña."),
    }),
    handler: async ({ email, password }, context) => {
      const { error } = await context.locals.supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // No distinguimos "usuario no existe" de "contraseña incorrecta" para
        // no filtrar qué emails están registrados.
        throw new ActionError({
          code: "UNAUTHORIZED",
          message: "Email o contraseña incorrectos.",
        });
      }

      return { success: true };
    },
  }),

  signOut: defineAction({
    handler: async (_input, context) => {
      await context.locals.supabase.auth.signOut();
      return { success: true };
    },
  }),
};
