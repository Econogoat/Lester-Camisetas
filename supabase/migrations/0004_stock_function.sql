-- Lester — función para descontar stock de forma atómica al confirmar un pago
-- Correr después de las migraciones anteriores.
--
-- Por qué una función de Postgres y no un UPDATE armado en la app: si dos
-- pagos se confirman casi al mismo tiempo para la última unidad de una
-- talla, "leer stock, restar, escribir" desde el código puede pisarse. Un
-- UPDATE ... SET stock = stock - cantidad es atómico a nivel de fila en
-- Postgres, así que no hace falta lógica extra para evitar la carrera.

create or replace function public.decrementar_stock(variant_id uuid, cantidad integer)
returns void
language sql
security definer
set search_path = public
as $$
  update public.product_variants
  set stock = greatest(stock - cantidad, 0)
  where id = variant_id;
$$;
