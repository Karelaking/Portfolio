-- Supabase Postgres schema for portfolio content
-- Run in Supabase SQL editor

create extension if not exists "pgcrypto";

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.hero (
  id text primary key,
  title text not null,
  subtitle text not null,
  description text not null,
  location text not null,
  availability text not null,
  metrics jsonb not null default '[]'::jsonb,
  image_src text not null,
  image_alt text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.expertise (
  id text primary key,
  title text not null,
  description text not null,
  icon text not null,
  order_index integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.experience (
  id text primary key,
  role text not null,
  company text not null,
  period text not null,
  summary text not null,
  highlights jsonb not null default '[]'::jsonb,
  order_index integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.projects (
  id text primary key,
  name text not null,
  description text not null,
  tags jsonb not null default '[]'::jsonb,
  image_src text not null,
  image_alt text not null,
  href text not null,
  order_index integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.technologies (
  id text primary key,
  name text not null,
  slug text not null unique,
  description text not null,
  website_url text not null,
  logo_key text not null,
  order_index integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint technologies_website_url_check check (website_url ~ '^https?://')
);

create table if not exists public.project_technologies (
  project_id text not null,
  technology_id text not null,
  created_at timestamptz not null default now(),
  primary key (project_id, technology_id),
  constraint project_technologies_project_id_fkey
    foreign key (project_id)
    references public.projects (id)
    on delete cascade,
  constraint project_technologies_technology_id_fkey
    foreign key (technology_id)
    references public.technologies (id)
    on delete cascade
);

create table if not exists public.social_links (
  id text primary key,
  platform text not null,
  label text not null,
  href text not null,
  order_index integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.blog_posts (
  id text primary key,
  title text not null,
  excerpt text not null,
  date text not null,
  href text not null,
  order_index integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.gallery (
  id text primary key,
  src text not null,
  alt text not null,
  order_index integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.current_focus (
  id text primary key,
  label text not null,
  order_index integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.primary_services (
  id text primary key,
  label text not null,
  order_index integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

create index if not exists expertise_order_idx on public.expertise (order_index);
create index if not exists experience_order_idx on public.experience (order_index);
create index if not exists projects_order_idx on public.projects (order_index);
create index if not exists technologies_order_idx on public.technologies (order_index);
create index if not exists project_technologies_technology_idx on public.project_technologies (technology_id);
create index if not exists project_technologies_project_idx on public.project_technologies (project_id);
create index if not exists social_links_order_idx on public.social_links (order_index);
create index if not exists blog_posts_order_idx on public.blog_posts (order_index);
create index if not exists gallery_order_idx on public.gallery (order_index);
create index if not exists current_focus_order_idx on public.current_focus (order_index);
create index if not exists primary_services_order_idx on public.primary_services (order_index);

create trigger set_hero_updated_at
before update on public.hero
for each row
execute function public.set_updated_at();

create trigger set_expertise_updated_at
before update on public.expertise
for each row
execute function public.set_updated_at();

create trigger set_experience_updated_at
before update on public.experience
for each row
execute function public.set_updated_at();

create trigger set_projects_updated_at
before update on public.projects
for each row
execute function public.set_updated_at();

create trigger set_technologies_updated_at
before update on public.technologies
for each row
execute function public.set_updated_at();

create trigger set_social_links_updated_at
before update on public.social_links
for each row
execute function public.set_updated_at();

create trigger set_blog_posts_updated_at
before update on public.blog_posts
for each row
execute function public.set_updated_at();

create trigger set_gallery_updated_at
before update on public.gallery
for each row
execute function public.set_updated_at();

create trigger set_current_focus_updated_at
before update on public.current_focus
for each row
execute function public.set_updated_at();

create trigger set_primary_services_updated_at
before update on public.primary_services
for each row
execute function public.set_updated_at();
