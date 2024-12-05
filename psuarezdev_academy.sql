--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2 (Debian 16.2-1.pgdg120+2)
-- Dumped by pg_dump version 16.2 (Debian 16.2-1.pgdg120+2)

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
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


--
-- Name: Level; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Level" AS ENUM (
    'principiante',
    'intermedio',
    'avanzado'
);


ALTER TYPE public."Level" OWNER TO postgres;

--
-- Name: Role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Role" AS ENUM (
    'user',
    'instructor',
    'admin'
);


ALTER TYPE public."Role" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    id text NOT NULL,
    name text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- Name: certificates; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.certificates (
    id text NOT NULL,
    duration double precision NOT NULL,
    "issuedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "userId" text NOT NULL,
    "courseId" text NOT NULL
);


ALTER TABLE public.certificates OWNER TO postgres;

--
-- Name: comments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comments (
    id text NOT NULL,
    content text NOT NULL,
    "userId" text NOT NULL,
    "lessonId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.comments OWNER TO postgres;

--
-- Name: courses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.courses (
    id text NOT NULL,
    title text NOT NULL,
    image text NOT NULL,
    level public."Level" NOT NULL,
    description text NOT NULL,
    prerequisites text,
    duration double precision DEFAULT 0 NOT NULL,
    average_rating double precision DEFAULT 0 NOT NULL,
    lessons integer DEFAULT 0 NOT NULL,
    is_active boolean DEFAULT false NOT NULL,
    "userId" text NOT NULL,
    "categoryId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.courses OWNER TO postgres;

--
-- Name: favorites; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.favorites (
    id text NOT NULL,
    "userId" text NOT NULL,
    "courseId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.favorites OWNER TO postgres;

--
-- Name: lesson_completions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lesson_completions (
    id text NOT NULL,
    "userId" text NOT NULL,
    "lessonId" text NOT NULL,
    "completedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.lesson_completions OWNER TO postgres;

--
-- Name: lessons; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lessons (
    id text NOT NULL,
    title text NOT NULL,
    duration double precision NOT NULL,
    video text NOT NULL,
    description text NOT NULL,
    unit_id text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.lessons OWNER TO postgres;

--
-- Name: ratings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ratings (
    id text NOT NULL,
    rating numeric NOT NULL,
    comment text,
    user_id text NOT NULL,
    course_id text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.ratings OWNER TO postgres;

--
-- Name: units; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.units (
    id text NOT NULL,
    title text NOT NULL,
    course_id text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.units OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id text NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "subscriptionId" text,
    image text,
    role public."Role" DEFAULT 'user'::public."Role" NOT NULL,
    title text,
    github text,
    website text,
    linkedin text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
6b7b283b-7335-4b35-919f-972848df2ff5	e16ef01588639ad6e20507d1f6f52ea6b9d8b19932eff64fc596d7795d279763	2024-11-19 09:48:05.710345+00	20241119094805_init	\N	\N	2024-11-19 09:48:05.663009+00	1
\.


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categories (id, name, "createdAt") FROM stdin;
cm3p0hkhv000392pnsxqgqy1i	Desarrollo Web	2024-11-19 22:13:51.234
cm44bbd8k0000evqgsvzclb19	Lenguajes de programación	2024-11-30 15:13:30.308
\.


--
-- Data for Name: certificates; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.certificates (id, duration, "issuedAt", "userId", "courseId") FROM stdin;
\.


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.comments (id, content, "userId", "lessonId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: courses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.courses (id, title, image, level, description, prerequisites, duration, average_rating, lessons, is_active, "userId", "categoryId", "createdAt", "updatedAt") FROM stdin;
cm44dgkig0001evo01ztw5oqb	Curso de C++	curso-de-cpp.jpg	principiante	<h2>Descripción del curso: Curso de C++</h2>	\N	1259	0	62	t	cm3p0gf1f000192pnrvpzzqud	cm44bbd8k0000evqgsvzclb19	2024-11-30 16:13:32.248	2024-11-30 16:13:32.248
cm44dkm600001evncosuusk8w	Curso Python desde 0	curso-python-desde-0.jpg	principiante	<h2>Descripción del curso: Curso Python desde 0</h2>	\N	1246	0	82	t	cm3p0gf1f000192pnrvpzzqud	cm44bbd8k0000evqgsvzclb19	2024-11-30 16:16:41.016	2024-11-30 16:16:41.016
cm44dpurx0001evug6imnm4e5	Curso Angular	curso-angular.jpg	intermedio	<h2>Descripción del curso: Curso Angular</h2>	JavaScript, TypeScript	751	0	46	t	cm3p0gf1f000192pnrvpzzqud	cm3p0hkhv000392pnsxqgqy1i	2024-11-30 16:20:45.453	2024-11-30 16:20:45.453
cm44d76f20001evcwlgx3nsb8	Curso de Java desde 0	curso-de-java-desde-0.jpg	principiante	<h2>Descripción del curso: Curso de Java desde 0</h2>	\N	2209	0	100	t	cm3p0gf1f000192pnrvpzzqud	cm44bbd8k0000evqgsvzclb19	2024-11-30 16:06:14.078	2024-11-30 16:06:14.078
cm44dnqsm0001evg43q1tcj84	Curso C#	curso-csharp.jpg	principiante	<h2>Descripción del curso: Curso C#</h2>	\N	1795	0	100	t	cm3p0gf1f000192pnrvpzzqud	cm44bbd8k0000evqgsvzclb19	2024-11-30 16:19:06.983	2024-11-30 16:19:06.983
cm44dtbus0001evcsj57fhlmv	Curso Django	curso-django.jpg	intermedio	<h2>Descripción del curso: Curso Django</h2>	Python	1156	0	70	t	cm3p0gf1f000192pnrvpzzqud	cm3p0hkhv000392pnsxqgqy1i	2024-11-30 16:23:27.557	2024-11-30 16:23:27.557
cm44dztit0001evjw4yliq3rg	Curso Spring	curso-spring.jpg	intermedio	<h2>Descripción del curso: Curso Spring</h2>	Java	1439	0	100	t	cm3p0gf1f000192pnrvpzzqud	cm3p0hkhv000392pnsxqgqy1i	2024-11-30 16:28:30.39	2024-11-30 16:28:30.39
\.


--
-- Data for Name: favorites; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.favorites (id, "userId", "courseId", "createdAt") FROM stdin;
\.


--
-- Data for Name: lesson_completions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lesson_completions (id, "userId", "lessonId", "completedAt") FROM stdin;
\.


--
-- Data for Name: lessons; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lessons (id, title, duration, video, description, unit_id, "createdAt", "updatedAt") FROM stdin;
cm44dgkip0004evo0lg0ix9je	Curso C++. ¿Por qué aprender C++? Vídeo 1 de pildorasinformaticas 94.857 visualizaciones hace 2 años 10 minutos y 5 segundos	10.05	cpp-01.mp4	<h3>Curso C++. ¿Por qué aprender C++? Vídeo 1 de pildorasinformaticas 94.857 visualizaciones hace 2 años 10 minutos y 5 segundos</h3>	cm44dgkip0003evo0vf5ht9qd	2024-11-30 16:13:32.258	2024-11-30 16:13:32.258
cm44d76f60004evcwj31koese	Curso Java. ¿Se pide Java en las ofertas de empleo? ¿Merece la pena estudiar Java en 2022?. Vídeo 0 de pildorasinformaticas 441.851 visualizaciones hace 2 años 10 minutos y 41 segundos	10.41	java-01.mp4	<h3>Curso Java. ¿Se pide Java en las ofertas de empleo? ¿Merece la pena estudiar Java en 2022?. Vídeo 0 de pildorasinformaticas 441.851 visualizaciones hace 2 años 10 minutos y 41 segundos</h3>	cm44d76f60003evcwr0odq7z9	2024-11-30 16:06:14.083	2024-11-30 16:06:14.083
cm44d76f60005evcwjjr9abvm	Curso Java. Presentación. Vídeo 1 de pildorasinformaticas 3.025.578 visualizaciones hace 10 años 16 minutos	16.33	java-02.mp4	<h3>Curso Java. Presentación. Vídeo 1 de pildorasinformaticas 3.025.578 visualizaciones hace 10 años 16 minutos</h3>	cm44d76f60003evcwr0odq7z9	2024-11-30 16:06:14.083	2024-11-30 16:06:14.083
cm44d76f60006evcw2r3pozet	Curso Java. Instalación JRE y Eclipse. Vídeo 2 de pildorasinformaticas 926.301 visualizaciones hace 10 años 10 minutos y 56 segundos	10.56	java-03.mp4	<h3>Curso Java. Instalación JRE y Eclipse. Vídeo 2 de pildorasinformaticas 926.301 visualizaciones hace 10 años 10 minutos y 56 segundos</h3>	cm44d76f60003evcwr0odq7z9	2024-11-30 16:06:14.083	2024-11-30 16:06:14.083
cm44d76f60007evcw3ai36ndc	Curso Java. Instalación Java y Eclipse. ACTUALIZACIÓN 2022. Vídeo 2B de pildorasinformaticas 165.811 visualizaciones hace 2 años 23 minutos	23.49	java-04.mp4	<h3>Curso Java. Instalación Java y Eclipse. ACTUALIZACIÓN 2022. Vídeo 2B de pildorasinformaticas 165.811 visualizaciones hace 2 años 23 minutos</h3>	cm44d76f60003evcwr0odq7z9	2024-11-30 16:06:14.083	2024-11-30 16:06:14.083
cm44d76f60008evcwprans3sl	Curso Java. Introducción. Vídeo 3 de pildorasinformaticas 722.983 visualizaciones hace 10 años 15 minutos	15.02	java-05.mp4	<h3>Curso Java. Introducción. Vídeo 3 de pildorasinformaticas 722.983 visualizaciones hace 10 años 15 minutos</h3>	cm44d76f60003evcwr0odq7z9	2024-11-30 16:06:14.083	2024-11-30 16:06:14.083
cm44d76f60009evcwo7chktx1	Curso Java. Estructuras principales I. Vídeo 4 de pildorasinformaticas 1.032.070 visualizaciones hace 10 años 32 minutos	32.27	java-06.mp4	<h3>Curso Java. Estructuras principales I. Vídeo 4 de pildorasinformaticas 1.032.070 visualizaciones hace 10 años 32 minutos</h3>	cm44d76f60003evcwr0odq7z9	2024-11-30 16:06:14.083	2024-11-30 16:06:14.083
cm44d76f6000aevcwed7a97xo	Curso Java. Estructuras principales II. Vídeo 5 de pildorasinformaticas 686.863 visualizaciones hace 10 años 23 minutos	23.34	java-07.mp4	<h3>Curso Java. Estructuras principales II. Vídeo 5 de pildorasinformaticas 686.863 visualizaciones hace 10 años 23 minutos</h3>	cm44d76f60003evcwr0odq7z9	2024-11-30 16:06:14.083	2024-11-30 16:06:14.083
cm44d76f7000bevcwxfuwrqn3	Curso Java. Estructuras principales III. Declaración variables Eclipse  Vídeo 6 de pildorasinformaticas 601.800 visualizaciones hace 10 años 21 minutos	21.17	java-08.mp4	<h3>Curso Java. Estructuras principales III. Declaración variables Eclipse  Vídeo 6 de pildorasinformaticas 601.800 visualizaciones hace 10 años 21 minutos</h3>	cm44d76f60003evcwr0odq7z9	2024-11-30 16:06:14.083	2024-11-30 16:06:14.083
cm44d76f7000cevcwinbvh7wm	Curso Java. Estructuras principales IV. Constantes y Operadores. Vídeo 7 de pildorasinformaticas 529.961 visualizaciones hace 10 años 22 minutos	22.34	java-09.mp4	<h3>Curso Java. Estructuras principales IV. Constantes y Operadores. Vídeo 7 de pildorasinformaticas 529.961 visualizaciones hace 10 años 22 minutos</h3>	cm44d76f60003evcwr0odq7z9	2024-11-30 16:06:14.083	2024-11-30 16:06:14.083
cm44d76f7000devcw887u69y5	Curso Java. Estructuras principales V. Constantes y Operadores II. Vídeo 8 de pildorasinformaticas 429.230 visualizaciones hace 10 años 13 minutos y 12 segundos	13.12	java-10.mp4	<h3>Curso Java. Estructuras principales V. Constantes y Operadores II. Vídeo 8 de pildorasinformaticas 429.230 visualizaciones hace 10 años 13 minutos y 12 segundos</h3>	cm44d76f60003evcwr0odq7z9	2024-11-30 16:06:14.083	2024-11-30 16:06:14.083
cm44d76f7000eevcwa996ly8v	Curso Java. Estructuras principales VI. Clase Math. Vídeo 9 de pildorasinformaticas 470.966 visualizaciones hace 10 años 22 minutos	22.3	java-11.mp4	<h3>Curso Java. Estructuras principales VI. Clase Math. Vídeo 9 de pildorasinformaticas 470.966 visualizaciones hace 10 años 22 minutos</h3>	cm44d76f60003evcwr0odq7z9	2024-11-30 16:06:14.083	2024-11-30 16:06:14.083
cm44d76f7000fevcwo2b52uiu	Curso Java. Estructuras principales VII. Clase Math II. Vídeo 10 de pildorasinformaticas 395.233 visualizaciones hace 10 años 19 minutos	19.16	java-12.mp4	<h3>Curso Java. Estructuras principales VII. Clase Math II. Vídeo 10 de pildorasinformaticas 395.233 visualizaciones hace 10 años 19 minutos</h3>	cm44d76f60003evcwr0odq7z9	2024-11-30 16:06:14.083	2024-11-30 16:06:14.083
cm44d76f7000gevcw295p99sj	Curso Java. Manipulación de cadenas. Clase String I. Vídeo 11 de pildorasinformaticas 544.246 visualizaciones hace 10 años 23 minutos	23.4	java-13.mp4	<h3>Curso Java. Manipulación de cadenas. Clase String I. Vídeo 11 de pildorasinformaticas 544.246 visualizaciones hace 10 años 23 minutos</h3>	cm44d76f60003evcwr0odq7z9	2024-11-30 16:06:14.083	2024-11-30 16:06:14.083
cm44d76f7000hevcwjlmc3m5g	Curso Java. Manipulación de cadenas. Clase String II. Vídeo 12 de pildorasinformaticas 375.655 visualizaciones hace 10 años 19 minutos	19.15	java-14.mp4	<h3>Curso Java. Manipulación de cadenas. Clase String II. Vídeo 12 de pildorasinformaticas 375.655 visualizaciones hace 10 años 19 minutos</h3>	cm44d76f60003evcwr0odq7z9	2024-11-30 16:06:14.083	2024-11-30 16:06:14.083
cm44d76f7000ievcww0ozhvv3	Curso Java. Acercamiento a la API  Paquetes. Vídeo 13 de pildorasinformaticas 355.394 visualizaciones hace 10 años 23 minutos	23.44	java-15.mp4	<h3>Curso Java. Acercamiento a la API  Paquetes. Vídeo 13 de pildorasinformaticas 355.394 visualizaciones hace 10 años 23 minutos</h3>	cm44d76f60003evcwr0odq7z9	2024-11-30 16:06:14.083	2024-11-30 16:06:14.083
cm44d76f7000jevcw63azt08t	Curso Java. Entrada Salida datos I. Vídeo 14 de pildorasinformaticas 418.116 visualizaciones hace 10 años 24 minutos	24.47	java-16.mp4	<h3>Curso Java. Entrada Salida datos I. Vídeo 14 de pildorasinformaticas 418.116 visualizaciones hace 10 años 24 minutos</h3>	cm44d76f60003evcwr0odq7z9	2024-11-30 16:06:14.083	2024-11-30 16:06:14.083
cm44d76f7000kevcwcqpyqnii	Curso Java. Entrada Salida datos II. Vídeo 15 de pildorasinformaticas 353.157 visualizaciones hace 10 años 23 minutos	23.24	java-17.mp4	<h3>Curso Java. Entrada Salida datos II. Vídeo 15 de pildorasinformaticas 353.157 visualizaciones hace 10 años 23 minutos</h3>	cm44d76f60003evcwr0odq7z9	2024-11-30 16:06:14.083	2024-11-30 16:06:14.083
cm44d76f7000levcwndweldpg	Curso Java. Condicionales I. Vídeo 16 de pildorasinformaticas 344.087 visualizaciones hace 10 años 24 minutos	24.16	java-18.mp4	<h3>Curso Java. Condicionales I. Vídeo 16 de pildorasinformaticas 344.087 visualizaciones hace 10 años 24 minutos</h3>	cm44d76f60003evcwr0odq7z9	2024-11-30 16:06:14.083	2024-11-30 16:06:14.083
cm44d76f7000mevcwyddny3yh	Curso Java. Condicionales II. Vídeo 17 de pildorasinformaticas 310.501 visualizaciones hace 10 años 26 minutos	26.5	java-19.mp4	<h3>Curso Java. Condicionales II. Vídeo 17 de pildorasinformaticas 310.501 visualizaciones hace 10 años 26 minutos</h3>	cm44d76f60003evcwr0odq7z9	2024-11-30 16:06:14.083	2024-11-30 16:06:14.083
cm44d76f7000nevcwfnmj4yd4	Curso Java  Bucles I  Vídeo 18 de pildorasinformaticas 327.901 visualizaciones hace 10 años 19 minutos	19.01	java-20.mp4	<h3>Curso Java  Bucles I  Vídeo 18 de pildorasinformaticas 327.901 visualizaciones hace 10 años 19 minutos</h3>	cm44d76f60003evcwr0odq7z9	2024-11-30 16:06:14.083	2024-11-30 16:06:14.083
cm44d76fe000qevcwgk8k3ysl	Curso Java. Bucles II. Vídeo 19 de pildorasinformaticas 271.344 visualizaciones hace 10 años 18 minutos	18.17	java-21.mp4	<h3>Curso Java. Bucles II. Vídeo 19 de pildorasinformaticas 271.344 visualizaciones hace 10 años 18 minutos</h3>	cm44d76fe000pevcwkh22fuxo	2024-11-30 16:06:14.09	2024-11-30 16:06:14.09
cm44d76fe000revcw0w0dtw0j	Curso Java  Bucles III. Vídeo 20 de pildorasinformaticas 268.061 visualizaciones hace 10 años 20 minutos	20.28	java-22.mp4	<h3>Curso Java  Bucles III. Vídeo 20 de pildorasinformaticas 268.061 visualizaciones hace 10 años 20 minutos</h3>	cm44d76fe000pevcwkh22fuxo	2024-11-30 16:06:14.09	2024-11-30 16:06:14.09
cm44d76fe000sevcws831wjmn	Curso Java  Bucles IV. Vídeo 21 de pildorasinformaticas 253.308 visualizaciones hace 10 años 24 minutos	24.55	java-23.mp4	<h3>Curso Java  Bucles IV. Vídeo 21 de pildorasinformaticas 253.308 visualizaciones hace 10 años 24 minutos</h3>	cm44d76fe000pevcwkh22fuxo	2024-11-30 16:06:14.09	2024-11-30 16:06:14.09
cm44d76fe000tevcwsjmtqfo8	Curso Java  Bucles V. Vídeo 22 de pildorasinformaticas 220.815 visualizaciones hace 10 años 20 minutos	20.01	java-24.mp4	<h3>Curso Java  Bucles V. Vídeo 22 de pildorasinformaticas 220.815 visualizaciones hace 10 años 20 minutos</h3>	cm44d76fe000pevcwkh22fuxo	2024-11-30 16:06:14.09	2024-11-30 16:06:14.09
cm44d76fe000uevcwveakmknq	Curso Java  Arrays I. Vídeo 23 de pildorasinformaticas 391.784 visualizaciones hace 10 años 24 minutos	24.19	java-25.mp4	<h3>Curso Java  Arrays I. Vídeo 23 de pildorasinformaticas 391.784 visualizaciones hace 10 años 24 minutos</h3>	cm44d76fe000pevcwkh22fuxo	2024-11-30 16:06:14.09	2024-11-30 16:06:14.09
cm44d76fe000vevcwb38co3xu	Curso Java  Arrays II. Vídeo 24 de pildorasinformaticas 296.708 visualizaciones hace 10 años 17 minutos	17.5	java-26.mp4	<h3>Curso Java  Arrays II. Vídeo 24 de pildorasinformaticas 296.708 visualizaciones hace 10 años 17 minutos</h3>	cm44d76fe000pevcwkh22fuxo	2024-11-30 16:06:14.09	2024-11-30 16:06:14.09
cm44d76fe000wevcwp89linlw	Curso Java  Arrays III. Arrays bidimensionales. Vídeo 25 de pildorasinformaticas 310.880 visualizaciones hace 10 años 25 minutos	25.17	java-27.mp4	<h3>Curso Java  Arrays III. Arrays bidimensionales. Vídeo 25 de pildorasinformaticas 310.880 visualizaciones hace 10 años 25 minutos</h3>	cm44d76fe000pevcwkh22fuxo	2024-11-30 16:06:14.09	2024-11-30 16:06:14.09
cm44d76fe000xevcwjlzblgxr	Curso Java  Arrays IV. Arrays bidimensionales II. Vídeo 26 de pildorasinformaticas 242.021 visualizaciones hace 10 años 22 minutos	22.08	java-28.mp4	<h3>Curso Java  Arrays IV. Arrays bidimensionales II. Vídeo 26 de pildorasinformaticas 242.021 visualizaciones hace 10 años 22 minutos</h3>	cm44d76fe000pevcwkh22fuxo	2024-11-30 16:06:14.09	2024-11-30 16:06:14.09
cm44d76fe000yevcwz6wd8xra	Curso Java. POO I. Vídeo 27 de pildorasinformaticas 389.825 visualizaciones hace 10 años 20 minutos	20.35	java-29.mp4	<h3>Curso Java. POO I. Vídeo 27 de pildorasinformaticas 389.825 visualizaciones hace 10 años 20 minutos</h3>	cm44d76fe000pevcwkh22fuxo	2024-11-30 16:06:14.09	2024-11-30 16:06:14.09
cm44d76fe000zevcwbvg7yrw4	Curso Java. POO II. Vídeo 28 de pildorasinformaticas 376.823 visualizaciones hace 10 años 28 minutos	28.38	java-30.mp4	<h3>Curso Java. POO II. Vídeo 28 de pildorasinformaticas 376.823 visualizaciones hace 10 años 28 minutos</h3>	cm44d76fe000pevcwkh22fuxo	2024-11-30 16:06:14.09	2024-11-30 16:06:14.09
cm44d76fe0010evcwwxlzib1g	Curso Java. POO III. Vídeo 29 de pildorasinformaticas 322.217 visualizaciones hace 10 años 22 minutos	22.43	java-31.mp4	<h3>Curso Java. POO III. Vídeo 29 de pildorasinformaticas 322.217 visualizaciones hace 10 años 22 minutos</h3>	cm44d76fe000pevcwkh22fuxo	2024-11-30 16:06:14.09	2024-11-30 16:06:14.09
cm44d76fe0011evcwqocn7p8d	Curso Java. POO IV  Getters y Setters. Vídeo 30 de pildorasinformaticas 360.437 visualizaciones hace 10 años 26 minutos	26.47	java-32.mp4	<h3>Curso Java. POO IV  Getters y Setters. Vídeo 30 de pildorasinformaticas 360.437 visualizaciones hace 10 años 26 minutos</h3>	cm44d76fe000pevcwkh22fuxo	2024-11-30 16:06:14.09	2024-11-30 16:06:14.09
cm44d76fe0012evcwts2drk4g	Curso Java  POO V. Paso de parámetros. Vídeo 31 de pildorasinformaticas 321.174 visualizaciones hace 10 años 28 minutos	28.56	java-33.mp4	<h3>Curso Java  POO V. Paso de parámetros. Vídeo 31 de pildorasinformaticas 321.174 visualizaciones hace 10 años 28 minutos</h3>	cm44d76fe000pevcwkh22fuxo	2024-11-30 16:06:14.09	2024-11-30 16:06:14.09
cm44d76fe0013evcwzr2i1g1y	Curso Java  POO VI. Construcción objetos. Vídeo 32 de pildorasinformaticas 279.668 visualizaciones hace 10 años 26 minutos	26	java-34.mp4	<h3>Curso Java  POO VI. Construcción objetos. Vídeo 32 de pildorasinformaticas 279.668 visualizaciones hace 10 años 26 minutos</h3>	cm44d76fe000pevcwkh22fuxo	2024-11-30 16:06:14.09	2024-11-30 16:06:14.09
cm44d76fe0014evcw27820yps	Curso Java  POO VII. Construcción objetos II. Vídeo 33 de pildorasinformaticas 230.872 visualizaciones hace 10 años 21 minutos	21.44	java-35.mp4	<h3>Curso Java  POO VII. Construcción objetos II. Vídeo 33 de pildorasinformaticas 230.872 visualizaciones hace 10 años 21 minutos</h3>	cm44d76fe000pevcwkh22fuxo	2024-11-30 16:06:14.09	2024-11-30 16:06:14.09
cm44d76fe0015evcwa77qyreg	Curso Java  POO VIII. Construcción objetos III. Vídeo 34 de pildorasinformaticas 211.262 visualizaciones hace 10 años 21 minutos	21.06	java-36.mp4	<h3>Curso Java  POO VIII. Construcción objetos III. Vídeo 34 de pildorasinformaticas 211.262 visualizaciones hace 10 años 21 minutos</h3>	cm44d76fe000pevcwkh22fuxo	2024-11-30 16:06:14.09	2024-11-30 16:06:14.09
cm44d76fe0016evcwg2isyxn3	Curso Java  POO IX. Construcción objetos IV. Vídeo 35 de pildorasinformaticas 216.065 visualizaciones hace 10 años 24 minutos	24.59	java-37.mp4	<h3>Curso Java  POO IX. Construcción objetos IV. Vídeo 35 de pildorasinformaticas 216.065 visualizaciones hace 10 años 24 minutos</h3>	cm44d76fe000pevcwkh22fuxo	2024-11-30 16:06:14.09	2024-11-30 16:06:14.09
cm44d76fe0017evcwvchia9ye	Curso Java. Constantes  Uso final. Vídeo 36 de pildorasinformaticas 197.064 visualizaciones hace 10 años 20 minutos	20.08	java-38.mp4	<h3>Curso Java. Constantes  Uso final. Vídeo 36 de pildorasinformaticas 197.064 visualizaciones hace 10 años 20 minutos</h3>	cm44d76fe000pevcwkh22fuxo	2024-11-30 16:06:14.09	2024-11-30 16:06:14.09
cm44d76fe0018evcwc4n2419x	Curso Java . Uso static. Vídeo 37 de pildorasinformaticas 224.963 visualizaciones hace 10 años 22 minutos	22.49	java-39.mp4	<h3>Curso Java . Uso static. Vídeo 37 de pildorasinformaticas 224.963 visualizaciones hace 10 años 22 minutos</h3>	cm44d76fe000pevcwkh22fuxo	2024-11-30 16:06:14.09	2024-11-30 16:06:14.09
cm44d76fe0019evcwo34qyqst	Curso Java. Métodos static. Vídeo 38 de pildorasinformaticas 197.303 visualizaciones hace 10 años 17 minutos	17.03	java-40.mp4	<h3>Curso Java. Métodos static. Vídeo 38 de pildorasinformaticas 197.303 visualizaciones hace 10 años 17 minutos</h3>	cm44d76fe000pevcwkh22fuxo	2024-11-30 16:06:14.09	2024-11-30 16:06:14.09
cm44d76fi001cevcwq262qchg	Curso Java. Sobrecarga de constructores. Vídeo 39 de pildorasinformaticas 177.541 visualizaciones hace 10 años 19 minutos	19.32	java-41.mp4	<h3>Curso Java. Sobrecarga de constructores. Vídeo 39 de pildorasinformaticas 177.541 visualizaciones hace 10 años 19 minutos</h3>	cm44d76fi001bevcwqngryrso	2024-11-30 16:06:14.094	2024-11-30 16:06:14.094
cm44d76fi001devcwoz2se01i	Curso Java. Herencia I. Vídeo 40 de pildorasinformaticas 251.379 visualizaciones hace 10 años 23 minutos	23.16	java-42.mp4	<h3>Curso Java. Herencia I. Vídeo 40 de pildorasinformaticas 251.379 visualizaciones hace 10 años 23 minutos</h3>	cm44d76fi001bevcwqngryrso	2024-11-30 16:06:14.094	2024-11-30 16:06:14.094
cm44d76fi001eevcwz5grn2b7	Curso Java. Herencia II. Vídeo 41 de pildorasinformaticas 189.861 visualizaciones hace 10 años 21 minutos	21.09	java-43.mp4	<h3>Curso Java. Herencia II. Vídeo 41 de pildorasinformaticas 189.861 visualizaciones hace 10 años 21 minutos</h3>	cm44d76fi001bevcwqngryrso	2024-11-30 16:06:14.094	2024-11-30 16:06:14.094
cm44d76fi001fevcwq90e6wmd	Curso Java. Herencia III. Diseñando la herencia. Vídeo 42 de pildorasinformaticas 187.777 visualizaciones hace 10 años 22 minutos	22.33	java-44.mp4	<h3>Curso Java. Herencia III. Diseñando la herencia. Vídeo 42 de pildorasinformaticas 187.777 visualizaciones hace 10 años 22 minutos</h3>	cm44d76fi001bevcwqngryrso	2024-11-30 16:06:14.094	2024-11-30 16:06:14.094
cm44d76fi001gevcwagic0wsq	Curso Java. Polimorfismo y enlazado dinámico. Vídeo 43 de pildorasinformaticas 224.969 visualizaciones hace 10 años 24 minutos	24.4	java-45.mp4	<h3>Curso Java. Polimorfismo y enlazado dinámico. Vídeo 43 de pildorasinformaticas 224.969 visualizaciones hace 10 años 24 minutos</h3>	cm44d76fi001bevcwqngryrso	2024-11-30 16:06:14.094	2024-11-30 16:06:14.094
cm44d76fi001hevcwnlzpvtwk	Curso Java. Casting de objetos. Clases y métodos final. Vídeo 44 de pildorasinformaticas 178.385 visualizaciones hace 10 años 23 minutos	23.2	java-46.mp4	<h3>Curso Java. Casting de objetos. Clases y métodos final. Vídeo 44 de pildorasinformaticas 178.385 visualizaciones hace 10 años 23 minutos</h3>	cm44d76fi001bevcwqngryrso	2024-11-30 16:06:14.094	2024-11-30 16:06:14.094
cm44d76fi001ievcwxpux58np	Curso Java. Clases Abstractas I. Vídeo 45 de pildorasinformaticas 199.541 visualizaciones hace 10 años 16 minutos	16.26	java-47.mp4	<h3>Curso Java. Clases Abstractas I. Vídeo 45 de pildorasinformaticas 199.541 visualizaciones hace 10 años 16 minutos</h3>	cm44d76fi001bevcwqngryrso	2024-11-30 16:06:14.094	2024-11-30 16:06:14.094
cm44d76fi001jevcwz7akf714	Curso Java. Clases Abstractas II. Vídeo 46 de pildorasinformaticas 168.093 visualizaciones hace 10 años 25 minutos	25.19	java-48.mp4	<h3>Curso Java. Clases Abstractas II. Vídeo 46 de pildorasinformaticas 168.093 visualizaciones hace 10 años 25 minutos</h3>	cm44d76fi001bevcwqngryrso	2024-11-30 16:06:14.094	2024-11-30 16:06:14.094
cm44d76fi001kevcw7a9828q2	Curso Java. Modificadores de acceso. Clase Object. Vídeo 47 de pildorasinformaticas 138.168 visualizaciones hace 10 años 23 minutos	23.12	java-49.mp4	<h3>Curso Java. Modificadores de acceso. Clase Object. Vídeo 47 de pildorasinformaticas 138.168 visualizaciones hace 10 años 23 minutos</h3>	cm44d76fi001bevcwqngryrso	2024-11-30 16:06:14.094	2024-11-30 16:06:14.094
cm44d76fi001levcw9gsccl87	Curso Java. Tipos enumerados. Vídeo 48 de pildorasinformaticas 163.530 visualizaciones hace 10 años 21 minutos	21.35	java-50.mp4	<h3>Curso Java. Tipos enumerados. Vídeo 48 de pildorasinformaticas 163.530 visualizaciones hace 10 años 21 minutos</h3>	cm44d76fi001bevcwqngryrso	2024-11-30 16:06:14.094	2024-11-30 16:06:14.094
cm44d76fi001mevcwdgwzyua7	Curso Java. Interfaces y clases internas. Interfaces I. Vídeo 49 de pildorasinformaticas 275.056 visualizaciones hace 10 años 28 minutos	28.24	java-51.mp4	<h3>Curso Java. Interfaces y clases internas. Interfaces I. Vídeo 49 de pildorasinformaticas 275.056 visualizaciones hace 10 años 28 minutos</h3>	cm44d76fi001bevcwqngryrso	2024-11-30 16:06:14.094	2024-11-30 16:06:14.094
cm44d76fi001nevcwuq8gd1rd	Curso Java. Interfaces y clases internas  Interfaces II. Vídeo 50 de pildorasinformaticas 151.009 visualizaciones hace 10 años 19 minutos	19.54	java-52.mp4	<h3>Curso Java. Interfaces y clases internas  Interfaces II. Vídeo 50 de pildorasinformaticas 151.009 visualizaciones hace 10 años 19 minutos</h3>	cm44d76fi001bevcwqngryrso	2024-11-30 16:06:14.094	2024-11-30 16:06:14.094
cm44d76fi001oevcwmlh22f8f	Curso Java. Interfaces y clases internas  Interfaces III. Vídeo 51 de pildorasinformaticas 115.519 visualizaciones hace 10 años 21 minutos	21.35	java-53.mp4	<h3>Curso Java. Interfaces y clases internas  Interfaces III. Vídeo 51 de pildorasinformaticas 115.519 visualizaciones hace 10 años 21 minutos</h3>	cm44d76fi001bevcwqngryrso	2024-11-30 16:06:14.094	2024-11-30 16:06:14.094
cm44d76fi001pevcwg6u11uk7	Curso Java. Interfaces y clases internas  Interfaces IV. Vídeo 52 de pildorasinformaticas 110.568 visualizaciones hace 10 años 29 minutos	29.31	java-54.mp4	<h3>Curso Java. Interfaces y clases internas  Interfaces IV. Vídeo 52 de pildorasinformaticas 110.568 visualizaciones hace 10 años 29 minutos</h3>	cm44d76fi001bevcwqngryrso	2024-11-30 16:06:14.094	2024-11-30 16:06:14.094
cm44d76fi001qevcwygfvxnt2	Curso Java. Interfaces y clases internas. Clases internas I. Vídeo 53 de pildorasinformaticas 110.207 visualizaciones hace 10 años 25 minutos	25.16	java-55.mp4	<h3>Curso Java. Interfaces y clases internas. Clases internas I. Vídeo 53 de pildorasinformaticas 110.207 visualizaciones hace 10 años 25 minutos</h3>	cm44d76fi001bevcwqngryrso	2024-11-30 16:06:14.094	2024-11-30 16:06:14.094
cm44d76fi001revcwi3vlommo	Curso Java. Interfaces y clases internas. Clases internas II. Vídeo 54 de pildorasinformaticas 80.903 visualizaciones hace 10 años 12 minutos y 46 segundos	12.46	java-56.mp4	<h3>Curso Java. Interfaces y clases internas. Clases internas II. Vídeo 54 de pildorasinformaticas 80.903 visualizaciones hace 10 años 12 minutos y 46 segundos</h3>	cm44d76fi001bevcwqngryrso	2024-11-30 16:06:14.094	2024-11-30 16:06:14.094
cm44d76fi001sevcw3dlsv2ec	Curso Java. Aplicaciones gráficas  Swing I. Vídeo 55 de pildorasinformaticas 262.302 visualizaciones hace 10 años 26 minutos	26.15	java-57.mp4	<h3>Curso Java. Aplicaciones gráficas  Swing I. Vídeo 55 de pildorasinformaticas 262.302 visualizaciones hace 10 años 26 minutos</h3>	cm44d76fi001bevcwqngryrso	2024-11-30 16:06:14.094	2024-11-30 16:06:14.094
cm44d76fi001tevcwc1elyewf	Curso Java. Aplicaciones gráficas. Swing II. Colocando el Frame. Vídeo 56 de pildorasinformaticas 157.183 visualizaciones hace 10 años 17 minutos	17.38	java-58.mp4	<h3>Curso Java. Aplicaciones gráficas. Swing II. Colocando el Frame. Vídeo 56 de pildorasinformaticas 157.183 visualizaciones hace 10 años 17 minutos</h3>	cm44d76fi001bevcwqngryrso	2024-11-30 16:06:14.094	2024-11-30 16:06:14.094
cm44d76fi001uevcwbe57nrvk	Curso Java. Aplicaciones gráficas. Swing III. Colocando el Frame II. Vídeo 57 de pildorasinformaticas 143.423 visualizaciones hace 10 años 20 minutos	20.04	java-59.mp4	<h3>Curso Java. Aplicaciones gráficas. Swing III. Colocando el Frame II. Vídeo 57 de pildorasinformaticas 143.423 visualizaciones hace 10 años 20 minutos</h3>	cm44d76fi001bevcwqngryrso	2024-11-30 16:06:14.094	2024-11-30 16:06:14.094
cm44d76fi001vevcw29zi08dq	Curso Java. Aplicaciones gráficas  Swing IV. Escribiendo en el Frame. Vídeo 58 de pildorasinformaticas 138.779 visualizaciones hace 10 años 24 minutos	24.5	java-60.mp4	<h3>Curso Java. Aplicaciones gráficas  Swing IV. Escribiendo en el Frame. Vídeo 58 de pildorasinformaticas 138.779 visualizaciones hace 10 años 24 minutos</h3>	cm44d76fi001bevcwqngryrso	2024-11-30 16:06:14.094	2024-11-30 16:06:14.094
cm44d76fm001yevcwr6nqdbdo	Curso Java  Aplicaciones gráficas. Swing V. Dibujando en el Frame. Vídeo 59 de pildorasinformaticas 147.246 visualizaciones hace 10 años 17 minutos	17.55	java-61.mp4	<h3>Curso Java  Aplicaciones gráficas. Swing V. Dibujando en el Frame. Vídeo 59 de pildorasinformaticas 147.246 visualizaciones hace 10 años 17 minutos</h3>	cm44d76fm001xevcw527b4nd1	2024-11-30 16:06:14.098	2024-11-30 16:06:14.098
cm44d76fm001zevcwyzfy9adl	Curso Java  Aplicaciones gráficas. Swing VI  Dibujando en el Frame II. Vídeo 60 de pildorasinformaticas 115.725 visualizaciones hace 10 años 23 minutos	23.32	java-62.mp4	<h3>Curso Java  Aplicaciones gráficas. Swing VI  Dibujando en el Frame II. Vídeo 60 de pildorasinformaticas 115.725 visualizaciones hace 10 años 23 minutos</h3>	cm44d76fm001xevcw527b4nd1	2024-11-30 16:06:14.098	2024-11-30 16:06:14.098
cm44d76fm0020evcw6kmu2c27	Curso Java  Aplicaciones gráficas. Swing VII. Manejando colores. Vídeo 61 de pildorasinformaticas 100.207 visualizaciones hace 10 años 25 minutos	25.58	java-63.mp4	<h3>Curso Java  Aplicaciones gráficas. Swing VII. Manejando colores. Vídeo 61 de pildorasinformaticas 100.207 visualizaciones hace 10 años 25 minutos</h3>	cm44d76fm001xevcw527b4nd1	2024-11-30 16:06:14.098	2024-11-30 16:06:14.098
cm44d76fm0021evcww9yfnsqe	Curso Java. Aplicaciones gráficas. Swing VIII. Cambiando la letra en el Frame. Vídeo 62 de pildorasinformaticas 85.568 visualizaciones hace 10 años 21 minutos	21.32	java-64.mp4	<h3>Curso Java. Aplicaciones gráficas. Swing VIII. Cambiando la letra en el Frame. Vídeo 62 de pildorasinformaticas 85.568 visualizaciones hace 10 años 21 minutos</h3>	cm44d76fm001xevcw527b4nd1	2024-11-30 16:06:14.098	2024-11-30 16:06:14.098
cm44d76fm0022evcwpj4iha99	Curso Java  Aplicaciones gráficas. Swing IX  Incluyendo imágenes. Vídeo 63 de pildorasinformaticas 99.631 visualizaciones hace 10 años 27 minutos	27.54	java-65.mp4	<h3>Curso Java  Aplicaciones gráficas. Swing IX  Incluyendo imágenes. Vídeo 63 de pildorasinformaticas 99.631 visualizaciones hace 10 años 27 minutos</h3>	cm44d76fm001xevcw527b4nd1	2024-11-30 16:06:14.098	2024-11-30 16:06:14.098
cm44d76fm0023evcwnvpwqwb1	Curso Java  Aplicaciones gráficas. Swing X  Incluyendo imágenes II. Vídeo 64 de pildorasinformaticas 79.980 visualizaciones hace 10 años 22 minutos	22.22	java-66.mp4	<h3>Curso Java  Aplicaciones gráficas. Swing X  Incluyendo imágenes II. Vídeo 64 de pildorasinformaticas 79.980 visualizaciones hace 10 años 22 minutos</h3>	cm44d76fm001xevcw527b4nd1	2024-11-30 16:06:14.098	2024-11-30 16:06:14.098
cm44d76fm0024evcwcj2tjqt4	Curso Java. Eventos I. Vídeo 65 de pildorasinformaticas 139.816 visualizaciones hace 10 años 21 minutos	21.43	java-67.mp4	<h3>Curso Java. Eventos I. Vídeo 65 de pildorasinformaticas 139.816 visualizaciones hace 10 años 21 minutos</h3>	cm44d76fm001xevcw527b4nd1	2024-11-30 16:06:14.098	2024-11-30 16:06:14.098
cm44d76fm0025evcw866xvuo2	Curso Java. Eventos II. Vídeo 66 de pildorasinformaticas 106.661 visualizaciones hace 10 años 18 minutos	18.24	java-68.mp4	<h3>Curso Java. Eventos II. Vídeo 66 de pildorasinformaticas 106.661 visualizaciones hace 10 años 18 minutos</h3>	cm44d76fm001xevcw527b4nd1	2024-11-30 16:06:14.098	2024-11-30 16:06:14.098
cm44d76fm0026evcwlvnx2lem	Curso Java. Eventos III. Vídeo 67 de pildorasinformaticas 80.971 visualizaciones hace 10 años 13 minutos y 38 segundos	13.38	java-69.mp4	<h3>Curso Java. Eventos III. Vídeo 67 de pildorasinformaticas 80.971 visualizaciones hace 10 años 13 minutos y 38 segundos</h3>	cm44d76fm001xevcw527b4nd1	2024-11-30 16:06:14.098	2024-11-30 16:06:14.098
cm44d76fm0027evcwvs6haazv	Curso Java  Eventos IV. Eventos de ventana I. Vídeo 68 de pildorasinformaticas 87.471 visualizaciones hace 10 años 24 minutos	24.36	java-70.mp4	<h3>Curso Java  Eventos IV. Eventos de ventana I. Vídeo 68 de pildorasinformaticas 87.471 visualizaciones hace 10 años 24 minutos</h3>	cm44d76fm001xevcw527b4nd1	2024-11-30 16:06:14.098	2024-11-30 16:06:14.098
cm44d76fm0028evcw5s4ouxfk	Curso Java  Eventos V. Eventos de ventana II. Clases adaptadoras. Vídeo 69 de pildorasinformaticas 63.933 visualizaciones hace 10 años 13 minutos y 10 segundos	13.1	java-71.mp4	<h3>Curso Java  Eventos V. Eventos de ventana II. Clases adaptadoras. Vídeo 69 de pildorasinformaticas 63.933 visualizaciones hace 10 años 13 minutos y 10 segundos</h3>	cm44d76fm001xevcw527b4nd1	2024-11-30 16:06:14.098	2024-11-30 16:06:14.098
cm44d76fm0029evcwsqipk2uo	Curso Java  Eventos VI  Eventos de ventana III. Controlando estado ventana. Vídeo 70 de pildorasinformaticas 64.891 visualizaciones hace 10 años 24 minutos	24.02	java-72.mp4	<h3>Curso Java  Eventos VI  Eventos de ventana III. Controlando estado ventana. Vídeo 70 de pildorasinformaticas 64.891 visualizaciones hace 10 años 24 minutos</h3>	cm44d76fm001xevcw527b4nd1	2024-11-30 16:06:14.098	2024-11-30 16:06:14.098
cm44d76fm002aevcw9uu0xk3a	Curso Java  Eventos VII. Eventos de teclado I. Vídeo 71 de pildorasinformaticas 91.048 visualizaciones hace 10 años 27 minutos	27.08	java-73.mp4	<h3>Curso Java  Eventos VII. Eventos de teclado I. Vídeo 71 de pildorasinformaticas 91.048 visualizaciones hace 10 años 27 minutos</h3>	cm44d76fm001xevcw527b4nd1	2024-11-30 16:06:14.098	2024-11-30 16:06:14.098
cm44d76fm002bevcwbquct32j	Curso Java  Eventos VIII. Eventos de ratón I. Vídeo 72 de pildorasinformaticas 75.890 visualizaciones hace 10 años 19 minutos	19.24	java-74.mp4	<h3>Curso Java  Eventos VIII. Eventos de ratón I. Vídeo 72 de pildorasinformaticas 75.890 visualizaciones hace 10 años 19 minutos</h3>	cm44d76fm001xevcw527b4nd1	2024-11-30 16:06:14.098	2024-11-30 16:06:14.098
cm44d76fm002cevcwpym92m1z	Curso Java  Eventos IX. Eventos de ratón II. Vídeo 73 de pildorasinformaticas 54.562 visualizaciones hace 10 años 21 minutos	21.06	java-75.mp4	<h3>Curso Java  Eventos IX. Eventos de ratón II. Vídeo 73 de pildorasinformaticas 54.562 visualizaciones hace 10 años 21 minutos</h3>	cm44d76fm001xevcw527b4nd1	2024-11-30 16:06:14.098	2024-11-30 16:06:14.098
cm44d76fm002devcw3w74ifsj	Curso Java  Eventos X. Eventos de foco. Vídeo 74 de pildorasinformaticas 69.418 visualizaciones hace 10 años 24 minutos	24.17	java-76.mp4	<h3>Curso Java  Eventos X. Eventos de foco. Vídeo 74 de pildorasinformaticas 69.418 visualizaciones hace 10 años 24 minutos</h3>	cm44d76fm001xevcw527b4nd1	2024-11-30 16:06:14.098	2024-11-30 16:06:14.098
cm44d76fm002eevcwdhon35ob	Curso Java  Eventos XI. Eventos de foco II. Vídeo 75 de pildorasinformaticas 52.462 visualizaciones hace 10 años 22 minutos	22.02	java-77.mp4	<h3>Curso Java  Eventos XI. Eventos de foco II. Vídeo 75 de pildorasinformaticas 52.462 visualizaciones hace 10 años 22 minutos</h3>	cm44d76fm001xevcw527b4nd1	2024-11-30 16:06:14.098	2024-11-30 16:06:14.098
cm44d76fm002fevcwl6jy9c24	Curso Java  Eventos XII. Múltiples fuentes I. Vídeo 76 de pildorasinformaticas 62.669 visualizaciones hace 10 años 22 minutos	22.24	java-78.mp4	<h3>Curso Java  Eventos XII. Múltiples fuentes I. Vídeo 76 de pildorasinformaticas 62.669 visualizaciones hace 10 años 22 minutos</h3>	cm44d76fm001xevcw527b4nd1	2024-11-30 16:06:14.098	2024-11-30 16:06:14.098
cm44d76fm002gevcwo31ou5y2	Curso Java  Eventos XIII. Múltiples fuentes II. Vídeo 77 de pildorasinformaticas 55.460 visualizaciones hace 10 años 24 minutos	24.21	java-79.mp4	<h3>Curso Java  Eventos XIII. Múltiples fuentes II. Vídeo 77 de pildorasinformaticas 55.460 visualizaciones hace 10 años 24 minutos</h3>	cm44d76fm001xevcw527b4nd1	2024-11-30 16:06:14.098	2024-11-30 16:06:14.098
cm44d76fm002hevcwx0uavri4	Curso Java  Eventos XIV. Múltiples fuentes III. Vídeo 78 de pildorasinformaticas 48.961 visualizaciones hace 10 años 16 minutos	16.03	java-80.mp4	<h3>Curso Java  Eventos XIV. Múltiples fuentes III. Vídeo 78 de pildorasinformaticas 48.961 visualizaciones hace 10 años 16 minutos</h3>	cm44d76fm001xevcw527b4nd1	2024-11-30 16:06:14.098	2024-11-30 16:06:14.098
cm44d76fq002kevcwph326v65	Curso Java  Eventos XV. Múltiples fuentes IV. Vídeo 79 de pildorasinformaticas 53.764 visualizaciones hace 10 años 30 minutos	30.15	java-81.mp4	<h3>Curso Java  Eventos XV. Múltiples fuentes IV. Vídeo 79 de pildorasinformaticas 53.764 visualizaciones hace 10 años 30 minutos</h3>	cm44d76fq002jevcw9lhgvk42	2024-11-30 16:06:14.102	2024-11-30 16:06:14.102
cm44d76fq002levcwwlacofvz	Curso Java  Eventos XVI. Múltiples oyentes. Vídeo 80 de pildorasinformaticas 52.827 visualizaciones hace 10 años 25 minutos	25.11	java-82.mp4	<h3>Curso Java  Eventos XVI. Múltiples oyentes. Vídeo 80 de pildorasinformaticas 52.827 visualizaciones hace 10 años 25 minutos</h3>	cm44d76fq002jevcw9lhgvk42	2024-11-30 16:06:14.102	2024-11-30 16:06:14.102
cm44d76fq002mevcwmnvolrim	Curso Java. Layouts I. Vídeo 81 de pildorasinformaticas 94.354 visualizaciones hace 10 años 20 minutos	20.4	java-83.mp4	<h3>Curso Java. Layouts I. Vídeo 81 de pildorasinformaticas 94.354 visualizaciones hace 10 años 20 minutos</h3>	cm44d76fq002jevcw9lhgvk42	2024-11-30 16:06:14.102	2024-11-30 16:06:14.102
cm44d76fq002nevcweu0ta4hp	Curso Java. Layouts II. Vídeo 82 de pildorasinformaticas 60.202 visualizaciones hace 10 años 20 minutos	20.07	java-84.mp4	<h3>Curso Java. Layouts II. Vídeo 82 de pildorasinformaticas 60.202 visualizaciones hace 10 años 20 minutos</h3>	cm44d76fq002jevcw9lhgvk42	2024-11-30 16:06:14.102	2024-11-30 16:06:14.102
cm44d76fq002oevcw93zlumg4	Curso Java. Layouts III. Vídeo 83 de pildorasinformaticas 59.322 visualizaciones hace 10 años 25 minutos	25.52	java-85.mp4	<h3>Curso Java. Layouts III. Vídeo 83 de pildorasinformaticas 59.322 visualizaciones hace 10 años 25 minutos</h3>	cm44d76fq002jevcw9lhgvk42	2024-11-30 16:06:14.102	2024-11-30 16:06:14.102
cm44d76fq002pevcwc6q2g9o5	Curso Java. Layouts IV. Vídeo 84 de pildorasinformaticas 52.869 visualizaciones hace 10 años 24 minutos	24.34	java-86.mp4	<h3>Curso Java. Layouts IV. Vídeo 84 de pildorasinformaticas 52.869 visualizaciones hace 10 años 24 minutos</h3>	cm44d76fq002jevcw9lhgvk42	2024-11-30 16:06:14.102	2024-11-30 16:06:14.102
cm44d76fq002qevcwjz2e643h	Curso Java. Layouts V. Vídeo 85 de pildorasinformaticas 52.376 visualizaciones hace 10 años 28 minutos	28.11	java-87.mp4	<h3>Curso Java. Layouts V. Vídeo 85 de pildorasinformaticas 52.376 visualizaciones hace 10 años 28 minutos</h3>	cm44d76fq002jevcw9lhgvk42	2024-11-30 16:06:14.102	2024-11-30 16:06:14.102
cm44d76fq002revcwa6rjtzbt	Curso Java. Componentes Swing. Cuadros de texto I. Vídeo 86 de pildorasinformaticas 62.212 visualizaciones hace 10 años 18 minutos	18.55	java-88.mp4	<h3>Curso Java. Componentes Swing. Cuadros de texto I. Vídeo 86 de pildorasinformaticas 62.212 visualizaciones hace 10 años 18 minutos</h3>	cm44d76fq002jevcw9lhgvk42	2024-11-30 16:06:14.102	2024-11-30 16:06:14.102
cm44d76fq002sevcwp2s4aa6k	Curso Java  Componentes Swing. Cuadros de texto II. Vídeo 87 de pildorasinformaticas 42.878 visualizaciones hace 10 años 18 minutos	18.54	java-89.mp4	<h3>Curso Java  Componentes Swing. Cuadros de texto II. Vídeo 87 de pildorasinformaticas 42.878 visualizaciones hace 10 años 18 minutos</h3>	cm44d76fq002jevcw9lhgvk42	2024-11-30 16:06:14.102	2024-11-30 16:06:14.102
cm44d76fq002tevcwsxbzdc2g	Curso Java  Componentes Swing. Eventos en cuadros de texto I. Vídeo 88 de pildorasinformaticas 45.660 visualizaciones hace 10 años 16 minutos	16.41	java-90.mp4	<h3>Curso Java  Componentes Swing. Eventos en cuadros de texto I. Vídeo 88 de pildorasinformaticas 45.660 visualizaciones hace 10 años 16 minutos</h3>	cm44d76fq002jevcw9lhgvk42	2024-11-30 16:06:14.102	2024-11-30 16:06:14.102
cm44d76fq002uevcwy8i3i6k1	Curso Java  Componentes Swing. Eventos en cuadros de texto II. Vídeo 89 de pildorasinformaticas 39.808 visualizaciones hace 10 años 23 minutos	23.03	java-91.mp4	<h3>Curso Java  Componentes Swing. Eventos en cuadros de texto II. Vídeo 89 de pildorasinformaticas 39.808 visualizaciones hace 10 años 23 minutos</h3>	cm44d76fq002jevcw9lhgvk42	2024-11-30 16:06:14.102	2024-11-30 16:06:14.102
cm44d76fq002vevcwv6c351vn	Curso Java  Componentes Swing. Áreas de texto I. Vídeo 90 de pildorasinformaticas 40.257 visualizaciones hace 10 años 15 minutos	15.43	java-92.mp4	<h3>Curso Java  Componentes Swing. Áreas de texto I. Vídeo 90 de pildorasinformaticas 40.257 visualizaciones hace 10 años 15 minutos</h3>	cm44d76fq002jevcw9lhgvk42	2024-11-30 16:06:14.102	2024-11-30 16:06:14.102
cm44d76fq002wevcw4doz2b7r	Curso Java  Componentes Swing. Áreas de texto II. Vídeo 91 de pildorasinformaticas 37.224 visualizaciones hace 10 años 26 minutos	26.22	java-93.mp4	<h3>Curso Java  Componentes Swing. Áreas de texto II. Vídeo 91 de pildorasinformaticas 37.224 visualizaciones hace 10 años 26 minutos</h3>	cm44d76fq002jevcw9lhgvk42	2024-11-30 16:06:14.102	2024-11-30 16:06:14.102
cm44d76fq002xevcwpypok1ww	Curso Java. Componentes Swing  CheckBox. Vídeo 92 de pildorasinformaticas 41.239 visualizaciones hace 10 años 24 minutos	24.29	java-94.mp4	<h3>Curso Java. Componentes Swing  CheckBox. Vídeo 92 de pildorasinformaticas 41.239 visualizaciones hace 10 años 24 minutos</h3>	cm44d76fq002jevcw9lhgvk42	2024-11-30 16:06:14.102	2024-11-30 16:06:14.102
cm44d76fq002yevcwt0wcarvb	Curso Java  Componentes Swing. Botones de radio. Vídeo 93 de pildorasinformaticas 34.898 visualizaciones hace 10 años 15 minutos	15.16	java-95.mp4	<h3>Curso Java  Componentes Swing. Botones de radio. Vídeo 93 de pildorasinformaticas 34.898 visualizaciones hace 10 años 15 minutos</h3>	cm44d76fq002jevcw9lhgvk42	2024-11-30 16:06:14.102	2024-11-30 16:06:14.102
cm44d76fq002zevcwrs1tp8zz	Curso Java  Componentes Swing. Botones de radio II. Vídeo 94 de pildorasinformaticas 35.620 visualizaciones hace 10 años 29 minutos	29.23	java-96.mp4	<h3>Curso Java  Componentes Swing. Botones de radio II. Vídeo 94 de pildorasinformaticas 35.620 visualizaciones hace 10 años 29 minutos</h3>	cm44d76fq002jevcw9lhgvk42	2024-11-30 16:06:14.102	2024-11-30 16:06:14.102
cm44d76fq0030evcwcztn8gfk	Curso Java. Componentes Swing. ComboBox. Vídeo 95 de pildorasinformaticas 44.362 visualizaciones hace 10 años 17 minutos	17.05	java-97.mp4	<h3>Curso Java. Componentes Swing. ComboBox. Vídeo 95 de pildorasinformaticas 44.362 visualizaciones hace 10 años 17 minutos</h3>	cm44d76fq002jevcw9lhgvk42	2024-11-30 16:06:14.102	2024-11-30 16:06:14.102
cm44d76fq0031evcwycwwm7nt	Curso Java. Componentes Swing. JSlider I. Vídeo 96 de pildorasinformaticas 38.902 visualizaciones hace 9 años 16 minutos	16.26	java-98.mp4	<h3>Curso Java. Componentes Swing. JSlider I. Vídeo 96 de pildorasinformaticas 38.902 visualizaciones hace 9 años 16 minutos</h3>	cm44d76fq002jevcw9lhgvk42	2024-11-30 16:06:14.102	2024-11-30 16:06:14.102
cm44d76fq0032evcwv3hlsjec	Curso Java. Componentes Swing. JSlider II. Vídeo 97 de pildorasinformaticas 31.915 visualizaciones hace 9 años 17 minutos	17.57	java-99.mp4	<h3>Curso Java. Componentes Swing. JSlider II. Vídeo 97 de pildorasinformaticas 31.915 visualizaciones hace 9 años 17 minutos</h3>	cm44d76fq002jevcw9lhgvk42	2024-11-30 16:06:14.102	2024-11-30 16:06:14.102
cm44d76fq0033evcwv8jvdy76	Curso Java  ComponentesSwing. JSpinner I. Vídeo 98 de pildorasinformaticas 40.381 visualizaciones hace 9 años 21 minutos	21.04	java-100.mp4	<h3>Curso Java  ComponentesSwing. JSpinner I. Vídeo 98 de pildorasinformaticas 40.381 visualizaciones hace 9 años 21 minutos</h3>	cm44d76fq002jevcw9lhgvk42	2024-11-30 16:06:14.102	2024-11-30 16:06:14.102
cm44d76fu0036evcw3ls7pw6t	Curso Java. Componentes Swing. JSpinner II. Vídeo 99 de pildorasinformaticas 31.559 visualizaciones hace 9 años 17 minutos	17.43	java-101.mp4	<h3>Curso Java. Componentes Swing. JSpinner II. Vídeo 99 de pildorasinformaticas 31.559 visualizaciones hace 9 años 17 minutos</h3>	cm44d76fu0035evcwfp9ef7br	2024-11-30 16:06:14.106	2024-11-30 16:06:14.106
cm44d76fu0037evcwnrsn8x36	Curso Java  Componentes Swing. Creación de menús I. Vídeo 100 de pildorasinformaticas 67.001 visualizaciones hace 9 años 24 minutos	24.35	java-102.mp4	<h3>Curso Java  Componentes Swing. Creación de menús I. Vídeo 100 de pildorasinformaticas 67.001 visualizaciones hace 9 años 24 minutos</h3>	cm44d76fu0035evcwfp9ef7br	2024-11-30 16:06:14.106	2024-11-30 16:06:14.106
cm44dgkip0005evo0gvdh7ccw	Curso C++. Temario e instalación de editor. Vídeo 2 de pildorasinformaticas 42.427 visualizaciones hace 2 años 13 minutos y 2 segundos	13.02	cpp-02.mp4	<h3>Curso C++. Temario e instalación de editor. Vídeo 2 de pildorasinformaticas 42.427 visualizaciones hace 2 años 13 minutos y 2 segundos</h3>	cm44dgkip0003evo0vf5ht9qd	2024-11-30 16:13:32.258	2024-11-30 16:13:32.258
cm44dgkip0006evo0qlhsee1v	Curso C++. Compilador y primer programa. Vídeo 3 de pildorasinformaticas 55.327 visualizaciones hace 2 años 20 minutos	20.34	cpp-03.mp4	<h3>Curso C++. Compilador y primer programa. Vídeo 3 de pildorasinformaticas 55.327 visualizaciones hace 2 años 20 minutos</h3>	cm44dgkip0003evo0vf5ht9qd	2024-11-30 16:13:32.258	2024-11-30 16:13:32.258
cm44dgkip0007evo0rnabpcsi	Curso C++. Compilación. Vídeo 4 de pildorasinformaticas 26.466 visualizaciones hace 2 años 13 minutos y 27 segundos	13.27	cpp-04.mp4	<h3>Curso C++. Compilación. Vídeo 4 de pildorasinformaticas 26.466 visualizaciones hace 2 años 13 minutos y 27 segundos</h3>	cm44dgkip0003evo0vf5ht9qd	2024-11-30 16:13:32.258	2024-11-30 16:13:32.258
cm44dgkip0008evo0asynlfoi	Curso C++. Disección del primer programa. Vídeo 5 de pildorasinformaticas 26.470 visualizaciones hace 2 años 23 minutos	23.13	cpp-05.mp4	<h3>Curso C++. Disección del primer programa. Vídeo 5 de pildorasinformaticas 26.470 visualizaciones hace 2 años 23 minutos</h3>	cm44dgkip0003evo0vf5ht9qd	2024-11-30 16:13:32.258	2024-11-30 16:13:32.258
cm44dgkip0009evo09k6rtu3n	Curso C++. Tipos y variables. Vídeo 6 de pildorasinformaticas 20.587 visualizaciones hace 2 años 24 minutos	24.31	cpp-06.mp4	<h3>Curso C++. Tipos y variables. Vídeo 6 de pildorasinformaticas 20.587 visualizaciones hace 2 años 24 minutos</h3>	cm44dgkip0003evo0vf5ht9qd	2024-11-30 16:13:32.258	2024-11-30 16:13:32.258
cm44dgkiq000aevo0si9ncjgt	Curso C++. Declaración e inicialización de variables. Vídeo 7 de pildorasinformaticas 17.704 visualizaciones hace 2 años 20 minutos	20.46	cpp-07.mp4	<h3>Curso C++. Declaración e inicialización de variables. Vídeo 7 de pildorasinformaticas 17.704 visualizaciones hace 2 años 20 minutos</h3>	cm44dgkip0003evo0vf5ht9qd	2024-11-30 16:13:32.258	2024-11-30 16:13:32.258
cm44dgkiq000bevo0di6v1yvc	Curso C++. Ejemplo sencillo con variables. Vídeo 8 de pildorasinformaticas 14.871 visualizaciones hace 2 años 19 minutos	19.52	cpp-08.mp4	<h3>Curso C++. Ejemplo sencillo con variables. Vídeo 8 de pildorasinformaticas 14.871 visualizaciones hace 2 años 19 minutos</h3>	cm44dgkip0003evo0vf5ht9qd	2024-11-30 16:13:32.258	2024-11-30 16:13:32.258
cm44dgkiq000cevo0mvdyn8ma	Curso C++. Declaración de constantes. Vídeo 9 de pildorasinformaticas 13.264 visualizaciones hace 2 años 12 minutos y 30 segundos	12.3	cpp-09.mp4	<h3>Curso C++. Declaración de constantes. Vídeo 9 de pildorasinformaticas 13.264 visualizaciones hace 2 años 12 minutos y 30 segundos</h3>	cm44dgkip0003evo0vf5ht9qd	2024-11-30 16:13:32.258	2024-11-30 16:13:32.258
cm44dgkiq000devo022gpvh5s	Curso C++. Ejercicio práctico sencillo. Vídeo 10 de pildorasinformaticas 13.370 visualizaciones hace 2 años 25 minutos	25.12	cpp-10.mp4	<h3>Curso C++. Ejercicio práctico sencillo. Vídeo 10 de pildorasinformaticas 13.370 visualizaciones hace 2 años 25 minutos</h3>	cm44dgkip0003evo0vf5ht9qd	2024-11-30 16:13:32.258	2024-11-30 16:13:32.258
cm44dgkiq000eevo0bnv19225	Curso C++. Arrays I. Qué son y sintaxis básica. Vídeo 11 de pildorasinformaticas 14.307 visualizaciones hace 2 años 15 minutos	15.51	cpp-11.mp4	<h3>Curso C++. Arrays I. Qué son y sintaxis básica. Vídeo 11 de pildorasinformaticas 14.307 visualizaciones hace 2 años 15 minutos</h3>	cm44dgkip0003evo0vf5ht9qd	2024-11-30 16:13:32.258	2024-11-30 16:13:32.258
cm44dgkiq000fevo055888dav	Curso C++. Declaración e inicialización de arrays en código. Vídeo 12 de pildorasinformaticas 11.958 visualizaciones hace 2 años 17 minutos	17.4	cpp-12.mp4	<h3>Curso C++. Declaración e inicialización de arrays en código. Vídeo 12 de pildorasinformaticas 11.958 visualizaciones hace 2 años 17 minutos</h3>	cm44dgkip0003evo0vf5ht9qd	2024-11-30 16:13:32.258	2024-11-30 16:13:32.258
cm44dgkiq000gevo04hmehrs2	Curso C++. Arrays bidimensionales. Vídeo 13 de pildorasinformaticas 13.521 visualizaciones hace 1 año 21 minutos	21.39	cpp-13.mp4	<h3>Curso C++. Arrays bidimensionales. Vídeo 13 de pildorasinformaticas 13.521 visualizaciones hace 1 año 21 minutos</h3>	cm44dgkip0003evo0vf5ht9qd	2024-11-30 16:13:32.258	2024-11-30 16:13:32.258
cm44dgkiq000hevo00j7yp0r1	Curso C++. Arrays multidimensionales. Vídeo 14 de pildorasinformaticas 10.612 visualizaciones hace 1 año 21 minutos	21.23	cpp-14.mp4	<h3>Curso C++. Arrays multidimensionales. Vídeo 14 de pildorasinformaticas 10.612 visualizaciones hace 1 año 21 minutos</h3>	cm44dgkip0003evo0vf5ht9qd	2024-11-30 16:13:32.258	2024-11-30 16:13:32.258
cm44dgkiq000ievo0rh3p8pm5	Curso C++. Vectores I. Vídeo 15 de pildorasinformaticas 14.552 visualizaciones hace 1 año 19 minutos	19.2	cpp-15.mp4	<h3>Curso C++. Vectores I. Vídeo 15 de pildorasinformaticas 14.552 visualizaciones hace 1 año 19 minutos</h3>	cm44dgkip0003evo0vf5ht9qd	2024-11-30 16:13:32.258	2024-11-30 16:13:32.258
cm44dgkiq000jevo0q15i9xa1	Curso C++. Vectores II. Vídeo 16 de pildorasinformaticas 9358 visualizaciones hace 1 año 31 minutos	31.47	cpp-16.mp4	<h3>Curso C++. Vectores II. Vídeo 16 de pildorasinformaticas 9358 visualizaciones hace 1 año 31 minutos</h3>	cm44dgkip0003evo0vf5ht9qd	2024-11-30 16:13:32.258	2024-11-30 16:13:32.258
cm44dgkiq000kevo0oeyzrgm3	Curso C++. Operadores I. Vídeo 17 de pildorasinformaticas 7371 visualizaciones hace 1 año 23 minutos	23.36	cpp-17.mp4	<h3>Curso C++. Operadores I. Vídeo 17 de pildorasinformaticas 7371 visualizaciones hace 1 año 23 minutos</h3>	cm44dgkip0003evo0vf5ht9qd	2024-11-30 16:13:32.258	2024-11-30 16:13:32.258
cm44dgkiq000levo0a7g48afa	Curso C++. Operadores II. Vídeo 18 de pildorasinformaticas 5966 visualizaciones hace 1 año 16 minutos	16.33	cpp-18.mp4	<h3>Curso C++. Operadores II. Vídeo 18 de pildorasinformaticas 5966 visualizaciones hace 1 año 16 minutos</h3>	cm44dgkip0003evo0vf5ht9qd	2024-11-30 16:13:32.258	2024-11-30 16:13:32.258
cm44dgkiq000mevo0bysffse7	Curso C++. Operadores y condicional IF I. Vídeo 19 de pildorasinformaticas 5455 visualizaciones hace 1 año 18 minutos	18.33	cpp-19.mp4	<h3>Curso C++. Operadores y condicional IF I. Vídeo 19 de pildorasinformaticas 5455 visualizaciones hace 1 año 18 minutos</h3>	cm44dgkip0003evo0vf5ht9qd	2024-11-30 16:13:32.258	2024-11-30 16:13:32.258
cm44dgkiq000nevo0ruqb2zjo	Curso C++. Operadores y condicional IF II. Vídeo 20 de pildorasinformaticas 4137 visualizaciones hace 1 año 22 minutos	22.27	cpp-20.mp4	<h3>Curso C++. Operadores y condicional IF II. Vídeo 20 de pildorasinformaticas 4137 visualizaciones hace 1 año 22 minutos</h3>	cm44dgkip0003evo0vf5ht9qd	2024-11-30 16:13:32.258	2024-11-30 16:13:32.258
cm44dgkjc000qevo0kx3vqpie	Curso C++. Operadores y condicional IF III. Vídeo 21 de pildorasinformaticas 4517 visualizaciones hace 1 año 13 minutos y 28 segundos	13.28	cpp-21.mp4	<h3>Curso C++. Operadores y condicional IF III. Vídeo 21 de pildorasinformaticas 4517 visualizaciones hace 1 año 13 minutos y 28 segundos</h3>	cm44dgkjc000pevo0raen3zme	2024-11-30 16:13:32.28	2024-11-30 16:13:32.28
cm44dgkjc000revo0a7a46w53	Curso C++. Switch-Case I. Vídeo 22 de pildorasinformaticas 6167 visualizaciones hace 1 año 18 minutos	18.23	cpp-22.mp4	<h3>Curso C++. Switch-Case I. Vídeo 22 de pildorasinformaticas 6167 visualizaciones hace 1 año 18 minutos</h3>	cm44dgkjc000pevo0raen3zme	2024-11-30 16:13:32.28	2024-11-30 16:13:32.28
cm44dgkjc000sevo0u5lg5usb	Curso C++. Switch-Case II. Vídeo 23 de pildorasinformaticas 4327 visualizaciones hace 1 año 14 minutos y 36 segundos	14.36	cpp-23.mp4	<h3>Curso C++. Switch-Case II. Vídeo 23 de pildorasinformaticas 4327 visualizaciones hace 1 año 14 minutos y 36 segundos</h3>	cm44dgkjc000pevo0raen3zme	2024-11-30 16:13:32.28	2024-11-30 16:13:32.28
cm44dgkjc000tevo0fjenkxlt	Curso C++. Operador ternario. Vídeo 24 de pildorasinformaticas 5132 visualizaciones hace 1 año 12 minutos y 49 segundos	12.49	cpp-24.mp4	<h3>Curso C++. Operador ternario. Vídeo 24 de pildorasinformaticas 5132 visualizaciones hace 1 año 12 minutos y 49 segundos</h3>	cm44dgkjc000pevo0raen3zme	2024-11-30 16:13:32.28	2024-11-30 16:13:32.28
cm44dgkjc000uevo0k4ncdus4	Curso C++. Bucles. Vídeo 25 de pildorasinformaticas 3071 visualizaciones hace 1 año 12 minutos y 32 segundos	12.32	cpp-25.mp4	<h3>Curso C++. Bucles. Vídeo 25 de pildorasinformaticas 3071 visualizaciones hace 1 año 12 minutos y 32 segundos</h3>	cm44dgkjc000pevo0raen3zme	2024-11-30 16:13:32.28	2024-11-30 16:13:32.28
cm44dgkjc000vevo0tkpzkswi	Curso C++. Bucle For. Vídeo 26 de pildorasinformaticas 4142 visualizaciones hace 1 año 24 minutos	24.13	cpp-26.mp4	<h3>Curso C++. Bucle For. Vídeo 26 de pildorasinformaticas 4142 visualizaciones hace 1 año 24 minutos</h3>	cm44dgkjc000pevo0raen3zme	2024-11-30 16:13:32.28	2024-11-30 16:13:32.28
cm44dgkjc000wevo0tbh9qreu	Curso C++. Bucle For-Each. Vídeo 27 de pildorasinformaticas 5204 visualizaciones hace 1 año 22 minutos	22.14	cpp-27.mp4	<h3>Curso C++. Bucle For-Each. Vídeo 27 de pildorasinformaticas 5204 visualizaciones hace 1 año 22 minutos</h3>	cm44dgkjc000pevo0raen3zme	2024-11-30 16:13:32.28	2024-11-30 16:13:32.28
cm44dgkjc000xevo0ol6k92r2	Curso C++. Bucle While. Vídeo 28 de pildorasinformaticas 4527 visualizaciones hace 1 año 25 minutos	25.04	cpp-28.mp4	<h3>Curso C++. Bucle While. Vídeo 28 de pildorasinformaticas 4527 visualizaciones hace 1 año 25 minutos</h3>	cm44dgkjc000pevo0raen3zme	2024-11-30 16:13:32.28	2024-11-30 16:13:32.28
cm44dgkjc000yevo0q4nb0p36	Curso C++. Bucle do-while. Vídeo 29 de pildorasinformaticas 3975 visualizaciones hace 1 año 17 minutos	17.18	cpp-29.mp4	<h3>Curso C++. Bucle do-while. Vídeo 29 de pildorasinformaticas 3975 visualizaciones hace 1 año 17 minutos</h3>	cm44dgkjc000pevo0raen3zme	2024-11-30 16:13:32.28	2024-11-30 16:13:32.28
cm44dgkjc000zevo055qonlng	Curso C++. Instrucciones break y continue. Vídeo 30 de pildorasinformaticas 4288 visualizaciones hace 1 año 24 minutos	24.53	cpp-30.mp4	<h3>Curso C++. Instrucciones break y continue. Vídeo 30 de pildorasinformaticas 4288 visualizaciones hace 1 año 24 minutos</h3>	cm44dgkjc000pevo0raen3zme	2024-11-30 16:13:32.28	2024-11-30 16:13:32.28
cm44dgkjc0010evo0rg6l9289	Curso C++. Bucles infinitos. Vídeo 31 de pildorasinformaticas 3915 visualizaciones hace 1 año 24 minutos	24.19	cpp-31.mp4	<h3>Curso C++. Bucles infinitos. Vídeo 31 de pildorasinformaticas 3915 visualizaciones hace 1 año 24 minutos</h3>	cm44dgkjc000pevo0raen3zme	2024-11-30 16:13:32.28	2024-11-30 16:13:32.28
cm44dgkjc0011evo0xkooso5h	Curso C++. Bucles anidados I. Vídeo 32 de pildorasinformaticas 2974 visualizaciones hace 1 año 22 minutos	22.53	cpp-32.mp4	<h3>Curso C++. Bucles anidados I. Vídeo 32 de pildorasinformaticas 2974 visualizaciones hace 1 año 22 minutos</h3>	cm44dgkjc000pevo0raen3zme	2024-11-30 16:13:32.28	2024-11-30 16:13:32.28
cm44dgkjc0012evo0xl3ecab0	Curso C++. Bucles anidados II. Juego de azar. Vídeo 33 de pildorasinformaticas 3079 visualizaciones hace 1 año 22 minutos	22.14	cpp-33.mp4	<h3>Curso C++. Bucles anidados II. Juego de azar. Vídeo 33 de pildorasinformaticas 3079 visualizaciones hace 1 año 22 minutos</h3>	cm44dgkjc000pevo0raen3zme	2024-11-30 16:13:32.28	2024-11-30 16:13:32.28
cm44dgkjc0013evo0alwmr6ve	Curso C++. Funciones I. Vídeo 34 de pildorasinformaticas 7252 visualizaciones hace 1 año 24 minutos	24.3	cpp-34.mp4	<h3>Curso C++. Funciones I. Vídeo 34 de pildorasinformaticas 7252 visualizaciones hace 1 año 24 minutos</h3>	cm44dgkjc000pevo0raen3zme	2024-11-30 16:13:32.28	2024-11-30 16:13:32.28
cm44dgkjc0014evo018d65879	Curso C++. Funciones II. Prototipos. Vídeo 35 de pildorasinformaticas 6736 visualizaciones hace 1 año 20 minutos	20.27	cpp-35.mp4	<h3>Curso C++. Funciones II. Prototipos. Vídeo 35 de pildorasinformaticas 6736 visualizaciones hace 1 año 20 minutos</h3>	cm44dgkjc000pevo0raen3zme	2024-11-30 16:13:32.28	2024-11-30 16:13:32.28
cm44dgkjc0015evo0wcd3i2hm	Curso C++. Funciones III. Paso por valor y por referencia. Vídeo 36 de pildorasinformaticas 8178 visualizaciones hace 1 año 23 minutos	23.21	cpp-36.mp4	<h3>Curso C++. Funciones III. Paso por valor y por referencia. Vídeo 36 de pildorasinformaticas 8178 visualizaciones hace 1 año 23 minutos</h3>	cm44dgkjc000pevo0raen3zme	2024-11-30 16:13:32.28	2024-11-30 16:13:32.28
cm44dgkjc0016evo0y7f5qfny	Curso C++. Funciones IV. Parámetros por defecto. Vídeo 37 de pildorasinformaticas 4089 visualizaciones hace 1 año 25 minutos	25.1	cpp-37.mp4	<h3>Curso C++. Funciones IV. Parámetros por defecto. Vídeo 37 de pildorasinformaticas 4089 visualizaciones hace 1 año 25 minutos</h3>	cm44dgkjc000pevo0raen3zme	2024-11-30 16:13:32.28	2024-11-30 16:13:32.28
cm44dgkjc0017evo0l46b5neg	Curso C++. Funciones V. Sobrecarga de funciones. Vídeo 38 de pildorasinformaticas 3493 visualizaciones hace 1 año 20 minutos	20.59	cpp-38.mp4	<h3>Curso C++. Funciones V. Sobrecarga de funciones. Vídeo 38 de pildorasinformaticas 3493 visualizaciones hace 1 año 20 minutos</h3>	cm44dgkjc000pevo0raen3zme	2024-11-30 16:13:32.28	2024-11-30 16:13:32.28
cm44dgkjc0018evo0alhr5i70	Curso C++. Funciones VI. Funciones inline. Vídeo 39 de pildorasinformaticas 3776 visualizaciones hace 1 año 17 minutos	17.34	cpp-39.mp4	<h3>Curso C++. Funciones VI. Funciones inline. Vídeo 39 de pildorasinformaticas 3776 visualizaciones hace 1 año 17 minutos</h3>	cm44dgkjc000pevo0raen3zme	2024-11-30 16:13:32.28	2024-11-30 16:13:32.28
cm44dgkjc0019evo08cdx2gx4	Curso C++. Funciones VII. Auto return. Vídeo 40 de pildorasinformaticas 3085 visualizaciones hace 1 año 18 minutos	18.09	cpp-40.mp4	<h3>Curso C++. Funciones VII. Auto return. Vídeo 40 de pildorasinformaticas 3085 visualizaciones hace 1 año 18 minutos</h3>	cm44dgkjc000pevo0raen3zme	2024-11-30 16:13:32.28	2024-11-30 16:13:32.28
cm44dgkjm001cevo0s4m2edxm	Curso C++. Funciones VIII. Funciones recursivas. Vídeo 41 de pildorasinformaticas 3477 visualizaciones hace 11 meses 24 minutos	24.04	cpp-41.mp4	<h3>Curso C++. Funciones VIII. Funciones recursivas. Vídeo 41 de pildorasinformaticas 3477 visualizaciones hace 11 meses 24 minutos</h3>	cm44dgkjm001bevo0riwu6jzy	2024-11-30 16:13:32.29	2024-11-30 16:13:32.29
cm44dgkjm001devo0v8yuzue7	Curso C++. Punteros I. Vídeo 42 de pildorasinformaticas 9971 visualizaciones hace 11 meses 11 minutos y 45 segundos	11.45	cpp-42.mp4	<h3>Curso C++. Punteros I. Vídeo 42 de pildorasinformaticas 9971 visualizaciones hace 11 meses 11 minutos y 45 segundos</h3>	cm44dgkjm001bevo0riwu6jzy	2024-11-30 16:13:32.29	2024-11-30 16:13:32.29
cm44dgkjm001eevo0pwgqrfw8	Curso C++. Punteros II. Sintaxis y uso. Vídeo 43 de pildorasinformaticas 7470 visualizaciones hace 11 meses 24 minutos	24.1	cpp-43.mp4	<h3>Curso C++. Punteros II. Sintaxis y uso. Vídeo 43 de pildorasinformaticas 7470 visualizaciones hace 11 meses 24 minutos</h3>	cm44dgkjm001bevo0riwu6jzy	2024-11-30 16:13:32.29	2024-11-30 16:13:32.29
cm44dgkjm001fevo0vici5854	Curso C++. Punteros III. Gestión de la memoria. Vídeo 44 de pildorasinformaticas 4239 visualizaciones hace 9 meses 25 minutos	25.23	cpp-44.mp4	<h3>Curso C++. Punteros III. Gestión de la memoria. Vídeo 44 de pildorasinformaticas 4239 visualizaciones hace 9 meses 25 minutos</h3>	cm44dgkjm001bevo0riwu6jzy	2024-11-30 16:13:32.29	2024-11-30 16:13:32.29
cm44dgkjm001gevo0otliv9fw	Curso C++. Punteros IV. Arrays y punteros. Aritmética de punteros. Vídeo 45 de pildorasinformaticas 3357 visualizaciones hace 9 meses 16 minutos	16.53	cpp-45.mp4	<h3>Curso C++. Punteros IV. Arrays y punteros. Aritmética de punteros. Vídeo 45 de pildorasinformaticas 3357 visualizaciones hace 9 meses 16 minutos</h3>	cm44dgkjm001bevo0riwu6jzy	2024-11-30 16:13:32.29	2024-11-30 16:13:32.29
cm44dgkjm001hevo0a3p0onu1	Curso C++. Punteros V. Constantes y punteros. Vídeo 46 de pildorasinformaticas 3183 visualizaciones hace 8 meses 20 minutos	20.1	cpp-46.mp4	<h3>Curso C++. Punteros V. Constantes y punteros. Vídeo 46 de pildorasinformaticas 3183 visualizaciones hace 8 meses 20 minutos</h3>	cm44dgkjm001bevo0riwu6jzy	2024-11-30 16:13:32.29	2024-11-30 16:13:32.29
cm44dgkjm001ievo01el2qntn	Curso C++. Punteros VI. Paso de punteros por parámetros. Vídeo 47 de pildorasinformaticas 3638 visualizaciones hace 8 meses 13 minutos y 26 segundos	13.26	cpp-47.mp4	<h3>Curso C++. Punteros VI. Paso de punteros por parámetros. Vídeo 47 de pildorasinformaticas 3638 visualizaciones hace 8 meses 13 minutos y 26 segundos</h3>	cm44dgkjm001bevo0riwu6jzy	2024-11-30 16:13:32.29	2024-11-30 16:13:32.29
cm44dgkjm001jevo01f7wikb2	Curso C++. Punteros VII. Devolución de punteros. Vídeo 48 de pildorasinformaticas 5815 visualizaciones hace 7 meses 25 minutos	25.33	cpp-48.mp4	<h3>Curso C++. Punteros VII. Devolución de punteros. Vídeo 48 de pildorasinformaticas 5815 visualizaciones hace 7 meses 25 minutos</h3>	cm44dgkjm001bevo0riwu6jzy	2024-11-30 16:13:32.29	2024-11-30 16:13:32.29
cm44dgkjm001kevo05xw46hi3	Curso C++. Punteros VII. Problemas con punteros. Vídeo 49 de pildorasinformaticas 2668 visualizaciones hace 7 meses 19 minutos	19.47	cpp-49.mp4	<h3>Curso C++. Punteros VII. Problemas con punteros. Vídeo 49 de pildorasinformaticas 2668 visualizaciones hace 7 meses 19 minutos</h3>	cm44dgkjm001bevo0riwu6jzy	2024-11-30 16:13:32.29	2024-11-30 16:13:32.29
cm44dgkjm001levo03pb77won	Curso C++. Referencias I. Qué son. Vídeo 50 de pildorasinformaticas 2233 visualizaciones hace 7 meses 17 minutos	17.18	cpp-50.mp4	<h3>Curso C++. Referencias I. Qué son. Vídeo 50 de pildorasinformaticas 2233 visualizaciones hace 7 meses 17 minutos</h3>	cm44dgkjm001bevo0riwu6jzy	2024-11-30 16:13:32.29	2024-11-30 16:13:32.29
cm44dgkjm001mevo0vcuqherv	Curso C++. Referencias II. Ejemplos sencillos. Vídeo 51 de pildorasinformaticas 2259 visualizaciones hace 6 meses 16 minutos	16.44	cpp-51.mp4	<h3>Curso C++. Referencias II. Ejemplos sencillos. Vídeo 51 de pildorasinformaticas 2259 visualizaciones hace 6 meses 16 minutos</h3>	cm44dgkjm001bevo0riwu6jzy	2024-11-30 16:13:32.29	2024-11-30 16:13:32.29
cm44dgkjm001nevo09e8v9377	Curso C++. L-Values y R-Values. . Vídeo 52 de pildorasinformaticas 2527 visualizaciones hace 6 meses 23 minutos	23.15	cpp-52.mp4	<h3>Curso C++. L-Values y R-Values. . Vídeo 52 de pildorasinformaticas 2527 visualizaciones hace 6 meses 23 minutos</h3>	cm44dgkjm001bevo0riwu6jzy	2024-11-30 16:13:32.29	2024-11-30 16:13:32.29
cm44dgkjm001oevo0vwwmcfg5	Curso C++. POO (Programación Orientada a Objetos) Vídeo 53 de pildorasinformaticas 3417 visualizaciones hace 5 meses 29 minutos	29.48	cpp-53.mp4	<h3>Curso C++. POO (Programación Orientada a Objetos) Vídeo 53 de pildorasinformaticas 3417 visualizaciones hace 5 meses 29 minutos</h3>	cm44dgkjm001bevo0riwu6jzy	2024-11-30 16:13:32.29	2024-11-30 16:13:32.29
cm44dgkjm001pevo0kiiozpch	Curso C++. POO. Clases y Objetos. Vídeo 54 de pildorasinformaticas 3141 visualizaciones hace 4 meses 25 minutos	25.03	cpp-54.mp4	<h3>Curso C++. POO. Clases y Objetos. Vídeo 54 de pildorasinformaticas 3141 visualizaciones hace 4 meses 25 minutos</h3>	cm44dgkjm001bevo0riwu6jzy	2024-11-30 16:13:32.29	2024-11-30 16:13:32.29
cm44dgkjm001qevo0md0yrph4	Curso C++. POO. Acceso a propiedades y métodos. Vídeo 55 de pildorasinformaticas 2271 visualizaciones hace 3 meses 33 minutos	33.19	cpp-55.mp4	<h3>Curso C++. POO. Acceso a propiedades y métodos. Vídeo 55 de pildorasinformaticas 2271 visualizaciones hace 3 meses 33 minutos</h3>	cm44dgkjm001bevo0riwu6jzy	2024-11-30 16:13:32.29	2024-11-30 16:13:32.29
cm44dgkjm001revo04gpzz177	Curso C++. POO. Acceso a propiedades y métodos usando punteros. Vídeo 56 de pildorasinformaticas 2357 visualizaciones hace 3 meses 12 minutos y 48 segundos	12.48	cpp-56.mp4	<h3>Curso C++. POO. Acceso a propiedades y métodos usando punteros. Vídeo 56 de pildorasinformaticas 2357 visualizaciones hace 3 meses 12 minutos y 48 segundos</h3>	cm44dgkjm001bevo0riwu6jzy	2024-11-30 16:13:32.29	2024-11-30 16:13:32.29
cm44dgkjm001sevo0sy8t77if	Curso C++. POO. Modificadores de acceso. Protected. Vídeo 57 de pildorasinformaticas 1591 visualizaciones hace 3 meses 17 minutos	17.46	cpp-57.mp4	<h3>Curso C++. POO. Modificadores de acceso. Protected. Vídeo 57 de pildorasinformaticas 1591 visualizaciones hace 3 meses 17 minutos</h3>	cm44dgkjm001bevo0riwu6jzy	2024-11-30 16:13:32.29	2024-11-30 16:13:32.29
cm44dgkjm001tevo0uveuuges	Curso C++. POO. Constructores. Sobrecarga. Vídeo 58 de pildorasinformaticas 1776 visualizaciones hace 2 meses 26 minutos	26.51	cpp-58.mp4	<h3>Curso C++. POO. Constructores. Sobrecarga. Vídeo 58 de pildorasinformaticas 1776 visualizaciones hace 2 meses 26 minutos</h3>	cm44dgkjm001bevo0riwu6jzy	2024-11-30 16:13:32.29	2024-11-30 16:13:32.29
cm44dgkjm001uevo0nfsdv1tb	Curso C++. Destructores. Vídeo 59 de pildorasinformaticas 1425 visualizaciones hace 2 meses 21 minutos	21.09	cpp-59.mp4	<h3>Curso C++. Destructores. Vídeo 59 de pildorasinformaticas 1425 visualizaciones hace 2 meses 21 minutos</h3>	cm44dgkjm001bevo0riwu6jzy	2024-11-30 16:13:32.29	2024-11-30 16:13:32.29
cm44dgkjm001vevo0eww0ihgl	Curso C++. Constructor Initialization List. Vídeo 60 de pildorasinformaticas 1471 visualizaciones hace 1 mes 19 minutos	19.43	cpp-60.mp4	<h3>Curso C++. Constructor Initialization List. Vídeo 60 de pildorasinformaticas 1471 visualizaciones hace 1 mes 19 minutos</h3>	cm44dgkjm001bevo0riwu6jzy	2024-11-30 16:13:32.29	2024-11-30 16:13:32.29
cm44dgkjr001yevo0b2tvgk3t	Curso C++. Delegación de constructores. Vídeo 61 de pildorasinformaticas 1480 visualizaciones hace 1 mes 26 minutos	26.36	cpp-61.mp4	<h3>Curso C++. Delegación de constructores. Vídeo 61 de pildorasinformaticas 1480 visualizaciones hace 1 mes 26 minutos</h3>	cm44dgkjr001xevo0xskvi990	2024-11-30 16:13:32.295	2024-11-30 16:13:32.295
cm44dgkjr001zevo0m91vvved	Curso C++. Constructor-copia. Vídeo 62 de pildorasinformaticas 1128 visualizaciones hace 9 días 23 minutos	23.18	cpp-62.mp4	<h3>Curso C++. Constructor-copia. Vídeo 62 de pildorasinformaticas 1128 visualizaciones hace 9 días 23 minutos</h3>	cm44dgkjr001xevo0xskvi990	2024-11-30 16:13:32.295	2024-11-30 16:13:32.295
cm44dkm660004evnctloqn2u6	Curso Python Actualización 2024. Vídeo 0 de pildorasinformaticas 32.634 visualizaciones hace 2 meses 2 minutos y 43 segundos	2.43	python-01.mp4	<h3>Curso Python Actualización 2024. Vídeo 0 de pildorasinformaticas 32.634 visualizaciones hace 2 meses 2 minutos y 43 segundos</h3>	cm44dkm650003evnceyzvj9my	2024-11-30 16:16:41.022	2024-11-30 16:16:41.022
cm44dkm660005evncjhqwbwqm	Curso Python. Vídeo 1 de pildorasinformaticas 2.779.601 visualizaciones hace 7 años 3 minutos y 31 segundos	3.31	python-02.mp4	<h3>Curso Python. Vídeo 1 de pildorasinformaticas 2.779.601 visualizaciones hace 7 años 3 minutos y 31 segundos</h3>	cm44dkm650003evnceyzvj9my	2024-11-30 16:16:41.022	2024-11-30 16:16:41.022
cm44dkm660006evncb6ezjgbd	Curso Python. Introducción. Vídeo 2 de pildorasinformaticas 1.399.847 visualizaciones hace 7 años 15 minutos	15.03	python-03.mp4	<h3>Curso Python. Introducción. Vídeo 2 de pildorasinformaticas 1.399.847 visualizaciones hace 7 años 15 minutos</h3>	cm44dkm650003evnceyzvj9my	2024-11-30 16:16:41.022	2024-11-30 16:16:41.022
cm44dkm660007evncuncvlvs9	Curso Python. Instalación VSC  Vídeo 2B de pildorasinformaticas 11.275 visualizaciones hace 2 meses 3 minutos y 24 segundos	3.24	python-04.mp4	<h3>Curso Python. Instalación VSC  Vídeo 2B de pildorasinformaticas 11.275 visualizaciones hace 2 meses 3 minutos y 24 segundos</h3>	cm44dkm650003evnceyzvj9my	2024-11-30 16:16:41.022	2024-11-30 16:16:41.022
cm44dkm660008evnc20hd2yvc	Curso Python. Primer programa con VSC. Vídeo 2C de pildorasinformaticas 14.355 visualizaciones hace 2 meses 15 minutos	15.01	python-05.mp4	<h3>Curso Python. Primer programa con VSC. Vídeo 2C de pildorasinformaticas 14.355 visualizaciones hace 2 meses 15 minutos</h3>	cm44dkm650003evnceyzvj9my	2024-11-30 16:16:41.022	2024-11-30 16:16:41.022
cm44dkm660009evnct2o7dbs4	Curso Python. Sintaxis Básica I. Vídeo 3 de pildorasinformaticas 1.472.813 visualizaciones hace 7 años 13 minutos y 23 segundos	13.23	python-06.mp4	<h3>Curso Python. Sintaxis Básica I. Vídeo 3 de pildorasinformaticas 1.472.813 visualizaciones hace 7 años 13 minutos y 23 segundos</h3>	cm44dkm650003evnceyzvj9my	2024-11-30 16:16:41.022	2024-11-30 16:16:41.022
cm44dkm66000aevncim3eldpl	Curso Python. Sintaxis Básica II  Tipos, operadores y variables. Vídeo 4 de pildorasinformaticas 1.124.201 visualizaciones hace 7 años 21 minutos	21.27	python-07.mp4	<h3>Curso Python. Sintaxis Básica II  Tipos, operadores y variables. Vídeo 4 de pildorasinformaticas 1.124.201 visualizaciones hace 7 años 21 minutos</h3>	cm44dkm650003evnceyzvj9my	2024-11-30 16:16:41.022	2024-11-30 16:16:41.022
cm44dkm66000bevncqcluiyi5	Curso Python. Sintaxis Básica III  Funciones I. Vídeo 5 de pildorasinformaticas 951.712 visualizaciones hace 7 años 18 minutos	18.26	python-08.mp4	<h3>Curso Python. Sintaxis Básica III  Funciones I. Vídeo 5 de pildorasinformaticas 951.712 visualizaciones hace 7 años 18 minutos</h3>	cm44dkm650003evnceyzvj9my	2024-11-30 16:16:41.022	2024-11-30 16:16:41.022
cm44dkm66000cevncfije6esy	Curso Python. Sintaxis Básica IV  Funciones II. Vídeo 6 de pildorasinformaticas 690.543 visualizaciones hace 7 años 16 minutos	16.34	python-09.mp4	<h3>Curso Python. Sintaxis Básica IV  Funciones II. Vídeo 6 de pildorasinformaticas 690.543 visualizaciones hace 7 años 16 minutos</h3>	cm44dkm650003evnceyzvj9my	2024-11-30 16:16:41.022	2024-11-30 16:16:41.022
cm44dkm66000devncp3s09nhe	Curso Python. Sintaxis Básica V. Las listas. Vídeo 7 de pildorasinformaticas 701.612 visualizaciones hace 7 años 24 minutos	24.35	python-10.mp4	<h3>Curso Python. Sintaxis Básica V. Las listas. Vídeo 7 de pildorasinformaticas 701.612 visualizaciones hace 7 años 24 minutos</h3>	cm44dkm650003evnceyzvj9my	2024-11-30 16:16:41.022	2024-11-30 16:16:41.022
cm44dkm66000eevncmw88famo	Curso Python. Sintaxis Básica VI. Las tuplas. Vídeo 8 de pildorasinformaticas 502.898 visualizaciones hace 7 años 18 minutos	18.41	python-11.mp4	<h3>Curso Python. Sintaxis Básica VI. Las tuplas. Vídeo 8 de pildorasinformaticas 502.898 visualizaciones hace 7 años 18 minutos</h3>	cm44dkm650003evnceyzvj9my	2024-11-30 16:16:41.022	2024-11-30 16:16:41.022
cm44dkm66000fevncnwu6xc6e	Curso Python. Sintaxis Básica VII  Los diccionarios. Vídeo 9 de pildorasinformaticas 473.038 visualizaciones hace 7 años 21 minutos	21.11	python-12.mp4	<h3>Curso Python. Sintaxis Básica VII  Los diccionarios. Vídeo 9 de pildorasinformaticas 473.038 visualizaciones hace 7 años 21 minutos</h3>	cm44dkm650003evnceyzvj9my	2024-11-30 16:16:41.022	2024-11-30 16:16:41.022
cm44dkm66000gevnc7dhcd7i7	Curso Python. Condicionales I. Vídeo 10 de pildorasinformaticas 474.464 visualizaciones hace 7 años 22 minutos	22.57	python-13.mp4	<h3>Curso Python. Condicionales I. Vídeo 10 de pildorasinformaticas 474.464 visualizaciones hace 7 años 22 minutos</h3>	cm44dkm650003evnceyzvj9my	2024-11-30 16:16:41.022	2024-11-30 16:16:41.022
cm44dkm66000hevnc6aq7ai1j	Curso Python. Condicionales II. Vídeo 11 de pildorasinformaticas 384.736 visualizaciones hace 7 años 20 minutos	20.47	python-14.mp4	<h3>Curso Python. Condicionales II. Vídeo 11 de pildorasinformaticas 384.736 visualizaciones hace 7 años 20 minutos</h3>	cm44dkm650003evnceyzvj9my	2024-11-30 16:16:41.022	2024-11-30 16:16:41.022
cm44dkm66000ievncfz76453t	Curso Python. Condicionales III. Vídeo 12 de pildorasinformaticas 339.343 visualizaciones hace 7 años 21 minutos	21.22	python-15.mp4	<h3>Curso Python. Condicionales III. Vídeo 12 de pildorasinformaticas 339.343 visualizaciones hace 7 años 21 minutos</h3>	cm44dkm650003evnceyzvj9my	2024-11-30 16:16:41.022	2024-11-30 16:16:41.022
cm44dkm66000jevnc80icfxoz	Curso Python. Condicionales IV. Vídeo 13 de pildorasinformaticas 299.281 visualizaciones hace 7 años 23 minutos	23.11	python-16.mp4	<h3>Curso Python. Condicionales IV. Vídeo 13 de pildorasinformaticas 299.281 visualizaciones hace 7 años 23 minutos</h3>	cm44dkm650003evnceyzvj9my	2024-11-30 16:16:41.022	2024-11-30 16:16:41.022
cm44dkm66000kevncd3j0kuxt	Curso Python. Bucles I. For. Vídeo 14 de pildorasinformaticas 457.750 visualizaciones hace 7 años 18 minutos	18.18	python-17.mp4	<h3>Curso Python. Bucles I. For. Vídeo 14 de pildorasinformaticas 457.750 visualizaciones hace 7 años 18 minutos</h3>	cm44dkm650003evnceyzvj9my	2024-11-30 16:16:41.022	2024-11-30 16:16:41.022
cm44dkm66000levnckt3i36aq	Curso de Python. Bucles II  Bucle For. Vídeo 15 de pildorasinformaticas 372.204 visualizaciones hace 7 años 21 minutos	21.06	python-18.mp4	<h3>Curso de Python. Bucles II  Bucle For. Vídeo 15 de pildorasinformaticas 372.204 visualizaciones hace 7 años 21 minutos</h3>	cm44dkm650003evnceyzvj9my	2024-11-30 16:16:41.022	2024-11-30 16:16:41.022
cm44dkm66000mevnc6nomtxeq	Curso de Python. Bucles II  Bucle For  Vídeo 16 de pildorasinformaticas 296.710 visualizaciones hace 7 años 10 minutos y 46 segundos	10.46	python-19.mp4	<h3>Curso de Python. Bucles II  Bucle For  Vídeo 16 de pildorasinformaticas 296.710 visualizaciones hace 7 años 10 minutos y 46 segundos</h3>	cm44dkm650003evnceyzvj9my	2024-11-30 16:16:41.022	2024-11-30 16:16:41.022
cm44dkm66000nevncehpyxrkd	Curso de Python. Bucles IV. Bucle While. Vídeo 17 de pildorasinformaticas 379.255 visualizaciones hace 7 años 26 minutos	26.33	python-20.mp4	<h3>Curso de Python. Bucles IV. Bucle While. Vídeo 17 de pildorasinformaticas 379.255 visualizaciones hace 7 años 26 minutos</h3>	cm44dkm650003evnceyzvj9my	2024-11-30 16:16:41.022	2024-11-30 16:16:41.022
cm44dkm6e000qevnceq7ax3em	Curso de Python. Bucles V  Continue, pass y else. Vídeo 18 de pildorasinformaticas 244.426 visualizaciones hace 7 años 16 minutos	16.12	python-21.mp4	<h3>Curso de Python. Bucles V  Continue, pass y else. Vídeo 18 de pildorasinformaticas 244.426 visualizaciones hace 7 años 16 minutos</h3>	cm44dkm6e000pevncbey7bblq	2024-11-30 16:16:41.03	2024-11-30 16:16:41.03
cm44dkm6e000revncpashafo6	Curso de Python. Generadores I. Vídeo 19 de pildorasinformaticas 308.899 visualizaciones hace 7 años 17 minutos	17.54	python-22.mp4	<h3>Curso de Python. Generadores I. Vídeo 19 de pildorasinformaticas 308.899 visualizaciones hace 7 años 17 minutos</h3>	cm44dkm6e000pevncbey7bblq	2024-11-30 16:16:41.03	2024-11-30 16:16:41.03
cm44dkm6e000sevncvc7oyym7	Curso de Python. Generadores II. Vídeo 20 de pildorasinformaticas 203.042 visualizaciones hace 7 años 9 minutos y 38 segundos	9.38	python-23.mp4	<h3>Curso de Python. Generadores II. Vídeo 20 de pildorasinformaticas 203.042 visualizaciones hace 7 años 9 minutos y 38 segundos</h3>	cm44dkm6e000pevncbey7bblq	2024-11-30 16:16:41.03	2024-11-30 16:16:41.03
cm44dkm6e000tevnc4xh8nal2	Curso de Python. Excepciones I. Vídeo 21 de pildorasinformaticas 239.864 visualizaciones hace 7 años 15 minutos	15.49	python-24.mp4	<h3>Curso de Python. Excepciones I. Vídeo 21 de pildorasinformaticas 239.864 visualizaciones hace 7 años 15 minutos</h3>	cm44dkm6e000pevncbey7bblq	2024-11-30 16:16:41.03	2024-11-30 16:16:41.03
cm44dkm6e000uevnciz7wleg7	Curso de Python. Excepciones II. Vídeo 22 de pildorasinformaticas 190.393 visualizaciones hace 7 años 19 minutos	19.47	python-25.mp4	<h3>Curso de Python. Excepciones II. Vídeo 22 de pildorasinformaticas 190.393 visualizaciones hace 7 años 19 minutos</h3>	cm44dkm6e000pevncbey7bblq	2024-11-30 16:16:41.03	2024-11-30 16:16:41.03
cm44dkm6e000vevnco1fronwm	Curso de Python. Excepciones III. Vídeo 23 de pildorasinformaticas 161.765 visualizaciones hace 7 años 16 minutos	16.39	python-26.mp4	<h3>Curso de Python. Excepciones III. Vídeo 23 de pildorasinformaticas 161.765 visualizaciones hace 7 años 16 minutos</h3>	cm44dkm6e000pevncbey7bblq	2024-11-30 16:16:41.03	2024-11-30 16:16:41.03
cm44dkm6e000wevnc6ukqa0fv	Curso de Python. POO I. Vídeo 24 de pildorasinformaticas 295.184 visualizaciones hace 7 años 14 minutos y 20 segundos	14.2	python-27.mp4	<h3>Curso de Python. POO I. Vídeo 24 de pildorasinformaticas 295.184 visualizaciones hace 7 años 14 minutos y 20 segundos</h3>	cm44dkm6e000pevncbey7bblq	2024-11-30 16:16:41.03	2024-11-30 16:16:41.03
cm44dkm6e000xevncvfl6c2fd	Curso de Python. POO II. Vídeo 25 de pildorasinformaticas 248.283 visualizaciones hace 7 años 14 minutos y 59 segundos	14.59	python-28.mp4	<h3>Curso de Python. POO II. Vídeo 25 de pildorasinformaticas 248.283 visualizaciones hace 7 años 14 minutos y 59 segundos</h3>	cm44dkm6e000pevncbey7bblq	2024-11-30 16:16:41.03	2024-11-30 16:16:41.03
cm44dkm6e000yevnc2153av5z	Curso de Python. POO III. Vídeo 26 de pildorasinformaticas 291.412 visualizaciones hace 7 años 20 minutos	20.36	python-29.mp4	<h3>Curso de Python. POO III. Vídeo 26 de pildorasinformaticas 291.412 visualizaciones hace 7 años 20 minutos</h3>	cm44dkm6e000pevncbey7bblq	2024-11-30 16:16:41.03	2024-11-30 16:16:41.03
cm44dkm6e000zevnc6wf3836g	Curso de Python. POO IV. Vídeo 27 de pildorasinformaticas 273.158 visualizaciones hace 7 años 21 minutos	21.11	python-30.mp4	<h3>Curso de Python. POO IV. Vídeo 27 de pildorasinformaticas 273.158 visualizaciones hace 7 años 21 minutos</h3>	cm44dkm6e000pevncbey7bblq	2024-11-30 16:16:41.03	2024-11-30 16:16:41.03
cm44dkm6e0010evnc62jcxd79	Curso de Python. POO V. Vídeo 28 de pildorasinformaticas 232.131 visualizaciones hace 7 años 21 minutos	21.13	python-31.mp4	<h3>Curso de Python. POO V. Vídeo 28 de pildorasinformaticas 232.131 visualizaciones hace 7 años 21 minutos</h3>	cm44dkm6e000pevncbey7bblq	2024-11-30 16:16:41.03	2024-11-30 16:16:41.03
cm44dkm6e0011evncznc7k7d7	Curso de Python. POO VI. Herencia. Vídeo 29 de pildorasinformaticas 230.881 visualizaciones hace 7 años 20 minutos	20.12	python-32.mp4	<h3>Curso de Python. POO VI. Herencia. Vídeo 29 de pildorasinformaticas 230.881 visualizaciones hace 7 años 20 minutos</h3>	cm44dkm6e000pevncbey7bblq	2024-11-30 16:16:41.03	2024-11-30 16:16:41.03
cm44dkm6e0012evncieqqublg	Curso de Python. POO VII  Herencia II. Vídeo 30 de pildorasinformaticas 199.649 visualizaciones hace 7 años 23 minutos	23.59	python-33.mp4	<h3>Curso de Python. POO VII  Herencia II. Vídeo 30 de pildorasinformaticas 199.649 visualizaciones hace 7 años 23 minutos</h3>	cm44dkm6e000pevncbey7bblq	2024-11-30 16:16:41.03	2024-11-30 16:16:41.03
cm44dkm6e0013evnch4l59bjp	Curso de Python. POO VIII. Herencia III. Vídeo 31 de pildorasinformaticas 188.685 visualizaciones hace 7 años 26 minutos	26.19	python-34.mp4	<h3>Curso de Python. POO VIII. Herencia III. Vídeo 31 de pildorasinformaticas 188.685 visualizaciones hace 7 años 26 minutos</h3>	cm44dkm6e000pevncbey7bblq	2024-11-30 16:16:41.03	2024-11-30 16:16:41.03
cm44dkm6e0014evncrfwsv9gx	Curso de Python  POO IX. Polimorfismo. Vídeo 32 de pildorasinformaticas 160.002 visualizaciones hace 7 años 11 minutos y 13 segundos	11.13	python-35.mp4	<h3>Curso de Python  POO IX. Polimorfismo. Vídeo 32 de pildorasinformaticas 160.002 visualizaciones hace 7 años 11 minutos y 13 segundos</h3>	cm44dkm6e000pevncbey7bblq	2024-11-30 16:16:41.03	2024-11-30 16:16:41.03
cm44dkm6e0015evncvm0dqtgm	Curso de Python. Métodos de cadenas. Vídeo 33 de pildorasinformaticas 172.821 visualizaciones hace 7 años 13 minutos y 16 segundos	13.16	python-36.mp4	<h3>Curso de Python. Métodos de cadenas. Vídeo 33 de pildorasinformaticas 172.821 visualizaciones hace 7 años 13 minutos y 16 segundos</h3>	cm44dkm6e000pevncbey7bblq	2024-11-30 16:16:41.03	2024-11-30 16:16:41.03
cm44dkm6e0016evnc38rjk3rl	Curso de Python. Módulos. Vídeo 34 de pildorasinformaticas 229.812 visualizaciones hace 7 años 18 minutos	18	python-37.mp4	<h3>Curso de Python. Módulos. Vídeo 34 de pildorasinformaticas 229.812 visualizaciones hace 7 años 18 minutos</h3>	cm44dkm6e000pevncbey7bblq	2024-11-30 16:16:41.03	2024-11-30 16:16:41.03
cm44dkm6e0017evncoznfppuw	Curso de Python. Paquetes. Vídeo 35 de pildorasinformaticas 163.942 visualizaciones hace 7 años 14 minutos y 32 segundos	14.32	python-38.mp4	<h3>Curso de Python. Paquetes. Vídeo 35 de pildorasinformaticas 163.942 visualizaciones hace 7 años 14 minutos y 32 segundos</h3>	cm44dkm6e000pevncbey7bblq	2024-11-30 16:16:41.03	2024-11-30 16:16:41.03
cm44dkm6e0018evncciq9j3tx	Curso de Python. Paquetes distribuibles. Vídeo 36 de pildorasinformaticas 144.663 visualizaciones hace 7 años 16 minutos	16.02	python-39.mp4	<h3>Curso de Python. Paquetes distribuibles. Vídeo 36 de pildorasinformaticas 144.663 visualizaciones hace 7 años 16 minutos</h3>	cm44dkm6e000pevncbey7bblq	2024-11-30 16:16:41.03	2024-11-30 16:16:41.03
cm44dkm6e0019evnc328xic79	Curso Python. Archivos externos I. Vídeo 37 de pildorasinformaticas 301.051 visualizaciones hace 7 años 15 minutos	15.36	python-40.mp4	<h3>Curso Python. Archivos externos I. Vídeo 37 de pildorasinformaticas 301.051 visualizaciones hace 7 años 15 minutos</h3>	cm44dkm6e000pevncbey7bblq	2024-11-30 16:16:41.03	2024-11-30 16:16:41.03
cm44dkm6j001cevncrp61qk7t	Curso Python. Archivos externos II. Vídeo 38 de pildorasinformaticas 150.110 visualizaciones hace 7 años 14 minutos y 15 segundos	14.15	python-41.mp4	<h3>Curso Python. Archivos externos II. Vídeo 38 de pildorasinformaticas 150.110 visualizaciones hace 7 años 14 minutos y 15 segundos</h3>	cm44dkm6j001bevncu9ngwyez	2024-11-30 16:16:41.035	2024-11-30 16:16:41.035
cm44dkm6j001devncqoo4haqb	Curso Python. Serialización I. Vídeo 39 de pildorasinformaticas 133.237 visualizaciones hace 6 años 7 minutos y 54 segundos	7.54	python-42.mp4	<h3>Curso Python. Serialización I. Vídeo 39 de pildorasinformaticas 133.237 visualizaciones hace 6 años 7 minutos y 54 segundos</h3>	cm44dkm6j001bevncu9ngwyez	2024-11-30 16:16:41.035	2024-11-30 16:16:41.035
cm44dkm6j001eevncrlwmnbo2	Curso Python. Serialización II. Vídeo 40 de pildorasinformaticas 106.164 visualizaciones hace 6 años 10 minutos y 56 segundos	10.56	python-43.mp4	<h3>Curso Python. Serialización II. Vídeo 40 de pildorasinformaticas 106.164 visualizaciones hace 6 años 10 minutos y 56 segundos</h3>	cm44dkm6j001bevncu9ngwyez	2024-11-30 16:16:41.035	2024-11-30 16:16:41.035
cm44dkm6j001fevnc7jy5cprn	Curso Python. Guardado permanente. Vídeo 41 de pildorasinformaticas 128.753 visualizaciones hace 6 años 23 minutos	23.31	python-44.mp4	<h3>Curso Python. Guardado permanente. Vídeo 41 de pildorasinformaticas 128.753 visualizaciones hace 6 años 23 minutos</h3>	cm44dkm6j001bevncu9ngwyez	2024-11-30 16:16:41.035	2024-11-30 16:16:41.035
cm44dkm6j001gevncjoo5a7os	Curso Python. Interfaces gráficas I. Vídeo 42 de pildorasinformaticas 751.299 visualizaciones hace 6 años 16 minutos	16.09	python-45.mp4	<h3>Curso Python. Interfaces gráficas I. Vídeo 42 de pildorasinformaticas 751.299 visualizaciones hace 6 años 16 minutos</h3>	cm44dkm6j001bevncu9ngwyez	2024-11-30 16:16:41.035	2024-11-30 16:16:41.035
cm44dkm6j001hevnctccpkth9	Curso Python. Interfaces gráficas II. Vídeo 43 de pildorasinformaticas 339.780 visualizaciones hace 6 años 16 minutos	16.45	python-46.mp4	<h3>Curso Python. Interfaces gráficas II. Vídeo 43 de pildorasinformaticas 339.780 visualizaciones hace 6 años 16 minutos</h3>	cm44dkm6j001bevncu9ngwyez	2024-11-30 16:16:41.035	2024-11-30 16:16:41.035
cm44dkm6j001ievncg5p92ger	Curso Python. Interfaces gráficas III. Vídeo 44 de pildorasinformaticas 258.800 visualizaciones hace 6 años 11 minutos y 52 segundos	11.52	python-47.mp4	<h3>Curso Python. Interfaces gráficas III. Vídeo 44 de pildorasinformaticas 258.800 visualizaciones hace 6 años 11 minutos y 52 segundos</h3>	cm44dkm6j001bevncu9ngwyez	2024-11-30 16:16:41.035	2024-11-30 16:16:41.035
cm44dkm6j001jevnce4ztbuwn	Curso Python. Interfaces gráficas IV. Vídeo 45 de pildorasinformaticas 246.382 visualizaciones hace 6 años 25 minutos	25.17	python-48.mp4	<h3>Curso Python. Interfaces gráficas IV. Vídeo 45 de pildorasinformaticas 246.382 visualizaciones hace 6 años 25 minutos</h3>	cm44dkm6j001bevncu9ngwyez	2024-11-30 16:16:41.035	2024-11-30 16:16:41.035
cm44dkm6j001kevnc8u711g0x	Curso Python. Interfaces gráficas V. Vídeo 46 de pildorasinformaticas 214.326 visualizaciones hace 6 años 20 minutos	20.1	python-49.mp4	<h3>Curso Python. Interfaces gráficas V. Vídeo 46 de pildorasinformaticas 214.326 visualizaciones hace 6 años 20 minutos</h3>	cm44dkm6j001bevncu9ngwyez	2024-11-30 16:16:41.035	2024-11-30 16:16:41.035
cm44dkm6j001levnco7ma542s	Curso Python. Interfaces gráficas VI. Vídeo 47 de pildorasinformaticas 165.946 visualizaciones hace 6 años 15 minutos	15.2	python-50.mp4	<h3>Curso Python. Interfaces gráficas VI. Vídeo 47 de pildorasinformaticas 165.946 visualizaciones hace 6 años 15 minutos</h3>	cm44dkm6j001bevncu9ngwyez	2024-11-30 16:16:41.035	2024-11-30 16:16:41.035
cm44dkm6j001mevnck7mg9kt5	Curso Python. Interfaces gráficas VII. Vídeo 48 de pildorasinformaticas 150.875 visualizaciones hace 6 años 13 minutos y 42 segundos	13.42	python-51.mp4	<h3>Curso Python. Interfaces gráficas VII. Vídeo 48 de pildorasinformaticas 150.875 visualizaciones hace 6 años 13 minutos y 42 segundos</h3>	cm44dkm6j001bevncu9ngwyez	2024-11-30 16:16:41.035	2024-11-30 16:16:41.035
cm44dkm6j001nevncpacnlu1k	Curso Python. Interfaces gráficas VIII. Vídeo 49 de pildorasinformaticas 147.576 visualizaciones hace 6 años 20 minutos	20.36	python-52.mp4	<h3>Curso Python. Interfaces gráficas VIII. Vídeo 49 de pildorasinformaticas 147.576 visualizaciones hace 6 años 20 minutos</h3>	cm44dkm6j001bevncu9ngwyez	2024-11-30 16:16:41.035	2024-11-30 16:16:41.035
cm44dkm6j001oevncqtj82pjy	Curso Python. Interfaces gráficas IX. Vídeo 50 de pildorasinformaticas 132.675 visualizaciones hace 6 años 12 minutos y 22 segundos	12.22	python-53.mp4	<h3>Curso Python. Interfaces gráficas IX. Vídeo 50 de pildorasinformaticas 132.675 visualizaciones hace 6 años 12 minutos y 22 segundos</h3>	cm44dkm6j001bevncu9ngwyez	2024-11-30 16:16:41.035	2024-11-30 16:16:41.035
cm44dkm6j001pevnc4nf4n1ib	Curso Python. Interfaces gráficas X. Vídeo 51 de pildorasinformaticas 112.041 visualizaciones hace 6 años 13 minutos y 28 segundos	13.28	python-54.mp4	<h3>Curso Python. Interfaces gráficas X. Vídeo 51 de pildorasinformaticas 112.041 visualizaciones hace 6 años 13 minutos y 28 segundos</h3>	cm44dkm6j001bevncu9ngwyez	2024-11-30 16:16:41.035	2024-11-30 16:16:41.035
cm44dkm6j001qevncoarjdwk8	Curso Python. Interfaces gráficas XI. Vídeo 52 de pildorasinformaticas 107.191 visualizaciones hace 6 años 12 minutos y 51 segundos	12.51	python-55.mp4	<h3>Curso Python. Interfaces gráficas XI. Vídeo 52 de pildorasinformaticas 107.191 visualizaciones hace 6 años 12 minutos y 51 segundos</h3>	cm44dkm6j001bevncu9ngwyez	2024-11-30 16:16:41.035	2024-11-30 16:16:41.035
cm44dkm6j001revnc5u2lzxt9	Curso Python. Interfaces gráficas XII. Vídeo 53 de pildorasinformaticas 105.276 visualizaciones hace 6 años 15 minutos	15.35	python-56.mp4	<h3>Curso Python. Interfaces gráficas XII. Vídeo 53 de pildorasinformaticas 105.276 visualizaciones hace 6 años 15 minutos</h3>	cm44dkm6j001bevncu9ngwyez	2024-11-30 16:16:41.035	2024-11-30 16:16:41.035
cm44dkm6j001sevncb0815sfx	Curso Python. Interfaces gráficas XIII. Vídeo 54 de pildorasinformaticas 119.442 visualizaciones hace 6 años 12 minutos y 13 segundos	12.13	python-57.mp4	<h3>Curso Python. Interfaces gráficas XIII. Vídeo 54 de pildorasinformaticas 119.442 visualizaciones hace 6 años 12 minutos y 13 segundos</h3>	cm44dkm6j001bevncu9ngwyez	2024-11-30 16:16:41.035	2024-11-30 16:16:41.035
cm44dkm6j001tevncsydrm1bb	Curso Python. BBDD I. Vídeo 55 de pildorasinformaticas 214.112 visualizaciones hace 6 años 17 minutos	17.13	python-58.mp4	<h3>Curso Python. BBDD I. Vídeo 55 de pildorasinformaticas 214.112 visualizaciones hace 6 años 17 minutos</h3>	cm44dkm6j001bevncu9ngwyez	2024-11-30 16:16:41.035	2024-11-30 16:16:41.035
cm44dkm6j001uevnc0cogg73f	Curso Python. BBDD II. Vídeo 56 de pildorasinformaticas 108.915 visualizaciones hace 6 años 10 minutos y 14 segundos	10.14	python-59.mp4	<h3>Curso Python. BBDD II. Vídeo 56 de pildorasinformaticas 108.915 visualizaciones hace 6 años 10 minutos y 14 segundos</h3>	cm44dkm6j001bevncu9ngwyez	2024-11-30 16:16:41.035	2024-11-30 16:16:41.035
cm44dkm6j001vevncvnsgwnt6	Curso Python. BBDD III. Vídeo 57 de pildorasinformaticas 92.675 visualizaciones hace 6 años 13 minutos y 49 segundos	13.49	python-60.mp4	<h3>Curso Python. BBDD III. Vídeo 57 de pildorasinformaticas 92.675 visualizaciones hace 6 años 13 minutos y 49 segundos</h3>	cm44dkm6j001bevncu9ngwyez	2024-11-30 16:16:41.035	2024-11-30 16:16:41.035
cm44dkm6n001yevnctsvlo4hr	Curso Python. BBDD IV. Vídeo 58 de pildorasinformaticas 86.243 visualizaciones hace 6 años 13 minutos y 53 segundos	13.53	python-61.mp4	<h3>Curso Python. BBDD IV. Vídeo 58 de pildorasinformaticas 86.243 visualizaciones hace 6 años 13 minutos y 53 segundos</h3>	cm44dkm6n001xevncupazsh1n	2024-11-30 16:16:41.04	2024-11-30 16:16:41.04
cm44dkm6n001zevnchhhsklzr	Curso Python. Práctica guiada I. Vídeo 59 de pildorasinformaticas 107.992 visualizaciones hace 6 años 14 minutos y 12 segundos	14.12	python-62.mp4	<h3>Curso Python. Práctica guiada I. Vídeo 59 de pildorasinformaticas 107.992 visualizaciones hace 6 años 14 minutos y 12 segundos</h3>	cm44dkm6n001xevncupazsh1n	2024-11-30 16:16:41.04	2024-11-30 16:16:41.04
cm44dkm6n0020evnckxswj11g	Curso Python. Práctica guiada II. Vídeo 60 de pildorasinformaticas 79.315 visualizaciones hace 6 años 19 minutos	19.43	python-63.mp4	<h3>Curso Python. Práctica guiada II. Vídeo 60 de pildorasinformaticas 79.315 visualizaciones hace 6 años 19 minutos</h3>	cm44dkm6n001xevncupazsh1n	2024-11-30 16:16:41.04	2024-11-30 16:16:41.04
cm44dkm6n0021evncxae30u3z	Curso Python. Práctica guiada III. Vídeo 61 de pildorasinformaticas 59.630 visualizaciones hace 6 años 9 minutos y 1 segundo	9.01	python-64.mp4	<h3>Curso Python. Práctica guiada III. Vídeo 61 de pildorasinformaticas 59.630 visualizaciones hace 6 años 9 minutos y 1 segundo</h3>	cm44dkm6n001xevncupazsh1n	2024-11-30 16:16:41.04	2024-11-30 16:16:41.04
cm44dnqsq0006evg4z3sprjx0	Curso C#. Sintaxis básica I. Vídeo 3 de pildorasinformaticas 299.542 visualizaciones hace 6 años 21 minutos	21.33	csharp-03.mp4	<h3>Curso C#. Sintaxis básica I. Vídeo 3 de pildorasinformaticas 299.542 visualizaciones hace 6 años 21 minutos</h3>	cm44dnqsq0003evg4yuoxbqnn	2024-11-30 16:19:06.987	2024-11-30 16:19:06.987
cm44dkm6n0022evnclqgkonpd	Curso Python. Práctica guiada IV. Vídeo 62 de pildorasinformaticas 59.800 visualizaciones hace 6 años 11 minutos y 40 segundos	11.4	python-65.mp4	<h3>Curso Python. Práctica guiada IV. Vídeo 62 de pildorasinformaticas 59.800 visualizaciones hace 6 años 11 minutos y 40 segundos</h3>	cm44dkm6n001xevncupazsh1n	2024-11-30 16:16:41.04	2024-11-30 16:16:41.04
cm44dkm6n0023evncvliplu6j	Curso Python. Práctica guiada V. Vídeo 63 de pildorasinformaticas 61.513 visualizaciones hace 6 años 15 minutos	15.09	python-66.mp4	<h3>Curso Python. Práctica guiada V. Vídeo 63 de pildorasinformaticas 61.513 visualizaciones hace 6 años 15 minutos</h3>	cm44dkm6n001xevncupazsh1n	2024-11-30 16:16:41.04	2024-11-30 16:16:41.04
cm44dkm6n0024evnc1612q5b0	Curso Python. Práctica guiada VI. Vídeo 64 de pildorasinformaticas 57.214 visualizaciones hace 6 años 15 minutos	15.56	python-67.mp4	<h3>Curso Python. Práctica guiada VI. Vídeo 64 de pildorasinformaticas 57.214 visualizaciones hace 6 años 15 minutos</h3>	cm44dkm6n001xevncupazsh1n	2024-11-30 16:16:41.04	2024-11-30 16:16:41.04
cm44dkm6n0025evnc0w0uu2e6	Curso Python. Práctica guiada VII. Vídeo 65 de pildorasinformaticas 60.511 visualizaciones hace 6 años 15 minutos	15.35	python-68.mp4	<h3>Curso Python. Práctica guiada VII. Vídeo 65 de pildorasinformaticas 60.511 visualizaciones hace 6 años 15 minutos</h3>	cm44dkm6n001xevncupazsh1n	2024-11-30 16:16:41.04	2024-11-30 16:16:41.04
cm44dkm6n0026evnc6atbmadk	Curso Python. Funciones Lambda. Vídeo 66 de pildorasinformaticas 104.605 visualizaciones hace 6 años 13 minutos y 43 segundos	13.43	python-69.mp4	<h3>Curso Python. Funciones Lambda. Vídeo 66 de pildorasinformaticas 104.605 visualizaciones hace 6 años 13 minutos y 43 segundos</h3>	cm44dkm6n001xevncupazsh1n	2024-11-30 16:16:41.04	2024-11-30 16:16:41.04
cm44dkm6n0027evnc49d4okby	Curso Python. Función Filter. Vídeo 67 de pildorasinformaticas 70.501 visualizaciones hace 6 años 11 minutos y 20 segundos	11.2	python-70.mp4	<h3>Curso Python. Función Filter. Vídeo 67 de pildorasinformaticas 70.501 visualizaciones hace 6 años 11 minutos y 20 segundos</h3>	cm44dkm6n001xevncupazsh1n	2024-11-30 16:16:41.04	2024-11-30 16:16:41.04
cm44dkm6n0028evnc04e674ql	Curso Python. Función Map. Vídeo 68 de pildorasinformaticas 72.429 visualizaciones hace 6 años 8 minutos y 11 segundos	8.11	python-71.mp4	<h3>Curso Python. Función Map. Vídeo 68 de pildorasinformaticas 72.429 visualizaciones hace 6 años 8 minutos y 11 segundos</h3>	cm44dkm6n001xevncupazsh1n	2024-11-30 16:16:41.04	2024-11-30 16:16:41.04
cm44dkm6n0029evncodsa47yr	Curso Python. Expresiones regulares I. Vídeo 69 de pildorasinformaticas 90.572 visualizaciones hace 6 años 12 minutos y 31 segundos	12.31	python-72.mp4	<h3>Curso Python. Expresiones regulares I. Vídeo 69 de pildorasinformaticas 90.572 visualizaciones hace 6 años 12 minutos y 31 segundos</h3>	cm44dkm6n001xevncupazsh1n	2024-11-30 16:16:41.04	2024-11-30 16:16:41.04
cm44dkm6n002aevncrvy2gqaj	Curso Python. Expresiones regulares II. Vídeo 70 de pildorasinformaticas 60.414 visualizaciones hace 6 años 11 minutos y 33 segundos	11.33	python-73.mp4	<h3>Curso Python. Expresiones regulares II. Vídeo 70 de pildorasinformaticas 60.414 visualizaciones hace 6 años 11 minutos y 33 segundos</h3>	cm44dkm6n001xevncupazsh1n	2024-11-30 16:16:41.04	2024-11-30 16:16:41.04
cm44dkm6n002bevncumouoth7	Curso Python. Expresiones regulares III. Vídeo 71 de pildorasinformaticas 50.540 visualizaciones hace 6 años 7 minutos y 46 segundos	7.46	python-74.mp4	<h3>Curso Python. Expresiones regulares III. Vídeo 71 de pildorasinformaticas 50.540 visualizaciones hace 6 años 7 minutos y 46 segundos</h3>	cm44dkm6n001xevncupazsh1n	2024-11-30 16:16:41.04	2024-11-30 16:16:41.04
cm44dkm6n002cevncry8iurel	Curso Python. Expresiones regulares IV. Vídeo 72 de pildorasinformaticas 48.570 visualizaciones hace 6 años 11 minutos y 53 segundos	11.53	python-75.mp4	<h3>Curso Python. Expresiones regulares IV. Vídeo 72 de pildorasinformaticas 48.570 visualizaciones hace 6 años 11 minutos y 53 segundos</h3>	cm44dkm6n001xevncupazsh1n	2024-11-30 16:16:41.04	2024-11-30 16:16:41.04
cm44dkm6n002devncfn3q5hfu	Curso Python. Decoradores I. Vídeo 73 de pildorasinformaticas 90.003 visualizaciones hace 6 años 14 minutos y 19 segundos	14.19	python-76.mp4	<h3>Curso Python. Decoradores I. Vídeo 73 de pildorasinformaticas 90.003 visualizaciones hace 6 años 14 minutos y 19 segundos</h3>	cm44dkm6n001xevncupazsh1n	2024-11-30 16:16:41.04	2024-11-30 16:16:41.04
cm44dkm6n002eevncic1acku8	Curso Python. Decoradores II. Vídeo 74 de pildorasinformaticas 59.124 visualizaciones hace 6 años 7 minutos y 10 segundos	7.1	python-77.mp4	<h3>Curso Python. Decoradores II. Vídeo 74 de pildorasinformaticas 59.124 visualizaciones hace 6 años 7 minutos y 10 segundos</h3>	cm44dkm6n001xevncupazsh1n	2024-11-30 16:16:41.04	2024-11-30 16:16:41.04
cm44dkm6n002fevncmz979ooi	Curso Python. Funciones decoradoras II. Corrección olvido. Vídeo 74b de pildorasinformaticas 44.989 visualizaciones hace 6 años 58 segundos	0.58	python-78.mp4	<h3>Curso Python. Funciones decoradoras II. Corrección olvido. Vídeo 74b de pildorasinformaticas 44.989 visualizaciones hace 6 años 58 segundos</h3>	cm44dkm6n001xevncupazsh1n	2024-11-30 16:16:41.04	2024-11-30 16:16:41.04
cm44dkm6n002gevnc1qakjh5q	Curso Python. Documentación. Vídeo 75 de pildorasinformaticas 60.811 visualizaciones hace 6 años 11 minutos y 22 segundos	11.22	python-79.mp4	<h3>Curso Python. Documentación. Vídeo 75 de pildorasinformaticas 60.811 visualizaciones hace 6 años 11 minutos y 22 segundos</h3>	cm44dkm6n001xevncupazsh1n	2024-11-30 16:16:41.04	2024-11-30 16:16:41.04
cm44dkm6n002hevnctvcur4jt	Curso de Python. Documentación y pruebas. Vídeo 76 de pildorasinformaticas 57.784 visualizaciones hace 5 años 19 minutos	19.47	python-80.mp4	<h3>Curso de Python. Documentación y pruebas. Vídeo 76 de pildorasinformaticas 57.784 visualizaciones hace 5 años 19 minutos</h3>	cm44dkm6n001xevncupazsh1n	2024-11-30 16:16:41.04	2024-11-30 16:16:41.04
cm44dkm6r002kevncvczfdy1o	Curso de Python. Documentación y pruebas II. Vídeo 77 de pildorasinformaticas 58.267 visualizaciones hace 5 años 17 minutos	17.28	python-81.mp4	<h3>Curso de Python. Documentación y pruebas II. Vídeo 77 de pildorasinformaticas 58.267 visualizaciones hace 5 años 17 minutos</h3>	cm44dkm6r002jevnc6pd7pk0c	2024-11-30 16:16:41.043	2024-11-30 16:16:41.043
cm44dkm6r002levnc7dqstyzn	Curso Python. Generar ejecutables. Fin de curso. Vídeo 78 de pildorasinformaticas 305.355 visualizaciones hace 5 años 8 minutos y 59 segundos	8.59	python-82.mp4	<h3>Curso Python. Generar ejecutables. Fin de curso. Vídeo 78 de pildorasinformaticas 305.355 visualizaciones hace 5 años 8 minutos y 59 segundos</h3>	cm44dkm6r002jevnc6pd7pk0c	2024-11-30 16:16:41.043	2024-11-30 16:16:41.043
cm44dnqsq0004evg4tdv9umul	Curso C#. Presentación. Vídeo 1 de pildorasinformaticas 1.110.481 visualizaciones hace 6 años 10 minutos y 4 segundos	10.04	csharp-01.mp4	<h3>Curso C#. Presentación. Vídeo 1 de pildorasinformaticas 1.110.481 visualizaciones hace 6 años 10 minutos y 4 segundos</h3>	cm44dnqsq0003evg4yuoxbqnn	2024-11-30 16:19:06.987	2024-11-30 16:19:06.987
cm44dnqsq0005evg42h7m314o	Curso C #. Primera aplicación. Vídeo 2 de pildorasinformaticas 470.985 visualizaciones hace 6 años 21 minutos	21.38	csharp-02.mp4	<h3>Curso C #. Primera aplicación. Vídeo 2 de pildorasinformaticas 470.985 visualizaciones hace 6 años 21 minutos</h3>	cm44dnqsq0003evg4yuoxbqnn	2024-11-30 16:19:06.987	2024-11-30 16:19:06.987
cm44dnqsq0007evg4ed7wfebe	Curso C#. Sintaxis básica II. Vídeo 4 de pildorasinformaticas 235.800 visualizaciones hace 6 años 24 minutos	24.52	csharp-04.mp4	<h3>Curso C#. Sintaxis básica II. Vídeo 4 de pildorasinformaticas 235.800 visualizaciones hace 6 años 24 minutos</h3>	cm44dnqsq0003evg4yuoxbqnn	2024-11-30 16:19:06.987	2024-11-30 16:19:06.987
cm44dnqsq0008evg4ovmwf09j	Curso C#. Sintaxis básica III. Vídeo 5 de pildorasinformaticas 191.678 visualizaciones hace 6 años 16 minutos	16.39	csharp-05.mp4	<h3>Curso C#. Sintaxis básica III. Vídeo 5 de pildorasinformaticas 191.678 visualizaciones hace 6 años 16 minutos</h3>	cm44dnqsq0003evg4yuoxbqnn	2024-11-30 16:19:06.987	2024-11-30 16:19:06.987
cm44dnqsq0009evg4djrpjbr3	Curso C#. Sintaxis básica IV. Vídeo 6 de pildorasinformaticas 182.857 visualizaciones hace 6 años 18 minutos	18.32	csharp-06.mp4	<h3>Curso C#. Sintaxis básica IV. Vídeo 6 de pildorasinformaticas 182.857 visualizaciones hace 6 años 18 minutos</h3>	cm44dnqsq0003evg4yuoxbqnn	2024-11-30 16:19:06.987	2024-11-30 16:19:06.987
cm44dnqsq000aevg4v7wmu5u7	Curso C#. Sintaxis básica V. Vídeo 7 de pildorasinformaticas 156.320 visualizaciones hace 6 años 13 minutos y 33 segundos	13.33	csharp-07.mp4	<h3>Curso C#. Sintaxis básica V. Vídeo 7 de pildorasinformaticas 156.320 visualizaciones hace 6 años 13 minutos y 33 segundos</h3>	cm44dnqsq0003evg4yuoxbqnn	2024-11-30 16:19:06.987	2024-11-30 16:19:06.987
cm44dnqsq000bevg4a070kd0k	Curso C#. Sintaxis básica. Uso de constantes. Vídeo 8 de pildorasinformaticas 148.957 visualizaciones hace 6 años 18 minutos	18.22	csharp-08.mp4	<h3>Curso C#. Sintaxis básica. Uso de constantes. Vídeo 8 de pildorasinformaticas 148.957 visualizaciones hace 6 años 18 minutos</h3>	cm44dnqsq0003evg4yuoxbqnn	2024-11-30 16:19:06.987	2024-11-30 16:19:06.987
cm44dnqsq000cevg4zd98yksm	Curso C#. Métodos I. Vídeo 9 de pildorasinformaticas 180.635 visualizaciones hace 6 años 16 minutos	16.44	csharp-09.mp4	<h3>Curso C#. Métodos I. Vídeo 9 de pildorasinformaticas 180.635 visualizaciones hace 6 años 16 minutos</h3>	cm44dnqsq0003evg4yuoxbqnn	2024-11-30 16:19:06.987	2024-11-30 16:19:06.987
cm44dnqsq000devg49vnp9pqx	Curso C#. Métodos II. Vídeo 10 de pildorasinformaticas 155.206 visualizaciones hace 6 años 19 minutos	19.18	csharp-10.mp4	<h3>Curso C#. Métodos II. Vídeo 10 de pildorasinformaticas 155.206 visualizaciones hace 6 años 19 minutos</h3>	cm44dnqsq0003evg4yuoxbqnn	2024-11-30 16:19:06.987	2024-11-30 16:19:06.987
cm44dnqsq000eevg4z708lpjl	Curso C#. Métodos III. Métodos return. Vídeo 11 de pildorasinformaticas 145.593 visualizaciones hace 6 años 18 minutos	18.27	csharp-11.mp4	<h3>Curso C#. Métodos III. Métodos return. Vídeo 11 de pildorasinformaticas 145.593 visualizaciones hace 6 años 18 minutos</h3>	cm44dnqsq0003evg4yuoxbqnn	2024-11-30 16:19:06.987	2024-11-30 16:19:06.987
cm44dnqsq000fevg4b907kkng	Curso C#. Métodos IV. Ámbito y sobrecarga. Vídeo 12 de pildorasinformaticas 126.265 visualizaciones hace 6 años 23 minutos	23.12	csharp-12.mp4	<h3>Curso C#. Métodos IV. Ámbito y sobrecarga. Vídeo 12 de pildorasinformaticas 126.265 visualizaciones hace 6 años 23 minutos</h3>	cm44dnqsq0003evg4yuoxbqnn	2024-11-30 16:19:06.987	2024-11-30 16:19:06.987
cm44dnqsq000gevg4qzkaij8u	Curso C#. Métodos V. Parámetros opcionales. Vídeo 13 de pildorasinformaticas 117.224 visualizaciones hace 6 años 19 minutos	19.11	csharp-13.mp4	<h3>Curso C#. Métodos V. Parámetros opcionales. Vídeo 13 de pildorasinformaticas 117.224 visualizaciones hace 6 años 19 minutos</h3>	cm44dnqsq0003evg4yuoxbqnn	2024-11-30 16:19:06.987	2024-11-30 16:19:06.987
cm44dnqsq000hevg4tcts8p7y	Curso C#. Condicional IF I. Vídeo 14 de pildorasinformaticas 106.512 visualizaciones hace 6 años 14 minutos y 53 segundos	14.53	csharp-14.mp4	<h3>Curso C#. Condicional IF I. Vídeo 14 de pildorasinformaticas 106.512 visualizaciones hace 6 años 14 minutos y 53 segundos</h3>	cm44dnqsq0003evg4yuoxbqnn	2024-11-30 16:19:06.987	2024-11-30 16:19:06.987
cm44dnqsq000ievg4y0l02jyb	Curso C#. Condicional IF II. Vídeo 15 de pildorasinformaticas 89.331 visualizaciones hace 6 años 21 minutos	21.41	csharp-15.mp4	<h3>Curso C#. Condicional IF II. Vídeo 15 de pildorasinformaticas 89.331 visualizaciones hace 6 años 21 minutos</h3>	cm44dnqsq0003evg4yuoxbqnn	2024-11-30 16:19:06.987	2024-11-30 16:19:06.987
cm44dnqsq000jevg4d4el3vs5	Curso C#. Condicional IF III. Vídeo 16 de pildorasinformaticas 84.865 visualizaciones hace 6 años 23 minutos	23.47	csharp-16.mp4	<h3>Curso C#. Condicional IF III. Vídeo 16 de pildorasinformaticas 84.865 visualizaciones hace 6 años 23 minutos</h3>	cm44dnqsq0003evg4yuoxbqnn	2024-11-30 16:19:06.987	2024-11-30 16:19:06.987
cm44dnqsq000kevg4e3v7jyfd	Curso C#. Condicional IF IV. Vídeo 17 de pildorasinformaticas 66.462 visualizaciones hace 6 años 9 minutos y 30 segundos	9.3	csharp-17.mp4	<h3>Curso C#. Condicional IF IV. Vídeo 17 de pildorasinformaticas 66.462 visualizaciones hace 6 años 9 minutos y 30 segundos</h3>	cm44dnqsq0003evg4yuoxbqnn	2024-11-30 16:19:06.987	2024-11-30 16:19:06.987
cm44dnqsq000levg410yllfdf	Curso C#. Condicional switch. Vídeo 18 de pildorasinformaticas 98.509 visualizaciones hace 6 años 18 minutos	18.53	csharp-18.mp4	<h3>Curso C#. Condicional switch. Vídeo 18 de pildorasinformaticas 98.509 visualizaciones hace 6 años 18 minutos</h3>	cm44dnqsq0003evg4yuoxbqnn	2024-11-30 16:19:06.987	2024-11-30 16:19:06.987
cm44dnqsq000mevg44jwoi8yw	Curso C#. Bucle While. Vídeo 19 de pildorasinformaticas 110.252 visualizaciones hace 6 años 19 minutos	19.2	csharp-19.mp4	<h3>Curso C#. Bucle While. Vídeo 19 de pildorasinformaticas 110.252 visualizaciones hace 6 años 19 minutos</h3>	cm44dnqsq0003evg4yuoxbqnn	2024-11-30 16:19:06.987	2024-11-30 16:19:06.987
cm44dnqsq000nevg4zqc0lghp	Curso C#. Bucle While II. Vídeo 20 de pildorasinformaticas 69.441 visualizaciones hace 6 años 11 minutos y 28 segundos	11.28	csharp-20.mp4	<h3>Curso C#. Bucle While II. Vídeo 20 de pildorasinformaticas 69.441 visualizaciones hace 6 años 11 minutos y 28 segundos</h3>	cm44dnqsq0003evg4yuoxbqnn	2024-11-30 16:19:06.987	2024-11-30 16:19:06.987
cm44dnqsv000qevg4iyyd95pb	Curso C#. Bucle do While. Vídeo 21 de pildorasinformaticas 77.866 visualizaciones hace 6 años 8 minutos y 55 segundos	8.55	csharp-21.mp4	<h3>Curso C#. Bucle do While. Vídeo 21 de pildorasinformaticas 77.866 visualizaciones hace 6 años 8 minutos y 55 segundos</h3>	cm44dnqsv000pevg4i88xvfge	2024-11-30 16:19:06.992	2024-11-30 16:19:06.992
cm44dnqsv000revg4grjuz88e	Curso C#. Excepciones I. Vídeo 22 de pildorasinformaticas 109.453 visualizaciones hace 6 años 18 minutos	18.04	csharp-22.mp4	<h3>Curso C#. Excepciones I. Vídeo 22 de pildorasinformaticas 109.453 visualizaciones hace 6 años 18 minutos</h3>	cm44dnqsv000pevg4i88xvfge	2024-11-30 16:19:06.992	2024-11-30 16:19:06.992
cm44dnqsv000sevg4z33c31t6	Curso C#. Excepciones II. Captura de varias excepciones. Vídeo 23 de pildorasinformaticas 78.381 visualizaciones hace 6 años 14 minutos y 3 segundos	14.03	csharp-23.mp4	<h3>Curso C#. Excepciones II. Captura de varias excepciones. Vídeo 23 de pildorasinformaticas 78.381 visualizaciones hace 6 años 14 minutos y 3 segundos</h3>	cm44dnqsv000pevg4i88xvfge	2024-11-30 16:19:06.992	2024-11-30 16:19:06.992
cm44dnqsv000tevg4ifi9p2np	Curso C#. Excepciones III. Conflictos varias excepciones, captura con filtros. V de pildorasinformaticas 73.927 visualizaciones hace 6 años 19 minutos	19.17	csharp-24.mp4	<h3>Curso C#. Excepciones III. Conflictos varias excepciones, captura con filtros. V de pildorasinformaticas 73.927 visualizaciones hace 6 años 19 minutos</h3>	cm44dnqsv000pevg4i88xvfge	2024-11-30 16:19:06.992	2024-11-30 16:19:06.992
cm44dnqsv000uevg4wt2q3425	Curso C#. Excepciones IV. Lanzamiento de excepciones con throw. Vídeo 25 de pildorasinformaticas 76.175 visualizaciones hace 6 años 22 minutos	22.21	csharp-25.mp4	<h3>Curso C#. Excepciones IV. Lanzamiento de excepciones con throw. Vídeo 25 de pildorasinformaticas 76.175 visualizaciones hace 6 años 22 minutos</h3>	cm44dnqsv000pevg4i88xvfge	2024-11-30 16:19:06.992	2024-11-30 16:19:06.992
cm44dnqsw000vevg4ae7k42v4	Curso C#. Excepciones V. Bloque finally. Vídeo 26 de pildorasinformaticas 59.051 visualizaciones hace 6 años 13 minutos y 35 segundos	13.35	csharp-26.mp4	<h3>Curso C#. Excepciones V. Bloque finally. Vídeo 26 de pildorasinformaticas 59.051 visualizaciones hace 6 años 13 minutos y 35 segundos</h3>	cm44dnqsv000pevg4i88xvfge	2024-11-30 16:19:06.992	2024-11-30 16:19:06.992
cm44dnqsw000wevg4t022537b	Curso C#. POO. ¿Qué es la POO? Vídeo 27 de pildorasinformaticas 111.866 visualizaciones hace 6 años 27 minutos	27.18	csharp-27.mp4	<h3>Curso C#. POO. ¿Qué es la POO? Vídeo 27 de pildorasinformaticas 111.866 visualizaciones hace 6 años 27 minutos</h3>	cm44dnqsv000pevg4i88xvfge	2024-11-30 16:19:06.992	2024-11-30 16:19:06.992
cm44dnqsw000xevg4yv02iygx	Curso C#. POO II. Creación de clases e instancias. Vídeo 28 de pildorasinformaticas 143.580 visualizaciones hace 6 años 27 minutos	27.01	csharp-28.mp4	<h3>Curso C#. POO II. Creación de clases e instancias. Vídeo 28 de pildorasinformaticas 143.580 visualizaciones hace 6 años 27 minutos</h3>	cm44dnqsv000pevg4i88xvfge	2024-11-30 16:19:06.992	2024-11-30 16:19:06.992
cm44dnqsw000yevg4zclywobh	Curso C#. POO III. Encapsulación y convenciones. Vídeo 29 de pildorasinformaticas 103.298 visualizaciones hace 5 años 22 minutos	22.14	csharp-29.mp4	<h3>Curso C#. POO III. Encapsulación y convenciones. Vídeo 29 de pildorasinformaticas 103.298 visualizaciones hace 5 años 22 minutos</h3>	cm44dnqsv000pevg4i88xvfge	2024-11-30 16:19:06.992	2024-11-30 16:19:06.992
cm44dnqsw000zevg4ykbboh54	Curso C#. POO IV. Constructores. Vídeo 30 de pildorasinformaticas 111.171 visualizaciones hace 5 años 23 minutos	23.32	csharp-30.mp4	<h3>Curso C#. POO IV. Constructores. Vídeo 30 de pildorasinformaticas 111.171 visualizaciones hace 5 años 23 minutos</h3>	cm44dnqsv000pevg4i88xvfge	2024-11-30 16:19:06.992	2024-11-30 16:19:06.992
cm44dnqsw0010evg4sntxbc0b	Curso C#. POO V. Getters y Setters. Vídeo 31 de pildorasinformaticas 107.372 visualizaciones hace 5 años 26 minutos	26.29	csharp-31.mp4	<h3>Curso C#. POO V. Getters y Setters. Vídeo 31 de pildorasinformaticas 107.372 visualizaciones hace 5 años 26 minutos</h3>	cm44dnqsv000pevg4i88xvfge	2024-11-30 16:19:06.992	2024-11-30 16:19:06.992
cm44dnqsw0011evg4mvt04k0g	Curso C#. POO VI. Visual Studio y POO. Vídeo 32 de pildorasinformaticas 77.642 visualizaciones hace 5 años 21 minutos	21.21	csharp-32.mp4	<h3>Curso C#. POO VI. Visual Studio y POO. Vídeo 32 de pildorasinformaticas 77.642 visualizaciones hace 5 años 21 minutos</h3>	cm44dnqsv000pevg4i88xvfge	2024-11-30 16:19:06.992	2024-11-30 16:19:06.992
cm44dnqsw0012evg4t2qf29ju	Curso C#.  POO VII. Llamadas y clase Math. Vídeo 33 de pildorasinformaticas 69.920 visualizaciones hace 5 años 23 minutos	23.12	csharp-33.mp4	<h3>Curso C#.  POO VII. Llamadas y clase Math. Vídeo 33 de pildorasinformaticas 69.920 visualizaciones hace 5 años 23 minutos</h3>	cm44dnqsv000pevg4i88xvfge	2024-11-30 16:19:06.992	2024-11-30 16:19:06.992
cm44dnqsw0013evg4lu5pnlt7	Curso C#. POO VIII. Variables y métodos static. Vídeo 34 de pildorasinformaticas 70.611 visualizaciones hace 5 años 18 minutos	18.23	csharp-34.mp4	<h3>Curso C#. POO VIII. Variables y métodos static. Vídeo 34 de pildorasinformaticas 70.611 visualizaciones hace 5 años 18 minutos</h3>	cm44dnqsv000pevg4i88xvfge	2024-11-30 16:19:06.992	2024-11-30 16:19:06.992
cm44dnqsw0014evg4oowk1q5p	Curso C#. POO IX. Clases anónimas. Vídeo 35 de pildorasinformaticas 53.905 visualizaciones hace 5 años 14 minutos y 57 segundos	14.57	csharp-35.mp4	<h3>Curso C#. POO IX. Clases anónimas. Vídeo 35 de pildorasinformaticas 53.905 visualizaciones hace 5 años 14 minutos y 57 segundos</h3>	cm44dnqsv000pevg4i88xvfge	2024-11-30 16:19:06.992	2024-11-30 16:19:06.992
cm44dnqsw0015evg4eu82h2dd	Curso C#.  Arrays I. Vídeo 36 de pildorasinformaticas 102.352 visualizaciones hace 5 años 20 minutos	20.33	csharp-36.mp4	<h3>Curso C#.  Arrays I. Vídeo 36 de pildorasinformaticas 102.352 visualizaciones hace 5 años 20 minutos</h3>	cm44dnqsv000pevg4i88xvfge	2024-11-30 16:19:06.992	2024-11-30 16:19:06.992
cm44dnqsw0016evg43j0l66nf	Curso C#. Arrays II. Vídeo 37 de pildorasinformaticas 71.545 visualizaciones hace 5 años 13 minutos y 47 segundos	13.47	csharp-37.mp4	<h3>Curso C#. Arrays II. Vídeo 37 de pildorasinformaticas 71.545 visualizaciones hace 5 años 13 minutos y 47 segundos</h3>	cm44dnqsv000pevg4i88xvfge	2024-11-30 16:19:06.992	2024-11-30 16:19:06.992
cm44dnqsw0017evg4s24f9rsc	Curso C#.  Arrays III y bucle FOR. Vídeo 38 de pildorasinformaticas 68.808 visualizaciones hace 5 años 18 minutos	18.2	csharp-38.mp4	<h3>Curso C#.  Arrays III y bucle FOR. Vídeo 38 de pildorasinformaticas 68.808 visualizaciones hace 5 años 18 minutos</h3>	cm44dnqsv000pevg4i88xvfge	2024-11-30 16:19:06.992	2024-11-30 16:19:06.992
cm44dnqsw0018evg40pow0qdp	Curso C#.  Bucle foreach. Arrays IV. Vídeo 39 de pildorasinformaticas 67.752 visualizaciones hace 5 años 19 minutos	19.34	csharp-39.mp4	<h3>Curso C#.  Bucle foreach. Arrays IV. Vídeo 39 de pildorasinformaticas 67.752 visualizaciones hace 5 años 19 minutos</h3>	cm44dnqsv000pevg4i88xvfge	2024-11-30 16:19:06.992	2024-11-30 16:19:06.992
cm44dnqsw0019evg4a9n2v13t	Curso C#. Arrays V  Arrays por parámetros. Vídeo 40 de pildorasinformaticas 58.067 visualizaciones hace 5 años 18 minutos	18.13	csharp-40.mp4	<h3>Curso C#. Arrays V  Arrays por parámetros. Vídeo 40 de pildorasinformaticas 58.067 visualizaciones hace 5 años 18 minutos</h3>	cm44dnqsv000pevg4i88xvfge	2024-11-30 16:19:06.992	2024-11-30 16:19:06.992
cm44dnqsz001cevg47pt4wkvl	Curso C#. Herencia. Concepto y explicación teórica. Vídeo 41 de pildorasinformaticas 63.584 visualizaciones hace 5 años 17 minutos	17.37	csharp-41.mp4	<h3>Curso C#. Herencia. Concepto y explicación teórica. Vídeo 41 de pildorasinformaticas 63.584 visualizaciones hace 5 años 17 minutos</h3>	cm44dnqsz001bevg4btx0jdof	2024-11-30 16:19:06.995	2024-11-30 16:19:06.995
cm44dnqsz001devg4tqpqiflt	Curso C#.  Herencia II. Sintaxis y clase Object. Vídeo 42 de pildorasinformaticas 64.350 visualizaciones hace 5 años 18 minutos	18.1	csharp-42.mp4	<h3>Curso C#.  Herencia II. Sintaxis y clase Object. Vídeo 42 de pildorasinformaticas 64.350 visualizaciones hace 5 años 18 minutos</h3>	cm44dnqsz001bevg4btx0jdof	2024-11-30 16:19:06.995	2024-11-30 16:19:06.995
cm44dnqsz001eevg49w5bi07j	Curso C#. Herencia III. Constructores y base. Vídeo 43 de pildorasinformaticas 66.122 visualizaciones hace 5 años 16 minutos	16.58	csharp-43.mp4	<h3>Curso C#. Herencia III. Constructores y base. Vídeo 43 de pildorasinformaticas 66.122 visualizaciones hace 5 años 16 minutos</h3>	cm44dnqsz001bevg4btx0jdof	2024-11-30 16:19:06.995	2024-11-30 16:19:06.995
cm44dnqsz001fevg49r43qm01	Curso C#. Herencia IV. Principio de sustitución. Vídeo 44 de pildorasinformaticas 52.454 visualizaciones hace 5 años 19 minutos	19.08	csharp-44.mp4	<h3>Curso C#. Herencia IV. Principio de sustitución. Vídeo 44 de pildorasinformaticas 52.454 visualizaciones hace 5 años 19 minutos</h3>	cm44dnqsz001bevg4btx0jdof	2024-11-30 16:19:06.995	2024-11-30 16:19:06.995
cm44dnqsz001gevg4n8flfn9d	Curso C#. Herencia V. Polimorfismo. Vídeo 45 de pildorasinformaticas 69.044 visualizaciones hace 5 años 21 minutos	21.24	csharp-45.mp4	<h3>Curso C#. Herencia V. Polimorfismo. Vídeo 45 de pildorasinformaticas 69.044 visualizaciones hace 5 años 21 minutos</h3>	cm44dnqsz001bevg4btx0jdof	2024-11-30 16:19:06.995	2024-11-30 16:19:06.995
cm44dnqsz001hevg4bbe7dtid	Curso C#. Herencia VI. Modificador de acceso Protected. Vídeo 46 de pildorasinformaticas 42.274 visualizaciones hace 5 años 8 minutos y 58 segundos	8.58	csharp-46.mp4	<h3>Curso C#. Herencia VI. Modificador de acceso Protected. Vídeo 46 de pildorasinformaticas 42.274 visualizaciones hace 5 años 8 minutos y 58 segundos</h3>	cm44dnqsz001bevg4btx0jdof	2024-11-30 16:19:06.995	2024-11-30 16:19:06.995
cm44dnqsz001ievg4mi4hahu6	Curso C#. Herencia VII. Ejercicio guiado, solución. Vídeo 47 de pildorasinformaticas 45.466 visualizaciones hace 5 años 25 minutos	25.1	csharp-47.mp4	<h3>Curso C#. Herencia VII. Ejercicio guiado, solución. Vídeo 47 de pildorasinformaticas 45.466 visualizaciones hace 5 años 25 minutos</h3>	cm44dnqsz001bevg4btx0jdof	2024-11-30 16:19:06.995	2024-11-30 16:19:06.995
cm44dnqsz001jevg4yo6ytvtb	Curso C#. Interfaces I. Vídeo 48 de pildorasinformaticas 83.402 visualizaciones hace 5 años 23 minutos	23.26	csharp-48.mp4	<h3>Curso C#. Interfaces I. Vídeo 48 de pildorasinformaticas 83.402 visualizaciones hace 5 años 23 minutos</h3>	cm44dnqsz001bevg4btx0jdof	2024-11-30 16:19:06.995	2024-11-30 16:19:06.995
cm44dnqsz001kevg4u71xbug8	Curso C#. Interfaces II. Vídeo 49 de pildorasinformaticas 45.693 visualizaciones hace 5 años 18 minutos	18.18	csharp-49.mp4	<h3>Curso C#. Interfaces II. Vídeo 49 de pildorasinformaticas 45.693 visualizaciones hace 5 años 18 minutos</h3>	cm44dnqsz001bevg4btx0jdof	2024-11-30 16:19:06.995	2024-11-30 16:19:06.995
cm44dnqsz001levg42dwej7te	Curso C#. Interfaces III. Vídeo 50 de pildorasinformaticas 37.022 visualizaciones hace 5 años 12 minutos y 14 segundos	12.14	csharp-50.mp4	<h3>Curso C#. Interfaces III. Vídeo 50 de pildorasinformaticas 37.022 visualizaciones hace 5 años 12 minutos y 14 segundos</h3>	cm44dnqsz001bevg4btx0jdof	2024-11-30 16:19:06.995	2024-11-30 16:19:06.995
cm44dnqsz001mevg4jwocv7w8	Curso C#. Interfaces IV. Vídeo 51 de pildorasinformaticas 38.452 visualizaciones hace 5 años 17 minutos	17.09	csharp-51.mp4	<h3>Curso C#. Interfaces IV. Vídeo 51 de pildorasinformaticas 38.452 visualizaciones hace 5 años 17 minutos</h3>	cm44dnqsz001bevg4btx0jdof	2024-11-30 16:19:06.995	2024-11-30 16:19:06.995
cm44dnqsz001nevg4iicyeikw	Curso C#. Clases abstractas I. Vídeo 52 de pildorasinformaticas 51.297 visualizaciones hace 5 años 19 minutos	19.16	csharp-52.mp4	<h3>Curso C#. Clases abstractas I. Vídeo 52 de pildorasinformaticas 51.297 visualizaciones hace 5 años 19 minutos</h3>	cm44dnqsz001bevg4btx0jdof	2024-11-30 16:19:06.995	2024-11-30 16:19:06.995
cm44dnqsz001oevg4nes0tf1a	Curso C#. Clases abstractas II. Vídeo 53 de pildorasinformaticas 38.893 visualizaciones hace 5 años 13 minutos y 20 segundos	13.2	csharp-53.mp4	<h3>Curso C#. Clases abstractas II. Vídeo 53 de pildorasinformaticas 38.893 visualizaciones hace 5 años 13 minutos y 20 segundos</h3>	cm44dnqsz001bevg4btx0jdof	2024-11-30 16:19:06.995	2024-11-30 16:19:06.995
cm44dnqsz001pevg4c8ezsa09	Curso C#. Clases selladas (sealed classes). Vídeo 54 de pildorasinformaticas 31.260 visualizaciones hace 5 años 9 minutos y 57 segundos	9.57	csharp-54.mp4	<h3>Curso C#. Clases selladas (sealed classes). Vídeo 54 de pildorasinformaticas 31.260 visualizaciones hace 5 años 9 minutos y 57 segundos</h3>	cm44dnqsz001bevg4btx0jdof	2024-11-30 16:19:06.995	2024-11-30 16:19:06.995
cm44dnqsz001qevg41furrlqm	Curso C#. Properties (Propiedades) I. Vídeo 55 de pildorasinformaticas 44.460 visualizaciones hace 5 años 15 minutos	15.42	csharp-55.mp4	<h3>Curso C#. Properties (Propiedades) I. Vídeo 55 de pildorasinformaticas 44.460 visualizaciones hace 5 años 15 minutos</h3>	cm44dnqsz001bevg4btx0jdof	2024-11-30 16:19:06.995	2024-11-30 16:19:06.995
cm44dnqsz001revg4aahyukh9	Curso C#. Properties (Propiedades) II. Vídeo 56 de pildorasinformaticas 27.691 visualizaciones hace 5 años 6 minutos y 49 segundos	6.49	csharp-56.mp4	<h3>Curso C#. Properties (Propiedades) II. Vídeo 56 de pildorasinformaticas 27.691 visualizaciones hace 5 años 6 minutos y 49 segundos</h3>	cm44dnqsz001bevg4btx0jdof	2024-11-30 16:19:06.995	2024-11-30 16:19:06.995
cm44dnqsz001sevg47iz066qn	Curso C#. Struct. Vídeo 57 de pildorasinformaticas 46.777 visualizaciones hace 5 años 16 minutos	16.59	csharp-57.mp4	<h3>Curso C#. Struct. Vídeo 57 de pildorasinformaticas 46.777 visualizaciones hace 5 años 16 minutos</h3>	cm44dnqsz001bevg4btx0jdof	2024-11-30 16:19:06.995	2024-11-30 16:19:06.995
cm44dnqsz001tevg4ogn7owhw	Curso C#. Enum. Vídeo 58 de pildorasinformaticas 45.920 visualizaciones hace 5 años 23 minutos	23.35	csharp-58.mp4	<h3>Curso C#. Enum. Vídeo 58 de pildorasinformaticas 45.920 visualizaciones hace 5 años 23 minutos</h3>	cm44dnqsz001bevg4btx0jdof	2024-11-30 16:19:06.995	2024-11-30 16:19:06.995
cm44dnqsz001uevg4awhsy745	Curso C#. Destructores. Vídeo 59 de pildorasinformaticas 30.690 visualizaciones hace 5 años 15 minutos	15.42	csharp-59.mp4	<h3>Curso C#. Destructores. Vídeo 59 de pildorasinformaticas 30.690 visualizaciones hace 5 años 15 minutos</h3>	cm44dnqsz001bevg4btx0jdof	2024-11-30 16:19:06.995	2024-11-30 16:19:06.995
cm44dnqsz001vevg4l1n9vn5k	Curso C#. Genéricos I. Vídeo 60 de pildorasinformaticas 46.718 visualizaciones hace 5 años 20 minutos	20.26	csharp-60.mp4	<h3>Curso C#. Genéricos I. Vídeo 60 de pildorasinformaticas 46.718 visualizaciones hace 5 años 20 minutos</h3>	cm44dnqsz001bevg4btx0jdof	2024-11-30 16:19:06.995	2024-11-30 16:19:06.995
cm44dnqt3001yevg4du6emt4w	Curso C#. Genéricos II. Vídeo 61 de pildorasinformaticas 31.240 visualizaciones hace 5 años 9 minutos y 22 segundos	9.22	csharp-61.mp4	<h3>Curso C#. Genéricos II. Vídeo 61 de pildorasinformaticas 31.240 visualizaciones hace 5 años 9 minutos y 22 segundos</h3>	cm44dnqt3001xevg4lu5pjcj1	2024-11-30 16:19:07	2024-11-30 16:19:07
cm44dnqt3001zevg4gpkgxc4a	Curso C#. Genéricos III. Vídeo 62 de pildorasinformaticas 31.317 visualizaciones hace 5 años 18 minutos	18.55	csharp-62.mp4	<h3>Curso C#. Genéricos III. Vídeo 62 de pildorasinformaticas 31.317 visualizaciones hace 5 años 18 minutos</h3>	cm44dnqt3001xevg4lu5pjcj1	2024-11-30 16:19:07	2024-11-30 16:19:07
cm44dnqt30020evg46jhdwpau	Curso C#.  Colecciones I. Vídeo 63 de pildorasinformaticas 55.969 visualizaciones hace 5 años 26 minutos	26.24	csharp-63.mp4	<h3>Curso C#.  Colecciones I. Vídeo 63 de pildorasinformaticas 55.969 visualizaciones hace 5 años 26 minutos</h3>	cm44dnqt3001xevg4lu5pjcj1	2024-11-30 16:19:07	2024-11-30 16:19:07
cm44dnqt30021evg4omkisjua	Curso C#. Colecciones II  LinkedList. Vídeo 64 de pildorasinformaticas 38.546 visualizaciones hace 5 años 22 minutos	22.46	csharp-64.mp4	<h3>Curso C#. Colecciones II  LinkedList. Vídeo 64 de pildorasinformaticas 38.546 visualizaciones hace 5 años 22 minutos</h3>	cm44dnqt3001xevg4lu5pjcj1	2024-11-30 16:19:07	2024-11-30 16:19:07
cm44dnqt30022evg4d31f4aoi	Curso C#. Colecciones III. Queue colas. Vídeo 65 de pildorasinformaticas 33.905 visualizaciones hace 5 años 13 minutos y 21 segundos	13.21	csharp-65.mp4	<h3>Curso C#. Colecciones III. Queue colas. Vídeo 65 de pildorasinformaticas 33.905 visualizaciones hace 5 años 13 minutos y 21 segundos</h3>	cm44dnqt3001xevg4lu5pjcj1	2024-11-30 16:19:07	2024-11-30 16:19:07
cm44dnqt30023evg41ug91c6n	Curso C#. Colecciones IV. Stacks y Dictionary. Vídeo 66 de pildorasinformaticas 35.691 visualizaciones hace 5 años 19 minutos	19.33	csharp-66.mp4	<h3>Curso C#. Colecciones IV. Stacks y Dictionary. Vídeo 66 de pildorasinformaticas 35.691 visualizaciones hace 5 años 19 minutos</h3>	cm44dnqt3001xevg4lu5pjcj1	2024-11-30 16:19:07	2024-11-30 16:19:07
cm44dnqt30024evg4dlrrm20x	Curso C#. Delegados predicados y lambdas I. Vídeo 67 de pildorasinformaticas 47.529 visualizaciones hace 5 años 15 minutos	15.43	csharp-67.mp4	<h3>Curso C#. Delegados predicados y lambdas I. Vídeo 67 de pildorasinformaticas 47.529 visualizaciones hace 5 años 15 minutos</h3>	cm44dnqt3001xevg4lu5pjcj1	2024-11-30 16:19:07	2024-11-30 16:19:07
cm44dnqt30025evg48mic76fa	Curso C#. Delegados predicados y lambdas II. Vídeo 68 de pildorasinformaticas 35.343 visualizaciones hace 5 años 21 minutos	21.17	csharp-68.mp4	<h3>Curso C#. Delegados predicados y lambdas II. Vídeo 68 de pildorasinformaticas 35.343 visualizaciones hace 5 años 21 minutos</h3>	cm44dnqt3001xevg4lu5pjcj1	2024-11-30 16:19:07	2024-11-30 16:19:07
cm44dnqt30026evg4gmv5jet7	Curso C#. Delegados predicados y lambdas III. Vídeo 69 de pildorasinformaticas 30.679 visualizaciones hace 5 años 23 minutos	23.51	csharp-69.mp4	<h3>Curso C#. Delegados predicados y lambdas III. Vídeo 69 de pildorasinformaticas 30.679 visualizaciones hace 5 años 23 minutos</h3>	cm44dnqt3001xevg4lu5pjcj1	2024-11-30 16:19:07	2024-11-30 16:19:07
cm44dnqt30027evg4lo3v7b8n	Curso C#. Expresiones regulares I. Vídeo 70 de pildorasinformaticas 35.368 visualizaciones hace 5 años 22 minutos	22.07	csharp-70.mp4	<h3>Curso C#. Expresiones regulares I. Vídeo 70 de pildorasinformaticas 35.368 visualizaciones hace 5 años 22 minutos</h3>	cm44dnqt3001xevg4lu5pjcj1	2024-11-30 16:19:07	2024-11-30 16:19:07
cm44dnqt30028evg4fdadli7c	Curso C#. Expresiones regulares II. Vídeo 71 de pildorasinformaticas 21.764 visualizaciones hace 5 años 12 minutos y 21 segundos	12.21	csharp-71.mp4	<h3>Curso C#. Expresiones regulares II. Vídeo 71 de pildorasinformaticas 21.764 visualizaciones hace 5 años 12 minutos y 21 segundos</h3>	cm44dnqt3001xevg4lu5pjcj1	2024-11-30 16:19:07	2024-11-30 16:19:07
cm44dnqt30029evg456nqdnwb	Curso C#. WPF  Interfaces gráficas I. Vídeo 72 de pildorasinformaticas 106.876 visualizaciones hace 5 años 11 minutos y 19 segundos	11.19	csharp-72.mp4	<h3>Curso C#. WPF  Interfaces gráficas I. Vídeo 72 de pildorasinformaticas 106.876 visualizaciones hace 5 años 11 minutos y 19 segundos</h3>	cm44dnqt3001xevg4lu5pjcj1	2024-11-30 16:19:07	2024-11-30 16:19:07
cm44dnqt3002aevg4k69pfq97	Curso C#. WPF Interfaces gráficas II. Vídeo 73 de pildorasinformaticas 67.245 visualizaciones hace 4 años 29 minutos	29.49	csharp-73.mp4	<h3>Curso C#. WPF Interfaces gráficas II. Vídeo 73 de pildorasinformaticas 67.245 visualizaciones hace 4 años 29 minutos</h3>	cm44dnqt3001xevg4lu5pjcj1	2024-11-30 16:19:07	2024-11-30 16:19:07
cm44dnqt3002bevg48rzvi772	Curso C#. WPF Interfaces gráficas III. Vídeo 74 de pildorasinformaticas 46.449 visualizaciones hace 4 años 18 minutos	18.35	csharp-74.mp4	<h3>Curso C#. WPF Interfaces gráficas III. Vídeo 74 de pildorasinformaticas 46.449 visualizaciones hace 4 años 18 minutos</h3>	cm44dnqt3001xevg4lu5pjcj1	2024-11-30 16:19:07	2024-11-30 16:19:07
cm44dnqt3002cevg44f22h2z5	Curso C#. WPF Interfaces gráficas IV. Vídeo 75 de pildorasinformaticas 35.446 visualizaciones hace 4 años 12 minutos y 29 segundos	12.29	csharp-75.mp4	<h3>Curso C#. WPF Interfaces gráficas IV. Vídeo 75 de pildorasinformaticas 35.446 visualizaciones hace 4 años 12 minutos y 29 segundos</h3>	cm44dnqt3001xevg4lu5pjcj1	2024-11-30 16:19:07	2024-11-30 16:19:07
cm44dnqt3002devg4pq4c8hkk	Curso C#. WPF Interfaces gráficas V. Grid. Vídeo 76 de pildorasinformaticas 41.390 visualizaciones hace 4 años 25 minutos	25.12	csharp-76.mp4	<h3>Curso C#. WPF Interfaces gráficas V. Grid. Vídeo 76 de pildorasinformaticas 41.390 visualizaciones hace 4 años 25 minutos</h3>	cm44dnqt3001xevg4lu5pjcj1	2024-11-30 16:19:07	2024-11-30 16:19:07
cm44dnqt3002eevg4lt1xkqc8	Curso C#. WPF Dependency properties I. Vídeo 77 de pildorasinformaticas 31.503 visualizaciones hace 4 años 16 minutos	16.36	csharp-77.mp4	<h3>Curso C#. WPF Dependency properties I. Vídeo 77 de pildorasinformaticas 31.503 visualizaciones hace 4 años 16 minutos</h3>	cm44dnqt3001xevg4lu5pjcj1	2024-11-30 16:19:07	2024-11-30 16:19:07
cm44dnqt3002fevg4ail6ixff	Curso C#. WPF Dependency properties II. Vídeo 78 de pildorasinformaticas 20.768 visualizaciones hace 4 años 8 minutos y 35 segundos	8.35	csharp-78.mp4	<h3>Curso C#. WPF Dependency properties II. Vídeo 78 de pildorasinformaticas 20.768 visualizaciones hace 4 años 8 minutos y 35 segundos</h3>	cm44dnqt3001xevg4lu5pjcj1	2024-11-30 16:19:07	2024-11-30 16:19:07
cm44dnqt3002gevg4eiit7py1	Curso C#. WPF Data Binding. Vídeo 79 de pildorasinformaticas 33.017 visualizaciones hace 4 años 16 minutos	16.27	csharp-79.mp4	<h3>Curso C#. WPF Data Binding. Vídeo 79 de pildorasinformaticas 33.017 visualizaciones hace 4 años 16 minutos</h3>	cm44dnqt3001xevg4lu5pjcj1	2024-11-30 16:19:07	2024-11-30 16:19:07
cm44dnqt3002hevg41wx5lkcw	Curso C#. WPF INotifyPropertyChanged. Vídeo 80 de pildorasinformaticas 31.045 visualizaciones hace 4 años 23 minutos	23.57	csharp-80.mp4	<h3>Curso C#. WPF INotifyPropertyChanged. Vídeo 80 de pildorasinformaticas 31.045 visualizaciones hace 4 años 23 minutos</h3>	cm44dnqt3001xevg4lu5pjcj1	2024-11-30 16:19:07	2024-11-30 16:19:07
cm44dnqt7002kevg4r9wo1jdb	Curso C#. WPF. ListBox II. Vídeo 82 de pildorasinformaticas 25.404 visualizaciones hace 4 años 15 minutos	15.17	csharp-81.mp4	<h3>Curso C#. WPF. ListBox II. Vídeo 82 de pildorasinformaticas 25.404 visualizaciones hace 4 años 15 minutos</h3>	cm44dnqt7002jevg4ykpgj8zt	2024-11-30 16:19:07.003	2024-11-30 16:19:07.003
cm44dnqt7002levg48pu97kn5	Curso C#. WPF. ListBox I. Vídeo 81 de pildorasinformaticas 28.011 visualizaciones hace 4 años 19 minutos	19.35	csharp-82.mp4	<h3>Curso C#. WPF. ListBox I. Vídeo 81 de pildorasinformaticas 28.011 visualizaciones hace 4 años 19 minutos</h3>	cm44dnqt7002jevg4ykpgj8zt	2024-11-30 16:19:07.003	2024-11-30 16:19:07.003
cm44dnqt7002mevg45iuigzuj	Curso C#. WPF. ListBox III. Vídeo 83 de pildorasinformaticas 20.267 visualizaciones hace 4 años 15 minutos	15.03	csharp-83.mp4	<h3>Curso C#. WPF. ListBox III. Vídeo 83 de pildorasinformaticas 20.267 visualizaciones hace 4 años 15 minutos</h3>	cm44dnqt7002jevg4ykpgj8zt	2024-11-30 16:19:07.003	2024-11-30 16:19:07.003
cm44dnqt7002nevg4crz3svqh	Curso C#. WPF. ComboBox y CheckBox I. Vídeo 84 de pildorasinformaticas 24.449 visualizaciones hace 4 años 21 minutos	21.18	csharp-84.mp4	<h3>Curso C#. WPF. ComboBox y CheckBox I. Vídeo 84 de pildorasinformaticas 24.449 visualizaciones hace 4 años 21 minutos</h3>	cm44dnqt7002jevg4ykpgj8zt	2024-11-30 16:19:07.003	2024-11-30 16:19:07.003
cm44dnqt7002oevg4mb0om654	Curso C#. WPF. ComboBox y CheckBox II. Vídeo 85 de pildorasinformaticas 17.682 visualizaciones hace 4 años 13 minutos y 34 segundos	13.34	csharp-85.mp4	<h3>Curso C#. WPF. ComboBox y CheckBox II. Vídeo 85 de pildorasinformaticas 17.682 visualizaciones hace 4 años 13 minutos y 34 segundos</h3>	cm44dnqt7002jevg4ykpgj8zt	2024-11-30 16:19:07.003	2024-11-30 16:19:07.003
cm44dnqt7002pevg4lluqv37o	Curso C#. WPF. RadioButton I. Vídeo 86 de pildorasinformaticas 17.543 visualizaciones hace 4 años 18 minutos	18.04	csharp-86.mp4	<h3>Curso C#. WPF. RadioButton I. Vídeo 86 de pildorasinformaticas 17.543 visualizaciones hace 4 años 18 minutos</h3>	cm44dnqt7002jevg4ykpgj8zt	2024-11-30 16:19:07.003	2024-11-30 16:19:07.003
cm44dnqt7002qevg4vuwj0pne	Curso C#. WPF. RadioButton II. Vídeo 87 de pildorasinformaticas 15.539 visualizaciones hace 4 años 13 minutos y 23 segundos	13.23	csharp-87.mp4	<h3>Curso C#. WPF. RadioButton II. Vídeo 87 de pildorasinformaticas 15.539 visualizaciones hace 4 años 13 minutos y 23 segundos</h3>	cm44dnqt7002jevg4ykpgj8zt	2024-11-30 16:19:07.003	2024-11-30 16:19:07.003
cm44dnqt7002revg4ehr59i90	Curso C#. WPF. BBDD. Sql Server. Vídeo 88 de pildorasinformaticas 54.825 visualizaciones hace 4 años 23 minutos	23.35	csharp-88.mp4	<h3>Curso C#. WPF. BBDD. Sql Server. Vídeo 88 de pildorasinformaticas 54.825 visualizaciones hace 4 años 23 minutos</h3>	cm44dnqt7002jevg4ykpgj8zt	2024-11-30 16:19:07.003	2024-11-30 16:19:07.003
cm44dnqt7002sevg45qm8f18r	Curso C#. WPF. BBDD. Sql Server. Vídeo 89 de pildorasinformaticas 39.974 visualizaciones hace 4 años 13 minutos y 33 segundos	13.33	csharp-89.mp4	<h3>Curso C#. WPF. BBDD. Sql Server. Vídeo 89 de pildorasinformaticas 39.974 visualizaciones hace 4 años 13 minutos y 33 segundos</h3>	cm44dnqt7002jevg4ykpgj8zt	2024-11-30 16:19:07.003	2024-11-30 16:19:07.003
cm44dnqt7002tevg4uvmq02ef	Curso C#. BBDD. Sql Server. Relaciones. Vídeo 90 de pildorasinformaticas 30.088 visualizaciones hace 4 años 19 minutos	19.04	csharp-90.mp4	<h3>Curso C#. BBDD. Sql Server. Relaciones. Vídeo 90 de pildorasinformaticas 30.088 visualizaciones hace 4 años 19 minutos</h3>	cm44dnqt7002jevg4ykpgj8zt	2024-11-30 16:19:07.003	2024-11-30 16:19:07.003
cm44dnqt7002uevg4c86nwroi	Curso C#. BBDD. Sql Server. Mostrar datos I. Vídeo 91 de pildorasinformaticas 30.053 visualizaciones hace 4 años 18 minutos	18.57	csharp-91.mp4	<h3>Curso C#. BBDD. Sql Server. Mostrar datos I. Vídeo 91 de pildorasinformaticas 30.053 visualizaciones hace 4 años 18 minutos</h3>	cm44dnqt7002jevg4ykpgj8zt	2024-11-30 16:19:07.003	2024-11-30 16:19:07.003
cm44dnqt7002vevg4uv3i73xe	Curso C#. BBDD. Sql Server. Mostrar datos II. Vídeo 92 de pildorasinformaticas 22.692 visualizaciones hace 4 años 9 minutos y 43 segundos	9.43	csharp-92.mp4	<h3>Curso C#. BBDD. Sql Server. Mostrar datos II. Vídeo 92 de pildorasinformaticas 22.692 visualizaciones hace 4 años 9 minutos y 43 segundos</h3>	cm44dnqt7002jevg4ykpgj8zt	2024-11-30 16:19:07.003	2024-11-30 16:19:07.003
cm44dnqt7002wevg4gicuz2gm	Curso C#. BBDD. Sql Server. Mostrar datos relacionados. Vídeo 93 de pildorasinformaticas 19.750 visualizaciones hace 4 años 20 minutos	20.57	csharp-93.mp4	<h3>Curso C#. BBDD. Sql Server. Mostrar datos relacionados. Vídeo 93 de pildorasinformaticas 19.750 visualizaciones hace 4 años 20 minutos</h3>	cm44dnqt7002jevg4ykpgj8zt	2024-11-30 16:19:07.003	2024-11-30 16:19:07.003
cm44dnqt7002xevg4vvt42deb	Curso C#. BBDD. Sql Server. Mostrar todos los campos. Vídeo 94 de pildorasinformaticas 15.435 visualizaciones hace 4 años 15 minutos	15.22	csharp-94.mp4	<h3>Curso C#. BBDD. Sql Server. Mostrar todos los campos. Vídeo 94 de pildorasinformaticas 15.435 visualizaciones hace 4 años 15 minutos</h3>	cm44dnqt7002jevg4ykpgj8zt	2024-11-30 16:19:07.003	2024-11-30 16:19:07.003
cm44dnqt7002yevg40ma12l90	Curso C#. BBDD. Sql Server. Borrar datos. Vídeo 95 de pildorasinformaticas 13.708 visualizaciones hace 4 años 19 minutos	19.49	csharp-95.mp4	<h3>Curso C#. BBDD. Sql Server. Borrar datos. Vídeo 95 de pildorasinformaticas 13.708 visualizaciones hace 4 años 19 minutos</h3>	cm44dnqt7002jevg4ykpgj8zt	2024-11-30 16:19:07.003	2024-11-30 16:19:07.003
cm44dnqt7002zevg4np1z0ye6	Curso C#. BBDD. Sql Server. Insertar registros. Vídeo 96 de pildorasinformaticas 14.595 visualizaciones hace 4 años 21 minutos	21.41	csharp-96.mp4	<h3>Curso C#. BBDD. Sql Server. Insertar registros. Vídeo 96 de pildorasinformaticas 14.595 visualizaciones hace 4 años 21 minutos</h3>	cm44dnqt7002jevg4ykpgj8zt	2024-11-30 16:19:07.003	2024-11-30 16:19:07.003
cm44dnqt70030evg4cbyvbicf	Curso C#. BBDD. Sql Server. Actualizar registros I. Vídeo 97 de pildorasinformaticas 13.210 visualizaciones hace 4 años 19 minutos	19.44	csharp-97.mp4	<h3>Curso C#. BBDD. Sql Server. Actualizar registros I. Vídeo 97 de pildorasinformaticas 13.210 visualizaciones hace 4 años 19 minutos</h3>	cm44dnqt7002jevg4ykpgj8zt	2024-11-30 16:19:07.003	2024-11-30 16:19:07.003
cm44dnqt70031evg4o42xg3sf	Curso C#. BBDD. Sql Server. Actualizar registros II. Vídeo 98 de pildorasinformaticas 11.925 visualizaciones hace 4 años 21 minutos	21	csharp-98.mp4	<h3>Curso C#. BBDD. Sql Server. Actualizar registros II. Vídeo 98 de pildorasinformaticas 11.925 visualizaciones hace 4 años 21 minutos</h3>	cm44dnqt7002jevg4ykpgj8zt	2024-11-30 16:19:07.003	2024-11-30 16:19:07.003
cm44dnqt70032evg4hd69gkrd	Curso C#. BBDD. Sql Server. Actualizar registros III. Vídeo 99 de pildorasinformaticas 11.978 visualizaciones hace 4 años 19 minutos	19.05	csharp-99.mp4	<h3>Curso C#. BBDD. Sql Server. Actualizar registros III. Vídeo 99 de pildorasinformaticas 11.978 visualizaciones hace 4 años 19 minutos</h3>	cm44dnqt7002jevg4ykpgj8zt	2024-11-30 16:19:07.003	2024-11-30 16:19:07.003
cm44dnqt70033evg4dxk65ux1	Curso C#. LINQ I. Vídeo 100 de pildorasinformaticas 42.719 visualizaciones hace 4 años 14 minutos y 25 segundos	14.25	csharp-100.mp4	<h3>Curso C#. LINQ I. Vídeo 100 de pildorasinformaticas 42.719 visualizaciones hace 4 años 14 minutos y 25 segundos</h3>	cm44dnqt7002jevg4ykpgj8zt	2024-11-30 16:19:07.003	2024-11-30 16:19:07.003
cm44dpus30004evugqq11femj	Curso Angular. Introducción. Vídeo 1 de pildorasinformaticas 233.295 visualizaciones hace 3 años 11 minutos	11	angular-01.mp4	<h3>Curso Angular. Introducción. Vídeo 1 de pildorasinformaticas 233.295 visualizaciones hace 3 años 11 minutos</h3>	cm44dpus30003evugcwn3zx9l	2024-11-30 16:20:45.459	2024-11-30 16:20:45.459
cm44dpus30005evugcvqs03gi	Curso Angular. Instalación software & Primera App. Vídeo 2 de pildorasinformaticas 107.378 visualizaciones hace 3 años 17 minutos	17.44	angular-02.mp4	<h3>Curso Angular. Instalación software & Primera App. Vídeo 2 de pildorasinformaticas 107.378 visualizaciones hace 3 años 17 minutos</h3>	cm44dpus30003evugcwn3zx9l	2024-11-30 16:20:45.459	2024-11-30 16:20:45.459
cm44dpus30006evugmxcytc34	Curso Angular. Estructura y modificación de la App. Vídeo 3 de pildorasinformaticas 90.783 visualizaciones hace 3 años 21 minutos	21.02	angular-03.mp4	<h3>Curso Angular. Estructura y modificación de la App. Vídeo 3 de pildorasinformaticas 90.783 visualizaciones hace 3 años 21 minutos</h3>	cm44dpus30003evugcwn3zx9l	2024-11-30 16:20:45.459	2024-11-30 16:20:45.459
cm44dpus30007evugxqi7q16n	Curso Angular. Estructura y flujo. Vídeo 4 de pildorasinformaticas 69.707 visualizaciones hace 3 años 17 minutos	17.25	angular-04.mp4	<h3>Curso Angular. Estructura y flujo. Vídeo 4 de pildorasinformaticas 69.707 visualizaciones hace 3 años 17 minutos</h3>	cm44dpus30003evugcwn3zx9l	2024-11-30 16:20:45.459	2024-11-30 16:20:45.459
cm44dpus30008evuglvn6nin9	Curso Angular. Componentes. Vídeo 5 de pildorasinformaticas 66.768 visualizaciones hace 3 años 23 minutos	23.1	angular-05.mp4	<h3>Curso Angular. Componentes. Vídeo 5 de pildorasinformaticas 66.768 visualizaciones hace 3 años 23 minutos</h3>	cm44dpus30003evugcwn3zx9l	2024-11-30 16:20:45.459	2024-11-30 16:20:45.459
cm44dpus30009evugjeblp3tn	Curso Angular. Componentes II. Vídeo 6 de pildorasinformaticas 48.649 visualizaciones hace 3 años 20 minutos	20.11	angular-06.mp4	<h3>Curso Angular. Componentes II. Vídeo 6 de pildorasinformaticas 48.649 visualizaciones hace 3 años 20 minutos</h3>	cm44dpus30003evugcwn3zx9l	2024-11-30 16:20:45.459	2024-11-30 16:20:45.459
cm44dpus3000aevughkjs9pb7	Curso Angular. Interpolación. Vídeo 7 de pildorasinformaticas 47.990 visualizaciones hace 3 años 26 minutos	26.59	angular-07.mp4	<h3>Curso Angular. Interpolación. Vídeo 7 de pildorasinformaticas 47.990 visualizaciones hace 3 años 26 minutos</h3>	cm44dpus30003evugcwn3zx9l	2024-11-30 16:20:45.459	2024-11-30 16:20:45.459
cm44dpus3000bevug9xv3ltiy	Curso Angular. Interpolación II. Vídeo 8 de pildorasinformaticas 38.349 visualizaciones hace 3 años 16 minutos	16.54	angular-08.mp4	<h3>Curso Angular. Interpolación II. Vídeo 8 de pildorasinformaticas 38.349 visualizaciones hace 3 años 16 minutos</h3>	cm44dpus30003evugcwn3zx9l	2024-11-30 16:20:45.459	2024-11-30 16:20:45.459
cm44dpus3000cevugwcpnda1x	Curso Angular. Property Binding. Vídeo 9 de pildorasinformaticas 40.699 visualizaciones hace 3 años 19 minutos	19.24	angular-09.mp4	<h3>Curso Angular. Property Binding. Vídeo 9 de pildorasinformaticas 40.699 visualizaciones hace 3 años 19 minutos</h3>	cm44dpus30003evugcwn3zx9l	2024-11-30 16:20:45.459	2024-11-30 16:20:45.459
cm44dpus3000devugevvvo9ud	Curso Angular. Event Binding. Vídeo 10 de pildorasinformaticas 41.075 visualizaciones hace 3 años 28 minutos	28.44	angular-10.mp4	<h3>Curso Angular. Event Binding. Vídeo 10 de pildorasinformaticas 41.075 visualizaciones hace 3 años 28 minutos</h3>	cm44dpus30003evugcwn3zx9l	2024-11-30 16:20:45.459	2024-11-30 16:20:45.459
cm44dpus3000eevugvt6pcwu9	Curso Angular. Two way binding (binding bidireccional). Vídeo 11 de pildorasinformaticas 34.031 visualizaciones hace 3 años 22 minutos	22.11	angular-11.mp4	<h3>Curso Angular. Two way binding (binding bidireccional). Vídeo 11 de pildorasinformaticas 34.031 visualizaciones hace 3 años 22 minutos</h3>	cm44dpus30003evugcwn3zx9l	2024-11-30 16:20:45.459	2024-11-30 16:20:45.459
cm44dpus3000fevugm155ddum	Curso Angular. Práctica guiada I. Vídeo 12 de pildorasinformaticas 32.846 visualizaciones hace 3 años 19 minutos	19.22	angular-12.mp4	<h3>Curso Angular. Práctica guiada I. Vídeo 12 de pildorasinformaticas 32.846 visualizaciones hace 3 años 19 minutos</h3>	cm44dpus30003evugcwn3zx9l	2024-11-30 16:20:45.459	2024-11-30 16:20:45.459
cm44dpus3000gevug5ud23dy9	Curso Angular. Práctica guiada II. Vídeo 13 de pildorasinformaticas 25.853 visualizaciones hace 3 años 15 minutos	15.38	angular-13.mp4	<h3>Curso Angular. Práctica guiada II. Vídeo 13 de pildorasinformaticas 25.853 visualizaciones hace 3 años 15 minutos</h3>	cm44dpus30003evugcwn3zx9l	2024-11-30 16:20:45.459	2024-11-30 16:20:45.459
cm44dpus3000hevugl7ewkzna	Curso Angular. Directivas I. Vídeo 14 de pildorasinformaticas 38.106 visualizaciones hace 3 años 23 minutos	23.04	angular-14.mp4	<h3>Curso Angular. Directivas I. Vídeo 14 de pildorasinformaticas 38.106 visualizaciones hace 3 años 23 minutos</h3>	cm44dpus30003evugcwn3zx9l	2024-11-30 16:20:45.459	2024-11-30 16:20:45.459
cm44dpus3000ievugsnf5fo9e	Curso Angular. Directivas II. Vídeo 15 de pildorasinformaticas 29.208 visualizaciones hace 3 años 19 minutos	19.15	angular-15.mp4	<h3>Curso Angular. Directivas II. Vídeo 15 de pildorasinformaticas 29.208 visualizaciones hace 3 años 19 minutos</h3>	cm44dpus30003evugcwn3zx9l	2024-11-30 16:20:45.459	2024-11-30 16:20:45.459
cm44dpus3000jevugynlmli1m	Curso Angular. Directivas III. Vídeo 16 de pildorasinformaticas 27.577 visualizaciones hace 3 años 18 minutos	18.26	angular-16.mp4	<h3>Curso Angular. Directivas III. Vídeo 16 de pildorasinformaticas 27.577 visualizaciones hace 3 años 18 minutos</h3>	cm44dpus30003evugcwn3zx9l	2024-11-30 16:20:45.459	2024-11-30 16:20:45.459
cm44dpus3000kevugdrp18k7m	Curso Angular. Directivas IV. Vídeo 17 de pildorasinformaticas 24.267 visualizaciones hace 3 años 15 minutos	15.33	angular-17.mp4	<h3>Curso Angular. Directivas IV. Vídeo 17 de pildorasinformaticas 24.267 visualizaciones hace 3 años 15 minutos</h3>	cm44dpus30003evugcwn3zx9l	2024-11-30 16:20:45.459	2024-11-30 16:20:45.459
cm44dpus3000levuglpvyj2hc	Curso Angular. Directivas V. Vídeo 18 de pildorasinformaticas 24.429 visualizaciones hace 3 años 16 minutos	16.03	angular-18.mp4	<h3>Curso Angular. Directivas V. Vídeo 18 de pildorasinformaticas 24.429 visualizaciones hace 3 años 16 minutos</h3>	cm44dpus30003evugcwn3zx9l	2024-11-30 16:20:45.459	2024-11-30 16:20:45.459
cm44dpus3000mevug6rlk68te	Curso Angular. Comunicación entre componentes I. Vídeo 19 de pildorasinformaticas 36.063 visualizaciones hace 3 años 25 minutos	25.11	angular-19.mp4	<h3>Curso Angular. Comunicación entre componentes I. Vídeo 19 de pildorasinformaticas 36.063 visualizaciones hace 3 años 25 minutos</h3>	cm44dpus30003evugcwn3zx9l	2024-11-30 16:20:45.459	2024-11-30 16:20:45.459
cm44dpus3000nevug7ea4jdv5	Curso Angular. Comunicación entre componentes II. Vídeo 20 de pildorasinformaticas 26.670 visualizaciones hace 3 años 25 minutos	25.18	angular-20.mp4	<h3>Curso Angular. Comunicación entre componentes II. Vídeo 20 de pildorasinformaticas 26.670 visualizaciones hace 3 años 25 minutos</h3>	cm44dpus30003evugcwn3zx9l	2024-11-30 16:20:45.459	2024-11-30 16:20:45.459
cm44dpus8000qevugql8028t5	Curso Angular. Servicios. Vídeo 21 de pildorasinformaticas 32.196 visualizaciones hace 3 años 24 minutos	24.19	angular-21.mp4	<h3>Curso Angular. Servicios. Vídeo 21 de pildorasinformaticas 32.196 visualizaciones hace 3 años 24 minutos</h3>	cm44dpus8000pevugm2pzm3jx	2024-11-30 16:20:45.465	2024-11-30 16:20:45.465
cm44dpus8000revuggm32au2n	Curso Angular. Servicios II. Vídeo 22 de pildorasinformaticas 22.664 visualizaciones hace 3 años 15 minutos	15.56	angular-22.mp4	<h3>Curso Angular. Servicios II. Vídeo 22 de pildorasinformaticas 22.664 visualizaciones hace 3 años 15 minutos</h3>	cm44dpus8000pevugm2pzm3jx	2024-11-30 16:20:45.465	2024-11-30 16:20:45.465
cm44dpus8000sevugxhndc4cq	Curso Angular. Servicios III. Vídeo 23 de pildorasinformaticas 16.748 visualizaciones hace 3 años 10 minutos y 39 segundos	10.39	angular-23.mp4	<h3>Curso Angular. Servicios III. Vídeo 23 de pildorasinformaticas 16.748 visualizaciones hace 3 años 10 minutos y 39 segundos</h3>	cm44dpus8000pevugm2pzm3jx	2024-11-30 16:20:45.465	2024-11-30 16:20:45.465
cm44dpus8000tevugt2w43rqo	Curso Angular. Routing I. Vídeo 24 de pildorasinformaticas 34.997 visualizaciones hace 3 años 15 minutos	15.57	angular-24.mp4	<h3>Curso Angular. Routing I. Vídeo 24 de pildorasinformaticas 34.997 visualizaciones hace 3 años 15 minutos</h3>	cm44dpus8000pevugm2pzm3jx	2024-11-30 16:20:45.465	2024-11-30 16:20:45.465
cm44dpus8000uevugrdn1b4lg	Curso Angular. Routing II. Vídeo 25 de pildorasinformaticas 25.224 visualizaciones hace 3 años 8 minutos y 53 segundos	8.53	angular-25.mp4	<h3>Curso Angular. Routing II. Vídeo 25 de pildorasinformaticas 25.224 visualizaciones hace 3 años 8 minutos y 53 segundos</h3>	cm44dpus8000pevugm2pzm3jx	2024-11-30 16:20:45.465	2024-11-30 16:20:45.465
cm44dpus8000vevug1qn3hauy	Curso Angular. Routing III. Vídeo 26 de pildorasinformaticas 19.306 visualizaciones hace 3 años 14 minutos y 22 segundos	14.22	angular-26.mp4	<h3>Curso Angular. Routing III. Vídeo 26 de pildorasinformaticas 19.306 visualizaciones hace 3 años 14 minutos y 22 segundos</h3>	cm44dpus8000pevugm2pzm3jx	2024-11-30 16:20:45.465	2024-11-30 16:20:45.465
cm44dpus8000wevugocurog48	Curso Angular. Routing IV. Vídeo 27 de pildorasinformaticas 14.653 visualizaciones hace 3 años 16 minutos	16.04	angular-27.mp4	<h3>Curso Angular. Routing IV. Vídeo 27 de pildorasinformaticas 14.653 visualizaciones hace 3 años 16 minutos</h3>	cm44dpus8000pevugm2pzm3jx	2024-11-30 16:20:45.465	2024-11-30 16:20:45.465
cm44dpus8000xevugo5k7f1z6	Curso Angular. Routing V. Vídeo 28 de pildorasinformaticas 13.812 visualizaciones hace 3 años 17 minutos	17.38	angular-28.mp4	<h3>Curso Angular. Routing V. Vídeo 28 de pildorasinformaticas 13.812 visualizaciones hace 3 años 17 minutos</h3>	cm44dpus8000pevugm2pzm3jx	2024-11-30 16:20:45.465	2024-11-30 16:20:45.465
cm44dpus9000yevug8vmj6fbk	Curso Angular. Routing VI. Vídeo 29 de pildorasinformaticas 11.678 visualizaciones hace 2 años 10 minutos y 20 segundos	10.2	angular-29.mp4	<h3>Curso Angular. Routing VI. Vídeo 29 de pildorasinformaticas 11.678 visualizaciones hace 2 años 10 minutos y 20 segundos</h3>	cm44dpus8000pevugm2pzm3jx	2024-11-30 16:20:45.465	2024-11-30 16:20:45.465
cm44dpus9000zevuggg73s9bd	Curso Angular. Routing VII. Vídeo 30 de pildorasinformaticas 13.131 visualizaciones hace 2 años 16 minutos	16.53	angular-30.mp4	<h3>Curso Angular. Routing VII. Vídeo 30 de pildorasinformaticas 13.131 visualizaciones hace 2 años 16 minutos</h3>	cm44dpus8000pevugm2pzm3jx	2024-11-30 16:20:45.465	2024-11-30 16:20:45.465
cm44dpus90010evugdcw22xj4	Curso Angular. Routing VIII. Páginas de error. Vídeo 31 de pildorasinformaticas 11.313 visualizaciones hace 2 años 8 minutos y 51 segundos	8.51	angular-31.mp4	<h3>Curso Angular. Routing VIII. Páginas de error. Vídeo 31 de pildorasinformaticas 11.313 visualizaciones hace 2 años 8 minutos y 51 segundos</h3>	cm44dpus8000pevugm2pzm3jx	2024-11-30 16:20:45.465	2024-11-30 16:20:45.465
cm44dpus90011evug4l3pcz8p	Curso Angular. Firebase. Vídeo 32 de pildorasinformaticas 16.849 visualizaciones hace 2 años 12 minutos y 17 segundos	12.17	angular-32.mp4	<h3>Curso Angular. Firebase. Vídeo 32 de pildorasinformaticas 16.849 visualizaciones hace 2 años 12 minutos y 17 segundos</h3>	cm44dpus8000pevugm2pzm3jx	2024-11-30 16:20:45.465	2024-11-30 16:20:45.465
cm44dpus90012evugenl68wba	Curso Angular. Firebase II. Insertando registros. Vídeo 33 de pildorasinformaticas 15.919 visualizaciones hace 2 años 21 minutos	21.49	angular-33.mp4	<h3>Curso Angular. Firebase II. Insertando registros. Vídeo 33 de pildorasinformaticas 15.919 visualizaciones hace 2 años 21 minutos</h3>	cm44dpus8000pevugm2pzm3jx	2024-11-30 16:20:45.465	2024-11-30 16:20:45.465
cm44dpus90013evug10xcvha8	Curso Angular. Firebase III. Obteniendo registros. Vídeo 34 de pildorasinformaticas 11.972 visualizaciones hace 2 años 16 minutos	16.16	angular-34.mp4	<h3>Curso Angular. Firebase III. Obteniendo registros. Vídeo 34 de pildorasinformaticas 11.972 visualizaciones hace 2 años 16 minutos</h3>	cm44dpus8000pevugm2pzm3jx	2024-11-30 16:20:45.465	2024-11-30 16:20:45.465
cm44dpus90014evugpvxw1s3z	Curso Angular. Firebase IV. Mostrando registros. Vídeo 35 de pildorasinformaticas 9105 visualizaciones hace 2 años 11 minutos y 40 segundos	11.4	angular-35.mp4	<h3>Curso Angular. Firebase IV. Mostrando registros. Vídeo 35 de pildorasinformaticas 9105 visualizaciones hace 2 años 11 minutos y 40 segundos</h3>	cm44dpus8000pevugm2pzm3jx	2024-11-30 16:20:45.465	2024-11-30 16:20:45.465
cm44dpus90015evugg39wihmz	Curso Angular. Firebase V. Actualizando registros. Vídeo 36 de pildorasinformaticas 7885 visualizaciones hace 2 años 10 minutos y 37 segundos	10.37	angular-36.mp4	<h3>Curso Angular. Firebase V. Actualizando registros. Vídeo 36 de pildorasinformaticas 7885 visualizaciones hace 2 años 10 minutos y 37 segundos</h3>	cm44dpus8000pevugm2pzm3jx	2024-11-30 16:20:45.465	2024-11-30 16:20:45.465
cm44dpus90016evugt365ucr6	Curso Angular. Firebase VI. Eliminando registros. Vídeo 37 de pildorasinformaticas 7052 visualizaciones hace 2 años 10 minutos y 16 segundos	10.16	angular-37.mp4	<h3>Curso Angular. Firebase VI. Eliminando registros. Vídeo 37 de pildorasinformaticas 7052 visualizaciones hace 2 años 10 minutos y 16 segundos</h3>	cm44dpus8000pevugm2pzm3jx	2024-11-30 16:20:45.465	2024-11-30 16:20:45.465
cm44dpus90017evug92f355io	Curso Angular. Login I. Vídeo 38 de pildorasinformaticas 27.342 visualizaciones hace 2 años 9 minutos y 16 segundos	9.16	angular-38.mp4	<h3>Curso Angular. Login I. Vídeo 38 de pildorasinformaticas 27.342 visualizaciones hace 2 años 9 minutos y 16 segundos</h3>	cm44dpus8000pevugm2pzm3jx	2024-11-30 16:20:45.465	2024-11-30 16:20:45.465
cm44dpus90018evug683ecfvf	Curso Angular. Login II. Vídeo 39 de pildorasinformaticas 15.559 visualizaciones hace 2 años 12 minutos y 16 segundos	12.16	angular-39.mp4	<h3>Curso Angular. Login II. Vídeo 39 de pildorasinformaticas 15.559 visualizaciones hace 2 años 12 minutos y 16 segundos</h3>	cm44dpus8000pevugm2pzm3jx	2024-11-30 16:20:45.465	2024-11-30 16:20:45.465
cm44dpus90019evug7awsce1y	Curso Angular. Login III. Vídeo 40 de pildorasinformaticas 9912 visualizaciones hace 2 años 9 minutos y 54 segundos	9.54	angular-40.mp4	<h3>Curso Angular. Login III. Vídeo 40 de pildorasinformaticas 9912 visualizaciones hace 2 años 9 minutos y 54 segundos</h3>	cm44dpus8000pevugm2pzm3jx	2024-11-30 16:20:45.465	2024-11-30 16:20:45.465
cm44dpusc001cevuga4d0s14k	Curso Angular. Login IV. Vídeo 41 de pildorasinformaticas 8519 visualizaciones hace 2 años 11 minutos y 50 segundos	11.5	angular-41.mp4	<h3>Curso Angular. Login IV. Vídeo 41 de pildorasinformaticas 8519 visualizaciones hace 2 años 11 minutos y 50 segundos</h3>	cm44dpusc001bevugni7fizhr	2024-11-30 16:20:45.468	2024-11-30 16:20:45.468
cm44dpusc001devugfhdacmrg	Curso Angular. Login V. Vídeo 42 de pildorasinformaticas 8862 visualizaciones hace 2 años 8 minutos y 54 segundos	8.54	angular-42.mp4	<h3>Curso Angular. Login V. Vídeo 42 de pildorasinformaticas 8862 visualizaciones hace 2 años 8 minutos y 54 segundos</h3>	cm44dpusc001bevugni7fizhr	2024-11-30 16:20:45.468	2024-11-30 16:20:45.468
cm44dpusc001eevugi7uz0lks	Curso Angular. Login VI. Links login y logout. Vídeo 43 de pildorasinformaticas 8135 visualizaciones hace 2 años 23 minutos	23.38	angular-43.mp4	<h3>Curso Angular. Login VI. Links login y logout. Vídeo 43 de pildorasinformaticas 8135 visualizaciones hace 2 años 23 minutos</h3>	cm44dpusc001bevugni7fizhr	2024-11-30 16:20:45.468	2024-11-30 16:20:45.468
cm44dpusc001fevugaqv8hqid	Curso Angular. Login VII. Creación de cookie para guardar login. Vídeo 44 de pildorasinformaticas 10.816 visualizaciones hace 2 años 12 minutos y 16 segundos	12.16	angular-44.mp4	<h3>Curso Angular. Login VII. Creación de cookie para guardar login. Vídeo 44 de pildorasinformaticas 10.816 visualizaciones hace 2 años 12 minutos y 16 segundos</h3>	cm44dpusc001bevugni7fizhr	2024-11-30 16:20:45.468	2024-11-30 16:20:45.468
cm44dpusc001gevugyk2l3osu	Curso Angular. Protegiendo páginas. Vídeo 45 de pildorasinformaticas 9122 visualizaciones hace 2 años 13 minutos y 16 segundos	13.16	angular-45.mp4	<h3>Curso Angular. Protegiendo páginas. Vídeo 45 de pildorasinformaticas 9122 visualizaciones hace 2 años 13 minutos y 16 segundos</h3>	cm44dpusc001bevugni7fizhr	2024-11-30 16:20:45.468	2024-11-30 16:20:45.468
cm44dpusc001hevug8603oc5x	Curso Angular. Despliegue. Fin de curso. Vídeo 46 de pildorasinformaticas 12.835 visualizaciones hace 1 año 13 minutos y 47 segundos	13.47	angular-46.mp4	<h3>Curso Angular. Despliegue. Fin de curso. Vídeo 46 de pildorasinformaticas 12.835 visualizaciones hace 1 año 13 minutos y 47 segundos</h3>	cm44dpusc001bevugni7fizhr	2024-11-30 16:20:45.468	2024-11-30 16:20:45.468
cm44dtbux0004evcsvlvqcmew	Curso Django. Introducción e Instalación.Vídeo 1 de pildorasinformaticas 637.105 visualizaciones hace 5 años 11 minutos y 55 segundos	11.55	django-01.mp4	<h3>Curso Django. Introducción e Instalación.Vídeo 1 de pildorasinformaticas 637.105 visualizaciones hace 5 años 11 minutos y 55 segundos</h3>	cm44dtbux0003evcsfhwhdfbp	2024-11-30 16:23:27.561	2024-11-30 16:23:27.561
cm44dtbux0005evcskto6gjp1	Curso Django. Creación primer proyecto. Vídeo 2 de pildorasinformaticas 321.565 visualizaciones hace 5 años 17 minutos	17.5	django-02.mp4	<h3>Curso Django. Creación primer proyecto. Vídeo 2 de pildorasinformaticas 321.565 visualizaciones hace 5 años 17 minutos</h3>	cm44dtbux0003evcsfhwhdfbp	2024-11-30 16:23:27.561	2024-11-30 16:23:27.561
cm44dtbux0006evcs9z3oqqk9	Curso Django. Creación de primera página. Vídeo 3 de pildorasinformaticas 243.591 visualizaciones hace 5 años 12 minutos y 15 segundos	12.15	django-03.mp4	<h3>Curso Django. Creación de primera página. Vídeo 3 de pildorasinformaticas 243.591 visualizaciones hace 5 años 12 minutos y 15 segundos</h3>	cm44dtbux0003evcsfhwhdfbp	2024-11-30 16:23:27.561	2024-11-30 16:23:27.561
cm44dtbux0007evcsqct34ras	Curso Django. Parámetros en URL. Vídeo 4 de pildorasinformaticas 179.000 visualizaciones hace 5 años 18 minutos	18.43	django-04.mp4	<h3>Curso Django. Parámetros en URL. Vídeo 4 de pildorasinformaticas 179.000 visualizaciones hace 5 años 18 minutos</h3>	cm44dtbux0003evcsfhwhdfbp	2024-11-30 16:23:27.561	2024-11-30 16:23:27.561
cm44dtbux0008evcssz6bgcuj	Curso Django. Plantillas I. Vídeo 5 de pildorasinformaticas 161.762 visualizaciones hace 5 años 17 minutos	17.26	django-05.mp4	<h3>Curso Django. Plantillas I. Vídeo 5 de pildorasinformaticas 161.762 visualizaciones hace 5 años 17 minutos</h3>	cm44dtbux0003evcsfhwhdfbp	2024-11-30 16:23:27.561	2024-11-30 16:23:27.561
cm44dtbux0009evcsaexp8g51	Curso Django. Plantillas II  Variables y propiedades en plantillas. Vídeo 6 de pildorasinformaticas 120.921 visualizaciones hace 5 años 15 minutos	15.24	django-06.mp4	<h3>Curso Django. Plantillas II  Variables y propiedades en plantillas. Vídeo 6 de pildorasinformaticas 120.921 visualizaciones hace 5 años 15 minutos</h3>	cm44dtbux0003evcsfhwhdfbp	2024-11-30 16:23:27.561	2024-11-30 16:23:27.561
cm44dtbux000aevcsc43n2ne5	Curso Django. Plantillas III. Bucles y condicionales en plantillas. Vídeo 7 de pildorasinformaticas 102.293 visualizaciones hace 5 años 20 minutos	20.14	django-07.mp4	<h3>Curso Django. Plantillas III. Bucles y condicionales en plantillas. Vídeo 7 de pildorasinformaticas 102.293 visualizaciones hace 5 años 20 minutos</h3>	cm44dtbux0003evcsfhwhdfbp	2024-11-30 16:23:27.561	2024-11-30 16:23:27.561
cm44dtbux000bevcsltq58p1r	Curso Django. Plantillas IV. Condicionales, filtros y cargadores de plantillas. Vídeo 8 de pildorasinformaticas 97.516 visualizaciones hace 5 años 25 minutos	25.37	django-08.mp4	<h3>Curso Django. Plantillas IV. Condicionales, filtros y cargadores de plantillas. Vídeo 8 de pildorasinformaticas 97.516 visualizaciones hace 5 años 25 minutos</h3>	cm44dtbux0003evcsfhwhdfbp	2024-11-30 16:23:27.561	2024-11-30 16:23:27.561
cm44dtbux000cevcs3rk8vbys	Curso Django. Plantillas V. Plantillas incrustadas. Vídeo 9 de pildorasinformaticas 80.115 visualizaciones hace 5 años 15 minutos	15.47	django-09.mp4	<h3>Curso Django. Plantillas V. Plantillas incrustadas. Vídeo 9 de pildorasinformaticas 80.115 visualizaciones hace 5 años 15 minutos</h3>	cm44dtbux0003evcsfhwhdfbp	2024-11-30 16:23:27.561	2024-11-30 16:23:27.561
cm44dtbux000devcsrh76gplp	Curso Django. Plantillas VI. Herencia de plantillas. Vídeo 10 de pildorasinformaticas 83.256 visualizaciones hace 5 años 23 minutos	23.15	django-10.mp4	<h3>Curso Django. Plantillas VI. Herencia de plantillas. Vídeo 10 de pildorasinformaticas 83.256 visualizaciones hace 5 años 23 minutos</h3>	cm44dtbux0003evcsfhwhdfbp	2024-11-30 16:23:27.561	2024-11-30 16:23:27.561
cm44dtbux000eevcsyb25o1pl	Curso Django. BBDD I. Vídeo 11 de pildorasinformaticas 83.318 visualizaciones hace 5 años 14 minutos y 11 segundos	14.11	django-11.mp4	<h3>Curso Django. BBDD I. Vídeo 11 de pildorasinformaticas 83.318 visualizaciones hace 5 años 14 minutos y 11 segundos</h3>	cm44dtbux0003evcsfhwhdfbp	2024-11-30 16:23:27.561	2024-11-30 16:23:27.561
cm44dtbux000fevcs3iyjgz42	Curso Django. BBDD II. Vídeo 12 de pildorasinformaticas 94.327 visualizaciones hace 5 años 21 minutos	21.1	django-12.mp4	<h3>Curso Django. BBDD II. Vídeo 12 de pildorasinformaticas 94.327 visualizaciones hace 5 años 21 minutos</h3>	cm44dtbux0003evcsfhwhdfbp	2024-11-30 16:23:27.561	2024-11-30 16:23:27.561
cm44dtbux000gevcsfvkma5d6	Curso Django. BBDD III. Vídeo 13 de pildorasinformaticas 73.171 visualizaciones hace 5 años 14 minutos y 52 segundos	14.52	django-13.mp4	<h3>Curso Django. BBDD III. Vídeo 13 de pildorasinformaticas 73.171 visualizaciones hace 5 años 14 minutos y 52 segundos</h3>	cm44dtbux0003evcsfhwhdfbp	2024-11-30 16:23:27.561	2024-11-30 16:23:27.561
cm44dtbux000hevcsvxl6v8k0	Curso Django. BBDD IV. PostgreSql. Vídeo 14 de pildorasinformaticas 90.175 visualizaciones hace 5 años 15 minutos	15.36	django-14.mp4	<h3>Curso Django. BBDD IV. PostgreSql. Vídeo 14 de pildorasinformaticas 90.175 visualizaciones hace 5 años 15 minutos</h3>	cm44dtbux0003evcsfhwhdfbp	2024-11-30 16:23:27.561	2024-11-30 16:23:27.561
cm44dtbux000ievcs9ozmfowc	Curso Django. BBDD V. PostgreSql con Where. Vídeo 15 de pildorasinformaticas 59.825 visualizaciones hace 5 años 19 minutos	19.43	django-15.mp4	<h3>Curso Django. BBDD V. PostgreSql con Where. Vídeo 15 de pildorasinformaticas 59.825 visualizaciones hace 5 años 19 minutos</h3>	cm44dtbux0003evcsfhwhdfbp	2024-11-30 16:23:27.561	2024-11-30 16:23:27.561
cm44dtbux000jevcsocjenxye	Curso Django. Panel de Administración I. Vídeo 16 de pildorasinformaticas 73.530 visualizaciones hace 5 años 15 minutos	15.46	django-16.mp4	<h3>Curso Django. Panel de Administración I. Vídeo 16 de pildorasinformaticas 73.530 visualizaciones hace 5 años 15 minutos</h3>	cm44dtbux0003evcsfhwhdfbp	2024-11-30 16:23:27.561	2024-11-30 16:23:27.561
cm44dtbux000kevcsiwvbw40o	Curso Django. Panel de Administración II. Vídeo 17 de pildorasinformaticas 51.887 visualizaciones hace 4 años 11 minutos y 54 segundos	11.54	django-17.mp4	<h3>Curso Django. Panel de Administración II. Vídeo 17 de pildorasinformaticas 51.887 visualizaciones hace 4 años 11 minutos y 54 segundos</h3>	cm44dtbux0003evcsfhwhdfbp	2024-11-30 16:23:27.561	2024-11-30 16:23:27.561
cm44dtbux000levcsj4uuahea	Curso Django. Panel de Administración III. Vídeo 18 de pildorasinformaticas 44.853 visualizaciones hace 4 años 13 minutos y 16 segundos	13.16	django-18.mp4	<h3>Curso Django. Panel de Administración III. Vídeo 18 de pildorasinformaticas 44.853 visualizaciones hace 4 años 13 minutos y 16 segundos</h3>	cm44dtbux0003evcsfhwhdfbp	2024-11-30 16:23:27.561	2024-11-30 16:23:27.561
cm44dtbux000mevcsggafz580	Curso Django. Panel de Administración IV. Vídeo 19 de pildorasinformaticas 41.940 visualizaciones hace 4 años 15 minutos	15.4	django-19.mp4	<h3>Curso Django. Panel de Administración IV. Vídeo 19 de pildorasinformaticas 41.940 visualizaciones hace 4 años 15 minutos</h3>	cm44dtbux0003evcsfhwhdfbp	2024-11-30 16:23:27.561	2024-11-30 16:23:27.561
cm44dtbux000nevcspei1vmcz	Curso Django. Panel de Administración V. Vídeo 20 de pildorasinformaticas 38.809 visualizaciones hace 4 años 15 minutos	15.49	django-20.mp4	<h3>Curso Django. Panel de Administración V. Vídeo 20 de pildorasinformaticas 38.809 visualizaciones hace 4 años 15 minutos</h3>	cm44dtbux0003evcsfhwhdfbp	2024-11-30 16:23:27.561	2024-11-30 16:23:27.561
cm44dtbv3000qevcsaz48458h	Curso Django. Formularios I. Vídeo 21 de pildorasinformaticas 90.790 visualizaciones hace 4 años 14 minutos y 43 segundos	14.43	django-21.mp4	<h3>Curso Django. Formularios I. Vídeo 21 de pildorasinformaticas 90.790 visualizaciones hace 4 años 14 minutos y 43 segundos</h3>	cm44dtbv3000pevcscjrehwdu	2024-11-30 16:23:27.568	2024-11-30 16:23:27.568
cm44dtbv3000revcsj1olrs3w	Curso Django. Formularios II. Vídeo 22 de pildorasinformaticas 63.716 visualizaciones hace 4 años 23 minutos	23.1	django-22.mp4	<h3>Curso Django. Formularios II. Vídeo 22 de pildorasinformaticas 63.716 visualizaciones hace 4 años 23 minutos</h3>	cm44dtbv3000pevcscjrehwdu	2024-11-30 16:23:27.568	2024-11-30 16:23:27.568
cm44dtbv3000sevcsltfb7w05	Curso Django. Formularios III. Vídeo 23 de pildorasinformaticas 50.599 visualizaciones hace 4 años 15 minutos	15.22	django-23.mp4	<h3>Curso Django. Formularios III. Vídeo 23 de pildorasinformaticas 50.599 visualizaciones hace 4 años 15 minutos</h3>	cm44dtbv3000pevcscjrehwdu	2024-11-30 16:23:27.568	2024-11-30 16:23:27.568
cm44dtbv3000tevcs80hyrqy7	Curso Django. Envío de mails. Vídeo 24 de pildorasinformaticas 51.727 visualizaciones hace 4 años 17 minutos	17.4	django-24.mp4	<h3>Curso Django. Envío de mails. Vídeo 24 de pildorasinformaticas 51.727 visualizaciones hace 4 años 17 minutos</h3>	cm44dtbv3000pevcscjrehwdu	2024-11-30 16:23:27.568	2024-11-30 16:23:27.568
cm44dtbv3000uevcsg8ulrpf4	Curso Django. API Forms Vídeo 25 de pildorasinformaticas 55.975 visualizaciones hace 4 años 32 minutos	32.02	django-25.mp4	<h3>Curso Django. API Forms Vídeo 25 de pildorasinformaticas 55.975 visualizaciones hace 4 años 32 minutos</h3>	cm44dtbv3000pevcscjrehwdu	2024-11-30 16:23:27.568	2024-11-30 16:23:27.568
cm44dtbv3000vevcsx87ilz63	Curso Django. Proyecto web completo I. Vídeo 26 de pildorasinformaticas 59.194 visualizaciones hace 4 años 6 minutos y 59 segundos	6.59	django-26.mp4	<h3>Curso Django. Proyecto web completo I. Vídeo 26 de pildorasinformaticas 59.194 visualizaciones hace 4 años 6 minutos y 59 segundos</h3>	cm44dtbv3000pevcscjrehwdu	2024-11-30 16:23:27.568	2024-11-30 16:23:27.568
cm44dtbv3000wevcslls3rdei	Curso Django. Proyecto web completo II. Vídeo 27 de pildorasinformaticas 61.056 visualizaciones hace 4 años 12 minutos y 29 segundos	12.29	django-27.mp4	<h3>Curso Django. Proyecto web completo II. Vídeo 27 de pildorasinformaticas 61.056 visualizaciones hace 4 años 12 minutos y 29 segundos</h3>	cm44dtbv3000pevcscjrehwdu	2024-11-30 16:23:27.568	2024-11-30 16:23:27.568
cm44dtbv3000xevcs5j9t0eml	Curso Django. Proyecto web completo III. Vídeo 28 de pildorasinformaticas 55.647 visualizaciones hace 4 años 17 minutos	17.14	django-28.mp4	<h3>Curso Django. Proyecto web completo III. Vídeo 28 de pildorasinformaticas 55.647 visualizaciones hace 4 años 17 minutos</h3>	cm44dtbv3000pevcscjrehwdu	2024-11-30 16:23:27.568	2024-11-30 16:23:27.568
cm44dtbv3000yevcsinjgto4n	Curso Django. Proyecto web completo IV. Vídeo 29 de pildorasinformaticas 53.834 visualizaciones hace 4 años 15 minutos	15.26	django-29.mp4	<h3>Curso Django. Proyecto web completo IV. Vídeo 29 de pildorasinformaticas 53.834 visualizaciones hace 4 años 15 minutos</h3>	cm44dtbv3000pevcscjrehwdu	2024-11-30 16:23:27.568	2024-11-30 16:23:27.568
cm44dtbv3000zevcsj6ue8c2g	Curso Django. Proyecto web completo V. Vídeo 30 de pildorasinformaticas 56.701 visualizaciones hace 4 años 19 minutos	19.37	django-30.mp4	<h3>Curso Django. Proyecto web completo V. Vídeo 30 de pildorasinformaticas 56.701 visualizaciones hace 4 años 19 minutos</h3>	cm44dtbv3000pevcscjrehwdu	2024-11-30 16:23:27.568	2024-11-30 16:23:27.568
cm44dtbv30010evcstff1511l	Curso Django. Proyecto web completo VI. Vídeo 31 de pildorasinformaticas 39.517 visualizaciones hace 4 años 11 minutos y 36 segundos	11.36	django-31.mp4	<h3>Curso Django. Proyecto web completo VI. Vídeo 31 de pildorasinformaticas 39.517 visualizaciones hace 4 años 11 minutos y 36 segundos</h3>	cm44dtbv3000pevcscjrehwdu	2024-11-30 16:23:27.568	2024-11-30 16:23:27.568
cm44dtbv30011evcsigpajm2v	Curso Django. Proyecto web completo VII. Vídeo 32 de pildorasinformaticas 46.972 visualizaciones hace 4 años 18 minutos	18.37	django-32.mp4	<h3>Curso Django. Proyecto web completo VII. Vídeo 32 de pildorasinformaticas 46.972 visualizaciones hace 4 años 18 minutos</h3>	cm44dtbv3000pevcscjrehwdu	2024-11-30 16:23:27.568	2024-11-30 16:23:27.568
cm44dtbv30012evcsahhyztq2	Curso Django. Proyecto web completo VIII. Vídeo 33 de pildorasinformaticas 38.363 visualizaciones hace 4 años 11 minutos y 38 segundos	11.38	django-33.mp4	<h3>Curso Django. Proyecto web completo VIII. Vídeo 33 de pildorasinformaticas 38.363 visualizaciones hace 4 años 11 minutos y 38 segundos</h3>	cm44dtbv3000pevcscjrehwdu	2024-11-30 16:23:27.568	2024-11-30 16:23:27.568
cm44dtbv30013evcsoiumlwb2	Curso Django. Proyecto web completo IX. Vídeo 34 de pildorasinformaticas 35.085 visualizaciones hace 4 años 16 minutos	16.07	django-34.mp4	<h3>Curso Django. Proyecto web completo IX. Vídeo 34 de pildorasinformaticas 35.085 visualizaciones hace 4 años 16 minutos</h3>	cm44dtbv3000pevcscjrehwdu	2024-11-30 16:23:27.568	2024-11-30 16:23:27.568
cm44dtbv30014evcsum0qomyq	Curso Django. Proyecto web completo X. Vídeo 35 de pildorasinformaticas 34.533 visualizaciones hace 4 años 17 minutos	17.53	django-35.mp4	<h3>Curso Django. Proyecto web completo X. Vídeo 35 de pildorasinformaticas 34.533 visualizaciones hace 4 años 17 minutos</h3>	cm44dtbv3000pevcscjrehwdu	2024-11-30 16:23:27.568	2024-11-30 16:23:27.568
cm44dtbv30015evcstfjbtxov	Curso Django. Proyecto web completo XI. Vídeo 36 de pildorasinformaticas 27.708 visualizaciones hace 4 años 9 minutos y 35 segundos	9.35	django-36.mp4	<h3>Curso Django. Proyecto web completo XI. Vídeo 36 de pildorasinformaticas 27.708 visualizaciones hace 4 años 9 minutos y 35 segundos</h3>	cm44dtbv3000pevcscjrehwdu	2024-11-30 16:23:27.568	2024-11-30 16:23:27.568
cm44dtbv30016evcsotc8d6e4	Curso Django. Proyecto web completo XII. Vídeo 37 de pildorasinformaticas 26.497 visualizaciones hace 4 años 11 minutos y 45 segundos	11.45	django-37.mp4	<h3>Curso Django. Proyecto web completo XII. Vídeo 37 de pildorasinformaticas 26.497 visualizaciones hace 4 años 11 minutos y 45 segundos</h3>	cm44dtbv3000pevcscjrehwdu	2024-11-30 16:23:27.568	2024-11-30 16:23:27.568
cm44dtbv30017evcsky3omaac	Curso Django. Proyecto web completo XIII. Vídeo 38 de pildorasinformaticas 29.000 visualizaciones hace 4 años 24 minutos	24.28	django-38.mp4	<h3>Curso Django. Proyecto web completo XIII. Vídeo 38 de pildorasinformaticas 29.000 visualizaciones hace 4 años 24 minutos</h3>	cm44dtbv3000pevcscjrehwdu	2024-11-30 16:23:27.568	2024-11-30 16:23:27.568
cm44dtbv30018evcsn4fhggp9	Curso Django. Proyecto web completo XIV. Vídeo 39 de pildorasinformaticas 25.865 visualizaciones hace 4 años 14 minutos y 52 segundos	14.52	django-39.mp4	<h3>Curso Django. Proyecto web completo XIV. Vídeo 39 de pildorasinformaticas 25.865 visualizaciones hace 4 años 14 minutos y 52 segundos</h3>	cm44dtbv3000pevcscjrehwdu	2024-11-30 16:23:27.568	2024-11-30 16:23:27.568
cm44dtbv30019evcstpfz6g2l	Curso Django. Proyecto web completo XV. Vídeo 40 de pildorasinformaticas 28.141 visualizaciones hace 4 años 19 minutos	19.22	django-40.mp4	<h3>Curso Django. Proyecto web completo XV. Vídeo 40 de pildorasinformaticas 28.141 visualizaciones hace 4 años 19 minutos</h3>	cm44dtbv3000pevcscjrehwdu	2024-11-30 16:23:27.568	2024-11-30 16:23:27.568
cm44dtbv8001cevcs66juofn5	Curso Django. Proyecto web completo XVI. Vídeo 41 de pildorasinformaticas 25.903 visualizaciones hace 4 años 17 minutos	17.37	django-41.mp4	<h3>Curso Django. Proyecto web completo XVI. Vídeo 41 de pildorasinformaticas 25.903 visualizaciones hace 4 años 17 minutos</h3>	cm44dtbv8001bevcsrzplq638	2024-11-30 16:23:27.572	2024-11-30 16:23:27.572
cm44dtbv8001devcsi86vas01	Curso Django. Proyecto web completo XVII. Vídeo 42 de pildorasinformaticas 23.233 visualizaciones hace 4 años 16 minutos	16.57	django-42.mp4	<h3>Curso Django. Proyecto web completo XVII. Vídeo 42 de pildorasinformaticas 23.233 visualizaciones hace 4 años 16 minutos</h3>	cm44dtbv8001bevcsrzplq638	2024-11-30 16:23:27.572	2024-11-30 16:23:27.572
cm44dtbv8001eevcsrru08gj5	Curso Django. Proyecto web completo XVIII. Vídeo 43 de pildorasinformaticas 25.526 visualizaciones hace 4 años 18 minutos	18.31	django-43.mp4	<h3>Curso Django. Proyecto web completo XVIII. Vídeo 43 de pildorasinformaticas 25.526 visualizaciones hace 4 años 18 minutos</h3>	cm44dtbv8001bevcsrzplq638	2024-11-30 16:23:27.572	2024-11-30 16:23:27.572
cm44dtbv8001fevcs99k819f4	Curso Django. Proyecto web completo XIX. Vídeo 44 de pildorasinformaticas 20.739 visualizaciones hace 3 años 22 minutos	22.19	django-44.mp4	<h3>Curso Django. Proyecto web completo XIX. Vídeo 44 de pildorasinformaticas 20.739 visualizaciones hace 3 años 22 minutos</h3>	cm44dtbv8001bevcsrzplq638	2024-11-30 16:23:27.572	2024-11-30 16:23:27.572
cm44dtbv8001gevcs35c0sqiv	Curso Django. Proyecto web completo XX. Vídeo 45 de pildorasinformaticas 21.782 visualizaciones hace 3 años 20 minutos	20.02	django-45.mp4	<h3>Curso Django. Proyecto web completo XX. Vídeo 45 de pildorasinformaticas 21.782 visualizaciones hace 3 años 20 minutos</h3>	cm44dtbv8001bevcsrzplq638	2024-11-30 16:23:27.572	2024-11-30 16:23:27.572
cm44dtbv8001hevcsygq3kdg7	Curso Django. Proyecto web completo XXI. Vídeo 46 de pildorasinformaticas 19.072 visualizaciones hace 3 años 16 minutos	16.36	django-46.mp4	<h3>Curso Django. Proyecto web completo XXI. Vídeo 46 de pildorasinformaticas 19.072 visualizaciones hace 3 años 16 minutos</h3>	cm44dtbv8001bevcsrzplq638	2024-11-30 16:23:27.572	2024-11-30 16:23:27.572
cm44dtbv8001ievcs3j4g6r14	Curso Django. Proyecto web completo XXII. Vídeo 47 de pildorasinformaticas 17.070 visualizaciones hace 3 años 13 minutos y 4 segundos	13.04	django-47.mp4	<h3>Curso Django. Proyecto web completo XXII. Vídeo 47 de pildorasinformaticas 17.070 visualizaciones hace 3 años 13 minutos y 4 segundos</h3>	cm44dtbv8001bevcsrzplq638	2024-11-30 16:23:27.572	2024-11-30 16:23:27.572
cm44dtbv8001jevcsln9168sb	Curso Django. Proyecto web completo XXIII. Vídeo 48 de pildorasinformaticas 16.974 visualizaciones hace 3 años 12 minutos y 6 segundos	12.06	django-48.mp4	<h3>Curso Django. Proyecto web completo XXIII. Vídeo 48 de pildorasinformaticas 16.974 visualizaciones hace 3 años 12 minutos y 6 segundos</h3>	cm44dtbv8001bevcsrzplq638	2024-11-30 16:23:27.572	2024-11-30 16:23:27.572
cm44dtbv8001kevcs3mxailw8	Curso Django. Proyecto web completo XXIV. Vídeo 49 de pildorasinformaticas 17.868 visualizaciones hace 3 años 20 minutos	20.17	django-49.mp4	<h3>Curso Django. Proyecto web completo XXIV. Vídeo 49 de pildorasinformaticas 17.868 visualizaciones hace 3 años 20 minutos</h3>	cm44dtbv8001bevcsrzplq638	2024-11-30 16:23:27.572	2024-11-30 16:23:27.572
cm44dtbv8001levcssn4aunoy	Curso Django. Proyecto web completo XXV. Vídeo 50 de pildorasinformaticas 16.744 visualizaciones hace 3 años 14 minutos y 12 segundos	14.12	django-50.mp4	<h3>Curso Django. Proyecto web completo XXV. Vídeo 50 de pildorasinformaticas 16.744 visualizaciones hace 3 años 14 minutos y 12 segundos</h3>	cm44dtbv8001bevcsrzplq638	2024-11-30 16:23:27.572	2024-11-30 16:23:27.572
cm44dtbv8001mevcs4v0uc0ff	Curso Django. Proyecto web completo XXVI. Vídeo 51 de pildorasinformaticas 17.079 visualizaciones hace 3 años 13 minutos y 50 segundos	13.5	django-51.mp4	<h3>Curso Django. Proyecto web completo XXVI. Vídeo 51 de pildorasinformaticas 17.079 visualizaciones hace 3 años 13 minutos y 50 segundos</h3>	cm44dtbv8001bevcsrzplq638	2024-11-30 16:23:27.572	2024-11-30 16:23:27.572
cm44dtbv8001nevcsc6v9mn4p	Curso Django. Proyecto web completo XXVII. Vídeo 52 de pildorasinformaticas 18.844 visualizaciones hace 3 años 16 minutos	16.33	django-52.mp4	<h3>Curso Django. Proyecto web completo XXVII. Vídeo 52 de pildorasinformaticas 18.844 visualizaciones hace 3 años 16 minutos</h3>	cm44dtbv8001bevcsrzplq638	2024-11-30 16:23:27.572	2024-11-30 16:23:27.572
cm44dtbv8001oevcszc28gknw	Curso Django. Proyecto web completo XXVIII. Vídeo 53 de pildorasinformaticas 19.631 visualizaciones hace 3 años 15 minutos	15.19	django-53.mp4	<h3>Curso Django. Proyecto web completo XXVIII. Vídeo 53 de pildorasinformaticas 19.631 visualizaciones hace 3 años 15 minutos</h3>	cm44dtbv8001bevcsrzplq638	2024-11-30 16:23:27.572	2024-11-30 16:23:27.572
cm44dtbv8001pevcswdnmbplu	Curso Django. Proyecto web completo XIX. Vídeo 54 de pildorasinformaticas 23.895 visualizaciones hace 3 años 17 minutos	17.34	django-54.mp4	<h3>Curso Django. Proyecto web completo XIX. Vídeo 54 de pildorasinformaticas 23.895 visualizaciones hace 3 años 17 minutos</h3>	cm44dtbv8001bevcsrzplq638	2024-11-30 16:23:27.572	2024-11-30 16:23:27.572
cm44dtbv8001qevcsxdiqazke	Curso Django. Proyecto web completo XX. Vídeo 55 de pildorasinformaticas 22.150 visualizaciones hace 3 años 11 minutos y 16 segundos	11.16	django-55.mp4	<h3>Curso Django. Proyecto web completo XX. Vídeo 55 de pildorasinformaticas 22.150 visualizaciones hace 3 años 11 minutos y 16 segundos</h3>	cm44dtbv8001bevcsrzplq638	2024-11-30 16:23:27.572	2024-11-30 16:23:27.572
cm44dtbv8001revcs1oet9kjp	Curso Django. Proyecto web completo XXI. Vídeo 56 de pildorasinformaticas 19.003 visualizaciones hace 3 años 20 minutos	20.5	django-56.mp4	<h3>Curso Django. Proyecto web completo XXI. Vídeo 56 de pildorasinformaticas 19.003 visualizaciones hace 3 años 20 minutos</h3>	cm44dtbv8001bevcsrzplq638	2024-11-30 16:23:27.572	2024-11-30 16:23:27.572
cm44dtbv8001sevcsuwv7iu6p	Curso Django. Proyecto web completo XXII. Vídeo 57 de pildorasinformaticas 19.339 visualizaciones hace 3 años 10 minutos y 54 segundos	10.54	django-57.mp4	<h3>Curso Django. Proyecto web completo XXII. Vídeo 57 de pildorasinformaticas 19.339 visualizaciones hace 3 años 10 minutos y 54 segundos</h3>	cm44dtbv8001bevcsrzplq638	2024-11-30 16:23:27.572	2024-11-30 16:23:27.572
cm44dtbv8001tevcs32igj50r	Curso Django. Proyecto web completo XXIII. Vídeo 58 de pildorasinformaticas 26.838 visualizaciones hace 3 años 14 minutos y 18 segundos	14.18	django-58.mp4	<h3>Curso Django. Proyecto web completo XXIII. Vídeo 58 de pildorasinformaticas 26.838 visualizaciones hace 3 años 14 minutos y 18 segundos</h3>	cm44dtbv8001bevcsrzplq638	2024-11-30 16:23:27.572	2024-11-30 16:23:27.572
cm44dtbv8001uevcshjvuixkd	Curso Django. Proyecto web completo XXIV. Vídeo 59 de pildorasinformaticas 12.746 visualizaciones hace 2 años 16 minutos	16	django-59.mp4	<h3>Curso Django. Proyecto web completo XXIV. Vídeo 59 de pildorasinformaticas 12.746 visualizaciones hace 2 años 16 minutos</h3>	cm44dtbv8001bevcsrzplq638	2024-11-30 16:23:27.572	2024-11-30 16:23:27.572
cm44dtbv8001vevcs0geil8mw	Curso Django. Proyecto web completo XXV. Vídeo 60 de pildorasinformaticas 16.179 visualizaciones hace 2 años 11 minutos y 24 segundos	11.24	django-60.mp4	<h3>Curso Django. Proyecto web completo XXV. Vídeo 60 de pildorasinformaticas 16.179 visualizaciones hace 2 años 11 minutos y 24 segundos</h3>	cm44dtbv8001bevcsrzplq638	2024-11-30 16:23:27.572	2024-11-30 16:23:27.572
cm44dtbvb001yevcsj8wf1czc	Curso Django. Proyecto web completo XXVI. Vídeo 61 de pildorasinformaticas 14.678 visualizaciones hace 2 años 16 minutos	16.3	django-61.mp4	<h3>Curso Django. Proyecto web completo XXVI. Vídeo 61 de pildorasinformaticas 14.678 visualizaciones hace 2 años 16 minutos</h3>	cm44dtbvb001xevcsx80zh22s	2024-11-30 16:23:27.576	2024-11-30 16:23:27.576
cm44dtbvb001zevcs9p6s6ttk	Curso Django. Proyecto web completo XXVII. Registro de usuarios. Vídeo 62 de pildorasinformaticas 15.368 visualizaciones hace 2 años 23 minutos	23.45	django-62.mp4	<h3>Curso Django. Proyecto web completo XXVII. Registro de usuarios. Vídeo 62 de pildorasinformaticas 15.368 visualizaciones hace 2 años 23 minutos</h3>	cm44dtbvb001xevcsx80zh22s	2024-11-30 16:23:27.576	2024-11-30 16:23:27.576
cm44dtbvb0020evcsgxexjkri	Curso Django. Proyecto web completo XXVIII. Sesión de usuarios. Vídeo 63 de pildorasinformaticas 11.824 visualizaciones hace 2 años 19 minutos	19.45	django-63.mp4	<h3>Curso Django. Proyecto web completo XXVIII. Sesión de usuarios. Vídeo 63 de pildorasinformaticas 11.824 visualizaciones hace 2 años 19 minutos</h3>	cm44dtbvb001xevcsx80zh22s	2024-11-30 16:23:27.576	2024-11-30 16:23:27.576
cm44dtbvb0021evcst1fzdzq3	Curso Django: Proyecto completo XXIX. Creando login. Vídeo 64 de pildorasinformaticas 14.867 visualizaciones hace 2 años 15 minutos	15.37	django-64.mp4	<h3>Curso Django: Proyecto completo XXIX. Creando login. Vídeo 64 de pildorasinformaticas 14.867 visualizaciones hace 2 años 15 minutos</h3>	cm44dtbvb001xevcsx80zh22s	2024-11-30 16:23:27.576	2024-11-30 16:23:27.576
cm44dtbvb0022evcswfeu1ti4	Curso Django: Proyecto completo XXX. Mensajes de error. Vídeo 65 de pildorasinformaticas 26.127 visualizaciones hace 2 años 15 minutos	15.11	django-65.mp4	<h3>Curso Django: Proyecto completo XXX. Mensajes de error. Vídeo 65 de pildorasinformaticas 26.127 visualizaciones hace 2 años 15 minutos</h3>	cm44dtbvb001xevcsx80zh22s	2024-11-30 16:23:27.576	2024-11-30 16:23:27.576
cm44dtbvb0023evcssc46e3hn	Curso Django. Proyecto completo XXXI. Corrigiendo para pedidos. Vídeo 66 de pildorasinformaticas 13.235 visualizaciones hace 2 años 17 minutos	17.08	django-66.mp4	<h3>Curso Django. Proyecto completo XXXI. Corrigiendo para pedidos. Vídeo 66 de pildorasinformaticas 13.235 visualizaciones hace 2 años 17 minutos</h3>	cm44dtbvb001xevcsx80zh22s	2024-11-30 16:23:27.576	2024-11-30 16:23:27.576
cm44dtbvb0024evcs2zmxpxqu	Curso Django. Proyecto completo XXXII. Creando app Pedidos. Vídeo 67 de pildorasinformaticas 12.320 visualizaciones hace 2 años 18 minutos	18.04	django-67.mp4	<h3>Curso Django. Proyecto completo XXXII. Creando app Pedidos. Vídeo 67 de pildorasinformaticas 12.320 visualizaciones hace 2 años 18 minutos</h3>	cm44dtbvb001xevcsx80zh22s	2024-11-30 16:23:27.576	2024-11-30 16:23:27.576
cm44dtbvb0025evcskvoz8iln	Curso Django. Proyecto completo XXXIII. Creando app Pedidos II. Vídeo 68 de pildorasinformaticas 12.219 visualizaciones hace 2 años 14 minutos y 56 segundos	14.56	django-68.mp4	<h3>Curso Django. Proyecto completo XXXIII. Creando app Pedidos II. Vídeo 68 de pildorasinformaticas 12.219 visualizaciones hace 2 años 14 minutos y 56 segundos</h3>	cm44dtbvb001xevcsx80zh22s	2024-11-30 16:23:27.576	2024-11-30 16:23:27.576
cm44dtbvb0026evcsjmwiymu3	Curso Django. Proyecto completo XXXIV. Creando app Pedidos III. Vídeo 69 de pildorasinformaticas 13.492 visualizaciones hace 2 años 18 minutos	18.05	django-69.mp4	<h3>Curso Django. Proyecto completo XXXIV. Creando app Pedidos III. Vídeo 69 de pildorasinformaticas 13.492 visualizaciones hace 2 años 18 minutos</h3>	cm44dtbvb001xevcsx80zh22s	2024-11-30 16:23:27.576	2024-11-30 16:23:27.576
cm44dtbvb0027evcso6q9tqw5	Curso Django. Proyecto completo. FIN. Vídeo 70 de pildorasinformaticas 28.411 visualizaciones hace 2 años 25 minutos	25.18	django-70.mp4	<h3>Curso Django. Proyecto completo. FIN. Vídeo 70 de pildorasinformaticas 28.411 visualizaciones hace 2 años 25 minutos</h3>	cm44dtbvb001xevcsx80zh22s	2024-11-30 16:23:27.576	2024-11-30 16:23:27.576
cm44dztiy0004evjwr8ge9pdq	Curso Spring. Presentación. Vídeo 1 de pildorasinformaticas 269.457 visualizaciones hace 5 años 3 minutos y 28 segundos	3.28	spring-01.mp4	<h3>Curso Spring. Presentación. Vídeo 1 de pildorasinformaticas 269.457 visualizaciones hace 5 años 3 minutos y 28 segundos</h3>	cm44dztiy0003evjwc4wodtwt	2024-11-30 16:28:30.394	2024-11-30 16:28:30.394
cm44dztiy0005evjwijcmbhil	Curso Spring. Introducción. Vídeo 2 de pildorasinformaticas 109.175 visualizaciones hace 5 años 7 minutos y 40 segundos	7.4	spring-02.mp4	<h3>Curso Spring. Introducción. Vídeo 2 de pildorasinformaticas 109.175 visualizaciones hace 5 años 7 minutos y 40 segundos</h3>	cm44dztiy0003evjwc4wodtwt	2024-11-30 16:28:30.394	2024-11-30 16:28:30.394
cm44dztiy0006evjwfgmpa049	Curso Spring. Core Spring. Vídeo 3 de pildorasinformaticas 93.341 visualizaciones hace 5 años 11 minutos y 27 segundos	11.27	spring-03.mp4	<h3>Curso Spring. Core Spring. Vídeo 3 de pildorasinformaticas 93.341 visualizaciones hace 5 años 11 minutos y 27 segundos</h3>	cm44dztiy0003evjwc4wodtwt	2024-11-30 16:28:30.394	2024-11-30 16:28:30.394
cm44dztiy0007evjwh4384pz9	Curso Spring. Instalación Tomcat y Entorno de desarrollo. Vídeo 4 de pildorasinformaticas 101.858 visualizaciones hace 5 años 20 minutos	20.04	spring-04.mp4	<h3>Curso Spring. Instalación Tomcat y Entorno de desarrollo. Vídeo 4 de pildorasinformaticas 101.858 visualizaciones hace 5 años 20 minutos</h3>	cm44dztiy0003evjwc4wodtwt	2024-11-30 16:28:30.394	2024-11-30 16:28:30.394
cm44dztiy0008evjwz7xdo20t	Curso Spring. Descarga e instalación librerías Spring. Spring JAR files. Vídeo 5 de pildorasinformaticas 86.121 visualizaciones hace 5 años 8 minutos y 35 segundos	8.35	spring-05.mp4	<h3>Curso Spring. Descarga e instalación librerías Spring. Spring JAR files. Vídeo 5 de pildorasinformaticas 86.121 visualizaciones hace 5 años 8 minutos y 35 segundos</h3>	cm44dztiy0003evjwc4wodtwt	2024-11-30 16:28:30.394	2024-11-30 16:28:30.394
cm44dztiy0009evjw4phlwjqo	Curso Spring. Inversion Of Control I. Vídeo 6 de pildorasinformaticas 83.483 visualizaciones hace 5 años 14 minutos y 47 segundos	14.47	spring-06.mp4	<h3>Curso Spring. Inversion Of Control I. Vídeo 6 de pildorasinformaticas 83.483 visualizaciones hace 5 años 14 minutos y 47 segundos</h3>	cm44dztiy0003evjwc4wodtwt	2024-11-30 16:28:30.394	2024-11-30 16:28:30.394
cm44dztiy000aevjwsw2eti4t	Curso Spring. Inversion Of Control II. Vídeo 7 de pildorasinformaticas 73.016 visualizaciones hace 5 años 11 minutos y 49 segundos	11.49	spring-07.mp4	<h3>Curso Spring. Inversion Of Control II. Vídeo 7 de pildorasinformaticas 73.016 visualizaciones hace 5 años 11 minutos y 49 segundos</h3>	cm44dztiy0003evjwc4wodtwt	2024-11-30 16:28:30.394	2024-11-30 16:28:30.394
cm44dztiy000bevjwy5sybdpe	Curso Spring. Inversion Of Control III. Vídeo 8 de pildorasinformaticas 66.137 visualizaciones hace 5 años 11 minutos y 34 segundos	11.34	spring-08.mp4	<h3>Curso Spring. Inversion Of Control III. Vídeo 8 de pildorasinformaticas 66.137 visualizaciones hace 5 años 11 minutos y 34 segundos</h3>	cm44dztiy0003evjwc4wodtwt	2024-11-30 16:28:30.394	2024-11-30 16:28:30.394
cm44dztiy000cevjwp34st1ed	Curso Spring. Inyección de dependencias. Vídeo 9 de pildorasinformaticas 76.653 visualizaciones hace 5 años 26 minutos	26	spring-09.mp4	<h3>Curso Spring. Inyección de dependencias. Vídeo 9 de pildorasinformaticas 76.653 visualizaciones hace 5 años 26 minutos</h3>	cm44dztiy0003evjwc4wodtwt	2024-11-30 16:28:30.394	2024-11-30 16:28:30.394
cm44dztiy000devjwd8kau2ic	Curso Spring. Inyección de dependencias II. Vídeo 10 de pildorasinformaticas 44.584 visualizaciones hace 5 años 11 minutos y 23 segundos	11.23	spring-10.mp4	<h3>Curso Spring. Inyección de dependencias II. Vídeo 10 de pildorasinformaticas 44.584 visualizaciones hace 5 años 11 minutos y 23 segundos</h3>	cm44dztiy0003evjwc4wodtwt	2024-11-30 16:28:30.394	2024-11-30 16:28:30.394
cm44dztiy000eevjwogfxdr51	Curso Spring. Inyección de dependencias III. Vídeo 11 de pildorasinformaticas 39.228 visualizaciones hace 5 años 14 minutos y 26 segundos	14.26	spring-11.mp4	<h3>Curso Spring. Inyección de dependencias III. Vídeo 11 de pildorasinformaticas 39.228 visualizaciones hace 5 años 14 minutos y 26 segundos</h3>	cm44dztiy0003evjwc4wodtwt	2024-11-30 16:28:30.394	2024-11-30 16:28:30.394
cm44dztiy000fevjw8e8yfiup	Curso Spring. Inyección de dependencias IV. Vídeo 12 de pildorasinformaticas 31.771 visualizaciones hace 5 años 6 minutos y 54 segundos	6.54	spring-12.mp4	<h3>Curso Spring. Inyección de dependencias IV. Vídeo 12 de pildorasinformaticas 31.771 visualizaciones hace 5 años 6 minutos y 54 segundos</h3>	cm44dztiy0003evjwc4wodtwt	2024-11-30 16:28:30.394	2024-11-30 16:28:30.394
cm44dztiy000gevjwsmu0gc4q	Curso Spring. Singleton y Prototype. Vídeo 13 de pildorasinformaticas 38.766 visualizaciones hace 5 años 19 minutos	19.1	spring-13.mp4	<h3>Curso Spring. Singleton y Prototype. Vídeo 13 de pildorasinformaticas 38.766 visualizaciones hace 5 años 19 minutos</h3>	cm44dztiy0003evjwc4wodtwt	2024-11-30 16:28:30.394	2024-11-30 16:28:30.394
cm44dztiy000hevjwv8t3q5vh	Curso Spring. Ciclo de vida del Bean. Vídeo 14 de pildorasinformaticas 35.445 visualizaciones hace 5 años 14 minutos y 47 segundos	14.47	spring-14.mp4	<h3>Curso Spring. Ciclo de vida del Bean. Vídeo 14 de pildorasinformaticas 35.445 visualizaciones hace 5 años 14 minutos y 47 segundos</h3>	cm44dztiy0003evjwc4wodtwt	2024-11-30 16:28:30.394	2024-11-30 16:28:30.394
cm44dztiy000ievjwih8qrbsk	Curso Spring. Java Annotations. Vídeo 15 de pildorasinformaticas 37.866 visualizaciones hace 5 años 10 minutos y 16 segundos	10.16	spring-15.mp4	<h3>Curso Spring. Java Annotations. Vídeo 15 de pildorasinformaticas 37.866 visualizaciones hace 5 años 10 minutos y 16 segundos</h3>	cm44dztiy0003evjwc4wodtwt	2024-11-30 16:28:30.394	2024-11-30 16:28:30.394
cm44dztiy000jevjwvp3zl2cf	Curso Spring. Java Annotations II. Vídeo 16 de pildorasinformaticas 34.702 visualizaciones hace 5 años 9 minutos y 24 segundos	9.24	spring-16.mp4	<h3>Curso Spring. Java Annotations II. Vídeo 16 de pildorasinformaticas 34.702 visualizaciones hace 5 años 9 minutos y 24 segundos</h3>	cm44dztiy0003evjwc4wodtwt	2024-11-30 16:28:30.394	2024-11-30 16:28:30.394
cm44dztiy000kevjwn8xbjph2	Curso Spring. Java Annotations III. Autowired. Vídeo 17 de pildorasinformaticas 38.134 visualizaciones hace 5 años 15 minutos	15.05	spring-17.mp4	<h3>Curso Spring. Java Annotations III. Autowired. Vídeo 17 de pildorasinformaticas 38.134 visualizaciones hace 5 años 15 minutos</h3>	cm44dztiy0003evjwc4wodtwt	2024-11-30 16:28:30.394	2024-11-30 16:28:30.394
cm44dztiy000levjwwqwc2vmu	Curso Spring. Java Annotations IV. Autowired II. Vídeo 18 de pildorasinformaticas 25.259 visualizaciones hace 5 años 5 minutos y 29 segundos	5.29	spring-18.mp4	<h3>Curso Spring. Java Annotations IV. Autowired II. Vídeo 18 de pildorasinformaticas 25.259 visualizaciones hace 5 años 5 minutos y 29 segundos</h3>	cm44dztiy0003evjwc4wodtwt	2024-11-30 16:28:30.394	2024-11-30 16:28:30.394
cm44dztiy000mevjw8c8wwvhp	Curso Spring. Java Annotations V. Autowired III. Vídeo 19 de pildorasinformaticas 24.359 visualizaciones hace 5 años 7 minutos y 32 segundos	7.32	spring-19.mp4	<h3>Curso Spring. Java Annotations V. Autowired III. Vídeo 19 de pildorasinformaticas 24.359 visualizaciones hace 5 años 7 minutos y 32 segundos</h3>	cm44dztiy0003evjwc4wodtwt	2024-11-30 16:28:30.394	2024-11-30 16:28:30.394
cm44dztiy000nevjwkipl4zf9	Curso Spring. Java Annotations VI. @Qualifier. Vídeo 20 de pildorasinformaticas 24.789 visualizaciones hace 5 años 7 minutos y 58 segundos	7.58	spring-20.mp4	<h3>Curso Spring. Java Annotations VI. @Qualifier. Vídeo 20 de pildorasinformaticas 24.789 visualizaciones hace 5 años 7 minutos y 58 segundos</h3>	cm44dztiy0003evjwc4wodtwt	2024-11-30 16:28:30.394	2024-11-30 16:28:30.394
cm44dztj4000qevjw7r93m16s	Curso Spring. Java Annotations VII. @Scope. Vídeo 21 de pildorasinformaticas 22.408 visualizaciones hace 5 años 7 minutos y 39 segundos	7.39	spring-21.mp4	<h3>Curso Spring. Java Annotations VII. @Scope. Vídeo 21 de pildorasinformaticas 22.408 visualizaciones hace 5 años 7 minutos y 39 segundos</h3>	cm44dztj4000pevjwinv0s0fi	2024-11-30 16:28:30.4	2024-11-30 16:28:30.4
cm44dztj4000revjw9nowg1z8	Curso Spring. Java Annotations VIII. @PostConstruct y @PreDestroy. Vídeo 22 de pildorasinformaticas 21.980 visualizaciones hace 5 años 8 minutos y 21 segundos	8.21	spring-22.mp4	<h3>Curso Spring. Java Annotations VIII. @PostConstruct y @PreDestroy. Vídeo 22 de pildorasinformaticas 21.980 visualizaciones hace 5 años 8 minutos y 21 segundos</h3>	cm44dztj4000pevjwinv0s0fi	2024-11-30 16:28:30.4	2024-11-30 16:28:30.4
cm44dztj4000sevjws4lrd9so	Curso Spring. Java Annotations IX. @Configuration. Vídeo 23 de pildorasinformaticas 23.201 visualizaciones hace 5 años 6 minutos y 52 segundos	6.52	spring-23.mp4	<h3>Curso Spring. Java Annotations IX. @Configuration. Vídeo 23 de pildorasinformaticas 23.201 visualizaciones hace 5 años 6 minutos y 52 segundos</h3>	cm44dztj4000pevjwinv0s0fi	2024-11-30 16:28:30.4	2024-11-30 16:28:30.4
cm44dztj4000tevjwuy1hexv4	Curso Spring. Java Annotations X. @Bean. Vídeo 24 de pildorasinformaticas 32.259 visualizaciones hace 5 años 14 minutos y 53 segundos	14.53	spring-24.mp4	<h3>Curso Spring. Java Annotations X. @Bean. Vídeo 24 de pildorasinformaticas 32.259 visualizaciones hace 5 años 14 minutos y 53 segundos</h3>	cm44dztj4000pevjwinv0s0fi	2024-11-30 16:28:30.4	2024-11-30 16:28:30.4
cm44dztj4000uevjwypeztgim	Curso Spring. Java Annotations X. @PropertySource y @Value. Vídeo 25 de pildorasinformaticas 22.761 visualizaciones hace 5 años 9 minutos y 58 segundos	9.58	spring-25.mp4	<h3>Curso Spring. Java Annotations X. @PropertySource y @Value. Vídeo 25 de pildorasinformaticas 22.761 visualizaciones hace 5 años 9 minutos y 58 segundos</h3>	cm44dztj4000pevjwinv0s0fi	2024-11-30 16:28:30.4	2024-11-30 16:28:30.4
cm44dztj4000vevjwfm1yfmyl	Curso Spring. Aplicaciones Web I. Modelo Vista Controlador. Vídeo 26 de pildorasinformaticas 33.343 visualizaciones hace 5 años 6 minutos y 50 segundos	6.5	spring-26.mp4	<h3>Curso Spring. Aplicaciones Web I. Modelo Vista Controlador. Vídeo 26 de pildorasinformaticas 33.343 visualizaciones hace 5 años 6 minutos y 50 segundos</h3>	cm44dztj4000pevjwinv0s0fi	2024-11-30 16:28:30.4	2024-11-30 16:28:30.4
cm44dztj4000wevjwd5tcofey	Curso Spring. Aplicaciones Web II. MVC creando proyecto. Vídeo 27 de pildorasinformaticas 53.453 visualizaciones hace 5 años 17 minutos	17.1	spring-27.mp4	<h3>Curso Spring. Aplicaciones Web II. MVC creando proyecto. Vídeo 27 de pildorasinformaticas 53.453 visualizaciones hace 5 años 17 minutos</h3>	cm44dztj4000pevjwinv0s0fi	2024-11-30 16:28:30.4	2024-11-30 16:28:30.4
cm44dztj4000xevjwcaa8ts7y	Curso Spring. Aplicaciones Web III. Petición y respuesta vía formulario. Vídeo 28 de pildorasinformaticas 32.862 visualizaciones hace 5 años 15 minutos	15.42	spring-28.mp4	<h3>Curso Spring. Aplicaciones Web III. Petición y respuesta vía formulario. Vídeo 28 de pildorasinformaticas 32.862 visualizaciones hace 5 años 15 minutos</h3>	cm44dztj4000pevjwinv0s0fi	2024-11-30 16:28:30.4	2024-11-30 16:28:30.4
cm44dztj4000yevjwtqi3znm0	Curso Spring. Aplicaciones Web IV. Añadir datos al modelo. Vídeo 29 de pildorasinformaticas 24.829 visualizaciones hace 5 años 16 minutos	16.36	spring-29.mp4	<h3>Curso Spring. Aplicaciones Web IV. Añadir datos al modelo. Vídeo 29 de pildorasinformaticas 24.829 visualizaciones hace 5 años 16 minutos</h3>	cm44dztj4000pevjwinv0s0fi	2024-11-30 16:28:30.4	2024-11-30 16:28:30.4
cm44dztj4000zevjwn3v27rqj	Curso Spring. Aplicaciones Web V. Añadir contenido estático. Vídeo 30 de pildorasinformaticas 21.405 visualizaciones hace 5 años 11 minutos y 21 segundos	11.21	spring-30.mp4	<h3>Curso Spring. Aplicaciones Web V. Añadir contenido estático. Vídeo 30 de pildorasinformaticas 21.405 visualizaciones hace 5 años 11 minutos y 21 segundos</h3>	cm44dztj4000pevjwinv0s0fi	2024-11-30 16:28:30.4	2024-11-30 16:28:30.4
cm44dztj40010evjw1yu30emm	Curso Spring. Archivos WAR. Vïdeo 31 de pildorasinformaticas 19.801 visualizaciones hace 5 años 7 minutos y 59 segundos	7.59	spring-31.mp4	<h3>Curso Spring. Archivos WAR. Vïdeo 31 de pildorasinformaticas 19.801 visualizaciones hace 5 años 7 minutos y 59 segundos</h3>	cm44dztj4000pevjwinv0s0fi	2024-11-30 16:28:30.4	2024-11-30 16:28:30.4
cm44dztj40011evjwvqqwywbd	Curso Spring. Anotación @RequestParam. Vídeo 32 de pildorasinformaticas 18.184 visualizaciones hace 5 años 4 minutos y 42 segundos	4.42	spring-32.mp4	<h3>Curso Spring. Anotación @RequestParam. Vídeo 32 de pildorasinformaticas 18.184 visualizaciones hace 5 años 4 minutos y 42 segundos</h3>	cm44dztj4000pevjwinv0s0fi	2024-11-30 16:28:30.4	2024-11-30 16:28:30.4
cm44dztj40012evjwlsip0n6s	Curso Spring. @RequestMapping y conflicto de rutas. Vídeo 33 de pildorasinformaticas 20.902 visualizaciones hace 5 años 19 minutos	19.18	spring-33.mp4	<h3>Curso Spring. @RequestMapping y conflicto de rutas. Vídeo 33 de pildorasinformaticas 20.902 visualizaciones hace 5 años 19 minutos</h3>	cm44dztj4000pevjwinv0s0fi	2024-11-30 16:28:30.4	2024-11-30 16:28:30.4
cm44dztj40013evjwlnwc57n4	Curso Spring. Form MVC tags I. Vídeo 34 de pildorasinformaticas 20.451 visualizaciones hace 5 años 23 minutos	23.59	spring-34.mp4	<h3>Curso Spring. Form MVC tags I. Vídeo 34 de pildorasinformaticas 20.451 visualizaciones hace 5 años 23 minutos</h3>	cm44dztj4000pevjwinv0s0fi	2024-11-30 16:28:30.4	2024-11-30 16:28:30.4
cm44dztj40014evjw3td9vzom	Curso Spring. Form MVC tags II. Vídeo 35 de pildorasinformaticas 14.844 visualizaciones hace 5 años 10 minutos y 34 segundos	10.34	spring-35.mp4	<h3>Curso Spring. Form MVC tags II. Vídeo 35 de pildorasinformaticas 14.844 visualizaciones hace 5 años 10 minutos y 34 segundos</h3>	cm44dztj4000pevjwinv0s0fi	2024-11-30 16:28:30.4	2024-11-30 16:28:30.4
cm44dztj40015evjw9p3th4ei	Curso Spring. Form MVC tags III. Vídeo 36 de pildorasinformaticas 12.617 visualizaciones hace 5 años 13 minutos y 31 segundos	13.31	spring-36.mp4	<h3>Curso Spring. Form MVC tags III. Vídeo 36 de pildorasinformaticas 12.617 visualizaciones hace 5 años 13 minutos y 31 segundos</h3>	cm44dztj4000pevjwinv0s0fi	2024-11-30 16:28:30.4	2024-11-30 16:28:30.4
cm44dztj40016evjwufc28s9n	Curso Spring. Form MVC tags IV. RadioButtons y checkboxes. Vídeo 37 de pildorasinformaticas 12.579 visualizaciones hace 5 años 14 minutos y 15 segundos	14.15	spring-37.mp4	<h3>Curso Spring. Form MVC tags IV. RadioButtons y checkboxes. Vídeo 37 de pildorasinformaticas 12.579 visualizaciones hace 5 años 14 minutos y 15 segundos</h3>	cm44dztj4000pevjwinv0s0fi	2024-11-30 16:28:30.4	2024-11-30 16:28:30.4
cm44dztj40017evjwzxvxyogk	Curso Spring. Validación de formularios I. Vídeo 38 de pildorasinformaticas 18.422 visualizaciones hace 5 años 14 minutos y 9 segundos	14.09	spring-38.mp4	<h3>Curso Spring. Validación de formularios I. Vídeo 38 de pildorasinformaticas 18.422 visualizaciones hace 5 años 14 minutos y 9 segundos</h3>	cm44dztj4000pevjwinv0s0fi	2024-11-30 16:28:30.4	2024-11-30 16:28:30.4
cm44dztj40018evjw36zpsnuw	Curso Spring. Validación de formularios II. Vídeo 39 de pildorasinformaticas 14.938 visualizaciones hace 5 años 13 minutos y 49 segundos	13.49	spring-39.mp4	<h3>Curso Spring. Validación de formularios II. Vídeo 39 de pildorasinformaticas 14.938 visualizaciones hace 5 años 13 minutos y 49 segundos</h3>	cm44dztj4000pevjwinv0s0fi	2024-11-30 16:28:30.4	2024-11-30 16:28:30.4
cm44dztj40019evjwea3qywqo	Curso Spring. Validación de formularios III. Vídeo 40 de pildorasinformaticas 11.777 visualizaciones hace 5 años 14 minutos y 22 segundos	14.22	spring-40.mp4	<h3>Curso Spring. Validación de formularios III. Vídeo 40 de pildorasinformaticas 11.777 visualizaciones hace 5 años 14 minutos y 22 segundos</h3>	cm44dztj4000pevjwinv0s0fi	2024-11-30 16:28:30.4	2024-11-30 16:28:30.4
cm44dztj7001cevjwpi0vs6wj	Curso Spring. Validación de formularios IV. @InitBinder. Vídeo 41 de pildorasinformaticas 10.715 visualizaciones hace 5 años 11 minutos y 25 segundos	11.25	spring-41.mp4	<h3>Curso Spring. Validación de formularios IV. @InitBinder. Vídeo 41 de pildorasinformaticas 10.715 visualizaciones hace 5 años 11 minutos y 25 segundos</h3>	cm44dztj7001bevjw1o61lane	2024-11-30 16:28:30.404	2024-11-30 16:28:30.404
cm44dztj7001devjwmpy6kn1e	Curso Spring. Validación de formularios V. Expresiones regulares. Vídeo 42 de pildorasinformaticas 11.263 visualizaciones hace 5 años 13 minutos y 19 segundos	13.19	spring-42.mp4	<h3>Curso Spring. Validación de formularios V. Expresiones regulares. Vídeo 42 de pildorasinformaticas 11.263 visualizaciones hace 5 años 13 minutos y 19 segundos</h3>	cm44dztj7001bevjw1o61lane	2024-11-30 16:28:30.404	2024-11-30 16:28:30.404
cm44dztj7001eevjwk14ctgbk	Curso Spring. Validación de formularios VI. Errores personalizados. Vídeo 43 de pildorasinformaticas 11.075 visualizaciones hace 5 años 12 minutos y 51 segundos	12.51	spring-43.mp4	<h3>Curso Spring. Validación de formularios VI. Errores personalizados. Vídeo 43 de pildorasinformaticas 11.075 visualizaciones hace 5 años 12 minutos y 51 segundos</h3>	cm44dztj7001bevjw1o61lane	2024-11-30 16:28:30.404	2024-11-30 16:28:30.404
cm44dztj7001fevjw73tbwqs7	Curso Spring. Validación de formularios VII. Validaciones propias. Vídeo 44 de pildorasinformaticas 10.166 visualizaciones hace 5 años 21 minutos	21.5	spring-44.mp4	<h3>Curso Spring. Validación de formularios VII. Validaciones propias. Vídeo 44 de pildorasinformaticas 10.166 visualizaciones hace 5 años 21 minutos</h3>	cm44dztj7001bevjw1o61lane	2024-11-30 16:28:30.404	2024-11-30 16:28:30.404
cm44dztj7001gevjwmf5wiysh	Curso Spring. Validación de formularios VIII. Validaciones propias. Vídeo 45 de pildorasinformaticas 9528 visualizaciones hace 5 años 10 minutos y 4 segundos	10.04	spring-45.mp4	<h3>Curso Spring. Validación de formularios VIII. Validaciones propias. Vídeo 45 de pildorasinformaticas 9528 visualizaciones hace 5 años 10 minutos y 4 segundos</h3>	cm44dztj7001bevjw1o61lane	2024-11-30 16:28:30.404	2024-11-30 16:28:30.404
cm44dztj7001hevjwt78ser0q	Curso Spring. Hibernate, acceso a datos. Vídeo 46 de pildorasinformaticas 37.021 visualizaciones hace 4 años 11 minutos y 8 segundos	11.08	spring-46.mp4	<h3>Curso Spring. Hibernate, acceso a datos. Vídeo 46 de pildorasinformaticas 37.021 visualizaciones hace 4 años 11 minutos y 8 segundos</h3>	cm44dztj7001bevjw1o61lane	2024-11-30 16:28:30.404	2024-11-30 16:28:30.404
cm44dztj7001ievjw4v5gtttw	Curso Spring. Creación de proyecto y conexión con BBDD. Vídeo 47 de pildorasinformaticas 29.445 visualizaciones hace 4 años 17 minutos	17.37	spring-47.mp4	<h3>Curso Spring. Creación de proyecto y conexión con BBDD. Vídeo 47 de pildorasinformaticas 29.445 visualizaciones hace 4 años 17 minutos</h3>	cm44dztj7001bevjw1o61lane	2024-11-30 16:28:30.404	2024-11-30 16:28:30.404
cm44dztj7001jevjw8i2ei8av	Curso Spring. Configuración y Mapeo ORM. Vídeo 48 de pildorasinformaticas 29.367 visualizaciones hace 4 años 16 minutos	16.11	spring-48.mp4	<h3>Curso Spring. Configuración y Mapeo ORM. Vídeo 48 de pildorasinformaticas 29.367 visualizaciones hace 4 años 16 minutos</h3>	cm44dztj7001bevjw1o61lane	2024-11-30 16:28:30.404	2024-11-30 16:28:30.404
cm44dztj7001kevjwypi116ho	Curso Spring. Inserción de registro en BBDD vía ORM. Vídeo 49 de pildorasinformaticas 21.443 visualizaciones hace 4 años 13 minutos y 6 segundos	13.06	spring-49.mp4	<h3>Curso Spring. Inserción de registro en BBDD vía ORM. Vídeo 49 de pildorasinformaticas 21.443 visualizaciones hace 4 años 13 minutos y 6 segundos</h3>	cm44dztj7001bevjw1o61lane	2024-11-30 16:28:30.404	2024-11-30 16:28:30.404
cm44dztj7001levjw3f5r6gxr	Curso Spring. Asignar clave principal en Hibernate. Vídeo 50 de pildorasinformaticas 15.817 visualizaciones hace 4 años 14 minutos y 16 segundos	14.16	spring-50.mp4	<h3>Curso Spring. Asignar clave principal en Hibernate. Vídeo 50 de pildorasinformaticas 15.817 visualizaciones hace 4 años 14 minutos y 16 segundos</h3>	cm44dztj7001bevjw1o61lane	2024-11-30 16:28:30.404	2024-11-30 16:28:30.404
cm44dztj7001mevjwuuc4fh2t	Curso Spring. Consultas a BBDD con HQL. Vídeo 51 de pildorasinformaticas 16.447 visualizaciones hace 4 años 19 minutos	19.09	spring-51.mp4	<h3>Curso Spring. Consultas a BBDD con HQL. Vídeo 51 de pildorasinformaticas 16.447 visualizaciones hace 4 años 19 minutos</h3>	cm44dztj7001bevjw1o61lane	2024-11-30 16:28:30.404	2024-11-30 16:28:30.404
cm44dztj7001nevjwuop39xas	Curso Spring. Update & Delete con HQL. Vídeo 52 de pildorasinformaticas 12.057 visualizaciones hace 4 años 11 minutos y 54 segundos	11.54	spring-52.mp4	<h3>Curso Spring. Update & Delete con HQL. Vídeo 52 de pildorasinformaticas 12.057 visualizaciones hace 4 años 11 minutos y 54 segundos</h3>	cm44dztj7001bevjw1o61lane	2024-11-30 16:28:30.404	2024-11-30 16:28:30.404
cm44dztj7001oevjwtmtfwm09	Curso Spring. Relaciones entre tablas I. Vídeo 53 de pildorasinformaticas 19.721 visualizaciones hace 4 años 20 minutos	20.4	spring-53.mp4	<h3>Curso Spring. Relaciones entre tablas I. Vídeo 53 de pildorasinformaticas 19.721 visualizaciones hace 4 años 20 minutos</h3>	cm44dztj7001bevjw1o61lane	2024-11-30 16:28:30.404	2024-11-30 16:28:30.404
cm44dztj7001pevjw1xee8ry7	Curso Spring. Relaciones entre tablas II. Vídeo 54 de pildorasinformaticas 17.516 visualizaciones hace 4 años 20 minutos	20.39	spring-54.mp4	<h3>Curso Spring. Relaciones entre tablas II. Vídeo 54 de pildorasinformaticas 17.516 visualizaciones hace 4 años 20 minutos</h3>	cm44dztj7001bevjw1o61lane	2024-11-30 16:28:30.404	2024-11-30 16:28:30.404
cm44dztj8001qevjw8h1bopn6	Curso Spring. Relaciones entre tablas III. Vídeo 55 de pildorasinformaticas 15.056 visualizaciones hace 4 años 14 minutos y 53 segundos	14.53	spring-55.mp4	<h3>Curso Spring. Relaciones entre tablas III. Vídeo 55 de pildorasinformaticas 15.056 visualizaciones hace 4 años 14 minutos y 53 segundos</h3>	cm44dztj7001bevjw1o61lane	2024-11-30 16:28:30.404	2024-11-30 16:28:30.404
cm44dztj8001revjwnbwiymti	Curso Spring. Relaciones entre tablas IV. Vídeo 56 de pildorasinformaticas 11.353 visualizaciones hace 4 años 15 minutos	15.59	spring-56.mp4	<h3>Curso Spring. Relaciones entre tablas IV. Vídeo 56 de pildorasinformaticas 11.353 visualizaciones hace 4 años 15 minutos</h3>	cm44dztj7001bevjw1o61lane	2024-11-30 16:28:30.404	2024-11-30 16:28:30.404
cm44dztj8001sevjwwof9trul	Curso Spring. Relaciones entre tablas V. Vídeo 57 de pildorasinformaticas 10.688 visualizaciones hace 4 años 18 minutos	18.01	spring-57.mp4	<h3>Curso Spring. Relaciones entre tablas V. Vídeo 57 de pildorasinformaticas 10.688 visualizaciones hace 4 años 18 minutos</h3>	cm44dztj7001bevjw1o61lane	2024-11-30 16:28:30.404	2024-11-30 16:28:30.404
cm44dztj8001tevjw23ixm32f	Curso Spring. Relaciones entre tablas VI. Leaks y eliminar. de pildorasinformaticas 8766 visualizaciones hace 4 años 14 minutos y 9 segundos	14.09	spring-58.mp4	<h3>Curso Spring. Relaciones entre tablas VI. Leaks y eliminar. de pildorasinformaticas 8766 visualizaciones hace 4 años 14 minutos y 9 segundos</h3>	cm44dztj7001bevjw1o61lane	2024-11-30 16:28:30.404	2024-11-30 16:28:30.404
cm44dztj8001uevjw3pxigkks	Curso Spring. Relaciones entre tablas VII. Eliminar detalles de Cliente. Vídeo 59 de pildorasinformaticas 8998 visualizaciones hace 4 años 11 minutos y 25 segundos	11.25	spring-59.mp4	<h3>Curso Spring. Relaciones entre tablas VII. Eliminar detalles de Cliente. Vídeo 59 de pildorasinformaticas 8998 visualizaciones hace 4 años 11 minutos y 25 segundos</h3>	cm44dztj7001bevjw1o61lane	2024-11-30 16:28:30.404	2024-11-30 16:28:30.404
cm44dztj8001vevjw02lear2q	Curso Spring. Relaciones entre tablas VIII. Relación uno a varios. Vídeo 60 de pildorasinformaticas 9903 visualizaciones hace 4 años 14 minutos y 59 segundos	14.59	spring-60.mp4	<h3>Curso Spring. Relaciones entre tablas VIII. Relación uno a varios. Vídeo 60 de pildorasinformaticas 9903 visualizaciones hace 4 años 14 minutos y 59 segundos</h3>	cm44dztj7001bevjw1o61lane	2024-11-30 16:28:30.404	2024-11-30 16:28:30.404
cm44dztjb001yevjwv6xue2d3	Curso Spring. Relaciones entre tablas IX. Relación uno a varios de pildorasinformaticas 13.252 visualizaciones hace 4 años 14 minutos y 8 segundos	14.08	spring-61.mp4	<h3>Curso Spring. Relaciones entre tablas IX. Relación uno a varios de pildorasinformaticas 13.252 visualizaciones hace 4 años 14 minutos y 8 segundos</h3>	cm44dztjb001xevjwjrxbugh0	2024-11-30 16:28:30.407	2024-11-30 16:28:30.407
cm44dztjb001zevjwxkro5gt4	Curso Spring. Relaciones entre tablas X. Relación uno a varios. Vídeo 62 de pildorasinformaticas 9907 visualizaciones hace 4 años 12 minutos y 38 segundos	12.38	spring-62.mp4	<h3>Curso Spring. Relaciones entre tablas X. Relación uno a varios. Vídeo 62 de pildorasinformaticas 9907 visualizaciones hace 4 años 12 minutos y 38 segundos</h3>	cm44dztjb001xevjwjrxbugh0	2024-11-30 16:28:30.407	2024-11-30 16:28:30.407
cm44dztjb0020evjwicmaygmn	Curso Spring. Relaciones entre tablas XI. Relación uno a varios. Vídeo 63 de pildorasinformaticas 7998 visualizaciones hace 4 años 13 minutos y 1 segundo	13.01	spring-63.mp4	<h3>Curso Spring. Relaciones entre tablas XI. Relación uno a varios. Vídeo 63 de pildorasinformaticas 7998 visualizaciones hace 4 años 13 minutos y 1 segundo</h3>	cm44dztjb001xevjwjrxbugh0	2024-11-30 16:28:30.407	2024-11-30 16:28:30.407
cm44dztjb0021evjw18qajrae	Curso Spring. FetchType Eager vs FetchType Lazy. Vídeo 64 de pildorasinformaticas 11.334 visualizaciones hace 4 años 13 minutos	13	spring-64.mp4	<h3>Curso Spring. FetchType Eager vs FetchType Lazy. Vídeo 64 de pildorasinformaticas 11.334 visualizaciones hace 4 años 13 minutos</h3>	cm44dztjb001xevjwjrxbugh0	2024-11-30 16:28:30.407	2024-11-30 16:28:30.407
cm44dztjb0022evjwp25hbf9g	Curso Spring. Lazy y cierre de sesión. Vídeo 65 de pildorasinformaticas 8092 visualizaciones hace 4 años 15 minutos	15.14	spring-65.mp4	<h3>Curso Spring. Lazy y cierre de sesión. Vídeo 65 de pildorasinformaticas 8092 visualizaciones hace 4 años 15 minutos</h3>	cm44dztjb001xevjwjrxbugh0	2024-11-30 16:28:30.407	2024-11-30 16:28:30.407
cm44dztjb0023evjw4ejd0ovx	Curso Spring. Proyecto web dinámico CRUD I. Vídeo 66 de pildorasinformaticas 16.310 visualizaciones hace 4 años 14 minutos y 54 segundos	14.54	spring-66.mp4	<h3>Curso Spring. Proyecto web dinámico CRUD I. Vídeo 66 de pildorasinformaticas 16.310 visualizaciones hace 4 años 14 minutos y 54 segundos</h3>	cm44dztjb001xevjwjrxbugh0	2024-11-30 16:28:30.407	2024-11-30 16:28:30.407
cm44dztjb0024evjwclrdd6hu	Curso Spring. Proyecto web dinámico CRUD II. Vídeo 67 de pildorasinformaticas 12.757 visualizaciones hace 4 años 20 minutos	20.25	spring-67.mp4	<h3>Curso Spring. Proyecto web dinámico CRUD II. Vídeo 67 de pildorasinformaticas 12.757 visualizaciones hace 4 años 20 minutos</h3>	cm44dztjb001xevjwjrxbugh0	2024-11-30 16:28:30.407	2024-11-30 16:28:30.407
cm44dztjb0025evjwhw1f6o2j	Curso Spring. Proyecto web dinámico CRUD III. Entidad Cliente. Vídeo 68 de pildorasinformaticas 9400 visualizaciones hace 4 años 8 minutos y 38 segundos	8.38	spring-68.mp4	<h3>Curso Spring. Proyecto web dinámico CRUD III. Entidad Cliente. Vídeo 68 de pildorasinformaticas 9400 visualizaciones hace 4 años 8 minutos y 38 segundos</h3>	cm44dztjb001xevjwjrxbugh0	2024-11-30 16:28:30.407	2024-11-30 16:28:30.407
cm44dztjb0026evjw629vio72	Curso Spring. Proyecto web dinámico CRUD IV. DAO. Vídeo 69 de pildorasinformaticas 11.756 visualizaciones hace 4 años 29 minutos	29.08	spring-69.mp4	<h3>Curso Spring. Proyecto web dinámico CRUD IV. DAO. Vídeo 69 de pildorasinformaticas 11.756 visualizaciones hace 4 años 29 minutos</h3>	cm44dztjb001xevjwjrxbugh0	2024-11-30 16:28:30.407	2024-11-30 16:28:30.407
cm44dztjb0027evjwepidl53q	Curso Spring. Proyecto web dinámico CRUD V. Vídeo 70 de pildorasinformaticas 8813 visualizaciones hace 4 años 17 minutos	17.55	spring-70.mp4	<h3>Curso Spring. Proyecto web dinámico CRUD V. Vídeo 70 de pildorasinformaticas 8813 visualizaciones hace 4 años 17 minutos</h3>	cm44dztjb001xevjwjrxbugh0	2024-11-30 16:28:30.407	2024-11-30 16:28:30.407
cm44dztjb0028evjwih0vowqq	Curso Spring. Proyecto web dinámico CRUD VI. Vídeo 71 de pildorasinformaticas 8399 visualizaciones hace 3 años 26 minutos	26.36	spring-71.mp4	<h3>Curso Spring. Proyecto web dinámico CRUD VI. Vídeo 71 de pildorasinformaticas 8399 visualizaciones hace 3 años 26 minutos</h3>	cm44dztjb001xevjwjrxbugh0	2024-11-30 16:28:30.407	2024-11-30 16:28:30.407
cm44dztjb0029evjwy15mtrnj	Curso Spring. Proyecto web dinámico CRUD VII. Vídeo 72 de pildorasinformaticas 8342 visualizaciones hace 3 años 15 minutos	15.41	spring-72.mp4	<h3>Curso Spring. Proyecto web dinámico CRUD VII. Vídeo 72 de pildorasinformaticas 8342 visualizaciones hace 3 años 15 minutos</h3>	cm44dztjb001xevjwjrxbugh0	2024-11-30 16:28:30.407	2024-11-30 16:28:30.407
cm44dztjb002aevjw132rt395	Curso Spring. Proyecto web dinámico CRUD VIII. Vídeo 73 de pildorasinformaticas 6288 visualizaciones hace 3 años 16 minutos	16.45	spring-73.mp4	<h3>Curso Spring. Proyecto web dinámico CRUD VIII. Vídeo 73 de pildorasinformaticas 6288 visualizaciones hace 3 años 16 minutos</h3>	cm44dztjb001xevjwjrxbugh0	2024-11-30 16:28:30.407	2024-11-30 16:28:30.407
cm44dztjb002bevjwm9yn9zf5	Curso Spring. Proyecto web dinámico CRUD IX. Vídeo 74 de pildorasinformaticas 5913 visualizaciones hace 3 años 11 minutos y 37 segundos	11.37	spring-74.mp4	<h3>Curso Spring. Proyecto web dinámico CRUD IX. Vídeo 74 de pildorasinformaticas 5913 visualizaciones hace 3 años 11 minutos y 37 segundos</h3>	cm44dztjb001xevjwjrxbugh0	2024-11-30 16:28:30.407	2024-11-30 16:28:30.407
cm44dztjb002cevjwbqvpqlg8	Curso Spring. Proyecto web dinámico CRUD X. Vídeo 75 de pildorasinformaticas 7128 visualizaciones hace 3 años 21 minutos	21.29	spring-75.mp4	<h3>Curso Spring. Proyecto web dinámico CRUD X. Vídeo 75 de pildorasinformaticas 7128 visualizaciones hace 3 años 21 minutos</h3>	cm44dztjb001xevjwjrxbugh0	2024-11-30 16:28:30.407	2024-11-30 16:28:30.407
cm44dztjb002devjwz75p253h	Curso Spring. AOP. Vídeo 76 de pildorasinformaticas 13.179 visualizaciones hace 3 años 13 minutos y 17 segundos	13.17	spring-76.mp4	<h3>Curso Spring. AOP. Vídeo 76 de pildorasinformaticas 13.179 visualizaciones hace 3 años 13 minutos y 17 segundos</h3>	cm44dztjb001xevjwjrxbugh0	2024-11-30 16:28:30.407	2024-11-30 16:28:30.407
cm44dztjb002eevjwzudtr0ib	Curso Spring. AOP II. Ejemplo sencillo en código. Vídeo 77 de pildorasinformaticas 10.888 visualizaciones hace 3 años 26 minutos	26.24	spring-77.mp4	<h3>Curso Spring. AOP II. Ejemplo sencillo en código. Vídeo 77 de pildorasinformaticas 10.888 visualizaciones hace 3 años 26 minutos</h3>	cm44dztjb001xevjwjrxbugh0	2024-11-30 16:28:30.407	2024-11-30 16:28:30.407
cm44dztjb002fevjwrekbftoq	Curso Spring. AOP III. Pointcut expressions. Vídeo 78 de pildorasinformaticas 6864 visualizaciones hace 3 años 18 minutos	18.51	spring-78.mp4	<h3>Curso Spring. AOP III. Pointcut expressions. Vídeo 78 de pildorasinformaticas 6864 visualizaciones hace 3 años 18 minutos</h3>	cm44dztjb001xevjwjrxbugh0	2024-11-30 16:28:30.407	2024-11-30 16:28:30.407
cm44dztjb002gevjwquubqut7	Curso Spring. AOP IV. Más patrones en pointcut expressions. Vídeo 79 de pildorasinformaticas 6421 visualizaciones hace 3 años 13 minutos y 32 segundos	13.32	spring-79.mp4	<h3>Curso Spring. AOP IV. Más patrones en pointcut expressions. Vídeo 79 de pildorasinformaticas 6421 visualizaciones hace 3 años 13 minutos y 32 segundos</h3>	cm44dztjb001xevjwjrxbugh0	2024-11-30 16:28:30.407	2024-11-30 16:28:30.407
cm44dztjb002hevjwj3qurs6s	Curso Spring. AOP V. Reutilización de pointcut expressions. Vídeo 80 de pildorasinformaticas 5082 visualizaciones hace 3 años 15 minutos	15.18	spring-80.mp4	<h3>Curso Spring. AOP V. Reutilización de pointcut expressions. Vídeo 80 de pildorasinformaticas 5082 visualizaciones hace 3 años 15 minutos</h3>	cm44dztjb001xevjwjrxbugh0	2024-11-30 16:28:30.407	2024-11-30 16:28:30.407
cm44dztjf002kevjwmk19m5jn	Curso Spring. AOP VI. Combinación de pointcut expressions. Vídeo 81 de pildorasinformaticas 5188 visualizaciones hace 3 años 28 minutos	28.22	spring-81.mp4	<h3>Curso Spring. AOP VI. Combinación de pointcut expressions. Vídeo 81 de pildorasinformaticas 5188 visualizaciones hace 3 años 28 minutos</h3>	cm44dztjf002jevjw944z1lov	2024-11-30 16:28:30.411	2024-11-30 16:28:30.411
cm44dztjf002levjwb1fojfmu	Curso Spring. AOP VII. Ordenación de aspectos. Vídeo 82 de pildorasinformaticas 5145 visualizaciones hace 3 años 21 minutos	21.07	spring-82.mp4	<h3>Curso Spring. AOP VII. Ordenación de aspectos. Vídeo 82 de pildorasinformaticas 5145 visualizaciones hace 3 años 21 minutos</h3>	cm44dztjf002jevjw944z1lov	2024-11-30 16:28:30.411	2024-11-30 16:28:30.411
cm44dztjf002mevjwnbte4w94	Curso Spring. AOP VIII. Acceso a parámetros desde Aspecto. Vídeo 83 de pildorasinformaticas 4891 visualizaciones hace 3 años 16 minutos	16.14	spring-83.mp4	<h3>Curso Spring. AOP VIII. Acceso a parámetros desde Aspecto. Vídeo 83 de pildorasinformaticas 4891 visualizaciones hace 3 años 16 minutos</h3>	cm44dztjf002jevjw944z1lov	2024-11-30 16:28:30.411	2024-11-30 16:28:30.411
cm44dztjf002nevjwxutxzei5	Curso Spring. AOP IX. AfterReturning. Vídeo 84 de pildorasinformaticas 6346 visualizaciones hace 3 años 27 minutos	27.44	spring-84.mp4	<h3>Curso Spring. AOP IX. AfterReturning. Vídeo 84 de pildorasinformaticas 6346 visualizaciones hace 3 años 27 minutos</h3>	cm44dztjf002jevjw944z1lov	2024-11-30 16:28:30.411	2024-11-30 16:28:30.411
cm44dztjf002oevjwr89uwqq6	Curso Spring. AOP X. Procesado de datos after returning. Vídeo 85 de pildorasinformaticas 4669 visualizaciones hace 3 años 12 minutos y 31 segundos	12.31	spring-85.mp4	<h3>Curso Spring. AOP X. Procesado de datos after returning. Vídeo 85 de pildorasinformaticas 4669 visualizaciones hace 3 años 12 minutos y 31 segundos</h3>	cm44dztjf002jevjw944z1lov	2024-11-30 16:28:30.411	2024-11-30 16:28:30.411
cm44dztjf002pevjwfw97klb8	Curso Spring. AOP XI. Procesado de datos AfterThrowing. Vídeo 86 de pildorasinformaticas 5520 visualizaciones hace 3 años 14 minutos y 46 segundos	14.46	spring-86.mp4	<h3>Curso Spring. AOP XI. Procesado de datos AfterThrowing. Vídeo 86 de pildorasinformaticas 5520 visualizaciones hace 3 años 14 minutos y 46 segundos</h3>	cm44dztjf002jevjw944z1lov	2024-11-30 16:28:30.411	2024-11-30 16:28:30.411
cm44dztjf002qevjw2xpgvdoe	Curso Spring. AOP XII. Procesado de datos After. Vídeo 87 de pildorasinformaticas 3681 visualizaciones hace 3 años 8 minutos y 54 segundos	8.54	spring-87.mp4	<h3>Curso Spring. AOP XII. Procesado de datos After. Vídeo 87 de pildorasinformaticas 3681 visualizaciones hace 3 años 8 minutos y 54 segundos</h3>	cm44dztjf002jevjw944z1lov	2024-11-30 16:28:30.411	2024-11-30 16:28:30.411
cm44dztjf002revjwdmnmvz1i	Curso Spring. AOP XIII. Procesado de datos @Around. Vídeo 88 de pildorasinformaticas 4927 visualizaciones hace 3 años 19 minutos	19.48	spring-88.mp4	<h3>Curso Spring. AOP XIII. Procesado de datos @Around. Vídeo 88 de pildorasinformaticas 4927 visualizaciones hace 3 años 19 minutos</h3>	cm44dztjf002jevjw944z1lov	2024-11-30 16:28:30.411	2024-11-30 16:28:30.411
cm44dztjf002sevjw635yfd6e	Curso Spring. Maven I. Vídeo 89 de pildorasinformaticas 12.227 visualizaciones hace 3 años 9 minutos y 19 segundos	9.19	spring-89.mp4	<h3>Curso Spring. Maven I. Vídeo 89 de pildorasinformaticas 12.227 visualizaciones hace 3 años 9 minutos y 19 segundos</h3>	cm44dztjf002jevjw944z1lov	2024-11-30 16:28:30.411	2024-11-30 16:28:30.411
cm44dztjf002tevjwjegy9iv6	Curso Spring. Maven II. Vídeo 90 de pildorasinformaticas 12.551 visualizaciones hace 3 años 18 minutos	18.55	spring-90.mp4	<h3>Curso Spring. Maven II. Vídeo 90 de pildorasinformaticas 12.551 visualizaciones hace 3 años 18 minutos</h3>	cm44dztjf002jevjw944z1lov	2024-11-30 16:28:30.411	2024-11-30 16:28:30.411
cm44dztjf002uevjwos2budj6	Curso Spring. Maven III. Vídeo 91 de pildorasinformaticas 8448 visualizaciones hace 2 años 10 minutos y 3 segundos	10.03	spring-91.mp4	<h3>Curso Spring. Maven III. Vídeo 91 de pildorasinformaticas 8448 visualizaciones hace 2 años 10 minutos y 3 segundos</h3>	cm44dztjf002jevjw944z1lov	2024-11-30 16:28:30.411	2024-11-30 16:28:30.411
cm44dztjf002vevjwgb05kq2j	Curso Spring. Seguridad I. Vídeo 92 de pildorasinformaticas 8737 visualizaciones hace 2 años 10 minutos y 34 segundos	10.34	spring-92.mp4	<h3>Curso Spring. Seguridad I. Vídeo 92 de pildorasinformaticas 8737 visualizaciones hace 2 años 10 minutos y 34 segundos</h3>	cm44dztjf002jevjw944z1lov	2024-11-30 16:28:30.411	2024-11-30 16:28:30.411
cm44dztjf002wevjwlcs2s7fs	Curso Spring. Seguridad II. Vídeo 93 de pildorasinformaticas 7730 visualizaciones hace 2 años 12 minutos y 46 segundos	12.46	spring-93.mp4	<h3>Curso Spring. Seguridad II. Vídeo 93 de pildorasinformaticas 7730 visualizaciones hace 2 años 12 minutos y 46 segundos</h3>	cm44dztjf002jevjw944z1lov	2024-11-30 16:28:30.411	2024-11-30 16:28:30.411
cm44dztjf002xevjwjl6vlttr	Curso Spring. Seguridad III. Vídeo 94 de pildorasinformaticas 9188 visualizaciones hace 2 años 16 minutos	16.13	spring-94.mp4	<h3>Curso Spring. Seguridad III. Vídeo 94 de pildorasinformaticas 9188 visualizaciones hace 2 años 16 minutos</h3>	cm44dztjf002jevjw944z1lov	2024-11-30 16:28:30.411	2024-11-30 16:28:30.411
cm44dztjf002yevjwvw01lj2f	Curso Spring. Seguridad IV. Creación de login. Vídeo 95 de pildorasinformaticas 14.934 visualizaciones hace 2 años 20 minutos	20.26	spring-95.mp4	<h3>Curso Spring. Seguridad IV. Creación de login. Vídeo 95 de pildorasinformaticas 14.934 visualizaciones hace 2 años 20 minutos</h3>	cm44dztjf002jevjw944z1lov	2024-11-30 16:28:30.411	2024-11-30 16:28:30.411
cm44dztjf002zevjwkoh40o39	Curso Spring. Seguridad V. Login propio. Vídeo 96 de pildorasinformaticas 7837 visualizaciones hace 2 años 20 minutos	20.54	spring-96.mp4	<h3>Curso Spring. Seguridad V. Login propio. Vídeo 96 de pildorasinformaticas 7837 visualizaciones hace 2 años 20 minutos</h3>	cm44dztjf002jevjw944z1lov	2024-11-30 16:28:30.411	2024-11-30 16:28:30.411
cm44dztjf0030evjwogho78b3	Curso Spring. Seguridad VI. Login bootstrap. Vídeo 97 de pildorasinformaticas 6589 visualizaciones hace 2 años 19 minutos	19.19	spring-97.mp4	<h3>Curso Spring. Seguridad VI. Login bootstrap. Vídeo 97 de pildorasinformaticas 6589 visualizaciones hace 2 años 19 minutos</h3>	cm44dztjf002jevjw944z1lov	2024-11-30 16:28:30.411	2024-11-30 16:28:30.411
cm44dztjf0031evjwfjdqnicd	Curso Spring. Seguridad VII. Logout. Vídeo 98 de pildorasinformaticas 4968 visualizaciones hace 2 años 11 minutos y 47 segundos	11.47	spring-98.mp4	<h3>Curso Spring. Seguridad VII. Logout. Vídeo 98 de pildorasinformaticas 4968 visualizaciones hace 2 años 11 minutos y 47 segundos</h3>	cm44dztjf002jevjw944z1lov	2024-11-30 16:28:30.411	2024-11-30 16:28:30.411
cm44dztjf0032evjwg0ma176c	Curso Spring. Seguridad VIII. Roles de usuario. Vídeo 99 de pildorasinformaticas 8917 visualizaciones hace 2 años 8 minutos y 25 segundos	8.25	spring-99.mp4	<h3>Curso Spring. Seguridad VIII. Roles de usuario. Vídeo 99 de pildorasinformaticas 8917 visualizaciones hace 2 años 8 minutos y 25 segundos</h3>	cm44dztjf002jevjw944z1lov	2024-11-30 16:28:30.411	2024-11-30 16:28:30.411
cm44dztjf0033evjwmujoz5we	Curso Spring. Seguridad IX. Roles y zonas restringidas. Vídeo 100 de pildorasinformaticas 5863 visualizaciones hace 2 años 20 minutos	20.1	spring-100.mp4	<h3>Curso Spring. Seguridad IX. Roles y zonas restringidas. Vídeo 100 de pildorasinformaticas 5863 visualizaciones hace 2 años 20 minutos</h3>	cm44dztjf002jevjw944z1lov	2024-11-30 16:28:30.411	2024-11-30 16:28:30.411
\.


--
-- Data for Name: ratings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ratings (id, rating, comment, user_id, course_id, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: units; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.units (id, title, course_id, "createdAt", "updatedAt") FROM stdin;
cm44d76f60003evcwr0odq7z9	Unidad 1	cm44d76f20001evcwlgx3nsb8	2024-11-30 16:06:14.083	2024-11-30 16:06:14.083
cm44d76fe000pevcwkh22fuxo	Unidad 2	cm44d76f20001evcwlgx3nsb8	2024-11-30 16:06:14.09	2024-11-30 16:06:14.09
cm44d76fi001bevcwqngryrso	Unidad 3	cm44d76f20001evcwlgx3nsb8	2024-11-30 16:06:14.094	2024-11-30 16:06:14.094
cm44d76fm001xevcw527b4nd1	Unidad 4	cm44d76f20001evcwlgx3nsb8	2024-11-30 16:06:14.098	2024-11-30 16:06:14.098
cm44d76fq002jevcw9lhgvk42	Unidad 5	cm44d76f20001evcwlgx3nsb8	2024-11-30 16:06:14.102	2024-11-30 16:06:14.102
cm44d76fu0035evcwfp9ef7br	Unidad 6	cm44d76f20001evcwlgx3nsb8	2024-11-30 16:06:14.106	2024-11-30 16:06:14.106
cm44dgkip0003evo0vf5ht9qd	Unidad 1	cm44dgkig0001evo01ztw5oqb	2024-11-30 16:13:32.258	2024-11-30 16:13:32.258
cm44dgkjc000pevo0raen3zme	Unidad 2	cm44dgkig0001evo01ztw5oqb	2024-11-30 16:13:32.28	2024-11-30 16:13:32.28
cm44dgkjm001bevo0riwu6jzy	Unidad 3	cm44dgkig0001evo01ztw5oqb	2024-11-30 16:13:32.29	2024-11-30 16:13:32.29
cm44dgkjr001xevo0xskvi990	Unidad 4	cm44dgkig0001evo01ztw5oqb	2024-11-30 16:13:32.295	2024-11-30 16:13:32.295
cm44dkm650003evnceyzvj9my	Unidad 1	cm44dkm600001evncosuusk8w	2024-11-30 16:16:41.022	2024-11-30 16:16:41.022
cm44dkm6e000pevncbey7bblq	Unidad 2	cm44dkm600001evncosuusk8w	2024-11-30 16:16:41.03	2024-11-30 16:16:41.03
cm44dkm6j001bevncu9ngwyez	Unidad 3	cm44dkm600001evncosuusk8w	2024-11-30 16:16:41.035	2024-11-30 16:16:41.035
cm44dkm6n001xevncupazsh1n	Unidad 4	cm44dkm600001evncosuusk8w	2024-11-30 16:16:41.04	2024-11-30 16:16:41.04
cm44dkm6r002jevnc6pd7pk0c	Unidad 5	cm44dkm600001evncosuusk8w	2024-11-30 16:16:41.043	2024-11-30 16:16:41.043
cm44dnqsq0003evg4yuoxbqnn	Unidad 1	cm44dnqsm0001evg43q1tcj84	2024-11-30 16:19:06.987	2024-11-30 16:19:06.987
cm44dnqsv000pevg4i88xvfge	Unidad 2	cm44dnqsm0001evg43q1tcj84	2024-11-30 16:19:06.992	2024-11-30 16:19:06.992
cm44dnqsz001bevg4btx0jdof	Unidad 3	cm44dnqsm0001evg43q1tcj84	2024-11-30 16:19:06.995	2024-11-30 16:19:06.995
cm44dnqt3001xevg4lu5pjcj1	Unidad 4	cm44dnqsm0001evg43q1tcj84	2024-11-30 16:19:07	2024-11-30 16:19:07
cm44dnqt7002jevg4ykpgj8zt	Unidad 5	cm44dnqsm0001evg43q1tcj84	2024-11-30 16:19:07.003	2024-11-30 16:19:07.003
cm44dpus30003evugcwn3zx9l	Unidad 1	cm44dpurx0001evug6imnm4e5	2024-11-30 16:20:45.459	2024-11-30 16:20:45.459
cm44dpus8000pevugm2pzm3jx	Unidad 2	cm44dpurx0001evug6imnm4e5	2024-11-30 16:20:45.465	2024-11-30 16:20:45.465
cm44dpusc001bevugni7fizhr	Unidad 3	cm44dpurx0001evug6imnm4e5	2024-11-30 16:20:45.468	2024-11-30 16:20:45.468
cm44dtbux0003evcsfhwhdfbp	Unidad 1	cm44dtbus0001evcsj57fhlmv	2024-11-30 16:23:27.561	2024-11-30 16:23:27.561
cm44dtbv3000pevcscjrehwdu	Unidad 2	cm44dtbus0001evcsj57fhlmv	2024-11-30 16:23:27.568	2024-11-30 16:23:27.568
cm44dtbv8001bevcsrzplq638	Unidad 3	cm44dtbus0001evcsj57fhlmv	2024-11-30 16:23:27.572	2024-11-30 16:23:27.572
cm44dtbvb001xevcsx80zh22s	Unidad 4	cm44dtbus0001evcsj57fhlmv	2024-11-30 16:23:27.576	2024-11-30 16:23:27.576
cm44dztiy0003evjwc4wodtwt	Unidad 1	cm44dztit0001evjw4yliq3rg	2024-11-30 16:28:30.394	2024-11-30 16:28:30.394
cm44dztj4000pevjwinv0s0fi	Unidad 2	cm44dztit0001evjw4yliq3rg	2024-11-30 16:28:30.4	2024-11-30 16:28:30.4
cm44dztj7001bevjw1o61lane	Unidad 3	cm44dztit0001evjw4yliq3rg	2024-11-30 16:28:30.404	2024-11-30 16:28:30.404
cm44dztjb001xevjwjrxbugh0	Unidad 4	cm44dztit0001evjw4yliq3rg	2024-11-30 16:28:30.407	2024-11-30 16:28:30.407
cm44dztjf002jevjw944z1lov	Unidad 5	cm44dztit0001evjw4yliq3rg	2024-11-30 16:28:30.411	2024-11-30 16:28:30.411
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, first_name, last_name, email, password, "subscriptionId", image, role, title, github, website, linkedin, "createdAt", "updatedAt") FROM stdin;
cm3p0fbti000092pnuaseg0oe	Admin	Admin	admin@admin.com	$2b$10$6GEraF5zTcx8WO7O9m3z7eDOnekJaeU148qi/WTLxY6enyDi2sJCm	\N	\N	admin	\N	\N	\N	\N	2024-11-19 22:12:06.678	2024-11-19 22:12:06.678
cm3p0gf1f000192pnrvpzzqud	Pablo	Suárez	pablo@pablo.com	$2b$10$6JzQcPqCc.LzElT.fzdJl.Ekug4UjZsUlya.053tyOuVUTPpLau7G	\N	canarias_skills2-1732054377414.jpg	instructor	Desarrollador de Software y Técnico Informático	https://github.com/psuarezdev	https://psuarez.pages.dev/	https://www.linkedin.com/in/pablosuarezbm/	2024-11-19 22:12:57.507	2024-11-19 22:12:57.507
cm3p0gqr7000292pn6sirtw06	Carlos	Díaz	carlos@carlos.com	$2b$10$lomCN38W.O2WUtjt4CW2Xe4gBUfi2SuM.ZJmN.JXWnJMIBVv0t8NK	sub_1QQtcbCPIqfW5pHV5SF6O7B0	\N	user					2024-11-19 22:13:12.692	2024-11-23 11:57:54.026
\.


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: certificates certificates_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.certificates
    ADD CONSTRAINT certificates_pkey PRIMARY KEY (id);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- Name: courses courses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_pkey PRIMARY KEY (id);


--
-- Name: favorites favorites_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT favorites_pkey PRIMARY KEY (id);


--
-- Name: lesson_completions lesson_completions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lesson_completions
    ADD CONSTRAINT lesson_completions_pkey PRIMARY KEY (id);


--
-- Name: lessons lessons_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lessons
    ADD CONSTRAINT lessons_pkey PRIMARY KEY (id);


--
-- Name: ratings ratings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ratings
    ADD CONSTRAINT ratings_pkey PRIMARY KEY (id);


--
-- Name: units units_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.units
    ADD CONSTRAINT units_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: categories_name_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX categories_name_key ON public.categories USING btree (name);


--
-- Name: favorites_userId_courseId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "favorites_userId_courseId_key" ON public.favorites USING btree ("userId", "courseId");


--
-- Name: lesson_completions_userId_lessonId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "lesson_completions_userId_lessonId_key" ON public.lesson_completions USING btree ("userId", "lessonId");


--
-- Name: users_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);


--
-- Name: users_subscriptionId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "users_subscriptionId_key" ON public.users USING btree ("subscriptionId");


--
-- Name: certificates certificates_courseId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.certificates
    ADD CONSTRAINT "certificates_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES public.courses(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: certificates certificates_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.certificates
    ADD CONSTRAINT "certificates_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: comments comments_lessonId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT "comments_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES public.lessons(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: comments comments_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT "comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: courses courses_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT "courses_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public.categories(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: courses courses_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT "courses_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: favorites favorites_courseId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT "favorites_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES public.courses(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: favorites favorites_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT "favorites_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: lesson_completions lesson_completions_lessonId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lesson_completions
    ADD CONSTRAINT "lesson_completions_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES public.lessons(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: lesson_completions lesson_completions_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lesson_completions
    ADD CONSTRAINT "lesson_completions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: lessons lessons_unit_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lessons
    ADD CONSTRAINT lessons_unit_id_fkey FOREIGN KEY (unit_id) REFERENCES public.units(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ratings ratings_course_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ratings
    ADD CONSTRAINT ratings_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ratings ratings_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ratings
    ADD CONSTRAINT ratings_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: units units_course_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.units
    ADD CONSTRAINT units_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

