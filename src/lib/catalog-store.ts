export type StoreKey = "wishlist" | "cart";

const sanitizeStoredIds = (value: string | null | undefined): string[] => {
  if (!value) return [];

  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is string => {
      if (typeof item !== "string") return false;
      const trimmed = item.trim();
      return trimmed.length > 0 && /^[a-zA-Z0-9-_.]+$/.test(trimmed);
    });
  } catch {
    return [];
  }
};

export const getStoredIds = (storage: Map<string, string>, key: StoreKey): string[] => {
  const rawValue = storage.get(key) ?? "[]";
  return sanitizeStoredIds(rawValue);
};

export const isStoredId = (storage: Map<string, string>, key: StoreKey, productId: string): boolean => {
  return getStoredIds(storage, key).includes(productId);
};

export const toggleStoredId = (storage: Map<string, string>, key: StoreKey, productId: string): boolean => {
  const current = getStoredIds(storage, key);
  const next = current.includes(productId) ? current.filter((id) => id !== productId) : [...current, productId];
  storage.set(key, JSON.stringify(next));
  return next.includes(productId);
};

// ─────────────────────────────────────────────────────────────
// Carrito — a diferencia de la wishlist, cada línea necesita saber la talla
// (el stock se controla por talla, no por producto) y la cantidad. Por eso
// no reutiliza getStoredIds/toggleStoredId de arriba, que sólo manejan
// listas planas de ids.
// ─────────────────────────────────────────────────────────────
const CART_KEY = "cart";

export interface CartItem {
  productId: string;
  talla: string;
  cantidad: number;
}

const isValidId = (value: unknown): value is string =>
  typeof value === "string" && /^[a-zA-Z0-9-_.]+$/.test(value.trim()) && value.trim().length > 0;

const sanitizeCartItems = (value: string | null | undefined): CartItem[] => {
  if (!value) return [];

  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is CartItem => {
      return (
        item &&
        typeof item === "object" &&
        isValidId(item.productId) &&
        isValidId(item.talla) &&
        Number.isFinite(item.cantidad) &&
        item.cantidad > 0
      );
    });
  } catch {
    return [];
  }
};

export const getCartItems = (storage: Map<string, string>): CartItem[] => {
  return sanitizeCartItems(storage.get(CART_KEY) ?? "[]");
};

const setCartItems = (storage: Map<string, string>, items: CartItem[]): CartItem[] => {
  storage.set(CART_KEY, JSON.stringify(items));
  return items;
};

/** Suma cantidad si ya existe la misma línea (mismo producto + talla). */
export const addToCart = (
  storage: Map<string, string>,
  productId: string,
  talla: string,
  cantidad = 1
): CartItem[] => {
  const items = getCartItems(storage);
  const exists = items.some((item) => item.productId === productId && item.talla === talla);

  const next = exists
    ? items.map((item) =>
        item.productId === productId && item.talla === talla
          ? { ...item, cantidad: item.cantidad + cantidad }
          : item
      )
    : [...items, { productId, talla, cantidad }];

  return setCartItems(storage, next);
};

/** cantidad <= 0 elimina la línea. */
export const updateCartQuantity = (
  storage: Map<string, string>,
  productId: string,
  talla: string,
  cantidad: number
): CartItem[] => {
  const items = getCartItems(storage);

  const next =
    cantidad <= 0
      ? items.filter((item) => !(item.productId === productId && item.talla === talla))
      : items.map((item) => (item.productId === productId && item.talla === talla ? { ...item, cantidad } : item));

  return setCartItems(storage, next);
};

export const removeFromCart = (storage: Map<string, string>, productId: string, talla: string): CartItem[] => {
  return updateCartQuantity(storage, productId, talla, 0);
};

export const getCartCount = (storage: Map<string, string>): number => {
  return getCartItems(storage).reduce((sum, item) => sum + item.cantidad, 0);
};
