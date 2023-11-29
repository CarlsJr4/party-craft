create policy "Enable insert for authenticated users only"
on "public"."signups"
as permissive
for insert
to authenticated
with check (true);



