import test from 'node:test';
import assert from 'node:assert/strict';

import { filterCatalogProducts, sortCatalogProducts } from '../src/lib/catalog-filters.ts';
import { resolveCatalogView } from '../src/lib/catalog-view.ts';

const products = [
  { id: 'a', club: 'Boca Juniors', price: 90000, liga: 'Liga Profesional', temporada: '2025/26', tipo: 'Local', version: 'Jugador', tallas: ['S', 'M', 'XL'] },
  { id: 'b', club: 'River Plate', price: 70000, liga: 'Liga Profesional', temporada: '2024/25', tipo: 'Alternativa', version: 'Aficionado', tallas: ['M', 'L'] },
  { id: 'c', club: 'Real Madrid', price: 120000, liga: 'La Liga', temporada: 'retro', tipo: 'Visitante', version: 'Jugador', tallas: ['L', 'XL'] },
];

test('filterCatalogProducts aplica filtros combinados', () => {
  const filtered = filterCatalogProducts(products, {
    clubs: new Set(['Boca Juniors']),
    ligas: new Set(['Liga Profesional']),
    tipos: new Set(['Local']),
    versiones: new Set(['Jugador']),
    temporadas: new Set(['2025/26']),
    tallas: new Set(['XL']),
    priceMin: 80000,
    priceMax: 95000,
  });

  assert.equal(filtered.length, 1);
  assert.equal(filtered[0].id, 'a');
});

test('sortCatalogProducts ordena por precio ascendente', () => {
  const sorted = sortCatalogProducts(products, 'precio-asc');

  assert.deepEqual(sorted.map((product) => product.id), ['b', 'a', 'c']);
});

test('resolveCatalogView normaliza la vista a grid o list', () => {
  assert.equal(resolveCatalogView('list'), 'list');
  assert.equal(resolveCatalogView('LIST'), 'list');
  assert.equal(resolveCatalogView('grid'), 'grid');
  assert.equal(resolveCatalogView(undefined), 'grid');
});
