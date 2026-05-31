alter table public.profiles
  add column if not exists is_admin boolean not null default false;

create policy "Admins read all vehicles"
  on public.vehicles for select
  using (
    exists (
      select 1 from public.profiles p
      where p.user_id = auth.uid() and p.is_admin = true
    )
  );

create policy "Admins update vehicles"
  on public.vehicles for update
  using (
    exists (
      select 1 from public.profiles p
      where p.user_id = auth.uid() and p.is_admin = true
    )
  )
  with check (
    exists (
      select 1 from public.profiles p
      where p.user_id = auth.uid() and p.is_admin = true
    )
  );

create policy "Admins delete vehicles"
  on public.vehicles for delete
  using (
    exists (
      select 1 from public.profiles p
      where p.user_id = auth.uid() and p.is_admin = true
    )
  );

create policy "Admins manage all vehicle images"
  on storage.objects for all
  using (
    bucket_id = 'vehicle-images'
    and exists (
      select 1 from public.profiles p
      where p.user_id = auth.uid() and p.is_admin = true
    )
  )
  with check (
    bucket_id = 'vehicle-images'
    and exists (
      select 1 from public.profiles p
      where p.user_id = auth.uid() and p.is_admin = true
    )
  );
