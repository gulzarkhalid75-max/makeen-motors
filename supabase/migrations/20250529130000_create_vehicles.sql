-- Vehicle listings
create table if not exists public.vehicles (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid not null references auth.users (id) on delete cascade,
  brand          text,
  model          text,
  year           integer,
  mileage        text,
  fuel_type      text,
  transmission   text,
  horsepower     text,
  exterior_color text,
  seller_name    text,
  email          text,
  phone          text,
  images         text[] not null default '{}',
  condition      text,
  status         text not null default 'pending'
                 check (status in ('pending', 'approved', 'rejected')),
  created_at     timestamptz not null default now()
);

create index if not exists vehicles_user_id_idx on public.vehicles (user_id);
create index if not exists vehicles_status_idx on public.vehicles (status);

alter table public.vehicles enable row level security;

create policy "Users insert own vehicles"
  on public.vehicles for insert
  with check (auth.uid() = user_id);

create policy "Users read own vehicles"
  on public.vehicles for select
  using (auth.uid() = user_id);

create policy "Public read approved vehicles"
  on public.vehicles for select
  using (status = 'approved');

-- Storage bucket for listing photos
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'vehicle-images',
  'vehicle-images',
  true,
  10485760,
  array['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/avif']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create policy "Authenticated users upload vehicle images"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'vehicle-images'
    and (storage.foldername (name))[1] = auth.uid()::text
  );

create policy "Public read vehicle images"
  on storage.objects for select
  using (bucket_id = 'vehicle-images');

create policy "Users update own vehicle images"
  on storage.objects for update
  to authenticated
  using (
    bucket_id = 'vehicle-images'
    and (storage.foldername (name))[1] = auth.uid()::text
  );

create policy "Users delete own vehicle images"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'vehicle-images'
    and (storage.foldername (name))[1] = auth.uid()::text
  );
