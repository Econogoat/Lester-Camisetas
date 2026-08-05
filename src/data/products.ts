export interface Product {
  id: string;
  club: string;
  name: string;
  price: number;
  liga: string;
  temporada: string;
  tipo: "Local" | "Visitante" | "Alternativa";
  version: "Jugador" | "Aficionado";
  tallas: string[];
  badge?: "Nueva Temporada" | "Edición Limitada";
  unidadesRestantes?: number;
  /** true cuando el stock sumado de todas las tallas es 0 */
  agotado?: boolean;
  crest: string; // iniciales para el placeholder de escudo
  /** Reemplazar por la URL real de fotografía frontal (ghost mannequin, fondo #0B0B0C) */
  imgFront: string;
  /** Reemplazar por la URL real de fotografía trasera (nombre y dorsal visibles) */
  imgBack: string;
}

export const sampleProducts: Product[] = [
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
    imgBack: "[URL_FOTO_ESPALDA]",
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
    imgBack: "[URL_FOTO_ESPALDA]",
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
    imgBack: "[URL_FOTO_ESPALDA]",
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
    imgBack: "[URL_FOTO_ESPALDA]",
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
    imgBack: "[URL_FOTO_ESPALDA]",
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
    imgBack: "[URL_FOTO_ESPALDA]",
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
    imgBack: "[URL_FOTO_ESPALDA]",
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
    imgBack: "[URL_FOTO_ESPALDA]",
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
    imgBack: "[URL_FOTO_ESPALDA]",
  },
];
