import { createClient } from '@supabase/supabase-js';

const sampleProducts = [
  {
    id: "boca-local-2526",
    club: "Boca Juniors",
    name: "Camiseta Titular 25/26",
    price: 89999,
    liga: "Liga Profesional",
    temporada: "2025/26",
    tipo: "Local",
    version: "Jugador",
    tallas: ["S", "M", "L", "XL"],
    badge: "Nueva Temporada",
    crest: "BJ",
    imgFront: "[URL_FOTO_FRENTE]",
    imgBack: "[URL_FOTO_ESPALDA]"
  },
  {
    id: "river-alt-2526",
    club: "River Plate",
    name: "Camiseta Alternativa 25/26",
    price: 84999,
    liga: "Liga Profesional",
    temporada: "2025/26",
    tipo: "Alternativa",
    version: "Aficionado",
    tallas: ["S", "M", "L"],
    unidadesRestantes: 4,
    crest: "RP",
    imgFront: "[URL_FOTO_FRENTE]",
    imgBack: "[URL_FOTO_ESPALDA]"
  },
  {
    id: "argentina-local-24",
    club: "Selección Argentina",
    name: "Camiseta Titular Campeón del Mundo",
    price: 99999,
    liga: "Selecciones",
    temporada: "2024/25",
    tipo: "Local",
    version: "Jugador",
    tallas: ["S", "M", "L", "XL", "XXL"],
    badge: "Edición Limitada",
    crest: "AFA",
    imgFront: "[URL_FOTO_FRENTE]",
    imgBack: "[URL_FOTO_ESPALDA]"
  },
  {
    id: "real-madrid-visit-2526",
    club: "Real Madrid",
    name: "Camiseta Visitante 25/26",
    price: 94999,
    liga: "La Liga",
    temporada: "2025/26",
    tipo: "Visitante",
    version: "Jugador",
    tallas: ["M", "L", "XL"],
    badge: "Nueva Temporada",
    crest: "RM",
    imgFront: "[URL_FOTO_FRENTE]",
    imgBack: "[URL_FOTO_ESPALDA]"
  },
  {
    id: "barcelona-local-retro-9899",
    club: "FC Barcelona",
    name: "Camiseta Retro 1998/99",
    price: 79999,
    liga: "La Liga",
    temporada: "retro",
    tipo: "Local",
    version: "Aficionado",
    tallas: ["S", "M", "XL"],
    unidadesRestantes: 2,
    crest: "FCB",
    imgFront: "[URL_FOTO_FRENTE]",
    imgBack: "[URL_FOTO_ESPALDA]"
  },
  {
    id: "brasil-local-2425",
    club: "Selección Brasil",
    name: "Camiseta Titular 24/25",
    price: 92999,
    liga: "Selecciones",
    temporada: "2024/25",
    tipo: "Local",
    version: "Jugador",
    tallas: ["S", "M", "L", "XL"],
    crest: "CBF",
    imgFront: "[URL_FOTO_FRENTE]",
    imgBack: "[URL_FOTO_ESPALDA]"
  },
  {
    id: "napoli-local-2526",
    club: "Napoli",
    name: "Camiseta Titular 25/26",
    price: 87999,
    liga: "Serie A",
    temporada: "2025/26",
    tipo: "Local",
    version: "Aficionado",
    tallas: ["S", "M", "L", "XL", "XXL"],
    badge: "Nueva Temporada",
    crest: "SSC",
    imgFront: "[URL_FOTO_FRENTE]",
    imgBack: "[URL_FOTO_ESPALDA]"
  },
  {
    id: "mexico-alt-2425",
    club: "Selección México",
    name: "Camiseta Alternativa 24/25",
    price: 78999,
    liga: "Selecciones",
    temporada: "2024/25",
    tipo: "Alternativa",
    version: "Aficionado",
    tallas: ["S", "M", "L"],
    unidadesRestantes: 6,
    crest: "FMF",
    imgFront: "[URL_FOTO_FRENTE]",
    imgBack: "[URL_FOTO_ESPALDA]"
  },
  {
    id: "milan-local-retro-8889",
    club: "AC Milan",
    name: "Camiseta Retro 1988/89",
    price: 82999,
    liga: "Serie A",
    temporada: "retro",
    tipo: "Local",
    version: "Aficionado",
    tallas: ["M", "L", "XL"],
    badge: "Edición Limitada",
    crest: "ACM",
    imgFront: "[URL_FOTO_FRENTE]",
    imgBack: "[URL_FOTO_ESPALDA]"
  }
];

const CURRENT_SEASON = "2025/26";
const TIPO_LABEL = {
  local: "Local",
  visitante: "Visitante",
  alternativa: "Alternativa"
};
const VERSION_LABEL = {
  jugador: "Jugador",
  aficionado: "Aficionado"
};
function crestFromClub(club) {
  const initials = club.split(/\s+/).filter(Boolean).map((word) => word[0]?.toUpperCase() ?? "").join("");
  return initials.slice(0, 3) || "?";
}
function nombreFrom(tipo, temporada) {
  const tipoLabel = TIPO_LABEL[tipo];
  return temporada === "retro" ? `Camiseta ${tipoLabel} Retro` : `Camiseta ${tipoLabel} ${temporada}`;
}
function mapRow(row) {
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
    badge: row.temporada === CURRENT_SEASON ? "Nueva Temporada" : void 0,
    unidadesRestantes: totalStock > 0 && totalStock <= 6 ? totalStock : void 0,
    agotado: variants.length > 0 && totalStock === 0,
    crest: crestFromClub(row.club_seleccion),
    imgFront: row.imagen_frente || "[URL_FOTO_FRENTE]",
    imgBack: row.imagen_espalda || "[URL_FOTO_ESPALDA]"
  };
}
async function getPublicProducts() {
  const url = "https://nolxnosvxwworggacqxb.supabase.co";
  const key = "sb_publishable_0OUSgtp38bgRImsCCA7v4w_DKl036PJ";
  const supabase = createClient(url, key);
  const { data, error } = await supabase.from("products").select(
    "id, club_seleccion, liga, temporada, tipo, version, precio, imagen_frente, imagen_espalda, activo, product_variants(talla, stock)"
  ).eq("activo", true).order("created_at", { ascending: false });
  if (error) {
    console.error("[Lester] Error consultando productos en Supabase:", error.message);
    return sampleProducts;
  }
  return data.map(mapRow);
}

export { getPublicProducts as g };
