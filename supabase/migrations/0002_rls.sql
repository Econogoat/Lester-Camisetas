-- Lester — Row Level Security
-- Correr después de 0001_schema.sql.
--
-- Esta es la defensa real del sistema: el middleware de Astro evita mostrar
-- pantallas de /admin que no corresponden, pero cualquiera que hable
-- directamente con la API de Supabase (o con /_actions/*) queda sujeto
-- únicamente a estas políticas. Sin RLS, el middleware es decoración.

-- Función helper: ¿el usuario autenticado actual es admin?
-- security definer para poder leer `profiles` sin quedar atrapada en sus
-- propias políticas de SELECT (evita recursión) — patrón recomendado por
-- Supabase para este tipo de chequeo de rol.
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- ─────────────────────────────────────────────────────────────
-- products / product_variants
-- SELECT público (cualquiera ve el catálogo). INSERT/UPDATE/DELETE sólo admin.
-- ─────────────────────────────────────────────────────────────
alter table public.products enable row level security;
alter table public.product_variants enable row level security;

drop policy if exists "products_select_public" on public.products;
create policy "products_select_public" on public.products
  for select using (true);

drop policy if exists "products_insert_admin" on public.products;
create policy "products_insert_admin" on public.products
  for insert with check (public.is_admin());

drop policy if exists "products_update_admin" on public.products;
create policy "products_update_admin" on public.products
  for update using (public.is_admin()) with check (public.is_admin());

drop policy if exists "products_delete_admin" on public.products;
create policy "products_delete_admin" on public.products
  for delete using (public.is_admin());

drop policy if exists "variants_select_public" on public.product_variants;
create policy "variants_select_public" on public.product_variants
  for select using (true);

drop policy if exists "variants_insert_admin" on public.product_variants;
create policy "variants_insert_admin" on public.product_variants
  for insert with check (public.is_admin());

drop policy if exists "variants_update_admin" on public.product_variants;
create policy "variants_update_admin" on public.product_variants
  for update using (public.is_admin()) with check (public.is_admin());

drop policy if exists "variants_delete_admin" on public.product_variants;
create policy "variants_delete_admin" on public.product_variants
  for delete using (public.is_admin());

-- ─────────────────────────────────────────────────────────────
-- orders / order_items
-- Un customer sólo ve sus propias órdenes; el admin ve y actualiza todas.
-- ─────────────────────────────────────────────────────────────
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

drop policy if exists "orders_select_own_or_admin" on public.orders;
create policy "orders_select_own_or_admin" on public.orders
  for select using (auth.uid() = user_id or public.is_admin());

drop policy if exists "orders_insert_own_or_admin" on public.orders;
create policy "orders_insert_own_or_admin" on public.orders
  for insert with check (auth.uid() = user_id or public.is_admin());

drop policy if exists "orders_update_admin" on public.orders;
create policy "orders_update_admin" on public.orders
  for update using (public.is_admin()) with check (public.is_admin());

drop policy if exists "order_items_select_own_or_admin" on public.order_items;
create policy "order_items_select_own_or_admin" on public.order_items
  for select using (
    exists (
      select 1 from public.orders o
      where o.id = order_items.order_id
        and (o.user_id = auth.uid() or public.is_admin())
    )
  );

drop policy if exists "order_items_insert_own_or_admin" on public.order_items;
create policy "order_items_insert_own_or_admin" on public.order_items
  for insert with check (
    exists (
      select 1 from public.orders o
      where o.id = order_items.order_id
        and (o.user_id = auth.uid() or public.is_admin())
    )
  );

drop policy if exists "order_items_update_admin" on public.order_items;
create policy "order_items_update_admin" on public.order_items
  for update using (public.is_admin()) with check (public.is_admin());

-- ─────────────────────────────────────────────────────────────
-- profiles
-- Cada usuario lee sólo su propio registro; sólo un admin puede modificar
-- roles. No hay política de INSERT: las filas las crea únicamente el trigger
-- `handle_new_user` (security definer), nunca un insert directo del cliente
-- — así nadie puede autoasignarse role = 'admin' desde el navegador.
-- ─────────────────────────────────────────────────────────────
alter table public.profiles enable row level security;

drop policy if exists "profiles_select_own_or_admin" on public.profiles;
create policy "profiles_select_own_or_admin" on public.profiles
  for select using (auth.uid() = id or public.is_admin());

drop policy if exists "profiles_update_admin_only" on public.profiles;
create policy "profiles_update_admin_only" on public.profiles
  for update using (public.is_admin()) with check (public.is_admin());
