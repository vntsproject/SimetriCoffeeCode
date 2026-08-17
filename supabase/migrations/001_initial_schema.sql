create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique,
  role text check (role in ('admin','staff')) default 'staff',
  created_at timestamptz default now()
);

create table if not exists public.cafe_tables (
  id uuid primary key default gen_random_uuid(),
  table_number int unique not null,
  capacity int not null default 2,
  is_active boolean default true,
  created_at timestamptz default now()
);

create table if not exists public.menu_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  sort_order int default 0,
  created_at timestamptz default now()
);

create table if not exists public.menu_items (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.menu_categories(id) on delete set null,
  name text not null,
  description text,
  price int not null,
  image_url text,
  is_available boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_code text unique not null,
  table_number int,
  customer_name text,
  notes text,
  status text check (status in ('pending','preparing','served','completed','cancelled')) default 'pending',
  total_amount int not null default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references public.orders(id) on delete cascade,
  menu_item_id uuid references public.menu_items(id) on delete set null,
  menu_item_name text not null,
  quantity int not null,
  unit_price int not null,
  subtotal int not null,
  created_at timestamptz default now()
);

create table if not exists public.reservations (
  id uuid primary key default gen_random_uuid(),
  reservation_code text unique not null,
  customer_name text not null,
  whatsapp_number text not null,
  party_size int not null,
  table_id uuid references public.cafe_tables(id) on delete set null,
  table_number int not null,
  start_time timestamptz not null,
  end_time timestamptz not null,
  notes text,
  status text check (status in ('pending_payment','pending_confirmation','confirmed','cancelled','completed')) default 'pending_confirmation',
  total_amount int not null default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.reservation_items (
  id uuid primary key default gen_random_uuid(),
  reservation_id uuid references public.reservations(id) on delete cascade,
  menu_item_id uuid references public.menu_items(id) on delete set null,
  menu_item_name text not null,
  quantity int not null,
  unit_price int not null,
  subtotal int not null,
  created_at timestamptz default now()
);

create or replace function public.get_available_tables(requested_start timestamptz, requested_end timestamptz)
returns table(id uuid, table_number int, capacity int, is_active boolean, available boolean)
language sql stable as $$
  select t.id, t.table_number, t.capacity, t.is_active,
    not exists (
      select 1 from public.reservations r
      where r.table_id = t.id
      and r.status in ('pending_payment','pending_confirmation','confirmed')
      and r.start_time < requested_end
      and r.end_time > requested_start
    ) as available
  from public.cafe_tables t
  where t.is_active = true
  order by t.table_number;
$$;

alter table public.profiles enable row level security;
alter table public.cafe_tables enable row level security;
alter table public.menu_categories enable row level security;
alter table public.menu_items enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.reservations enable row level security;
alter table public.reservation_items enable row level security;

create or replace function public.is_admin()
returns boolean language sql security definer stable as $$
  select exists(select 1 from public.profiles where id = auth.uid() and role = 'admin');
$$;

drop policy if exists "public read active tables" on public.cafe_tables;
create policy "public read active tables" on public.cafe_tables for select using (is_active = true or public.is_admin());
drop policy if exists "admin manage tables" on public.cafe_tables;
create policy "admin manage tables" on public.cafe_tables for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "public read categories" on public.menu_categories;
create policy "public read categories" on public.menu_categories for select using (true);
drop policy if exists "admin manage categories" on public.menu_categories;
create policy "admin manage categories" on public.menu_categories for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "public read available menu" on public.menu_items;
create policy "public read available menu" on public.menu_items for select using (is_available = true or public.is_admin());
drop policy if exists "admin manage menu" on public.menu_items;
create policy "admin manage menu" on public.menu_items for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "public create orders" on public.orders;
create policy "public create orders" on public.orders for insert with check (true);
drop policy if exists "admin manage orders" on public.orders;
create policy "admin manage orders" on public.orders for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "public create order items" on public.order_items;
create policy "public create order items" on public.order_items for insert with check (true);
drop policy if exists "admin manage order items" on public.order_items;
create policy "admin manage order items" on public.order_items for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "public create reservations" on public.reservations;
create policy "public create reservations" on public.reservations for insert with check (true);
drop policy if exists "admin manage reservations" on public.reservations;
create policy "admin manage reservations" on public.reservations for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "public create reservation items" on public.reservation_items;
create policy "public create reservation items" on public.reservation_items for insert with check (true);
drop policy if exists "admin manage reservation items" on public.reservation_items;
create policy "admin manage reservation items" on public.reservation_items for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admin read profiles" on public.profiles;
create policy "admin read profiles" on public.profiles for select using (public.is_admin());
drop policy if exists "admin manage profiles" on public.profiles;
create policy "admin manage profiles" on public.profiles for all using (public.is_admin()) with check (public.is_admin());
