import type { Product } from "../data/products";

export type CatalogSortValue = "relevancia" | "precio-asc" | "precio-desc" | "novedad";

export interface CatalogFilters {
  clubs?: Set<string>;
  ligas?: Set<string>;
  temporadas?: Set<string>;
  tipos?: Set<string>;
  versiones?: Set<string>;
  tallas?: Set<string>;
  priceMin?: number;
  priceMax?: number;
}

const normalize = (value: string) => value.trim();

export const filterCatalogProducts = (products: Product[], filters: CatalogFilters = {}) => {
  const clubs = filters.clubs && filters.clubs.size > 0 ? filters.clubs : null;
  const ligas = filters.ligas && filters.ligas.size > 0 ? filters.ligas : null;
  const temporadas = filters.temporadas && filters.temporadas.size > 0 ? filters.temporadas : null;
  const tipos = filters.tipos && filters.tipos.size > 0 ? filters.tipos : null;
  const versiones = filters.versiones && filters.versiones.size > 0 ? filters.versiones : null;
  const tallas = filters.tallas && filters.tallas.size > 0 ? filters.tallas : null;
  const minPrice = Number.isFinite(filters.priceMin) ? filters.priceMin ?? 0 : 0;
  const maxPrice = Number.isFinite(filters.priceMax) ? filters.priceMax ?? Number.POSITIVE_INFINITY : Number.POSITIVE_INFINITY;

  return products.filter((product) => {
    if (clubs && !clubs.has(product.club)) return false;
    if (ligas && !ligas.has(product.liga)) return false;
    if (temporadas && !temporadas.has(product.temporada)) return false;
    if (tipos && !tipos.has(product.tipo)) return false;
    if (versiones && !versiones.has(product.version)) return false;
    if (tallas && !product.tallas.some((talla) => tallas.has(normalize(talla)))) return false;
    if (product.price < minPrice) return false;
    if (product.price > maxPrice) return false;
    return true;
  });
};

const getSeasonRank = (value: string) => {
  if (value === "retro") return 0;
  const match = value.match(/(\d{4})\/(\d{2})/);
  if (!match) return 1;
  return Number(match[1]);
};

export const sortCatalogProducts = (products: Product[], sortValue: CatalogSortValue = "relevancia") => {
  const sorted = [...products];

  switch (sortValue) {
    case "precio-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "precio-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "novedad":
      return sorted.sort((a, b) => {
        const aRank = getSeasonRank(a.temporada);
        const bRank = getSeasonRank(b.temporada);
        if (bRank !== aRank) return bRank - aRank;
        return b.price - a.price;
      });
    case "relevancia":
    default:
      return sorted;
  }
};
