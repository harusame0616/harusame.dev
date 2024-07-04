create policy "Enable insert for authenticated users only" on "public"."article_comment" as permissive for
insert to anon with check (true);