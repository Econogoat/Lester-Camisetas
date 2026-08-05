import test from 'node:test';
import assert from 'node:assert/strict';

import {
  getStoredIds,
  toggleStoredId,
  isStoredId,
  getCartItems,
  addToCart,
  updateCartQuantity,
  removeFromCart,
  getCartCount,
} from '../src/lib/catalog-store.ts';

test('toggleStoredId agrega y elimina ids de una colección', () => {
  const storage = new Map();
  const key = 'wishlist';

  const add = toggleStoredId(storage, key, 'p-1');
  const addAgain = toggleStoredId(storage, key, 'p-1');
  const has = isStoredId(storage, key, 'p-1');

  assert.equal(add, true);
  assert.equal(addAgain, false);
  assert.equal(has, false);
});

test('getStoredIds retorna ids válidos de la colección', () => {
  const storage = new Map();
  storage.set('cart', JSON.stringify(['p-1', 'p-2', ' ' , '!!!']));

  const ids = getStoredIds(storage, 'cart');

  assert.deepEqual(ids, ['p-1', 'p-2']);
});

test('addToCart agrega una línea nueva con producto + talla', () => {
  const storage = new Map();

  const items = addToCart(storage, 'p-1', 'M', 1);

  assert.deepEqual(items, [{ productId: 'p-1', talla: 'M', cantidad: 1 }]);
});

test('addToCart suma cantidad si ya existe la misma línea (producto + talla)', () => {
  const storage = new Map();
  addToCart(storage, 'p-1', 'M', 1);

  const items = addToCart(storage, 'p-1', 'M', 2);

  assert.deepEqual(items, [{ productId: 'p-1', talla: 'M', cantidad: 3 }]);
});

test('addToCart trata distintas tallas del mismo producto como líneas separadas', () => {
  const storage = new Map();
  addToCart(storage, 'p-1', 'M', 1);

  const items = addToCart(storage, 'p-1', 'L', 1);

  assert.equal(items.length, 2);
});

test('updateCartQuantity con cantidad <= 0 elimina la línea', () => {
  const storage = new Map();
  addToCart(storage, 'p-1', 'M', 2);

  const items = updateCartQuantity(storage, 'p-1', 'M', 0);

  assert.deepEqual(items, []);
});

test('removeFromCart saca sólo la línea indicada', () => {
  const storage = new Map();
  addToCart(storage, 'p-1', 'M', 1);
  addToCart(storage, 'p-1', 'L', 1);

  const items = removeFromCart(storage, 'p-1', 'M');

  assert.deepEqual(items, [{ productId: 'p-1', talla: 'L', cantidad: 1 }]);
});

test('getCartCount suma las cantidades de todas las líneas', () => {
  const storage = new Map();
  addToCart(storage, 'p-1', 'M', 2);
  addToCart(storage, 'p-2', 'S', 3);

  assert.equal(getCartCount(storage), 5);
});

test('getCartItems ignora entradas guardadas con forma inválida', () => {
  const storage = new Map();
  storage.set(
    'cart',
    JSON.stringify([
      { productId: 'p-1', talla: 'M', cantidad: 1 },
      { productId: 'p-2', talla: 'M', cantidad: 0 }, // cantidad inválida
      { productId: 'p-3' }, // sin talla
      'p-4', // forma vieja (sólo id), ya no es válida para el carrito
    ])
  );

  assert.deepEqual(getCartItems(storage), [{ productId: 'p-1', talla: 'M', cantidad: 1 }]);
});

