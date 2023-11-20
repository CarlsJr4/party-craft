--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1 (Ubuntu 15.1-1.pgdg20.04+1)
-- Dumped by pg_dump version 15.4 (Ubuntu 15.4-1.pgdg20.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."audit_log_entries" ("instance_id", "id", "payload", "created_at", "ip_address") VALUES
	('00000000-0000-0000-0000-000000000000', 'aa4b6d4a-4fb6-41da-842e-9351763c21cd', '{"action":"login","actor_id":"6458606a-1783-48fc-a746-32581fa75443","actor_username":"test@test.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-11-20 18:51:35.816614+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ac19b226-5c64-4434-a534-4c4cefe2379e', '{"action":"login","actor_id":"6458606a-1783-48fc-a746-32581fa75443","actor_username":"test@test.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-11-20 18:51:38.215929+00', ''),
	('00000000-0000-0000-0000-000000000000', '05f65582-e246-438c-bc62-49f2803dd757', '{"action":"logout","actor_id":"6458606a-1783-48fc-a746-32581fa75443","actor_username":"test@test.com","actor_via_sso":false,"log_type":"account"}', '2023-11-20 18:51:39.054276+00', ''),
	('00000000-0000-0000-0000-000000000000', '84b593ac-a558-4b6f-8c58-0d0beff9596a', '{"action":"login","actor_id":"6458606a-1783-48fc-a746-32581fa75443","actor_username":"test@test.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-11-20 18:51:40.567321+00', ''),
	('00000000-0000-0000-0000-000000000000', '4722e8dc-0ff7-48e7-ac43-c829a0d736b9', '{"action":"login","actor_id":"6458606a-1783-48fc-a746-32581fa75443","actor_username":"test@test.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-11-20 18:51:46.301107+00', ''),
	('00000000-0000-0000-0000-000000000000', '0c6caf81-57fb-42cf-866f-8a0d7cffc90b', '{"action":"login","actor_id":"6458606a-1783-48fc-a746-32581fa75443","actor_username":"test@test.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-11-20 18:53:10.672979+00', ''),
	('00000000-0000-0000-0000-000000000000', 'aeb6ef42-b463-4e81-8af0-9ddc9905e31d', '{"action":"login","actor_id":"6458606a-1783-48fc-a746-32581fa75443","actor_username":"test@test.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-11-20 18:53:13.114441+00', ''),
	('00000000-0000-0000-0000-000000000000', '56dd1007-8847-47b9-9287-5ce1939f7e88', '{"action":"logout","actor_id":"6458606a-1783-48fc-a746-32581fa75443","actor_username":"test@test.com","actor_via_sso":false,"log_type":"account"}', '2023-11-20 18:53:13.924102+00', ''),
	('00000000-0000-0000-0000-000000000000', '4afe7d6b-1e7a-4a98-846f-187a79e6cfa8', '{"action":"login","actor_id":"6458606a-1783-48fc-a746-32581fa75443","actor_username":"test@test.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-11-20 18:53:15.398905+00', ''),
	('00000000-0000-0000-0000-000000000000', '5a7bbd54-67b4-4948-b60f-e2df2b465c3b', '{"action":"login","actor_id":"6458606a-1783-48fc-a746-32581fa75443","actor_username":"test@test.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-11-20 18:53:20.353169+00', '');


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at") VALUES
	('a3828dbe-3f1a-5227-9c4d-7d8c091e8c33', 'e4c43ee5-e0f7-5fc8-b709-1ce13e073575', '830fb3ae-a3f9-50de-aab8-a37683b15a90', 'Birdie Franecki', 'Eulalia_Lehner49245@ionize-addition.info', '{2jXc0cAxlHZ', '2020-12-20 12:09:14+00', '2020-06-26 17:48:39+00', '2c6a9db8-fdab-552f-ac18-84263ed0a2fc', '2020-03-19 02:05:20+00', 'c953e092-dd82-516e-8956-70adf5080514', '2020-08-04 20:04:09+00', 'bad934a5-fcf2-50f4-a4aa-9a5dbd8a5731', 'Maurice.Renner66258@gruntgamebird.net', '2020-02-22 01:46:27+00', '2020-01-09 12:28:06+00', '{"Ea": "Aut eorum epicia"}', '{"Ad": "Est privat"}', true, '2020-03-07 15:02:42+00', '2020-10-10 09:55:39+00', NULL, '2020-03-23 14:30:35+00', '', '', '2020-07-19 06:58:16+00', '', 0, '2007-12-20 11:47:05+00', '', '2019-12-09 00:04:43+00', false, '2010-03-15 14:57:56+00'),
	('cb6f84dd-754b-52d1-88b2-6b17bd1a8ba8', 'afa1c60d-bef1-5766-af7e-bb67e1b559ba', '07dd411a-524e-5339-8393-997fcdd1cd4a', 'Kailyn Weber', 'Rupert.Buckridge81729@welltodo-desk.com', 'i1k7m^Uu#M^y8', '2020-04-12 15:31:03+00', '2020-09-09 08:32:16+00', '16067869-7932-5c46-97fc-099358ee4bbf', '2020-02-06 01:08:47+00', '40d070b2-d34d-5345-893b-914c785fd447', '2020-04-28 03:39:34+00', '2927ba9b-177d-566a-a5b4-631a23bb1061', 'Diana.Keeling49099@facecrane.info', '2020-09-13 08:24:11+00', '2020-05-01 16:29:25+00', '{"Controverud": "Honesse sapiendorum ore"}', '{"Eo": "Nam inveniri"}', true, '2020-06-02 17:21:34+00', '2020-05-25 05:07:06+00', NULL, '2020-03-19 14:31:19+00', '', '', '2020-12-12 23:20:17+00', '', 0, '2008-01-25 12:48:10+00', '', '2007-08-20 19:20:37+00', false, '2010-11-19 22:14:23+00'),
	('d6934b89-7cf2-5e7f-9123-811dd0551550', '0cb41862-5185-507f-8303-c923e53b5552', '1cb5b2b4-9422-5422-8d85-8a472b8834ed', 'Trycia Ryan', 'Brad.Lebsack96047@recommence-shakedown.info', 'EOfyqq4zh[Aq', '2020-02-10 01:11:32+00', '2020-04-28 03:55:40+00', '4aac1853-c4e6-5c36-8b1f-3ff84d9ab0ca', '2020-08-20 19:11:31+00', '58125d6f-07ef-5d5d-90ab-1cdd2eb4f062', '2020-01-01 00:50:49+00', 'a72b9e2f-9087-5875-80ae-120855707220', 'Jeramie.Sipes66332@evergreen-beanie.org', '2020-07-03 06:57:47+00', '2020-03-11 14:28:44+00', '{"Iis": "Audivi studuisti"}', '{"Novum": "Vel voluptate"}', false, '2020-07-03 18:34:35+00', '2020-07-03 06:56:37+00', NULL, '2020-03-15 14:33:42+00', '', '', '2020-07-23 06:22:28+00', '', 0, '1998-07-23 18:27:28+00', '', '1981-06-02 17:44:45+00', false, '1987-12-24 23:57:53+00'),
	('00000000-0000-0000-0000-000000000000', '6458606a-1783-48fc-a746-32581fa75443', 'authenticated', 'authenticated', 'test@test.com', '$2a$10$wR.kavxputYnbkX7LuNbROfspJZrvtHwc4cmm9Ujl6xPAwgHRD7He', '2023-11-20 18:47:12.219289+00', NULL, '', NULL, '', NULL, '', '', NULL, '2023-11-20 18:53:20.3538+00', '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2023-11-20 18:47:12.214544+00', '2023-11-20 18:53:20.355216+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL);


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."sessions" ("id", "user_id", "created_at", "updated_at", "factor_id", "aal", "not_after", "refreshed_at", "user_agent", "ip") VALUES
	('fe19dd57-d146-4411-8708-4475c1403124', '6458606a-1783-48fc-a746-32581fa75443', '2023-11-20 18:53:15.399688+00', '2023-11-20 18:53:15.399688+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36', '172.20.0.1'),
	('51ca109e-f583-47a0-9485-5c6768173675', '6458606a-1783-48fc-a746-32581fa75443', '2023-11-20 18:53:20.353862+00', '2023-11-20 18:53:20.353862+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36', '172.20.0.1');


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."mfa_amr_claims" ("session_id", "created_at", "updated_at", "authentication_method", "id") VALUES
	('fe19dd57-d146-4411-8708-4475c1403124', '2023-11-20 18:53:15.401612+00', '2023-11-20 18:53:15.401612+00', 'password', '9595f77c-6b7c-4874-9609-49d339a1215c'),
	('51ca109e-f583-47a0-9485-5c6768173675', '2023-11-20 18:53:20.355444+00', '2023-11-20 18:53:20.355444+00', 'password', '25c14f97-dede-42e7-9d40-7ed3963e29bd');


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."refresh_tokens" ("instance_id", "id", "token", "user_id", "revoked", "created_at", "updated_at", "parent", "session_id") VALUES
	('00000000-0000-0000-0000-000000000000', 7, '2n1ROgkC5IRHnkdxBkjskA', '6458606a-1783-48fc-a746-32581fa75443', false, '2023-11-20 18:53:15.40037+00', '2023-11-20 18:53:15.40037+00', NULL, 'fe19dd57-d146-4411-8708-4475c1403124'),
	('00000000-0000-0000-0000-000000000000', 8, 'gJ4xb9MkaUB07aARNKsCLA', '6458606a-1783-48fc-a746-32581fa75443', false, '2023-11-20 18:53:20.354449+00', '2023-11-20 18:53:20.354449+00', NULL, '51ca109e-f583-47a0-9485-5c6768173675');


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: key; Type: TABLE DATA; Schema: pgsodium; Owner: supabase_admin
--



--
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."events" ("title", "body", "date", "id", "owned_by") VALUES
	('Epicia eius quo esse praetulo metus.', 'Negant hoc signiferos esset quod.', '2020-09-25 08:57:14+00', 'c8350ce6-3c40-5840-a87b-7e6c453eff95', '6458606a-1783-48fc-a746-32581fa75443'),
	('Sed inquam nobis ab facere non, praetere molesse praesidin incidancil esset.', 'Sin distinerun de vituptatem vitam legi ut etitavi.', '2020-11-19 10:16:08+00', 'a2f2e9a2-ff5b-587a-bbe6-772147385aeb', '0cb41862-5185-507f-8303-c923e53b5552'),
	('E scripservariis maximum verbi es ponita homindicta.', 'Saluti nulla his eadem serensionib, ant meliustitia tam vitae apertimid.', '2020-10-10 21:13:00+00', 'a4294470-4033-5c2a-bf72-334d8198fb71', 'e4c43ee5-e0f7-5fc8-b709-1ce13e073575'),
	('Motu ea a temporis ad primum corrupti vacilludic.', 'Est omnino uto vellem intellegen.', '2020-07-15 18:12:46+00', 'bc87344b-7cc6-5801-82c1-60ac246b5236', '0cb41862-5185-507f-8303-c923e53b5552'),
	('Epicos qui quid cordia haec libidita igim facienae, feratomnis eo mortempus esset sed antissima.', 'Sentianusque tantam idia docti et, quae adverum te tum velintere et aut.', '2020-12-08 11:56:27+00', 'f497ce18-422d-540b-8fb8-d6253250b6be', '0cb41862-5185-507f-8303-c923e53b5552'),
	('Sentiorest se tum ignorarem idina sum brevi rationem.', 'Fugiendore causam munerga duxiteral dicer in, entur et cupio epicur ut.', '2020-09-01 08:15:28+00', '44c6d75f-b8fd-53b7-90a9-3d726d710415', '6458606a-1783-48fc-a746-32581fa75443'),
	('Meam obcaecile et vire hostis.', 'Tum idone ad init consentientium persecut ad, ete illius es scriberrorem eorum bonorem non.', '2020-11-23 10:14:48+00', 'b97e5e0f-23b3-52ea-9401-6a1735da7c71', '0cb41862-5185-507f-8303-c923e53b5552'),
	('Ari pluribus quam interea omni gravitias temner neces.', 'De unt esset et fruenda quod e complexionem.', '2020-01-25 00:57:16+00', 'b7eea174-8d00-5239-9475-7344963f3b74', '6458606a-1783-48fc-a746-32581fa75443'),
	('Magna currerum consequitat saepti delentum a es siculae, quid quamquam event filium quae spe.', 'Si num solam democritud quem.', '2020-04-08 03:24:20+00', '513b84eb-3c1d-5eb8-baf6-d5535cad00a8', '6458606a-1783-48fc-a746-32581fa75443'),
	('Nihilloqui insolum e explicatque opibere ne antiquit, horumque inquit putan sit quod.', 'Praeterum praetere quae qui fieri omni quantum qui, adiit functio essentenet plato esse.', '2020-06-22 17:43:48+00', '04d372dd-73de-53e1-aaed-f62821b3e00e', '6458606a-1783-48fc-a746-32581fa75443');


--
-- Data for Name: test_tenant; Type: TABLE DATA; Schema: public; Owner: supabase_admin
--



--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: hooks; Type: TABLE DATA; Schema: supabase_functions; Owner: supabase_functions_admin
--



--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 8, true);


--
-- Name: key_key_id_seq; Type: SEQUENCE SET; Schema: pgsodium; Owner: supabase_admin
--

SELECT pg_catalog.setval('"pgsodium"."key_key_id_seq"', 1, false);


--
-- Name: test_tenant_id_seq; Type: SEQUENCE SET; Schema: public; Owner: supabase_admin
--

SELECT pg_catalog.setval('"public"."test_tenant_id_seq"', 1, false);


--
-- Name: hooks_id_seq; Type: SEQUENCE SET; Schema: supabase_functions; Owner: supabase_functions_admin
--

SELECT pg_catalog.setval('"supabase_functions"."hooks_id_seq"', 1, false);


--
-- PostgreSQL database dump complete
--

RESET ALL;
