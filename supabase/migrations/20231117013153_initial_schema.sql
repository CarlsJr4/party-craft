create sequence "public"."test_tenant_id_seq";

create table "public"."events" (
    "title" text,
    "body" text,
    "date" timestamp with time zone,
    "id" uuid not null
);


create table "public"."test_tenant" (
    "id" integer not null default nextval('test_tenant_id_seq'::regclass),
    "details" text
);


alter sequence "public"."test_tenant_id_seq" owned by "public"."test_tenant"."id";

CREATE UNIQUE INDEX events_id_key ON public.events USING btree (id);

CREATE UNIQUE INDEX events_pkey ON public.events USING btree (id);

CREATE UNIQUE INDEX test_tenant_pkey ON public.test_tenant USING btree (id);

alter table "public"."events" add constraint "events_pkey" PRIMARY KEY using index "events_pkey";

alter table "public"."test_tenant" add constraint "test_tenant_pkey" PRIMARY KEY using index "test_tenant_pkey";

alter table "public"."events" add constraint "events_id_key" UNIQUE using index "events_id_key";


