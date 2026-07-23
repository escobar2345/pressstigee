create table if not exists public.referral_bookings (
  id uuid primary key default gen_random_uuid(),
  referral_id text not null,
  customer_first_name text not null,
  customer_last_name text not null,
  customer_name text not null,
  services text[] not null default '{}',
  service_label text not null,
  job_value numeric not null default 0,
  commission numeric not null default 0,
  status text not null default 'Pending',
  created_at timestamptz not null default now()
);

alter table public.referral_bookings enable row level security;

create policy "Anyone can create referral bookings"
on public.referral_bookings
for insert
to anon, authenticated
with check (true);

create policy "Authenticated users can read referral bookings"
on public.referral_bookings
for select
to authenticated
using (true);

alter publication supabase_realtime add table public.referral_bookings;
