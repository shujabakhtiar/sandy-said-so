-- 1. Trigger to automatically create a row in public."User" when a new user signs up via Supabase Auth
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public."User" (id, email, name)
  values (
    new.id, 
    new.email, 
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', '')
  );
  return new;
end;
$$;

-- Trigger to call the function
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 2. Enable Row Level Security (RLS) on the public."User" table
alter table public."User" enable row level security;

-- 3. Define RLS Policies
-- Allow users to view their own user record
create policy "Users can view own profile"
  on public."User"
  for select
  using (auth.uid()::text = id);

-- Allow users to update their own user record
create policy "Users can update own profile"
  on public."User"
  for update
  using (auth.uid()::text = id);

-- 4. RLS for other user-owned tables (Example: GameDeck)
alter table public."GameDeck" enable row level security;

create policy "Users can manage their own game decks"
  on public."GameDeck"
  for all
  using (auth.uid()::text = user_id);

-- Note: Repeat for Photo, Person, etc.
alter table public."Photo" enable row level security;
create policy "Users can manage their own photos"
  on public."Photo"
  for all
  using (auth.uid()::text = user_id);

alter table public."Person" enable row level security;
create policy "Users can manage their own people"
  on public."Person"
  for all
  using (auth.uid()::text = user_id);
