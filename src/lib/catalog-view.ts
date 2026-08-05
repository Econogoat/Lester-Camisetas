export type CatalogView = "grid" | "list";

export const resolveCatalogView = (value?: string | null): CatalogView => {
  const normalized = value?.trim().toLowerCase();
  return normalized === "list" ? "list" : "grid";
};
