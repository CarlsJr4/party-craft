alter table "public"."events" enable row level security;

create policy "Enable delete for event owners only"
on "public"."events"
as permissive
for delete
to authenticated
using ((auth.uid() = owned_by));


create policy "Enable edit for event owners only"
on "public"."events"
as permissive
for update
to authenticated
using ((auth.uid() = owned_by));


create policy "Enable insert for authenticated users only"
on "public"."events"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."events"
as permissive
for select
to public
using (true);



