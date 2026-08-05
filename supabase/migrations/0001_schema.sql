-- Lester — esquema de base de datos
-- Correr en el SQL Editor de Supabase (Dashboard > SQL Editor > New query), en orden:
-- 0001_schema.sql -> 0002_rls.sql -> 0003_storage.sql
--
-- Nota: si ya corriste un prompt anterior que creó `products`, `orders` y
-- `order_items` (por ejemplo, el de integración con MercadoPago), el `if not
-- exists` de abajo hace que esas tablas no se toquen. Pero revisá que los
-- nombres de columna coincidan con los que usa este archivo y con los que
-- consultan `src/lib/` y `src/actions/` — si no coinciden, ajustá las
-- consultas del proyecto a los nombres reales en vez de este SQL.

create extension if not exists pgcrypto;

-- ─────────────────────────────────────────────────────────────
-- products
-- ─────────────────────────────────────────────────────────────
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  club_seleccion text not null,
  liga text not null,
  temporada text not null,
  tipo text not null check (tipo in ('local', 'visitante', 'alternativa')),
  version text not null check (version in ('jugador', 'aficionado')),
  precio numeric(12, 2) not null check (precio >= 0),
  imagen_frente text,
  imagen_espalda text,
  activo boolean not null default true,
  created_at timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────
-- product_variants — stock por talla, separado de products porque el stock
-- varía por talla y no es un número único por producto.
-- ─────────────────────────────────────────────────────────────
create table if not exists public.product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  talla text not null check (talla in ('S', 'M', 'L', 'XL', 'XXL')),
  stock integer not null default 0 check (stock >= 0),
  unique (product_id, talla)
);

-- ─────────────────────────────────────────────────────────────
-- orders / order_items
-- Reconstrucción razonable del modelo que usaría un prompt de integración con
-- MercadoPago (no lo tengo disponible en esta conversación). Si ese prompt ya
-- corrió con nombres de columna distintos, priorizá esos nombres reales por
-- sobre este archivo.
-- ─────────────────────────────────────────────────────────────
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),
  email text not null,
  total numeric(12, 2) not null check (total >= 0),
  estado_pago text not null default 'pendiente'
    check (estado_pago in ('pendiente', 'pagado', 'rechazado', 'reembolsado')),
  estado_envio text not null default 'pendiente'
    check (estado_envio in ('pendiente', 'enviado', 'entregado')),
  numero_seguimiento text,
  mercadopago_payment_id text,
  direccion_envio jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid not null references public.products(id),
  product_variant_id uuid references public.product_variants(id),
  talla text,
  cantidad integer not null check (cantidad > 0),
  precio_unitario numeric(12, 2) not null check (precio_unitario >= 0),
  created_at timestamptz not null default now()
);

-- ─────────────────────────────────────────────────────────────
-- profiles — guarda el rol de cada usuario. Supabase Auth ya crea
-- `auth.users`; esta tabla es la que le agrega un `role` a cada uno.
-- ─────────────────────────────────────────────────────────────
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'customer' check (role in ('admin', 'customer')),
  created_at timestamptz not null default now()
);

-- Cada usuario nuevo en auth.users entra por default con role = 'customer'.
-- El admin se promueve a mano una sola vez (ver README) actualizando su fila
-- a role = 'admin' después de crearlo desde el dashboard de Supabase.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, role)
  values (new.id, 'customer')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
