-- =========================================================
-- BloQe - Esquema v2 (Supabase / PostgreSQL)
-- Basado en el diagrama actualizado (sin tabla imagen por ahora)
-- Solo creación de tablas (sin datos)
-- =========================================================
 
-- ---------- Catálogos ----------
create table public.sector (
  id      bigint generated always as identity primary key,
  nombre  varchar(20) not null unique
);
 
create table public.estado (
  id      bigint generated always as identity primary key,
  nombre  varchar(30) not null unique
);
 
create table public.bloque (
  id              bigint generated always as identity primary key,
  nombre          varchar(30) not null,
  fecha_apertura  date,
  fecha_cierre    date,
  cantidad_max    int check (cantidad_max > 0),
  total           numeric(12,2) default 0,
  check (fecha_cierre is null or fecha_apertura is null or fecha_cierre >= fecha_apertura)
);
 
-- ---------- Clientes ----------
create table public.cliente (
  id        bigint generated always as identity primary key,
  fuente    varchar(30),          -- Forms, Whatsapp, Beyond, Amigo Mathias...
  telefono  varchar(20)           -- texto: el Excel trae "983 456 232"
);
 
create table public.persona (
  id          bigint generated always as identity primary key,
  nombre      varchar(30) not null,
  apellido    varchar(30),
  cliente_id  bigint not null unique references public.cliente(id) on delete cascade
);
 
create table public.empresa (
  id          bigint generated always as identity primary key,
  nombre      varchar(30) not null,
  cliente_id  bigint not null unique references public.cliente(id) on delete cascade
);
 
-- ---------- Productos ----------
create table public.producto (
  id                bigint generated always as identity primary key,
  nombre            varchar(60) not null,   -- 30 no alcanza para los nombres del Excel
  "tamaño"          varchar(20),
  costo             numeric(10,2) not null check (costo >= 0),  -- costo de compra al proveedor
  precio_referencia numeric(10,2),
  justificacion     text,                   -- las justificaciones pasan de 70 caracteres
  margen            numeric(6,4),           -- 0.30 = 30%
  precio_oferta     numeric(10,2),
  sector_id         bigint references public.sector(id),
  bloque_id         bigint references public.bloque(id)
);
 
-- ---------- Pedidos ----------
create table public.pedido (
  id            bigint generated always as identity primary key,
  fecha_pedido  date not null default current_date,
  total         numeric(12,2) default 0,
  estado_id     bigint references public.estado(id),
  cliente_id    bigint not null references public.cliente(id),
  bloque_id     bigint references public.bloque(id)
);
 
create table public.producto_pedido (
  pedido_id     bigint not null references public.pedido(id) on delete cascade,
  producto_id   bigint not null references public.producto(id),
  unidades      int not null default 1 check (unidades > 0),
  precio_venta  numeric(10,2) not null,
  primary key (pedido_id, producto_id)
);
 
-- ---------- Índices ----------
create index on public.producto (sector_id);
create index on public.producto (bloque_id);
create index on public.pedido (cliente_id);
create index on public.pedido (estado_id);
create index on public.pedido (bloque_id);
create index on public.producto_pedido (producto_id);
 
-- ---------- Seguridad (RLS) ----------
-- Todas las tablas con RLS. Usuarios autenticados (equipo BloQe) pueden todo.
do $$
declare t text;
begin
  foreach t in array array['sector','estado','bloque','cliente','persona',
                           'empresa','producto','pedido','producto_pedido']
  loop
    execute format('alter table public.%I enable row level security', t);
    execute format(
      'create policy "auth_all_%1$s" on public.%1$I for all to authenticated using (true) with check (true)', t);
  end loop;
end $$;
 
-- El catálogo (productos, bloques, sectores) se puede leer sin iniciar sesión,
-- para que la web muestre los bloques abiertos. Clientes y pedidos NO son públicos.
create policy "public_read_producto" on public.producto for select to anon using (true);
create policy "public_read_bloque"   on public.bloque   for select to anon using (true);
create policy "public_read_sector"   on public.sector   for select to anon using (true);