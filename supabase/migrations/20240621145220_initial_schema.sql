create table "article" (
    "id" uuid not null default gen_random_uuid(),
    "slug" text not null,
    "created_at" timestamp with time zone not null default (now() AT TIME ZONE 'utc'::text)
);


alter table "article" enable row level security;

create table "article_comment" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "text" text not null,
    "hidden" boolean,
    "article_id" uuid not null,
    "commented_at" timestamp with time zone not null default (now() AT TIME ZONE 'utc'::text),
    "created_at" timestamp with time zone not null default (now() AT TIME ZONE 'utc'::text)
);


alter table "article_comment" enable row level security;

CREATE UNIQUE INDEX article_comment_pkey ON article_comment USING btree (id);

CREATE UNIQUE INDEX article_pkey ON article USING btree (id);

CREATE UNIQUE INDEX article_slug_key ON article USING btree (slug);

alter table "article" add constraint "article_pkey" PRIMARY KEY using index "article_pkey";

alter table "article_comment" add constraint "article_comment_pkey" PRIMARY KEY using index "article_comment_pkey";

alter table "article" add constraint "article_slug_key" UNIQUE using index "article_slug_key";

alter table "article_comment" add constraint "public_article_comment_article_id_fkey" FOREIGN KEY (article_id) REFERENCES article(id) not valid;

alter table "article_comment" validate constraint "public_article_comment_article_id_fkey";

grant delete on table "article" to "anon";

grant insert on table "article" to "anon";

grant references on table "article" to "anon";

grant select on table "article" to "anon";

grant trigger on table "article" to "anon";

grant truncate on table "article" to "anon";

grant update on table "article" to "anon";

grant delete on table "article" to "authenticated";

grant insert on table "article" to "authenticated";

grant references on table "article" to "authenticated";

grant select on table "article" to "authenticated";

grant trigger on table "article" to "authenticated";

grant truncate on table "article" to "authenticated";

grant update on table "article" to "authenticated";

grant delete on table "article" to "service_role";

grant insert on table "article" to "service_role";

grant references on table "article" to "service_role";

grant select on table "article" to "service_role";

grant trigger on table "article" to "service_role";

grant truncate on table "article" to "service_role";

grant update on table "article" to "service_role";

grant delete on table "article_comment" to "anon";

grant insert on table "article_comment" to "anon";

grant references on table "article_comment" to "anon";

grant select on table "article_comment" to "anon";

grant trigger on table "article_comment" to "anon";

grant truncate on table "article_comment" to "anon";

grant update on table "article_comment" to "anon";

grant delete on table "article_comment" to "authenticated";

grant insert on table "article_comment" to "authenticated";

grant references on table "article_comment" to "authenticated";

grant select on table "article_comment" to "authenticated";

grant trigger on table "article_comment" to "authenticated";

grant truncate on table "article_comment" to "authenticated";

grant update on table "article_comment" to "authenticated";

grant delete on table "article_comment" to "service_role";

grant insert on table "article_comment" to "service_role";

grant references on table "article_comment" to "service_role";

grant select on table "article_comment" to "service_role";

grant trigger on table "article_comment" to "service_role";

grant truncate on table "article_comment" to "service_role";

grant update on table "article_comment" to "service_role";

create policy "Enable read access for all users"
on "article"
as permissive
for select
using (true);


create policy "Enable read access for all users"
on "article_comment"
as permissive
for select
using (true);

