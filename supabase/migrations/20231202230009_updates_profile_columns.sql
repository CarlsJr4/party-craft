alter table "public"."profiles" drop column "role";

alter table "public"."profiles" add column "firstname" text not null default ''::text;

alter table "public"."profiles" add column "lastname" text not null;


