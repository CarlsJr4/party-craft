alter table "public"."events" add column "owned_by" uuid;

alter table "public"."events" add constraint "events_owned_by_fkey" FOREIGN KEY (owned_by) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."events" validate constraint "events_owned_by_fkey";


