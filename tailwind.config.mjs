/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        // Base — casi negro, nunca negro puro (mantiene el grano visible)
        ink: {
          DEFAULT: "#0B0B0C",
          raised: "#141416",
          line: "#1E1E21",
        },
        // Texto — blanco roto
        bone: {
          DEFAULT: "#F5F3EF",
          dim: "#F5F3EF99",
        },
        // Acento de UI neutro — plateado frío. Nunca protagonista, solo bordes/hover/badges.
        steel: {
          DEFAULT: "#C9CDD3",
          dim: "#C9CDD366",
        },
        // Único color con temperatura propia del sistema: alerta de stock, apagado a propósito.
        ember: {
          DEFAULT: "#A8453B",
        },
      },
      fontFamily: {
        display: ['"Bebas Neue"', "system-ui", "sans-serif"],
        inter: ['"Inter"', "system-ui", "sans-serif"],
      },
      letterSpacing: {
        widest: ".18em",
      },
      borderRadius: {
        none: "0px",
        sm: "2px",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.65, 0, 0.35, 1)",
      },
    },
  },
  plugins: [],
};
