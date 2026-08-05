import { createClient } from "@supabase/supabase-js";
import { sampleProducts, type Product } from "../data/products";

const CURRENT_SEASON = "2025/26";

type DbVariant = { talla: string; stock: number };

type DbProduct = {
  id: string;
  club_seleccion: string;
  liga: string;
  temporada: string;
  tipo: "local" | "visitante" | "alternativa";
  version: "jugador" | "aficionado";
  precio: number;
  imagen_frente: string | null;
  imagen_espalda: string | null;
  activo: boolean;
  product_variants: DbVariant[] | null;
};

const TIPO_LABEL: Record<DbProduct["tipo"], Product["tipo"]> = {
  local: "Local",
  visitante: "Visitante",
  alternativa: "Alternativa",
};

const VERSION_LABEL: Record<DbProduct["version"], Product["version"]> = {
  jugador: "Jugador",
  aficionado: "Aficionado",
};

function crestFromClub(club: string): string {
  const initials = club
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");
  return initials.slice(0, 3) || "?";
}

/** No hay columna de "nombre" en el schema (ver prompt de admin) — se arma a
 * partir de tipo + temporada, igual que en los datos de ejemplo originales. */
function nombreFrom(tipo: DbProduct["tipo"], temporada: string): string {
  const tipoLabel = TIPO_LABEL[tipo];
  return temporada === "retro" ? `Camiseta ${tipoLabel} Retro` : `Camiseta ${tipoLabel} ${temporada}`;
}

function mapRow(row: DbProduct): Product {
  const variants = row.product_variants ?? [];
  const totalStock = variants.reduce((sum, v) => sum + (v.stock ?? 0), 0);
  const tallasConStock = variants.filter((v) => v.stock > 0).map((v) => v.talla);

  return {
    id: row.id,
    club: row.club_seleccion,
    name: nombreFrom(row.tipo, row.temporada),
    price: Number(row.precio),
    liga: row.liga,
    temporada: row.temporada,
    tipo: TIPO_LABEL[row.tipo],
    version: VERSION_LABEL[row.version],
    tallas: tallasConStock,
    // Heurística simple: "Nueva Temporada" para todo lo de la temporada más
    // reciente. "Edición Limitada" queda para cuando el panel tenga control
    // manual de destacados (Fase 2) — no hay señal para inferirlo del schema.
    badge: row.temporada === CURRENT_SEASON ? "Nueva Temporada" : undefined,
    unidadesRestantes: totalStock > 0 && totalStock <= 6 ? totalStock : undefined,
    agotado: variants.length > 0 && totalStock === 0,
    crest: crestFromClub(row.club_seleccion),
    imgFront: row.imagen_frente || "[URL_FOTO_FRENTE]",
    imgBack: row.imagen_espalda || "[URL_FOTO_ESPALDA]",
  };
}

/**
 * Trae el catálogo público (sólo productos activos) desde Supabase.
 * Si las variables de entorno todavía no están configuradas, o la consulta
 * falla, cae a los datos de ejemplo estáticos para que el sitio nunca se
 * muestre vacío o roto durante el setup inicial.
 */
export async function getPublicProducts(): Promise<Product[]> {
  const url = import.meta.env.PUBLIC_SUPABASE_URL;
  const key = import.meta.env.PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    console.warn(
      "[Lester] Supabase no está configurado (faltan PUBLIC_SUPABASE_URL / PUBLIC_SUPABASE_PUBLISHABLE_KEY en .env) — mostrando catálogo de ejemplo."
    );
    return sampleProducts;
  }

  // Lectura pública: no hace falta la sesión del usuario ni las cookies acá,
  // RLS ya permite SELECT a cualquiera sobre `products`/`product_variants`.
  const supabase = createClient(url, key);

  const { data, error } = await supabase
    .from("products")
    .select(
      "id, club_seleccion, liga, temporada, tipo, version, precio, imagen_frente, imagen_espalda, activo, product_variants(talla, stock)"
    )
    .eq("activo", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[Lester] Error consultando productos en Supabase:", error.message);
    return sampleProducts;
  }

  return (data as DbProduct[]).map(mapRow);
}
