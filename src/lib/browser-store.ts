import {
  getStoredIds,
  toggleStoredId,
  getCartItems,
  addToCart as addToCartPure,
  updateCartQuantity as updateCartQuantityPure,
  removeFromCart as removeFromCartPure,
  getCartCount as getCartCountPure,
  type CartItem,
} from "./catalog-store";

export type { CartItem };

const STORAGE_KEYS = ["wishlist", "cart"] as const;

function readStorage(): Map<string, string> {
  const map = new Map<string, string>();
  if (typeof window === "undefined") return map;

  STORAGE_KEYS.forEach((key) => {
    const value = window.localStorage.getItem(key);
    if (value !== null) map.set(key, value);
  });

  return map;
}

function persist(storage: Map<string, string>) {
  if (typeof window === "undefined") return;
  storage.forEach((value, key) => window.localStorage.setItem(key, value));
}

function notify() {
  if (typeof window === "undefined") return;
  // Header.astro (y cualquier otra pantalla) escucha este evento para
  // refrescar los contadores sin tener que releer localStorage a mano.
  window.dispatchEvent(new CustomEvent("lester:store-update"));
}

// ─────────────────────────────────────────────────────────────
// Wishlist
// ─────────────────────────────────────────────────────────────
export function getWishlist(): string[] {
  return getStoredIds(readStorage(), "wishlist");
}

export function isInWishlist(productId: string): boolean {
  return getWishlist().includes(productId);
}

export function toggleWishlist(productId: string): boolean {
  const storage = readStorage();
  const isNowInWishlist = toggleStoredId(storage, "wishlist", productId);
  persist(storage);
  notify();
  return isNowInWishlist;
}

// ─────────────────────────────────────────────────────────────
// Carrito
// ─────────────────────────────────────────────────────────────
export function getCart(): CartItem[] {
  return getCartItems(readStorage());
}

export function getCartItemCount(): number {
  return getCartCountPure(readStorage());
}

export function addProductToCart(productId: string, talla: string, cantidad = 1): CartItem[] {
  const storage = readStorage();
  const items = addToCartPure(storage, productId, talla, cantidad);
  persist(storage);
  notify();
  return items;
}

export function setCartItemQuantity(productId: string, talla: string, cantidad: number): CartItem[] {
  const storage = readStorage();
  const items = updateCartQuantityPure(storage, productId, talla, cantidad);
  persist(storage);
  notify();
  return items;
}

export function removeCartItem(productId: string, talla: string): CartItem[] {
  const storage = readStorage();
  const items = removeFromCartPure(storage, productId, talla);
  persist(storage);
  notify();
  return items;
}
