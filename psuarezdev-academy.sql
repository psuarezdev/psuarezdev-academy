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
    "updatedAt" timestamp(3) without time zone NOT NULL,
    image text NOT NULL
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
    subscription_id text,
    role public."Role" DEFAULT 'user'::public."Role" NOT NULL,
    title text,
    github text,
    website text,
    linkedin text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    avatar text
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
cm4g14zzm003vpciw93d96sbk	1259	2024-12-08 19:57:59.352	cm3p0gqr7000292pn6sirtw06	cm44dgkig0001evo01ztw5oqb
cm4g199tm006hpciwj0x181br	751	2024-12-08 20:05:03.858	cm3p0gqr7000292pn6sirtw06	cm44dpurx0001evug6imnm4e5
\.


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.comments (id, content, "userId", "lessonId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: courses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.courses (id, title, level, description, prerequisites, duration, average_rating, lessons, is_active, "userId", "categoryId", "createdAt", "updatedAt", image) FROM stdin;
cm44dpurx0001evug6imnm4e5	Curso Angular	intermedio	<h2>Descripción del curso: Curso Angular</h2>	JavaScript, TypeScript	751	0	46	tcm3p0gf1f000192pnrvpzzqud	cm3p0hkhv000392pnsxqgqy1i	2024-11-30 16:20:45.453	2024-12-04 19:45:47.033	curso-angular-1733341545947.jpg
cm44dtbus0001evcsj57fhlmv	Curso Django	intermedio	<h2>Descripción del curso: Curso Django</h2>	Python	1156	0	70	t	cm3p0gf1f000192pnrvpzzqud	cm3p0hkhv000392pnsxqgqy1i	2024-11-30 16:23:27.5572024-12-04 19:46:18.506	curso-django-1733341577144.jpg
cm44dgkig0001evo01ztw5oqb	Curso de C++	principiante	<h2>Descripción del curso: Curso de C++</h2>	\N	1259	3.5	62	t	cm3p0gf1f000192pnrvpzzqud	cm44bbd8k0000evqgsvzclb19	2024-11-30 16:13:32.2482025-02-08 19:15:36.537	curso-de-cpp-1733341525377.jpg
\.


--
-- Data for Name: favorites; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.favorites (id, "userId", "courseId", "createdAt") FROM stdin;
cm4g0t88f0003pciw31dykavg	cm3p0gqr7000292pn6sirtw06	cm44dgkig0001evo01ztw5oqb	2024-12-08 19:52:41.968
\.


--
-- Data for Name: lesson_completions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lesson_completions (id, "userId", "lessonId", "completedAt") FROM stdin;
cm4g0rdoi0001pciwjer4x5b3	cm3p0gqr7000292pn6sirtw06	cm44dgkip0006evo0qlhsee1v	2024-12-08 19:51:15.715
cm4g0wf2y0009pciwlrow44x7	cm3p0gqr7000292pn6sirtw06	cm44dgkip0005evo0gvdh7ccw	2024-12-08 19:55:10.81
cm4g0wiix000bpciw63c328z7	cm3p0gqr7000292pn6sirtw06	cm44dgkiq000bevo0di6v1yvc	2024-12-08 19:55:15.273
cm4g0wkh0000dpciw30qyhlyh	cm3p0gqr7000292pn6sirtw06	cm44dgkiq000kevo0oeyzrgm3	2024-12-08 19:55:17.796
cm4g0wmf5000fpciwvptguiyk	cm3p0gqr7000292pn6sirtw06	cm44dgkip0004evo0lg0ix9je	2024-12-08 19:55:20.322
cm4g0wohg000hpciwz5xdjrw1	cm3p0gqr7000292pn6sirtw06	cm44dgkiq000hevo00j7yp0r1	2024-12-08 19:55:22.996
cm4g0wqfu000jpciwxc1zpvrl	cm3p0gqr7000292pn6sirtw06	cm44dgkiq000aevo0si9ncjgt	2024-12-08 19:55:25.53
cm4g0wse1000lpciw807wmh2x	cm3p0gqr7000292pn6sirtw06	cm44dgkip0008evo0asynlfoi	2024-12-08 19:55:28.057
cm4g0wulj000npciwnn71r3qc	cm3p0gqr7000292pn6sirtw06	cm44dgkip0007evo0rnabpcsi	2024-12-08 19:55:30.919
cm4g0wwu0000ppciwprsex6hc	cm3p0gqr7000292pn6sirtw06	cm44dgkiq000devo022gpvh5s	2024-12-08 19:55:33.816
cm4g0wzra000rpciwkrhthuf1	cm3p0gqr7000292pn6sirtw06	cm44dgkiq000mevo0bysffse7	2024-12-08 19:55:37.607
cm4g0x1zh000tpciw1davod6b	cm3p0gqr7000292pn6sirtw06	cm44dgkip0009evo09k6rtu3n	2024-12-08 19:55:40.493
cm4g0x45d000vpciww59qwk4h	cm3p0gqr7000292pn6sirtw06	cm44dgkiq000eevo0bnv19225	2024-12-08 19:55:43.298
cm4g0x61p000xpciwllzegbtz	cm3p0gqr7000292pn6sirtw06	cm44dgkiq000cevo0mvdyn8ma	2024-12-08 19:55:45.758
cm4g0x92r000zpciw8k2nlo6a	cm3p0gqr7000292pn6sirtw06	cm44dgkiq000fevo055888dav	2024-12-08 19:55:49.684
cm4g0xc3q0011pciwe517vcx3	cm3p0gqr7000292pn6sirtw06	cm44dgkiq000gevo04hmehrs2	2024-12-08 19:55:53.607
cm4g0xedx0013pciwmu2m2c2b	cm3p0gqr7000292pn6sirtw06	cm44dgkiq000ievo0rh3p8pm5	2024-12-08 19:55:56.565
cm4g0xh7k0015pciwrgj14a6g	cm3p0gqr7000292pn6sirtw06	cm44dgkiq000jevo0q15i9xa1	2024-12-08 19:56:00.225
cm4g0xjgt0017pciwbktzjhwg	cm3p0gqr7000292pn6sirtw06	cm44dgkiq000levo0a7g48afa	2024-12-08 19:56:03.15
cm4g0xm7v0019pciwrk4up6us	cm3p0gqr7000292pn6sirtw06	cm44dgkiq000nevo0ruqb2zjo	2024-12-08 19:56:06.715
cm4g0xo95001bpciwi4efo3ck	cm3p0gqr7000292pn6sirtw06	cm44dgkjc0011evo0xkooso5h	2024-12-08 19:56:09.353
cm4g0xq42001dpciwwxuztzku	cm3p0gqr7000292pn6sirtw06	cm44dgkjc0014evo018d65879	2024-12-08 19:56:11.762
cm4g0xrvr001fpciwty7l1aq7	cm3p0gqr7000292pn6sirtw06	cm44dgkjc000revo0a7a46w53	2024-12-08 19:56:14.056
cm4g0xthh001hpciw5xereu08	cm3p0gqr7000292pn6sirtw06	cm44dgkjc0019evo08cdx2gx4	2024-12-08 19:56:16.133
cm4g0xv3e001jpciw0q3wdup7	cm3p0gqr7000292pn6sirtw06	cm44dgkjc000sevo0u5lg5usb	2024-12-08 19:56:18.218
cm4g0xwq9001lpciw8nue8gp8	cm3p0gqr7000292pn6sirtw06	cm44dgkjc0017evo0l46b5neg	2024-12-08 19:56:20.337
cm4g0xyad001npciwmprmf4zb	cm3p0gqr7000292pn6sirtw06	cm44dgkjc0016evo0y7f5qfny	2024-12-08 19:56:22.357
cm4g0y3qf001rpciwjbc307wc	cm3p0gqr7000292pn6sirtw06	cm44dgkjc000zevo055qonlng	2024-12-08 19:56:29.415
cm4g0y5n0001tpciwmewnn6fx	cm3p0gqr7000292pn6sirtw06	cm44dgkjc0013evo0alwmr6ve	2024-12-08 19:56:31.885
cm4g0y7h5001vpciwr5fz1cw8	cm3p0gqr7000292pn6sirtw06	cm44dgkjc0015evo0wcd3i2hm	2024-12-08 19:56:34.265
cm4g0y97t001xpciwdaotnslj	cm3p0gqr7000292pn6sirtw06	cm44dgkjc000xevo0ol6k92r2	2024-12-08 19:56:36.521
cm4g0yaw8001zpciwf743tjza	cm3p0gqr7000292pn6sirtw06	cm44dgkjc0012evo0xl3ecab0	2024-12-08 19:56:38.697
cm4g0yczq0021pciwymo87si7	cm3p0gqr7000292pn6sirtw06	cm44dgkjc0010evo0rg6l9289	2024-12-08 19:56:41.414
cm4g0yews0023pciwjp05ltbf	cm3p0gqr7000292pn6sirtw06	cm44dgkjc000wevo0tbh9qreu	2024-12-08 19:56:43.901
cm4g0yh340025pciwuok6a6qf	cm3p0gqr7000292pn6sirtw06	cm44dgkjc000uevo0k4ncdus4	2024-12-08 19:56:46.721
cm4g0yj2y0027pciwntj9fzgi	cm3p0gqr7000292pn6sirtw06	cm44dgkjc000tevo0fjenkxlt	2024-12-08 19:56:49.306
cm4g0yl2e0029pciw5jzpobou	cm3p0gqr7000292pn6sirtw06	cm44dgkjc000vevo0tkpzkswi	2024-12-08 19:56:51.878
cm4g0ynky002bpciwjll5ojll	cm3p0gqr7000292pn6sirtw06	cm44dgkjc000qevo0kx3vqpie	2024-12-08 19:56:55.139
cm4g0ypyg002dpciwq1v5tocs	cm3p0gqr7000292pn6sirtw06	cm44dgkjc0018evo0alhr5i70	2024-12-08 19:56:58.216
cm4g0ysc5002fpciwpod6opfh	cm3p0gqr7000292pn6sirtw06	cm44dgkjc000yevo0q4nb0p36	2024-12-08 19:57:01.302
cm4g0yueu002hpciwazu2bfy2	cm3p0gqr7000292pn6sirtw06	cm44dgkjm001ievo01el2qntn	2024-12-08 19:57:03.99
cm4g0ywix002jpciwei4lgyhe	cm3p0gqr7000292pn6sirtw06	cm44dgkjm001gevo0otliv9fw	2024-12-08 19:57:06.729
cm4g0yzfl002lpciww022sfe8	cm3p0gqr7000292pn6sirtw06	cm44dgkjm001fevo0vici5854	2024-12-08 19:57:10.497
cm4g0z22l002npciw487knd26	cm3p0gqr7000292pn6sirtw06	cm44dgkjm001sevo0sy8t77if	2024-12-08 19:57:13.917
cm4g0z4jf002ppciw421fm2ho	cm3p0gqr7000292pn6sirtw06	cm44dgkjm001jevo01f7wikb2	2024-12-08 19:57:17.115
cm4g0z6z7002rpciwg3ezvuog	cm3p0gqr7000292pn6sirtw06	cm44dgkjm001hevo0a3p0onu1	2024-12-08 19:57:20.276
cm4g0z8km002tpciwpcf8707l	cm3p0gqr7000292pn6sirtw06	cm44dgkjm001uevo0nfsdv1tb	2024-12-08 19:57:22.342
cm4g0za55002vpciwcegwureg	cm3p0gqr7000292pn6sirtw06	cm44dgkjm001revo04gpzz177	2024-12-08 19:57:24.377
cm4g0zbwy002xpciwf28e4fws	cm3p0gqr7000292pn6sirtw06	cm44dgkjm001eevo0pwgqrfw8	2024-12-08 19:57:26.675
cm4g0zdo0002zpciwe4fek108	cm3p0gqr7000292pn6sirtw06	cm44dgkjm001levo03pb77won	2024-12-08 19:57:28.944
cm4g0zf9v0031pciwzf902df0	cm3p0gqr7000292pn6sirtw06	cm44dgkjm001tevo0uveuuges	2024-12-08 19:57:31.028
cm4g0zgvu0033pciwtzplpy8t	cm3p0gqr7000292pn6sirtw06	cm44dgkjm001devo0v8yuzue7	2024-12-08 19:57:33.115
cm4g0zifp0035pciwieh42vck	cm3p0gqr7000292pn6sirtw06	cm44dgkjm001cevo0s4m2edxm	2024-12-08 19:57:35.126
cm4g0zk180037pciwh8078r4v	cm3p0gqr7000292pn6sirtw06	cm44dgkjm001pevo0kiiozpch	2024-12-08 19:57:37.197
cm4g0zm4y0039pciwlasc4v6c	cm3p0gqr7000292pn6sirtw06	cm44dgkjm001nevo09e8v9377	2024-12-08 19:57:39.923
cm4g0zo8w003bpciw3b78wu3n	cm3p0gqr7000292pn6sirtw06	cm44dgkjm001qevo0md0yrph4	2024-12-08 19:57:42.656
cm4g0zpxm003dpciwjwugkjjm	cm3p0gqr7000292pn6sirtw06	cm44dgkjm001mevo0vcuqherv	2024-12-08 19:57:44.842
cm4g0zs6c003fpciwgxauwcj9	cm3p0gqr7000292pn6sirtw06	cm44dgkjm001kevo05xw46hi3	2024-12-08 19:57:47.748
cm4g0ztwx003hpciwmm5gohge	cm3p0gqr7000292pn6sirtw06	cm44dgkjm001vevo0eww0ihgl	2024-12-08 19:57:50.001
cm4g0zwqk003jpciw2t5wr57h	cm3p0gqr7000292pn6sirtw06	cm44dgkjm001oevo0vwwmcfg5	2024-12-08 19:57:53.66
cm4g0zyw8003lpciw65ljb8j3	cm3p0gqr7000292pn6sirtw06	cm44dgkjr001yevo0b2tvgk3t	2024-12-08 19:57:56.457
cm4g1014o003npciw9g9ypel1	cm3p0gqr7000292pn6sirtw06	cm44dgkjr001zevo0m91vvved	2024-12-08 19:57:59.352
cm4g16lcx003xpciw0325et7s	cm3p0gqr7000292pn6sirtw06	cm44dpus3000aevughkjs9pb7	2024-12-08 20:03:05.506
cm4g16no5003zpciwkj6m8zyu	cm3p0gqr7000292pn6sirtw06	cm44dpus3000kevugdrp18k7m	2024-12-08 20:03:08.502
cm4g16per0041pciwg84bvfwm	cm3p0gqr7000292pn6sirtw06	cm44dpus3000jevugynlmli1m	2024-12-08 20:03:10.756
cm4g16qza0043pciw3uimtbuj	cm3p0gqr7000292pn6sirtw06	cm44dpus3000nevug7ea4jdv5	2024-12-08 20:03:12.79
cm4g16t0k0045pciw0g9fo8ej	cm3p0gqr7000292pn6sirtw06	cm44dpus3000ievugsnf5fo9e	2024-12-08 20:03:15.428
cm4g16up20047pciw8z9noxlv	cm3p0gqr7000292pn6sirtw06	cm44dpus30006evugmxcytc34	2024-12-08 20:03:17.607
cm4g16w910049pciwg0yl96ox	cm3p0gqr7000292pn6sirtw06	cm44dpus30004evugqq11femj	2024-12-08 20:03:19.621
cm4g16xwk004bpciwp3uugxu2	cm3p0gqr7000292pn6sirtw06	cm44dpus30005evugcvqs03gi	2024-12-08 20:03:21.764
cm4g16zgq004dpciwgu07sw4q	cm3p0gqr7000292pn6sirtw06	cm44dpus30007evugxqi7q16n	2024-12-08 20:03:23.786
cm4g1711v004fpciw4lct14ov	cm3p0gqr7000292pn6sirtw06	cm44dpus30008evuglvn6nin9	2024-12-08 20:03:25.844
cm4g1751y004hpciwvefvgnml	cm3p0gqr7000292pn6sirtw06	cm44dpus3000eevugvt6pcwu9	2024-12-08 20:03:31.031
cm4g17705004jpciw1py8zp48	cm3p0gqr7000292pn6sirtw06	cm44dpus30009evugjeblp3tn	2024-12-08 20:03:33.557
cm4g178q5004lpciwadk0idv3	cm3p0gqr7000292pn6sirtw06	cm44dpus3000bevug9xv3ltiy	2024-12-08 20:03:35.789
cm4g17af5004npciwybjdhqyp	cm3p0gqr7000292pn6sirtw06	cm44dpus3000cevugwcpnda1x	2024-12-08 20:03:37.985
cm4g17cfm004ppciwsgynnv5v	cm3p0gqr7000292pn6sirtw06	cm44dpus3000hevugl7ewkzna	2024-12-08 20:03:40.594
cm4g17eeu004rpciwgs2r1ag7	cm3p0gqr7000292pn6sirtw06	cm44dpus3000gevug5ud23dy9	2024-12-08 20:03:43.159
cm4g17g8l004tpciwvru9dywp	cm3p0gqr7000292pn6sirtw06	cm44dpus3000fevugm155ddum	2024-12-08 20:03:45.525
cm4g17hzg004vpciwlp61f9ow	cm3p0gqr7000292pn6sirtw06	cm44dpus3000devugevvvo9ud	2024-12-08 20:03:47.788
cm4g17jpv004xpciwnf992s7g	cm3p0gqr7000292pn6sirtw06	cm44dpus3000levuglpvyj2hc	2024-12-08 20:03:50.036
cm4g17ldy004zpciwcrdldbxy	cm3p0gqr7000292pn6sirtw06	cm44dpus3000mevug6rlk68te	2024-12-08 20:03:52.198
cm4g17n9i0051pciw53g8hfpb	cm3p0gqr7000292pn6sirtw06	cm44dpus90016evugt365ucr6	2024-12-08 20:03:54.631
cm4g17p4z0053pciw4vkomnbe	cm3p0gqr7000292pn6sirtw06	cm44dpus90010evugdcw22xj4	2024-12-08 20:03:57.059
cm4g17qyl0055pciwp1yxtqkr	cm3p0gqr7000292pn6sirtw06	cm44dpus8000wevugocurog48	2024-12-08 20:03:59.422
cm4g17su30057pciwcroyr40m	cm3p0gqr7000292pn6sirtw06	cm44dpus9000zevuggg73s9bd	2024-12-08 20:04:01.851
cm4g17utp0059pciw5bljqjn2	cm3p0gqr7000292pn6sirtw06	cm44dpus90014evugpvxw1s3z	2024-12-08 20:04:04.429
cm4g17x13005bpciw2780w87k	cm3p0gqr7000292pn6sirtw06	cm44dpus90015evugg39wihmz	2024-12-08 20:04:07.288
cm4g17yq3005dpciwavr9xiii	cm3p0gqr7000292pn6sirtw06	cm44dpus8000qevugql8028t5	2024-12-08 20:04:09.484
cm4g180i5005fpciwlf0pzoqo	cm3p0gqr7000292pn6sirtw06	cm44dpus8000xevugo5k7f1z6	2024-12-08 20:04:11.789
cm4g182io005hpciw4t0z7mf9	cm3p0gqr7000292pn6sirtw06	cm44dpus9000yevug8vmj6fbk	2024-12-08 20:04:14.4
cm4g184hq005jpciwaujb3o4p	cm3p0gqr7000292pn6sirtw06	cm44dpus8000sevugxhndc4cq	2024-12-08 20:04:16.958
cm4g186co005lpciw0v7zj28i	cm3p0gqr7000292pn6sirtw06	cm44dpus8000uevugrdn1b4lg	2024-12-08 20:04:19.368
cm4g188en005npciwl9yay8es	cm3p0gqr7000292pn6sirtw06	cm44dpus90013evug10xcvha8	2024-12-08 20:04:22.031
cm4g18agj005ppciw4jjtjh9c	cm3p0gqr7000292pn6sirtw06	cm44dpus8000tevugt2w43rqo	2024-12-08 20:04:24.691
cm4g18edc005rpciwf399nnf2	cm3p0gqr7000292pn6sirtw06	cm44dpus90012evugenl68wba	2024-12-08 20:04:29.761
cm4g18giw005tpciwrfc9xp0x	cm3p0gqr7000292pn6sirtw06	cm44dpus90011evug4l3pcz8p	2024-12-08 20:04:32.553
cm4g18iip005vpciw25gbmtk9	cm3p0gqr7000292pn6sirtw06	cm44dpus8000vevug1qn3hauy	2024-12-08 20:04:35.137
cm4g18kdi005xpciwrgq6mbrd	cm3p0gqr7000292pn6sirtw06	cm44dpus8000revuggm32au2n	2024-12-08 20:04:37.543
cm4g18mbz005zpciwjkdzjy6t	cm3p0gqr7000292pn6sirtw06	cm44dpus90019evug7awsce1y	2024-12-08 20:04:40.08
cm4g18q8p0061pciw5miecjvs	cm3p0gqr7000292pn6sirtw06	cm44dpus90018evug683ecfvf	2024-12-08 20:04:45.146
cm4g18sqd0063pciw3q53m5nn	cm3p0gqr7000292pn6sirtw06	cm44dpus90017evug92f355io	2024-12-08 20:04:48.374
cm4g18ulj0065pciwpdvz4bva	cm3p0gqr7000292pn6sirtw06	cm44dpusc001cevuga4d0s14k	2024-12-08 20:04:50.791
cm4g18wma0067pciwvsq87bhf	cm3p0gqr7000292pn6sirtw06	cm44dpusc001gevugyk2l3osu	2024-12-08 20:04:53.41
cm4g18yg80069pciwb2nxjnpw	cm3p0gqr7000292pn6sirtw06	cm44dpusc001hevug8603oc5x	2024-12-08 20:04:55.784
cm4g190el006bpciwryatgdu4	cm3p0gqr7000292pn6sirtw06	cm44dpusc001fevugaqv8hqid	2024-12-08 20:04:58.317
cm4g192wp006dpciw5oonuiik	cm3p0gqr7000292pn6sirtw06	cm44dpusc001eevugi7uz0lks	2024-12-08 20:05:01.561
cm4g194oi006fpciwj6mbe45r	cm3p0gqr7000292pn6sirtw06	cm44dpusc001devugfhdacmrg	2024-12-08 20:05:03.858
\.


--
-- Data for Name: lessons; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lessons (id, title, duration, video, description, unit_id, "createdAt", "updatedAt") FROM stdin;
cm44dgkip0006evo0qlhsee1v	Curso C++. Compilador y primer programa. Vídeo 3 de pildorasinformaticas 55.327 visualizaciones hace 2 años 20 minutos	20.34	cpp-03_e9ypog.mp4	<h3>Curso C++. Compilador y primer programa. Vídeo 3 de pildorasinformaticas 55.327 visualizaciones hace 2 años 20 minutos</h3>	cm44dgkip0003evo0vf5ht9qd	2024-11-30 16:13:32.258	2024-12-04 15:23:45.181
cm44dgkip0005evo0gvdh7ccw	Curso C++. Temario e instalación de editor. Vídeo 2 de pildorasinformaticas 42.427 visualizaciones hace 2 años 13 minutos y 2 segundos	13.02	cpp-02_acnixr.mp4	<h3>Curso C++. Temario e instalación de editor. Vídeo 2 de pildorasinformaticas 42.427 visualizaciones hace 2 años 13 minutos y 2 segundos</h3>	cm44dgkip0003evo0vf5ht9qd	2024-11-30 16:13:32.2582024-12-04 15:23:45.172
cm44dpus90016evugt365ucr6	Curso Angular. Firebase VI. Eliminando registros. Vídeo 37 de pildorasinformaticas 7052 visualizaciones hace 2 años 10 minutos y 16 segundos	10.16	angular-37_alcqre.mp4	<h3>Curso Angular. Firebase VI. Eliminando registros. Vídeo 37 de pildorasinformaticas 7052 visualizaciones hace 2 años 10 minutos y 16 segundos</h3>	cm44dpus8000pevugm2pzm3jx	2024-11-30 16:20:45.465	2024-12-04 15:23:45.174
cm44dtbv30010evcstff1511l	Curso Django. Proyecto web completo VI. Vídeo 31 de pildorasinformaticas 39.517 visualizaciones hace 4 años 11 minutos y 36 segundos	11.36	django-31_yykpjp.mp4	<h3>Curso Django. Proyecto web completo VI. Vídeo 31 de pildorasinformaticas 39.517 visualizaciones hace 4 años 11 minutos y 36 segundos</h3>	cm44dtbv3000pevcscjrehwdu	2024-11-30 16:23:27.5682024-12-04 15:23:45.177
cm44dtbv8001tevcs32igj50r	Curso Django. Proyecto web completo XXIII. Vídeo 58 de pildorasinformaticas 26.838 visualizaciones hace 3 años 14 minutos y 18 segundos	14.18	django-58_vyrx4h.mp4	<h3>Curso Django. Proyecto web completo XXIII. Vídeo 58 de pildorasinformaticas 26.838 visualizaciones hace 3 años 14 minutos y 18 segundos</h3>	cm44dtbv8001bevcsrzplq638	2024-11-30 16:23:27.572	2024-12-04 15:23:45.177
cm44dtbv3000xevcs5j9t0eml	Curso Django. Proyecto web completo III. Vídeo 28 de pildorasinformaticas 55.647 visualizaciones hace 4 años 17 minutos	17.14	django-28_z6srzt.mp4	<h3>Curso Django. Proyecto web completo III. Vídeo 28 de pildorasinformaticas 55.647 visualizaciones hace 4 años 17 minutos</h3>	cm44dtbv3000pevcscjrehwdu	2024-11-30 16:23:27.568	2024-12-04 15:23:45.177
cm44dtbux0005evcskto6gjp1	Curso Django. Creación primer proyecto. Vídeo 2 de pildorasinformaticas 321.565 visualizaciones hace 5 años 17 minutos	17.5	django-02_r0qdrq.mp4	<h3>Curso Django. Creación primer proyecto. Vídeo 2 de pildorasinformaticas 321.565 visualizaciones hace 5 años 17 minutos</h3>	cm44dtbux0003evcsfhwhdfbp	2024-11-30 16:23:27.561	2024-12-04 15:23:45.178
cm44dgkjm001ievo01el2qntn	Curso C++. Punteros VI. Paso de punteros por parámetros. Vídeo 47 de pildorasinformaticas 3638 visualizaciones hace 8 meses 13 minutos y 26 segundos	13.26	cpp-47_wuyjiz.mp4	<h3>Curso C++. Punteros VI. Paso de punteros por parámetros. Vídeo 47 de pildorasinformaticas 3638 visualizaciones hace 8 meses 13 minutos y 26 segundos</h3>	cm44dgkjm001bevo0riwu6jzy	2024-11-30 16:13:32.29	2024-12-04 15:23:45.179
cm44dgkiq000bevo0di6v1yvc	Curso C++. Ejemplo sencillo con variables. Vídeo 8 de pildorasinformaticas 14.871 visualizaciones hace 2 años 19 minutos	19.52	cpp-08_ttcw5r.mp4	<h3>Curso C++. Ejemplo sencillo con variables. Vídeo 8 de pildorasinformaticas 14.871 visualizaciones hace 2 años 19 minutos</h3>	cm44dgkip0003evo0vf5ht9qd	2024-11-30 16:13:32.258	2024-12-04 15:23:45.179
cm44dpus90010evugdcw22xj4	Curso Angular. Routing VIII. Páginas de error. Vídeo 31 de pildorasinformaticas 11.313 visualizaciones hace 2 años 8 minutos y 51 segundos	8.51	angular-31_vhx8iz.mp4	<h3>Curso Angular. Routing VIII. Páginas de error. Vídeo 31 de pildorasinformaticas 11.313 visualizaciones hace 2 años 8 minutos y 51 segundos</h3>	cm44dpus8000pevugm2pzm3jx	2024-11-30 16:20:45.465	2024-12-04 15:23:45.179
cm44dgkjc0011evo0xkooso5h	Curso C++. Bucles anidados I. Vídeo 32 de pildorasinformaticas 2974 visualizaciones hace 1 año 22 minutos	22.53	cpp-32_syg3wz.mp4	<h3>Curso C++. Bucles anidados I. Vídeo 32 de pildorasinformaticas 2974 visualizaciones hace 1 año 22 minutos</h3>	cm44dgkjc000pevo0raen3zme	2024-11-30 16:13:32.28	2024-12-04 15:23:45.173
cm44dtbv30017evcsky3omaac	Curso Django. Proyecto web completo XIII. Vídeo 38 de pildorasinformaticas 29.000 visualizaciones hace 4 años 24 minutos	24.28	django-38_rhdp0i.mp4	<h3>Curso Django. Proyecto web completo XIII. Vídeo 38 de pildorasinformaticas 29.000 visualizaciones hace 4 años 24 minutos</h3>	cm44dtbv3000pevcscjrehwdu	2024-11-30 16:23:27.568	2024-12-04 15:23:45.179
cm44dtbux000hevcsvxl6v8k0	Curso Django. BBDD IV. PostgreSql. Vídeo 14 de pildorasinformaticas 90.175 visualizaciones hace 5 años 15 minutos	15.36	django-14_d5dez4.mp4	<h3>Curso Django. BBDD IV. PostgreSql. Vídeo 14 de pildorasinformaticas 90.175 visualizaciones hace 5 años 15 minutos</h3>	cm44dtbux0003evcsfhwhdfbp	2024-11-30 16:23:27.561	2024-12-04 15:23:45.179
cm44dgkiq000kevo0oeyzrgm3	Curso C++. Operadores I. Vídeo 17 de pildorasinformaticas 7371 visualizaciones hace 1 año 23 minutos	23.36	cpp-17_du4f7g.mp4	<h3>Curso C++. Operadores I. Vídeo 17 de pildorasinformaticas 7371 visualizaciones hace 1 año 23 minutos</h3>	cm44dgkip0003evo0vf5ht9qd	2024-11-30 16:13:32.258	2024-12-04 15:23:45.181
cm44dpus3000aevughkjs9pb7	Curso Angular. Interpolación. Vídeo 7 de pildorasinformaticas 47.990 visualizaciones hace 3 años 26 minutos	26.59	angular-07_pfwgpi.mp4	<h3>Curso Angular. Interpolación. Vídeo 7 de pildorasinformaticas 47.990 visualizaciones hace 3 años 26 minutos</h3>	cm44dpus30003evugcwn3zx9l	2024-11-30 16:20:45.459	2024-12-04 15:23:45.181
cm44dpusc001cevuga4d0s14k	Curso Angular. Login IV. Vídeo 41 de pildorasinformaticas 8519 visualizaciones hace 2 años 11 minutos y 50 segundos	11.5	angular-41_gxc7hj.mp4	<h3>Curso Angular. Login IV. Vídeo 41 de pildorasinformaticas 8519 visualizaciones hace 2 años 11 minutos y 50 segundos</h3>	cm44dpusc001bevugni7fizhr	2024-11-30 16:20:45.468	2024-12-04 15:23:45.181
cm44dtbv30013evcsoiumlwb2	Curso Django. Proyecto web completo IX. Vídeo 34 de pildorasinformaticas 35.085 visualizaciones hace 4 años 16 minutos	16.07	django-34_orbu5i.mp4	<h3>Curso Django. Proyecto web completo IX. Vídeo 34 de pildorasinformaticas 35.085 visualizaciones hace 4 años 16 minutos</h3>	cm44dtbv3000pevcscjrehwdu	2024-11-30 16:23:27.568	2024-12-04 15:23:45.181
cm44dgkip0004evo0lg0ix9je	Curso C++. ¿Por qué aprender C++? Vídeo 1 de pildorasinformaticas 94.857 visualizaciones hace 2 años 10 minutos y 5 segundos	10.05	cpp-01_n1nzvu.mp4	<h3>Curso C++. ¿Por qué aprender C++? Vídeo 1 de pildorasinformaticas 94.857 visualizaciones hace 2 años 10 minutos y 5 segundos</h3>	cm44dgkip0003evo0vf5ht9qd	2024-11-30 16:13:32.258	2024-12-04 15:23:45.181
cm44dpus8000wevugocurog48	Curso Angular. Routing IV. Vídeo 27 de pildorasinformaticas 14.653 visualizaciones hace 3 años 16 minutos	16.04	angular-27_invxlc.mp4	<h3>Curso Angular. Routing IV. Vídeo 27 de pildorasinformaticas 14.653 visualizaciones hace 3 años 16 minutos</h3>	cm44dpus8000pevugm2pzm3jx	2024-11-30 16:20:45.465	2024-12-04 15:23:45.181
cm44dgkiq000hevo00j7yp0r1	Curso C++. Arrays multidimensionales. Vídeo 14 de pildorasinformaticas 10.612 visualizaciones hace 1 año 21 minutos	21.23	cpp-14_p4kufk.mp4	<h3>Curso C++. Arrays multidimensionales. Vídeo 14 de pildorasinformaticas 10.612 visualizaciones hace 1 año 21 minutos</h3>	cm44dgkip0003evo0vf5ht9qd	2024-11-30 16:13:32.258	2024-12-04 15:23:45.181
cm44dtbux000aevcsc43n2ne5	Curso Django. Plantillas III. Bucles y condicionales en plantillas. Vídeo 7 de pildorasinformaticas 102.293 visualizaciones hace 5 años 20 minutos	20.14	django-07_umtcdo.mp4	<h3>Curso Django. Plantillas III. Bucles y condicionales en plantillas. Vídeo 7 de pildorasinformaticas 102.293 visualizaciones hace 5 años 20 minutos</h3>	cm44dtbux0003evcsfhwhdfbp	2024-11-30 16:23:27.561	2024-12-04 15:23:45.181
cm44dgkjc0014evo018d65879	Curso C++. Funciones II. Prototipos. Vídeo 35 de pildorasinformaticas 6736 visualizaciones hace 1 año 20 minutos	20.27	cpp-35_sa0vzg.mp4	<h3>Curso C++. Funciones II. Prototipos. Vídeo 35 de pildorasinformaticas 6736 visualizaciones hace 1 año 20 minutos</h3>	cm44dgkjc000pevo0raen3zme	2024-11-30 16:13:32.28	2024-12-04 15:23:45.185
cm44dpus9000zevuggg73s9bd	Curso Angular. Routing VII. Vídeo 30 de pildorasinformaticas 13.131 visualizaciones hace 2 años 16 minutos	16.53	angular-30_qsfy6q.mp4	<h3>Curso Angular. Routing VII. Vídeo 30 de pildorasinformaticas 13.131 visualizaciones hace 2 años 16 minutos</h3>	cm44dpus8000pevugm2pzm3jx	2024-11-30 16:20:45.465	2024-12-04 15:23:45.182
cm44dtbv8001kevcs3mxailw8	Curso Django. Proyecto web completo XXIV. Vídeo 49 de pildorasinformaticas 17.868 visualizaciones hace 3 años 20 minutos	20.17	django-49_oxgiic.mp4	<h3>Curso Django. Proyecto web completo XXIV. Vídeo 49 de pildorasinformaticas 17.868 visualizaciones hace 3 años 20 minutos</h3>	cm44dtbv8001bevcsrzplq638	2024-11-30 16:23:27.572	2024-12-04 15:23:45.183
cm44dgkiq000aevo0si9ncjgt	Curso C++. Declaración e inicialización de variables. Vídeo 7 de pildorasinformaticas 17.704 visualizaciones hace 2 años 20 minutos	20.46	cpp-07_in2p8n.mp4	<h3>Curso C++. Declaración e inicialización de variables. Vídeo 7 de pildorasinformaticas 17.704 visualizaciones hace 2 años 20 minutos</h3>	cm44dgkip0003evo0vf5ht9qd	2024-11-30 16:13:32.2582024-12-04 15:23:45.183
cm44dtbvb0024evcs2zmxpxqu	Curso Django. Proyecto completo XXXII. Creando app Pedidos. Vídeo 67 de pildorasinformaticas 12.320 visualizaciones hace 2 años 18 minutos	18.04	django-67_ozlvca.mp4	<h3>Curso Django. Proyecto completo XXXII. Creando app Pedidos. Vídeo 67 de pildorasinformaticas 12.320 visualizaciones hace 2 años 18 minutos</h3>	cm44dtbvb001xevcsx80zh22s	2024-11-30 16:23:27.576	2024-12-04 15:23:45.174
cm44dtbv8001ievcs3j4g6r14	Curso Django. Proyecto web completo XXII. Vídeo 47 de pildorasinformaticas 17.070 visualizaciones hace 3 años 13 minutos y 4 segundos	13.04	django-47_hr90yr.mp4	<h3>Curso Django. Proyecto web completo XXII. Vídeo 47 de pildorasinformaticas 17.070 visualizaciones hace 3 años 13 minutos y 4 segundos</h3>	cm44dtbv8001bevcsrzplq638	2024-11-30 16:23:27.5722024-12-04 15:23:45.174
cm44dtbux0009evcsaexp8g51	Curso Django. Plantillas II  Variables y propiedades en plantillas. Vídeo 6 de pildorasinformaticas 120.921 visualizaciones hace 5 años 15 minutos	15.24	django-06_bw9wdg.mp4	<h3>Curso Django. Plantillas II  Variables y propiedades en plantillas. Vídeo 6 de pildorasinformaticas 120.921 visualizaciones hace 5 años 15 minutos</h3>	cm44dtbux0003evcsfhwhdfbp	2024-11-30 16:23:27.561	2024-12-04 15:23:45.174
cm44dgkip0008evo0asynlfoi	Curso C++. Disección del primer programa. Vídeo 5 de pildorasinformaticas 26.470 visualizaciones hace 2 años 23 minutos	23.13	cpp-05_c4dnue.mp4	<h3>Curso C++. Disección del primer programa. Vídeo 5 de pildorasinformaticas 26.470 visualizaciones hace 2 años 23 minutos</h3>	cm44dgkip0003evo0vf5ht9qd	2024-11-30 16:13:32.258	2024-12-04 15:23:45.175
cm44dgkip0007evo0rnabpcsi	Curso C++. Compilación. Vídeo 4 de pildorasinformaticas 26.466 visualizaciones hace 2 años 13 minutos y 27 segundos	13.27	cpp-04_byvwug.mp4	<h3>Curso C++. Compilación. Vídeo 4 de pildorasinformaticas 26.466 visualizaciones hace 2 años 13 minutos y 27 segundos</h3>	cm44dgkip0003evo0vf5ht9qd	2024-11-30 16:13:32.258	2024-12-04 15:23:45.175
cm44dpus90014evugpvxw1s3z	Curso Angular. Firebase IV. Mostrando registros. Vídeo 35 de pildorasinformaticas 9105 visualizaciones hace 2 años 11 minutos y 40 segundos	11.4	angular-35_uj2nwy.mp4	<h3>Curso Angular. Firebase IV. Mostrando registros. Vídeo 35 de pildorasinformaticas 9105 visualizaciones hace 2 años 11 minutos y 40 segundos</h3>	cm44dpus8000pevugm2pzm3jx	2024-11-30 16:20:45.465	2024-12-04 15:23:45.175
cm44dgkiq000devo022gpvh5s	Curso C++. Ejercicio práctico sencillo. Vídeo 10 de pildorasinformaticas 13.370 visualizaciones hace 2 años 25 minutos	25.12	cpp-10_k9cav3.mp4	<h3>Curso C++. Ejercicio práctico sencillo. Vídeo 10 de pildorasinformaticas 13.370 visualizaciones hace 2 años 25 minutos</h3>	cm44dgkip0003evo0vf5ht9qd	2024-11-30 16:13:32.258	2024-12-04 15:23:45.174
cm44dpus90015evugg39wihmz	Curso Angular. Firebase V. Actualizando registros. Vídeo 36 de pildorasinformaticas 7885 visualizaciones hace 2 años 10 minutos y 37 segundos	10.37	angular-36_azburo.mp4	<h3>Curso Angular. Firebase V. Actualizando registros. Vídeo 36 de pildorasinformaticas 7885 visualizaciones hace 2 años 10 minutos y 37 segundos</h3>	cm44dpus8000pevugm2pzm3jx	2024-11-30 16:20:45.465	2024-12-04 15:23:45.174
cm44dpus8000qevugql8028t5	Curso Angular. Servicios. Vídeo 21 de pildorasinformaticas 32.196 visualizaciones hace 3 años 24 minutos	24.19	angular-21_vtuiyy.mp4	<h3>Curso Angular. Servicios. Vídeo 21 de pildorasinformaticas 32.196 visualizaciones hace 3 años 24 minutos</h3>	cm44dpus8000pevugm2pzm3jx	2024-11-30 16:20:45.465	2024-12-04 15:23:45.176
cm44dpus3000kevugdrp18k7m	Curso Angular. Directivas IV. Vídeo 17 de pildorasinformaticas 24.267 visualizaciones hace 3 años 15 minutos	15.33	angular-17_yufumj.mp4	<h3>Curso Angular. Directivas IV. Vídeo 17 de pildorasinformaticas 24.267 visualizaciones hace 3 años 15 minutos</h3>	cm44dpus30003evugcwn3zx9l	2024-11-30 16:20:45.459	2024-12-04 15:23:45.174
cm44dpus8000xevugo5k7f1z6	Curso Angular. Routing V. Vídeo 28 de pildorasinformaticas 13.812 visualizaciones hace 3 años 17 minutos	17.38	angular-28_rtscon.mp4	<h3>Curso Angular. Routing V. Vídeo 28 de pildorasinformaticas 13.812 visualizaciones hace 3 años 17 minutos</h3>	cm44dpus8000pevugm2pzm3jx	2024-11-30 16:20:45.465	2024-12-04 15:23:45.174
cm44dgkiq000mevo0bysffse7	Curso C++. Operadores y condicional IF I. Vídeo 19 de pildorasinformaticas 5455 visualizaciones hace 1 año 18 minutos	18.33	cpp-19_kmq5ps.mp4	<h3>Curso C++. Operadores y condicional IF I. Vídeo 19 de pildorasinformaticas 5455 visualizaciones hace 1 año 18 minutos</h3>	cm44dgkip0003evo0vf5ht9qd	2024-11-30 16:13:32.258	2024-12-04 15:23:45.176
cm44dgkjm001gevo0otliv9fw	Curso C++. Punteros IV. Arrays y punteros. Aritmética de punteros. Vídeo 45 de pildorasinformaticas 3357 visualizaciones hace 9 meses 16 minutos	16.53	cpp-45_wlkk6c.mp4	<h3>Curso C++. Punteros IV. Arrays y punteros. Aritmética de punteros. Vídeo 45 de pildorasinformaticas 3357 visualizaciones hace 9 meses 16 minutos</h3>	cm44dgkjm001bevo0riwu6jzy	2024-11-30 16:13:32.29	2024-12-04 15:23:45.177
cm44dgkjm001fevo0vici5854	Curso C++. Punteros III. Gestión de la memoria. Vídeo 44 de pildorasinformaticas 4239 visualizaciones hace 9 meses 25 minutos	25.23	cpp-44_lsjmjl.mp4	<h3>Curso C++. Punteros III. Gestión de la memoria. Vídeo 44 de pildorasinformaticas 4239 visualizaciones hace 9 meses 25 minutos</h3>	cm44dgkjm001bevo0riwu6jzy	2024-11-30 16:13:32.29	2024-12-04 15:23:45.178
cm44dgkjc000revo0a7a46w53	Curso C++. Switch-Case I. Vídeo 22 de pildorasinformaticas 6167 visualizaciones hace 1 año 18 minutos	18.23	cpp-22_a48jac.mp4	<h3>Curso C++. Switch-Case I. Vídeo 22 de pildorasinformaticas 6167 visualizaciones hace 1 año 18 minutos</h3>	cm44dgkjc000pevo0raen3zme	2024-11-30 16:13:32.28	2024-12-04 15:23:45.176
cm44dpus9000yevug8vmj6fbk	Curso Angular. Routing VI. Vídeo 29 de pildorasinformaticas 11.678 visualizaciones hace 2 años 10 minutos y 20 segundos	10.2	angular-29_dbszvy.mp4	<h3>Curso Angular. Routing VI. Vídeo 29 de pildorasinformaticas 11.678 visualizaciones hace 2 años 10 minutos y 20 segundos</h3>	cm44dpus8000pevugm2pzm3jx	2024-11-30 16:20:45.465	2024-12-04 15:23:45.178
cm44dpus8000sevugxhndc4cq	Curso Angular. Servicios III. Vídeo 23 de pildorasinformaticas 16.748 visualizaciones hace 3 años 10 minutos y 39 segundos	10.39	angular-23_hzti43.mp4	<h3>Curso Angular. Servicios III. Vídeo 23 de pildorasinformaticas 16.748 visualizaciones hace 3 años 10 minutos y 39 segundos</h3>	cm44dpus8000pevugm2pzm3jx	2024-11-30 16:20:45.465	2024-12-04 15:23:45.178
cm44dpus8000uevugrdn1b4lg	Curso Angular. Routing II. Vídeo 25 de pildorasinformaticas 25.224 visualizaciones hace 3 años 8 minutos y 53 segundos	8.53	angular-25_obomla.mp4	<h3>Curso Angular. Routing II. Vídeo 25 de pildorasinformaticas 25.224 visualizaciones hace 3 años 8 minutos y 53 segundos</h3>	cm44dpus8000pevugm2pzm3jx	2024-11-30 16:20:45.465	2024-12-04 15:23:45.176
cm44dpusc001gevugyk2l3osu	Curso Angular. Protegiendo páginas. Vídeo 45 de pildorasinformaticas 9122 visualizaciones hace 2 años 13 minutos y 16 segundos	13.16	angular-45_kbcigg.mp4	<h3>Curso Angular. Protegiendo páginas. Vídeo 45 de pildorasinformaticas 9122 visualizaciones hace 2 años 13 minutos y 16 segundos</h3>	cm44dpusc001bevugni7fizhr	2024-11-30 16:20:45.468	2024-12-04 15:23:45.176
cm44dgkjc0019evo08cdx2gx4	Curso C++. Funciones VII. Auto return. Vídeo 40 de pildorasinformaticas 3085 visualizaciones hace 1 año 18 minutos	18.09	cpp-40_achslp.mp4	<h3>Curso C++. Funciones VII. Auto return. Vídeo 40 de pildorasinformaticas 3085 visualizaciones hace 1 año 18 minutos</h3>	cm44dgkjc000pevo0raen3zme	2024-11-30 16:13:32.28	2024-12-04 15:23:45.176
cm44dgkjc000sevo0u5lg5usb	Curso C++. Switch-Case II. Vídeo 23 de pildorasinformaticas 4327 visualizaciones hace 1 año 14 minutos y 36 segundos	14.36	cpp-23_zm6jee.mp4	<h3>Curso C++. Switch-Case II. Vídeo 23 de pildorasinformaticas 4327 visualizaciones hace 1 año 14 minutos y 36 segundos</h3>	cm44dgkjc000pevo0raen3zme	2024-11-30 16:13:32.28	2024-12-04 15:23:45.176
cm44dtbux000fevcs3iyjgz42	Curso Django. BBDD II. Vídeo 12 de pildorasinformaticas 94.327 visualizaciones hace 5 años 21 minutos	21.1	django-12_yqbjk4.mp4	<h3>Curso Django. BBDD II. Vídeo 12 de pildorasinformaticas 94.327 visualizaciones hace 5 años 21 minutos</h3>	cm44dtbux0003evcsfhwhdfbp	2024-11-30 16:23:27.561	2024-12-04 15:23:45.176
cm44dpus3000jevugynlmli1m	Curso Angular. Directivas III. Vídeo 16 de pildorasinformaticas 27.577 visualizaciones hace 3 años 18 minutos	18.26	angular-16_pnhang.mp4	<h3>Curso Angular. Directivas III. Vídeo 16 de pildorasinformaticas 27.577 visualizaciones hace 3 años 18 minutos</h3>	cm44dpus30003evugcwn3zx9l	2024-11-30 16:20:45.459	2024-12-04 15:23:45.176
cm44dtbv8001uevcshjvuixkd	Curso Django. Proyecto web completo XXIV. Vídeo 59 de pildorasinformaticas 12.746 visualizaciones hace 2 años 16 minutos	16	django-59_lzedhf.mp4	<h3>Curso Django. Proyecto web completo XXIV. Vídeo 59 de pildorasinformaticas 12.746 visualizaciones hace 2 años 16 minutos</h3>	cm44dtbv8001bevcsrzplq638	2024-11-30 16:23:27.572	2024-12-04 15:23:45.177
cm44dgkjm001sevo0sy8t77if	Curso C++. POO. Modificadores de acceso. Protected. Vídeo 57 de pildorasinformaticas 1591 visualizaciones hace 3 meses 17 minutos	17.46	cpp-57_fmpwab.mp4	<h3>Curso C++. POO. Modificadores de acceso. Protected. Vídeo 57 de pildorasinformaticas 1591 visualizaciones hace 3 meses 17 minutos</h3>	cm44dgkjm001bevo0riwu6jzy	2024-11-30 16:13:32.29	2024-12-04 15:23:45.177
cm44dgkjm001jevo01f7wikb2	Curso C++. Punteros VII. Devolución de punteros. Vídeo 48 de pildorasinformaticas 5815 visualizaciones hace 7 meses 25 minutos	25.33	cpp-48_cakcin.mp4	<h3>Curso C++. Punteros VII. Devolución de punteros. Vídeo 48 de pildorasinformaticas 5815 visualizaciones hace 7 meses 25 minutos</h3>	cm44dgkjm001bevo0riwu6jzy	2024-11-30 16:13:32.29	2024-12-04 15:23:45.177
cm44dgkjm001hevo0a3p0onu1	Curso C++. Punteros V. Constantes y punteros. Vídeo 46 de pildorasinformaticas 3183 visualizaciones hace 8 meses 20 minutos	20.1	cpp-46_rjufi1.mp4	<h3>Curso C++. Punteros V. Constantes y punteros. Vídeo 46 de pildorasinformaticas 3183 visualizaciones hace 8 meses 20 minutos</h3>	cm44dgkjm001bevo0riwu6jzy	2024-11-30 16:13:32.29	2024-12-04 15:23:45.177
cm44dpus3000nevug7ea4jdv5	Curso Angular. Comunicación entre componentes II. Vídeo 20 de pildorasinformaticas 26.670 visualizaciones hace 3 años 25 minutos25.18	angular-20_nunria.mp4	<h3>Curso Angular. Comunicación entre componentes II. Vídeo 20 de pildorasinformaticas 26.670 visualizaciones hace 3 años 25 minutos</h3>	cm44dpus30003evugcwn3zx9l	2024-11-30 16:20:45.459	2024-12-04 15:23:45.177
cm44dtbv30012evcsahhyztq2	Curso Django. Proyecto web completo VIII. Vídeo 33 de pildorasinformaticas 38.363 visualizaciones hace 4 años 11 minutos y 38 segundos	11.38	django-33_kqpzjl.mp4	<h3>Curso Django. Proyecto web completo VIII. Vídeo 33 de pildorasinformaticas 38.363 visualizaciones hace 4 años 11 minutos y 38 segundos</h3>	cm44dtbv3000pevcscjrehwdu	2024-11-30 16:23:27.5682024-12-04 15:23:45.175
cm44dgkjm001uevo0nfsdv1tb	Curso C++. Destructores. Vídeo 59 de pildorasinformaticas 1425 visualizaciones hace 2 meses 21 minutos	21.09	cpp-59_z6f16m.mp4	<h3>Curso C++. Destructores. Vídeo 59 de pildorasinformaticas 1425 visualizaciones hace 2 meses 21 minutos</h3>	cm44dgkjm001bevo0riwu6jzy	2024-11-30 16:13:32.29	2024-12-04 15:23:45.175
cm44dgkjc0017evo0l46b5neg	Curso C++. Funciones V. Sobrecarga de funciones. Vídeo 38 de pildorasinformaticas 3493 visualizaciones hace 1 año 20 minutos	20.59	cpp-38_tkhwzz.mp4	<h3>Curso C++. Funciones V. Sobrecarga de funciones. Vídeo 38 de pildorasinformaticas 3493 visualizaciones hace 1 año 20 minutos</h3>	cm44dgkjc000pevo0raen3zme	2024-11-30 16:13:32.28	2024-12-04 15:23:45.175
cm44dpus90013evug10xcvha8	Curso Angular. Firebase III. Obteniendo registros. Vídeo 34 de pildorasinformaticas 11.972 visualizaciones hace 2 años 16 minutos	16.16	angular-34_pb9d8i.mp4	<h3>Curso Angular. Firebase III. Obteniendo registros. Vídeo 34 de pildorasinformaticas 11.972 visualizaciones hace 2 años 16 minutos</h3>	cm44dpus8000pevugm2pzm3jx	2024-11-30 16:20:45.4652024-12-04 15:23:45.176
cm44dgkjm001revo04gpzz177	Curso C++. POO. Acceso a propiedades y métodos usando punteros. Vídeo 56 de pildorasinformaticas 2357 visualizaciones hace 3 meses 12 minutos y 48 segundos	12.48	cpp-56_xqdlhs.mp4	<h3>Curso C++. POO. Acceso a propiedades y métodos usando punteros. Vídeo 56 de pildorasinformaticas 2357 visualizaciones hace 3 meses 12 minutos y 48 segundos</h3>	cm44dgkjm001bevo0riwu6jzy	2024-11-30 16:13:32.29	2024-12-04 15:23:45.176
cm44dpus3000ievugsnf5fo9e	Curso Angular. Directivas II. Vídeo 15 de pildorasinformaticas 29.208 visualizaciones hace 3 años 19 minutos	19.15	angular-15_rzbodx.mp4	<h3>Curso Angular. Directivas II. Vídeo 15 de pildorasinformaticas 29.208 visualizaciones hace 3 años 19 minutos</h3>	cm44dpus30003evugcwn3zx9l	2024-11-30 16:20:45.459	2024-12-04 15:23:45.176
cm44dgkjm001eevo0pwgqrfw8	Curso C++. Punteros II. Sintaxis y uso. Vídeo 43 de pildorasinformaticas 7470 visualizaciones hace 11 meses 24 minutos	24.1	cpp-43_gxmvaq.mp4	<h3>Curso C++. Punteros II. Sintaxis y uso. Vídeo 43 de pildorasinformaticas 7470 visualizaciones hace 11 meses 24 minutos</h3>	cm44dgkjm001bevo0riwu6jzy	2024-11-30 16:13:32.29	2024-12-04 15:23:45.176
cm44dtbv30014evcsum0qomyq	Curso Django. Proyecto web completo X. Vídeo 35 de pildorasinformaticas 34.533 visualizaciones hace 4 años 17 minutos	17.53	django-35_grmew2.mp4	<h3>Curso Django. Proyecto web completo X. Vídeo 35 de pildorasinformaticas 34.533 visualizaciones hace 4 años 17 minutos</h3>	cm44dtbv3000pevcscjrehwdu	2024-11-30 16:23:27.568	2024-12-04 15:23:45.176
cm44dtbux000gevcsfvkma5d6	Curso Django. BBDD III. Vídeo 13 de pildorasinformaticas 73.171 visualizaciones hace 5 años 14 minutos y 52 segundos	14.52	django-13_vzxylg.mp4	<h3>Curso Django. BBDD III. Vídeo 13 de pildorasinformaticas 73.171 visualizaciones hace 5 años 14 minutos y 52 segundos</h3>	cm44dtbux0003evcsfhwhdfbp	2024-11-30 16:23:27.561	2024-12-04 15:23:45.177
cm44dgkjm001levo03pb77won	Curso C++. Referencias I. Qué son. Vídeo 50 de pildorasinformaticas 2233 visualizaciones hace 7 meses 17 minutos	17.18	cpp-50_oowtwb.mp4	<h3>Curso C++. Referencias I. Qué son. Vídeo 50 de pildorasinformaticas 2233 visualizaciones hace 7 meses 17 minutos</h3>	cm44dgkjm001bevo0riwu6jzy	2024-11-30 16:13:32.29	2024-12-04 15:23:45.177
cm44dpus8000tevugt2w43rqo	Curso Angular. Routing I. Vídeo 24 de pildorasinformaticas 34.997 visualizaciones hace 3 años 15 minutos	15.57	angular-24_m6lujp.mp4	<h3>Curso Angular. Routing I. Vídeo 24 de pildorasinformaticas 34.997 visualizaciones hace 3 años 15 minutos</h3>	cm44dpus8000pevugm2pzm3jx	2024-11-30 16:20:45.465	2024-12-04 15:23:45.177
cm44dtbux0007evcsqct34ras	Curso Django. Parámetros en URL. Vídeo 4 de pildorasinformaticas 179.000 visualizaciones hace 5 años 18 minutos	18.43	django-04_pxzrls.mp4	<h3>Curso Django. Parámetros en URL. Vídeo 4 de pildorasinformaticas 179.000 visualizaciones hace 5 años 18 minutos</h3>	cm44dtbux0003evcsfhwhdfbp	2024-11-30 16:23:27.561	2024-12-04 15:23:45.177
cm44dtbux0006evcs9z3oqqk9	Curso Django. Creación de primera página. Vídeo 3 de pildorasinformaticas 243.591 visualizaciones hace 5 años 12 minutos y 15 segundos	12.15	django-03_cyh26d.mp4	<h3>Curso Django. Creación de primera página. Vídeo 3 de pildorasinformaticas 243.591 visualizaciones hace 5 años 12 minutos y 15 segundos</h3>	cm44dtbux0003evcsfhwhdfbp	2024-11-30 16:23:27.5612024-12-04 15:23:45.177
cm44dpus90012evugenl68wba	Curso Angular. Firebase II. Insertando registros. Vídeo 33 de pildorasinformaticas 15.919 visualizaciones hace 2 años 21 minutos21.49	angular-33_fi6rdd.mp4	<h3>Curso Angular. Firebase II. Insertando registros. Vídeo 33 de pildorasinformaticas 15.919 visualizaciones hace 2 años 21 minutos</h3>	cm44dpus8000pevugm2pzm3jx	2024-11-30 16:20:45.465	2024-12-04 15:23:45.177
cm44dgkjr001yevo0b2tvgk3t	Curso C++. Delegación de constructores. Vídeo 61 de pildorasinformaticas 1480 visualizaciones hace 1 mes 26 minutos	26.36	cpp-61_qzlhyr.mp4	<h3>Curso C++. Delegación de constructores. Vídeo 61 de pildorasinformaticas 1480 visualizaciones hace 1 mes 26 minutos</h3>	cm44dgkjr001xevo0xskvi990	2024-11-30 16:13:32.295	2024-12-04 15:23:45.181
cm44dgkjc0016evo0y7f5qfny	Curso C++. Funciones IV. Parámetros por defecto. Vídeo 37 de pildorasinformaticas 4089 visualizaciones hace 1 año 25 minutos	25.1	cpp-37_ncchhy.mp4	<h3>Curso C++. Funciones IV. Parámetros por defecto. Vídeo 37 de pildorasinformaticas 4089 visualizaciones hace 1 año 25 minutos</h3>	cm44dgkjc000pevo0raen3zme	2024-11-30 16:13:32.28	2024-12-04 15:23:45.181
cm44dgkjr001zevo0m91vvved	Curso C++. Constructor-copia. Vídeo 62 de pildorasinformaticas 1128 visualizaciones hace 9 días 23 minutos	23.18	cpp-62_suieeg.mp4	<h3>Curso C++. Constructor-copia. Vídeo 62 de pildorasinformaticas 1128 visualizaciones hace 9 días 23 minutos</h3>	cm44dgkjr001xevo0xskvi990	2024-11-30 16:13:32.295	2024-12-04 15:23:45.176
cm44dgkjc000zevo055qonlng	Curso C++. Instrucciones break y continue. Vídeo 30 de pildorasinformaticas 4288 visualizaciones hace 1 año 24 minutos	24.53	cpp-30_i244zp.mp4	<h3>Curso C++. Instrucciones break y continue. Vídeo 30 de pildorasinformaticas 4288 visualizaciones hace 1 año 24 minutos</h3>	cm44dgkjc000pevo0raen3zme	2024-11-30 16:13:32.28	2024-12-04 15:23:45.176
cm44dpus90011evug4l3pcz8p	Curso Angular. Firebase. Vídeo 32 de pildorasinformaticas 16.849 visualizaciones hace 2 años 12 minutos y 17 segundos	12.17	angular-32_e7tmhf.mp4	<h3>Curso Angular. Firebase. Vídeo 32 de pildorasinformaticas 16.849 visualizaciones hace 2 años 12 minutos y 17 segundos</h3>	cm44dpus8000pevugm2pzm3jx	2024-11-30 16:20:45.465	2024-12-04 15:23:45.176
cm44dtbvb0023evcssc46e3hn	Curso Django. Proyecto completo XXXI. Corrigiendo para pedidos. Vídeo 66 de pildorasinformaticas 13.235 visualizaciones hace 2 años 17 minutos	17.08	django-66_clvgns.mp4	<h3>Curso Django. Proyecto completo XXXI. Corrigiendo para pedidos. Vídeo 66 de pildorasinformaticas 13.235 visualizaciones hace 2 años 17 minutos</h3>	cm44dtbvb001xevcsx80zh22s	2024-11-30 16:23:27.576	2024-12-04 15:23:45.181
cm44dtbv8001jevcsln9168sb	Curso Django. Proyecto web completo XXIII. Vídeo 48 de pildorasinformaticas 16.974 visualizaciones hace 3 años 12 minutos y 6 segundos	12.06	django-48_td9fqb.mp4	<h3>Curso Django. Proyecto web completo XXIII. Vídeo 48 de pildorasinformaticas 16.974 visualizaciones hace 3 años 12 minutos y 6 segundos</h3>	cm44dtbv8001bevcsrzplq638	2024-11-30 16:23:27.5722024-12-04 15:23:45.177
cm44dtbux000bevcsltq58p1r	Curso Django. Plantillas IV. Condicionales, filtros y cargadores de plantillas. Vídeo 8 de pildorasinformaticas 97.516 visualizaciones hace 5 años 25 minutos	25.37	django-08_adi1rn.mp4	<h3>Curso Django. Plantillas IV. Condicionales, filtros y cargadores de plantillas. Vídeo 8 de pildorasinformaticas 97.516 visualizaciones hace 5 años 25 minutos</h3>	cm44dtbux0003evcsfhwhdfbp	2024-11-30 16:23:27.561	2024-12-04 15:23:45.177
cm44dgkjm001tevo0uveuuges	Curso C++. POO. Constructores. Sobrecarga. Vídeo 58 de pildorasinformaticas 1776 visualizaciones hace 2 meses 26 minutos	26.51	cpp-58_pwwsyj.mp4	<h3>Curso C++. POO. Constructores. Sobrecarga. Vídeo 58 de pildorasinformaticas 1776 visualizaciones hace 2 meses 26 minutos</h3>	cm44dgkjm001bevo0riwu6jzy	2024-11-30 16:13:32.29	2024-12-04 15:23:45.177
cm44dgkjc0013evo0alwmr6ve	Curso C++. Funciones I. Vídeo 34 de pildorasinformaticas 7252 visualizaciones hace 1 año 24 minutos	24.3	cpp-34_zrfzi8.mp4	<h3>Curso C++. Funciones I. Vídeo 34 de pildorasinformaticas 7252 visualizaciones hace 1 año 24 minutos</h3>	cm44dgkjc000pevo0raen3zme	2024-11-30 16:13:32.28	2024-12-04 15:23:45.177
cm44dpus30006evugmxcytc34	Curso Angular. Estructura y modificación de la App. Vídeo 3 de pildorasinformaticas 90.783 visualizaciones hace 3 años 21 minutos	21.02	angular-03_po2apm.mp4	<h3>Curso Angular. Estructura y modificación de la App. Vídeo 3 de pildorasinformaticas 90.783 visualizaciones hace 3 años 21 minutos</h3>	cm44dpus30003evugcwn3zx9l	2024-11-30 16:20:45.4592024-12-04 15:23:45.177
cm44dgkjc0015evo0wcd3i2hm	Curso C++. Funciones III. Paso por valor y por referencia. Vídeo 36 de pildorasinformaticas 8178 visualizaciones hace 1 año 23 minutos	23.21	cpp-36_hxl1yq.mp4	<h3>Curso C++. Funciones III. Paso por valor y por referencia. Vídeo 36 de pildorasinformaticas 8178 visualizaciones hace 1 año 23 minutos</h3>	cm44dgkjc000pevo0raen3zme	2024-11-30 16:13:32.28	2024-12-04 15:23:45.177
cm44dtbux000eevcsyb25o1pl	Curso Django. BBDD I. Vídeo 11 de pildorasinformaticas 83.318 visualizaciones hace 5 años 14 minutos y 11 segundos	14.11	django-11_gzewgn.mp4	<h3>Curso Django. BBDD I. Vídeo 11 de pildorasinformaticas 83.318 visualizaciones hace 5 años 14 minutos y 11 segundos</h3>	cm44dtbux0003evcsfhwhdfbp	2024-11-30 16:23:27.561	2024-12-04 15:23:45.176
cm44dtbv30015evcstfjbtxov	Curso Django. Proyecto web completo XI. Vídeo 36 de pildorasinformaticas 27.708 visualizaciones hace 4 años 9 minutos y 35 segundos	9.35	django-36_jyokmi.mp4	<h3>Curso Django. Proyecto web completo XI. Vídeo 36 de pildorasinformaticas 27.708 visualizaciones hace 4 años 9 minutos y 35 segundos</h3>	cm44dtbv3000pevcscjrehwdu	2024-11-30 16:23:27.5682024-12-04 15:23:45.176
cm44dpus8000vevug1qn3hauy	Curso Angular. Routing III. Vídeo 26 de pildorasinformaticas 19.306 visualizaciones hace 3 años 14 minutos y 22 segundos	14.22	angular-26_nsfxal.mp4	<h3>Curso Angular. Routing III. Vídeo 26 de pildorasinformaticas 19.306 visualizaciones hace 3 años 14 minutos y 22 segundos</h3>	cm44dpus8000pevugm2pzm3jx	2024-11-30 16:20:45.465	2024-12-04 15:23:45.177
cm44dgkjm001devo0v8yuzue7	Curso C++. Punteros I. Vídeo 42 de pildorasinformaticas 9971 visualizaciones hace 11 meses 11 minutos y 45 segundos	11.45	cpp-42_xwcyaz.mp4	<h3>Curso C++. Punteros I. Vídeo 42 de pildorasinformaticas 9971 visualizaciones hace 11 meses 11 minutos y 45 segundos</h3>	cm44dgkjm001bevo0riwu6jzy	2024-11-30 16:13:32.29	2024-12-04 15:23:45.181
cm44dpus8000revuggm32au2n	Curso Angular. Servicios II. Vídeo 22 de pildorasinformaticas 22.664 visualizaciones hace 3 años 15 minutos	15.56	angular-22_atj523.mp4	<h3>Curso Angular. Servicios II. Vídeo 22 de pildorasinformaticas 22.664 visualizaciones hace 3 años 15 minutos</h3>	cm44dpus8000pevugm2pzm3jx	2024-11-30 16:20:45.465	2024-12-04 15:23:45.181
cm44dtbv8001levcssn4aunoy	Curso Django. Proyecto web completo XXV. Vídeo 50 de pildorasinformaticas 16.744 visualizaciones hace 3 años 14 minutos y 12 segundos	14.12	django-50_mgn7wr.mp4	<h3>Curso Django. Proyecto web completo XXV. Vídeo 50 de pildorasinformaticas 16.744 visualizaciones hace 3 años 14 minutos y 12 segundos</h3>	cm44dtbv8001bevcsrzplq638	2024-11-30 16:23:27.5722024-12-04 15:23:45.182
cm44dtbux000ievcs9ozmfowc	Curso Django. BBDD V. PostgreSql con Where. Vídeo 15 de pildorasinformaticas 59.825 visualizaciones hace 5 años 19 minutos	19.43	django-15_qwnknv.mp4	<h3>Curso Django. BBDD V. PostgreSql con Where. Vídeo 15 de pildorasinformaticas 59.825 visualizaciones hace 5 años 19 minutos</h3>	cm44dtbux0003evcsfhwhdfbp	2024-11-30 16:23:27.561	2024-12-04 15:23:45.183
cm44dtbv30018evcsn4fhggp9	Curso Django. Proyecto web completo XIV. Vídeo 39 de pildorasinformaticas 25.865 visualizaciones hace 4 años 14 minutos y 52 segundos	14.52	django-39_f20sby.mp4	<h3>Curso Django. Proyecto web completo XIV. Vídeo 39 de pildorasinformaticas 25.865 visualizaciones hace 4 años 14 minutos y 52 segundos</h3>	cm44dtbv3000pevcscjrehwdu	2024-11-30 16:23:27.5682024-12-04 15:23:45.177
cm44dtbux000mevcsggafz580	Curso Django. Panel de Administración IV. Vídeo 19 de pildorasinformaticas 41.940 visualizaciones hace 4 años 15 minutos	15.4	django-19_to8iea.mp4	<h3>Curso Django. Panel de Administración IV. Vídeo 19 de pildorasinformaticas 41.940 visualizaciones hace 4 años 15 minutos</h3>	cm44dtbux0003evcsfhwhdfbp	2024-11-30 16:23:27.561	2024-12-04 15:23:45.177
cm44dtbv30019evcstpfz6g2l	Curso Django. Proyecto web completo XV. Vídeo 40 de pildorasinformaticas 28.141 visualizaciones hace 4 años 19 minutos	19.22	django-40_pwppxf.mp4	<h3>Curso Django. Proyecto web completo XV. Vídeo 40 de pildorasinformaticas 28.141 visualizaciones hace 4 años 19 minutos</h3>	cm44dtbv3000pevcscjrehwdu	2024-11-30 16:23:27.568	2024-12-04 15:23:45.177
cm44dtbv3000qevcsaz48458h	Curso Django. Formularios I. Vídeo 21 de pildorasinformaticas 90.790 visualizaciones hace 4 años 14 minutos y 43 segundos	14.43	django-21_joqcbu.mp4	<h3>Curso Django. Formularios I. Vídeo 21 de pildorasinformaticas 90.790 visualizaciones hace 4 años 14 minutos y 43 segundos</h3>	cm44dtbv3000pevcscjrehwdu	2024-11-30 16:23:27.568	2024-12-04 15:23:45.177
cm44dtbv3000vevcsx87ilz63	Curso Django. Proyecto web completo I. Vídeo 26 de pildorasinformaticas 59.194 visualizaciones hace 4 años 6 minutos y 59 segundos	6.59	django-26_bjysmp.mp4	<h3>Curso Django. Proyecto web completo I. Vídeo 26 de pildorasinformaticas 59.194 visualizaciones hace 4 años 6 minutos y 59 segundos</h3>	cm44dtbv3000pevcscjrehwdu	2024-11-30 16:23:27.5682024-12-04 15:23:45.177
cm44dgkjm001cevo0s4m2edxm	Curso C++. Funciones VIII. Funciones recursivas. Vídeo 41 de pildorasinformaticas 3477 visualizaciones hace 11 meses 24 minutos24.04	cpp-41_g29ywr.mp4	<h3>Curso C++. Funciones VIII. Funciones recursivas. Vídeo 41 de pildorasinformaticas 3477 visualizaciones hace 11 meses 24 minutos</h3>	cm44dgkjm001bevo0riwu6jzy	2024-11-30 16:13:32.29	2024-12-04 15:23:45.178
cm44dpus30004evugqq11femj	Curso Angular. Introducción. Vídeo 1 de pildorasinformaticas 233.295 visualizaciones hace 3 años 11 minutos	11	angular-01_sqwuyd.mp4	<h3>Curso Angular. Introducción. Vídeo 1 de pildorasinformaticas 233.295 visualizaciones hace 3 años 11 minutos</h3>	cm44dpus30003evugcwn3zx9l	2024-11-30 16:20:45.459	2024-12-04 15:23:45.177
cm44dgkip0009evo09k6rtu3n	Curso C++. Tipos y variables. Vídeo 6 de pildorasinformaticas 20.587 visualizaciones hace 2 años 24 minutos	24.31	cpp-06_kspqke.mp4	<h3>Curso C++. Tipos y variables. Vídeo 6 de pildorasinformaticas 20.587 visualizaciones hace 2 años 24 minutos</h3>	cm44dgkip0003evo0vf5ht9qd	2024-11-30 16:13:32.258	2024-12-04 15:23:45.176
cm44dpus30005evugcvqs03gi	Curso Angular. Instalación software & Primera App. Vídeo 2 de pildorasinformaticas 107.378 visualizaciones hace 3 años 17 minutos	17.44	angular-02_latj9q.mp4	<h3>Curso Angular. Instalación software & Primera App. Vídeo 2 de pildorasinformaticas 107.378 visualizaciones hace 3 años 17 minutos</h3>	cm44dpus30003evugcwn3zx9l	2024-11-30 16:20:45.4592024-12-04 15:23:45.177
cm44dtbv8001qevcsxdiqazke	Curso Django. Proyecto web completo XX. Vídeo 55 de pildorasinformaticas 22.150 visualizaciones hace 3 años 11 minutos y 16 segundos	11.16	django-55_ndlvhm.mp4	<h3>Curso Django. Proyecto web completo XX. Vídeo 55 de pildorasinformaticas 22.150 visualizaciones hace 3 años 11 minutos y 16 segundos</h3>	cm44dtbv8001bevcsrzplq638	2024-11-30 16:23:27.5722024-12-04 15:23:45.177
cm44dtbv8001mevcs4v0uc0ff	Curso Django. Proyecto web completo XXVI. Vídeo 51 de pildorasinformaticas 17.079 visualizaciones hace 3 años 13 minutos y 50 segundos	13.5	django-51_lxqoyf.mp4	<h3>Curso Django. Proyecto web completo XXVI. Vídeo 51 de pildorasinformaticas 17.079 visualizaciones hace 3 años 13 minutos y 50 segundos</h3>	cm44dtbv8001bevcsrzplq638	2024-11-30 16:23:27.5722024-12-04 15:23:45.176
cm44dpus30007evugxqi7q16n	Curso Angular. Estructura y flujo. Vídeo 4 de pildorasinformaticas 69.707 visualizaciones hace 3 años 17 minutos	17.25	angular-04_k1dnbv.mp4	<h3>Curso Angular. Estructura y flujo. Vídeo 4 de pildorasinformaticas 69.707 visualizaciones hace 3 años 17 minutos</h3>	cm44dpus30003evugcwn3zx9l	2024-11-30 16:20:45.459	2024-12-04 15:23:45.177
cm44dpus30008evuglvn6nin9	Curso Angular. Componentes. Vídeo 5 de pildorasinformaticas 66.768 visualizaciones hace 3 años 23 minutos	23.1	angular-05_zbqyiu.mp4	<h3>Curso Angular. Componentes. Vídeo 5 de pildorasinformaticas 66.768 visualizaciones hace 3 años 23 minutos</h3>	cm44dpus30003evugcwn3zx9l	2024-11-30 16:20:45.459	2024-12-04 15:23:45.177
cm44dtbv8001pevcswdnmbplu	Curso Django. Proyecto web completo XIX. Vídeo 54 de pildorasinformaticas 23.895 visualizaciones hace 3 años 17 minutos	17.34	django-54_siumkm.mp4	<h3>Curso Django. Proyecto web completo XIX. Vídeo 54 de pildorasinformaticas 23.895 visualizaciones hace 3 años 17 minutos</h3>	cm44dtbv8001bevcsrzplq638	2024-11-30 16:23:27.572	2024-12-04 15:23:45.177
cm44dtbv8001hevcsygq3kdg7	Curso Django. Proyecto web completo XXI. Vídeo 46 de pildorasinformaticas 19.072 visualizaciones hace 3 años 16 minutos	16.36	django-46_zylje4.mp4	<h3>Curso Django. Proyecto web completo XXI. Vídeo 46 de pildorasinformaticas 19.072 visualizaciones hace 3 años 16 minutos</h3>	cm44dtbv8001bevcsrzplq638	2024-11-30 16:23:27.572	2024-12-04 15:23:45.177
cm44dgkjc000xevo0ol6k92r2	Curso C++. Bucle While. Vídeo 28 de pildorasinformaticas 4527 visualizaciones hace 1 año 25 minutos	25.04	cpp-28_s3nuv8.mp4	<h3>Curso C++. Bucle While. Vídeo 28 de pildorasinformaticas 4527 visualizaciones hace 1 año 25 minutos</h3>	cm44dgkjc000pevo0raen3zme	2024-11-30 16:13:32.28	2024-12-04 15:23:45.177
cm44dtbux000cevcs3rk8vbys	Curso Django. Plantillas V. Plantillas incrustadas. Vídeo 9 de pildorasinformaticas 80.115 visualizaciones hace 5 años 15 minutos	15.47	django-09_k0imty.mp4	<h3>Curso Django. Plantillas V. Plantillas incrustadas. Vídeo 9 de pildorasinformaticas 80.115 visualizaciones hace 5 años 15 minutos</h3>	cm44dtbux0003evcsfhwhdfbp	2024-11-30 16:23:27.5612024-12-04 15:23:45.177
cm44dpus3000eevugvt6pcwu9	Curso Angular. Two way binding (binding bidireccional). Vídeo 11 de pildorasinformaticas 34.031 visualizaciones hace 3 años 22 minutos	22.11	angular-11_rui46y.mp4	<h3>Curso Angular. Two way binding (binding bidireccional). Vídeo 11 de pildorasinformaticas 34.031 visualizaciones hace 3 años 22 minutos</h3>	cm44dpus30003evugcwn3zx9l	2024-11-30 16:20:45.4592024-12-04 15:23:45.179
cm44dgkiq000eevo0bnv19225	Curso C++. Arrays I. Qué son y sintaxis básica. Vídeo 11 de pildorasinformaticas 14.307 visualizaciones hace 2 años 15 minutos	15.51	cpp-11_u248ft.mp4	<h3>Curso C++. Arrays I. Qué son y sintaxis básica. Vídeo 11 de pildorasinformaticas 14.307 visualizaciones hace 2 años 15 minutos</h3>	cm44dgkip0003evo0vf5ht9qd	2024-11-30 16:13:32.258	2024-12-04 15:23:45.178
cm44dtbvb0021evcst1fzdzq3	Curso Django: Proyecto completo XXIX. Creando login. Vídeo 64 de pildorasinformaticas 14.867 visualizaciones hace 2 años 15 minutos	15.37	django-64_sgqwfj.mp4	<h3>Curso Django: Proyecto completo XXIX. Creando login. Vídeo 64 de pildorasinformaticas 14.867 visualizaciones hace 2 años 15 minutos</h3>	cm44dtbvb001xevcsx80zh22s	2024-11-30 16:23:27.5762024-12-04 15:23:45.178
cm44dtbv30011evcsigpajm2v	Curso Django. Proyecto web completo VII. Vídeo 32 de pildorasinformaticas 46.972 visualizaciones hace 4 años 18 minutos	18.37	django-32_j3zuaj.mp4	<h3>Curso Django. Proyecto web completo VII. Vídeo 32 de pildorasinformaticas 46.972 visualizaciones hace 4 años 18 minutos</h3>	cm44dtbv3000pevcscjrehwdu	2024-11-30 16:23:27.568	2024-12-04 15:23:45.178
cm44dgkjm001pevo0kiiozpch	Curso C++. POO. Clases y Objetos. Vídeo 54 de pildorasinformaticas 3141 visualizaciones hace 4 meses 25 minutos	25.03	cpp-54_hj8ccq.mp4	<h3>Curso C++. POO. Clases y Objetos. Vídeo 54 de pildorasinformaticas 3141 visualizaciones hace 4 meses 25 minutos</h3>	cm44dgkjm001bevo0riwu6jzy	2024-11-30 16:13:32.29	2024-12-04 15:23:45.178
cm44dpusc001hevug8603oc5x	Curso Angular. Despliegue. Fin de curso. Vídeo 46 de pildorasinformaticas 12.835 visualizaciones hace 1 año 13 minutos y 47 segundos	13.47	angular-46_yxup6f.mp4	<h3>Curso Angular. Despliegue. Fin de curso. Vídeo 46 de pildorasinformaticas 12.835 visualizaciones hace 1 año 13 minutos y 47 segundos</h3>	cm44dpusc001bevugni7fizhr	2024-11-30 16:20:45.4682024-12-04 15:23:45.178
cm44dpus30009evugjeblp3tn	Curso Angular. Componentes II. Vídeo 6 de pildorasinformaticas 48.649 visualizaciones hace 3 años 20 minutos	20.11	angular-06_oj5350.mp4	<h3>Curso Angular. Componentes II. Vídeo 6 de pildorasinformaticas 48.649 visualizaciones hace 3 años 20 minutos</h3>	cm44dpus30003evugcwn3zx9l	2024-11-30 16:20:45.459	2024-12-04 15:23:45.179
cm44dtbux000nevcspei1vmcz	Curso Django. Panel de Administración V. Vídeo 20 de pildorasinformaticas 38.809 visualizaciones hace 4 años 15 minutos	15.49	django-20_w4qife.mp4	<h3>Curso Django. Panel de Administración V. Vídeo 20 de pildorasinformaticas 38.809 visualizaciones hace 4 años 15 minutos</h3>	cm44dtbux0003evcsfhwhdfbp	2024-11-30 16:23:27.561	2024-12-04 15:23:45.177
cm44dtbux0004evcsvlvqcmew	Curso Django. Introducción e Instalación.Vídeo 1 de pildorasinformaticas 637.105 visualizaciones hace 5 años 11 minutos y 55 segundos	11.55	django-01_sxcphq.mp4	<h3>Curso Django. Introducción e Instalación.Vídeo 1 de pildorasinformaticas 637.105 visualizaciones hace 5 años 11 minutos y 55 segundos</h3>	cm44dtbux0003evcsfhwhdfbp	2024-11-30 16:23:27.5612024-12-04 15:23:45.177
cm44dtbvb0022evcswfeu1ti4	Curso Django: Proyecto completo XXX. Mensajes de error. Vídeo 65 de pildorasinformaticas 26.127 visualizaciones hace 2 años 15 minutos	15.11	django-65_ahppzj.mp4	<h3>Curso Django: Proyecto completo XXX. Mensajes de error. Vídeo 65 de pildorasinformaticas 26.127 visualizaciones hace 2 años 15 minutos</h3>	cm44dtbvb001xevcsx80zh22s	2024-11-30 16:23:27.5762024-12-04 15:23:45.178
cm44dtbv3000yevcsinjgto4n	Curso Django. Proyecto web completo IV. Vídeo 29 de pildorasinformaticas 53.834 visualizaciones hace 4 años 15 minutos	15.26	django-29_mwmayq.mp4	<h3>Curso Django. Proyecto web completo IV. Vídeo 29 de pildorasinformaticas 53.834 visualizaciones hace 4 años 15 minutos</h3>	cm44dtbv3000pevcscjrehwdu	2024-11-30 16:23:27.568	2024-12-04 15:23:45.178
cm44dtbv3000revcsj1olrs3w	Curso Django. Formularios II. Vídeo 22 de pildorasinformaticas 63.716 visualizaciones hace 4 años 23 minutos	23.1	django-22_r6lexj.mp4	<h3>Curso Django. Formularios II. Vídeo 22 de pildorasinformaticas 63.716 visualizaciones hace 4 años 23 minutos</h3>	cm44dtbv3000pevcscjrehwdu	2024-11-30 16:23:27.568	2024-12-04 15:23:45.178
cm44dgkjc0012evo0xl3ecab0	Curso C++. Bucles anidados II. Juego de azar. Vídeo 33 de pildorasinformaticas 3079 visualizaciones hace 1 año 22 minutos	22.14	cpp-33_nl1kod.mp4	<h3>Curso C++. Bucles anidados II. Juego de azar. Vídeo 33 de pildorasinformaticas 3079 visualizaciones hace 1 año 22 minutos</h3>	cm44dgkjc000pevo0raen3zme	2024-11-30 16:13:32.28	2024-12-04 15:23:45.18
cm44dtbv8001cevcs66juofn5	Curso Django. Proyecto web completo XVI. Vídeo 41 de pildorasinformaticas 25.903 visualizaciones hace 4 años 17 minutos	17.37	django-41_eqpacn.mp4	<h3>Curso Django. Proyecto web completo XVI. Vídeo 41 de pildorasinformaticas 25.903 visualizaciones hace 4 años 17 minutos</h3>	cm44dtbv8001bevcsrzplq638	2024-11-30 16:23:27.572	2024-12-04 15:23:45.182
cm44dgkjc0010evo0rg6l9289	Curso C++. Bucles infinitos. Vídeo 31 de pildorasinformaticas 3915 visualizaciones hace 1 año 24 minutos	24.19	cpp-31_ewxyfu.mp4	<h3>Curso C++. Bucles infinitos. Vídeo 31 de pildorasinformaticas 3915 visualizaciones hace 1 año 24 minutos</h3>	cm44dgkjc000pevo0raen3zme	2024-11-30 16:13:32.28	2024-12-04 15:23:45.183
cm44dtbv8001vevcs0geil8mw	Curso Django. Proyecto web completo XXV. Vídeo 60 de pildorasinformaticas 16.179 visualizaciones hace 2 años 11 minutos y 24 segundos	11.24	django-60_s2zl5s.mp4	<h3>Curso Django. Proyecto web completo XXV. Vídeo 60 de pildorasinformaticas 16.179 visualizaciones hace 2 años 11 minutos y 24 segundos</h3>	cm44dtbv8001bevcsrzplq638	2024-11-30 16:23:27.5722024-12-04 15:23:45.183
cm44dgkiq000cevo0mvdyn8ma	Curso C++. Declaración de constantes. Vídeo 9 de pildorasinformaticas 13.264 visualizaciones hace 2 años 12 minutos y 30 segundos	12.3	cpp-09_wr4da1.mp4	<h3>Curso C++. Declaración de constantes. Vídeo 9 de pildorasinformaticas 13.264 visualizaciones hace 2 años 12 minutos y 30 segundos</h3>	cm44dgkip0003evo0vf5ht9qd	2024-11-30 16:13:32.2582024-12-04 15:23:45.178
cm44dtbv8001eevcsrru08gj5	Curso Django. Proyecto web completo XVIII. Vídeo 43 de pildorasinformaticas 25.526 visualizaciones hace 4 años 18 minutos	18.31	django-43_mzgakn.mp4	<h3>Curso Django. Proyecto web completo XVIII. Vídeo 43 de pildorasinformaticas 25.526 visualizaciones hace 4 años 18 minutos</h3>	cm44dtbv8001bevcsrzplq638	2024-11-30 16:23:27.572	2024-12-04 15:23:45.183
cm44dgkiq000fevo055888dav	Curso C++. Declaración e inicialización de arrays en código. Vídeo 12 de pildorasinformaticas 11.958 visualizaciones hace 2 años 17 minutos	17.4	cpp-12_zmjtq9.mp4	<h3>Curso C++. Declaración e inicialización de arrays en código. Vídeo 12 de pildorasinformaticas 11.958 visualizaciones hace 2 años 17 minutos</h3>	cm44dgkip0003evo0vf5ht9qd	2024-11-30 16:13:32.258	2024-12-04 15:23:45.178
cm44dgkjc000wevo0tbh9qreu	Curso C++. Bucle For-Each. Vídeo 27 de pildorasinformaticas 5204 visualizaciones hace 1 año 22 minutos	22.14	cpp-27_hytupo.mp4	<h3>Curso C++. Bucle For-Each. Vídeo 27 de pildorasinformaticas 5204 visualizaciones hace 1 año 22 minutos</h3>	cm44dgkjc000pevo0raen3zme	2024-11-30 16:13:32.28	2024-12-04 15:23:45.178
cm44dtbvb0020evcsgxexjkri	Curso Django. Proyecto web completo XXVIII. Sesión de usuarios. Vídeo 63 de pildorasinformaticas 11.824 visualizaciones hace 2 años 19 minutos	19.45	django-63_kwohq9.mp4	<h3>Curso Django. Proyecto web completo XXVIII. Sesión de usuarios. Vídeo 63 de pildorasinformaticas 11.824 visualizaciones hace 2 años 19 minutos</h3>	cm44dtbvb001xevcsx80zh22s	2024-11-30 16:23:27.576	2024-12-04 15:23:45.181
cm44dtbvb001yevcsj8wf1czc	Curso Django. Proyecto web completo XXVI. Vídeo 61 de pildorasinformaticas 14.678 visualizaciones hace 2 años 16 minutos	16.3	django-61_qfhaqh.mp4	<h3>Curso Django. Proyecto web completo XXVI. Vídeo 61 de pildorasinformaticas 14.678 visualizaciones hace 2 años 16 minutos</h3>	cm44dtbvb001xevcsx80zh22s	2024-11-30 16:23:27.576	2024-12-04 15:23:45.181
cm44dtbvb001zevcs9p6s6ttk	Curso Django. Proyecto web completo XXVII. Registro de usuarios. Vídeo 62 de pildorasinformaticas 15.368 visualizaciones hace 2 años 23 minutos	23.45	django-62_vhvgmw.mp4	<h3>Curso Django. Proyecto web completo XXVII. Registro de usuarios. Vídeo 62 de pildorasinformaticas 15.368 visualizaciones hace 2 años 23 minutos</h3>	cm44dtbvb001xevcsx80zh22s	2024-11-30 16:23:27.576	2024-12-04 15:23:45.184
cm44dgkjc000uevo0k4ncdus4	Curso C++. Bucles. Vídeo 25 de pildorasinformaticas 3071 visualizaciones hace 1 año 12 minutos y 32 segundos	12.32	cpp-25_cjj1qj.mp4	<h3>Curso C++. Bucles. Vídeo 25 de pildorasinformaticas 3071 visualizaciones hace 1 año 12 minutos y 32 segundos</h3>	cm44dgkjc000pevo0raen3zme	2024-11-30 16:13:32.28	2024-12-04 15:23:45.178
cm44dtbux0008evcssz6bgcuj	Curso Django. Plantillas I. Vídeo 5 de pildorasinformaticas 161.762 visualizaciones hace 5 años 17 minutos	17.26	django-05_xjnaaj.mp4	<h3>Curso Django. Plantillas I. Vídeo 5 de pildorasinformaticas 161.762 visualizaciones hace 5 años 17 minutos</h3>	cm44dtbux0003evcsfhwhdfbp	2024-11-30 16:23:27.561	2024-12-04 15:23:45.176
cm44dgkjc000tevo0fjenkxlt	Curso C++. Operador ternario. Vídeo 24 de pildorasinformaticas 5132 visualizaciones hace 1 año 12 minutos y 49 segundos	12.49	cpp-24_jrpsep.mp4	<h3>Curso C++. Operador ternario. Vídeo 24 de pildorasinformaticas 5132 visualizaciones hace 1 año 12 minutos y 49 segundos</h3>	cm44dgkjc000pevo0raen3zme	2024-11-30 16:13:32.28	2024-12-04 15:23:45.177
cm44dgkiq000gevo04hmehrs2	Curso C++. Arrays bidimensionales. Vídeo 13 de pildorasinformaticas 13.521 visualizaciones hace 1 año 21 minutos	21.39	cpp-13_xmbuux.mp4	<h3>Curso C++. Arrays bidimensionales. Vídeo 13 de pildorasinformaticas 13.521 visualizaciones hace 1 año 21 minutos</h3>	cm44dgkip0003evo0vf5ht9qd	2024-11-30 16:13:32.258	2024-12-04 15:23:45.178
cm44dgkiq000ievo0rh3p8pm5	Curso C++. Vectores I. Vídeo 15 de pildorasinformaticas 14.552 visualizaciones hace 1 año 19 minutos	19.2	cpp-15_jak76a.mp4	<h3>Curso C++. Vectores I. Vídeo 15 de pildorasinformaticas 14.552 visualizaciones hace 1 año 19 minutos</h3>	cm44dgkip0003evo0vf5ht9qd	2024-11-30 16:13:32.258	2024-12-04 15:23:45.178
cm44dgkiq000jevo0q15i9xa1	Curso C++. Vectores II. Vídeo 16 de pildorasinformaticas 9358 visualizaciones hace 1 año 31 minutos	31.47	cpp-16_mxme9t.mp4	<h3>Curso C++. Vectores II. Vídeo 16 de pildorasinformaticas 9358 visualizaciones hace 1 año 31 minutos</h3>	cm44dgkip0003evo0vf5ht9qd	2024-11-30 16:13:32.258	2024-12-04 15:23:45.178
cm44dgkiq000levo0a7g48afa	Curso C++. Operadores II. Vídeo 18 de pildorasinformaticas 5966 visualizaciones hace 1 año 16 minutos	16.33	cpp-18_amgqdw.mp4	<h3>Curso C++. Operadores II. Vídeo 18 de pildorasinformaticas 5966 visualizaciones hace 1 año 16 minutos</h3>	cm44dgkip0003evo0vf5ht9qd	2024-11-30 16:13:32.258	2024-12-04 15:23:45.178
cm44dgkjc000vevo0tkpzkswi	Curso C++. Bucle For. Vídeo 26 de pildorasinformaticas 4142 visualizaciones hace 1 año 24 minutos	24.13	cpp-26_o2qchm.mp4	<h3>Curso C++. Bucle For. Vídeo 26 de pildorasinformaticas 4142 visualizaciones hace 1 año 24 minutos</h3>	cm44dgkjc000pevo0raen3zme	2024-11-30 16:13:32.28	2024-12-04 15:23:45.178
cm44dgkiq000nevo0ruqb2zjo	Curso C++. Operadores y condicional IF II. Vídeo 20 de pildorasinformaticas 4137 visualizaciones hace 1 año 22 minutos	22.27	cpp-20_gqo7p6.mp4	<h3>Curso C++. Operadores y condicional IF II. Vídeo 20 de pildorasinformaticas 4137 visualizaciones hace 1 año 22 minutos</h3>	cm44dgkip0003evo0vf5ht9qd	2024-11-30 16:13:32.258	2024-12-04 15:23:45.178
cm44dgkjc000qevo0kx3vqpie	Curso C++. Operadores y condicional IF III. Vídeo 21 de pildorasinformaticas 4517 visualizaciones hace 1 año 13 minutos y 28 segundos	13.28	cpp-21_hqszik.mp4	<h3>Curso C++. Operadores y condicional IF III. Vídeo 21 de pildorasinformaticas 4517 visualizaciones hace 1 año 13 minutos y 28 segundos</h3>	cm44dgkjc000pevo0raen3zme	2024-11-30 16:13:32.28	2024-12-04 15:23:45.178
cm44dgkjm001nevo09e8v9377	Curso C++. L-Values y R-Values. . Vídeo 52 de pildorasinformaticas 2527 visualizaciones hace 6 meses 23 minutos	23.15	cpp-52_spf9za.mp4	<h3>Curso C++. L-Values y R-Values. . Vídeo 52 de pildorasinformaticas 2527 visualizaciones hace 6 meses 23 minutos</h3>	cm44dgkjm001bevo0riwu6jzy	2024-11-30 16:13:32.29	2024-12-04 15:23:45.178
cm44dgkjm001qevo0md0yrph4	Curso C++. POO. Acceso a propiedades y métodos. Vídeo 55 de pildorasinformaticas 2271 visualizaciones hace 3 meses 33 minutos	33.19	cpp-55_tjgyya.mp4	<h3>Curso C++. POO. Acceso a propiedades y métodos. Vídeo 55 de pildorasinformaticas 2271 visualizaciones hace 3 meses 33 minutos</h3>	cm44dgkjm001bevo0riwu6jzy	2024-11-30 16:13:32.29	2024-12-04 15:23:45.178
cm44dgkjm001mevo0vcuqherv	Curso C++. Referencias II. Ejemplos sencillos. Vídeo 51 de pildorasinformaticas 2259 visualizaciones hace 6 meses 16 minutos	16.44	cpp-51_ftitsk.mp4	<h3>Curso C++. Referencias II. Ejemplos sencillos. Vídeo 51 de pildorasinformaticas 2259 visualizaciones hace 6 meses 16 minutos</h3>	cm44dgkjm001bevo0riwu6jzy	2024-11-30 16:13:32.29	2024-12-04 15:23:45.178
cm44dgkjm001kevo05xw46hi3	Curso C++. Punteros VII. Problemas con punteros. Vídeo 49 de pildorasinformaticas 2668 visualizaciones hace 7 meses 19 minutos	19.47	cpp-49_cxwazy.mp4	<h3>Curso C++. Punteros VII. Problemas con punteros. Vídeo 49 de pildorasinformaticas 2668 visualizaciones hace 7 meses 19 minutos</h3>	cm44dgkjm001bevo0riwu6jzy	2024-11-30 16:13:32.29	2024-12-04 15:23:45.178
cm44dgkjc0018evo0alhr5i70	Curso C++. Funciones VI. Funciones inline. Vídeo 39 de pildorasinformaticas 3776 visualizaciones hace 1 año 17 minutos	17.34	cpp-39_b3fkme.mp4	<h3>Curso C++. Funciones VI. Funciones inline. Vídeo 39 de pildorasinformaticas 3776 visualizaciones hace 1 año 17 minutos</h3>	cm44dgkjc000pevo0raen3zme	2024-11-30 16:13:32.28	2024-12-04 15:23:45.178
cm44dtbv8001devcsi86vas01	Curso Django. Proyecto web completo XVII. Vídeo 42 de pildorasinformaticas 23.233 visualizaciones hace 4 años 16 minutos	16.57	django-42_ppis1b.mp4	<h3>Curso Django. Proyecto web completo XVII. Vídeo 42 de pildorasinformaticas 23.233 visualizaciones hace 4 años 16 minutos</h3>	cm44dtbv8001bevcsrzplq638	2024-11-30 16:23:27.572	2024-12-04 15:23:45.176
cm44dtbv30016evcsotc8d6e4	Curso Django. Proyecto web completo XII. Vídeo 37 de pildorasinformaticas 26.497 visualizaciones hace 4 años 11 minutos y 45 segundos	11.45	django-37_vo8rcd.mp4	<h3>Curso Django. Proyecto web completo XII. Vídeo 37 de pildorasinformaticas 26.497 visualizaciones hace 4 años 11 minutos y 45 segundos</h3>	cm44dtbv3000pevcscjrehwdu	2024-11-30 16:23:27.5682024-12-04 15:23:45.178
cm44dtbux000devcsrh76gplp	Curso Django. Plantillas VI. Herencia de plantillas. Vídeo 10 de pildorasinformaticas 83.256 visualizaciones hace 5 años 23 minutos	23.15	django-10_r2okyv.mp4	<h3>Curso Django. Plantillas VI. Herencia de plantillas. Vídeo 10 de pildorasinformaticas 83.256 visualizaciones hace 5 años 23 minutos</h3>	cm44dtbux0003evcsfhwhdfbp	2024-11-30 16:23:27.5612024-12-04 15:23:45.178
cm44dgkjc000yevo0q4nb0p36	Curso C++. Bucle do-while. Vídeo 29 de pildorasinformaticas 3975 visualizaciones hace 1 año 17 minutos	17.18	cpp-29_lv4kpy.mp4	<h3>Curso C++. Bucle do-while. Vídeo 29 de pildorasinformaticas 3975 visualizaciones hace 1 año 17 minutos</h3>	cm44dgkjc000pevo0raen3zme	2024-11-30 16:13:32.28	2024-12-04 15:23:45.179
cm44dpus3000bevug9xv3ltiy	Curso Angular. Interpolación II. Vídeo 8 de pildorasinformaticas 38.349 visualizaciones hace 3 años 16 minutos	16.54	angular-08_izqxwi.mp4	<h3>Curso Angular. Interpolación II. Vídeo 8 de pildorasinformaticas 38.349 visualizaciones hace 3 años 16 minutos</h3>	cm44dpus30003evugcwn3zx9l	2024-11-30 16:20:45.459	2024-12-04 15:23:45.179
cm44dtbvb0026evcsjmwiymu3	Curso Django. Proyecto completo XXXIV. Creando app Pedidos III. Vídeo 69 de pildorasinformaticas 13.492 visualizaciones hace 2 años 18 minutos	18.05	django-69_cnrsec.mp4	<h3>Curso Django. Proyecto completo XXXIV. Creando app Pedidos III. Vídeo 69 de pildorasinformaticas 13.492 visualizaciones hace 2 años 18 minutos</h3>	cm44dtbvb001xevcsx80zh22s	2024-11-30 16:23:27.576	2024-12-04 15:23:45.179
cm44dgkjm001vevo0eww0ihgl	Curso C++. Constructor Initialization List. Vídeo 60 de pildorasinformaticas 1471 visualizaciones hace 1 mes 19 minutos	19.43	cpp-60_naucbn.mp4	<h3>Curso C++. Constructor Initialization List. Vídeo 60 de pildorasinformaticas 1471 visualizaciones hace 1 mes 19 minutos</h3>	cm44dgkjm001bevo0riwu6jzy	2024-11-30 16:13:32.29	2024-12-04 15:23:45.179
cm44dgkjm001oevo0vwwmcfg5	Curso C++. POO (Programación Orientada a Objetos) Vídeo 53 de pildorasinformaticas 3417 visualizaciones hace 5 meses 29 minutos29.48	cpp-53_og8fwn.mp4	<h3>Curso C++. POO (Programación Orientada a Objetos) Vídeo 53 de pildorasinformaticas 3417 visualizaciones hace 5 meses 29 minutos</h3>	cm44dgkjm001bevo0riwu6jzy	2024-11-30 16:13:32.29	2024-12-04 15:23:45.178
cm44dtbvb0027evcso6q9tqw5	Curso Django. Proyecto completo. FIN. Vídeo 70 de pildorasinformaticas 28.411 visualizaciones hace 2 años 25 minutos	25.18	django-70_fogmkb.mp4	<h3>Curso Django. Proyecto completo. FIN. Vídeo 70 de pildorasinformaticas 28.411 visualizaciones hace 2 años 25 minutos</h3>	cm44dtbvb001xevcsx80zh22s	2024-11-30 16:23:27.576	2024-12-04 15:23:45.179
cm44dtbvb0025evcskvoz8iln	Curso Django. Proyecto completo XXXIII. Creando app Pedidos II. Vídeo 68 de pildorasinformaticas 12.219 visualizaciones hace 2 años 14 minutos y 56 segundos	14.56	django-68_rkpwxq.mp4	<h3>Curso Django. Proyecto completo XXXIII. Creando app Pedidos II. Vídeo 68 de pildorasinformaticas 12.219 visualizaciones hace 2 años 14 minutos y 56 segundos</h3>	cm44dtbvb001xevcsx80zh22s	2024-11-30 16:23:27.576	2024-12-04 15:23:45.179
cm44dpus3000cevugwcpnda1x	Curso Angular. Property Binding. Vídeo 9 de pildorasinformaticas 40.699 visualizaciones hace 3 años 19 minutos	19.24	angular-09_dqi1xw.mp4	<h3>Curso Angular. Property Binding. Vídeo 9 de pildorasinformaticas 40.699 visualizaciones hace 3 años 19 minutos</h3>	cm44dpus30003evugcwn3zx9l	2024-11-30 16:20:45.459	2024-12-04 15:23:45.179
cm44dpus3000hevugl7ewkzna	Curso Angular. Directivas I. Vídeo 14 de pildorasinformaticas 38.106 visualizaciones hace 3 años 23 minutos	23.04	angular-14_sbfwi3.mp4	<h3>Curso Angular. Directivas I. Vídeo 14 de pildorasinformaticas 38.106 visualizaciones hace 3 años 23 minutos</h3>	cm44dpus30003evugcwn3zx9l	2024-11-30 16:20:45.459	2024-12-04 15:23:45.179
cm44dpus3000gevug5ud23dy9	Curso Angular. Práctica guiada II. Vídeo 13 de pildorasinformaticas 25.853 visualizaciones hace 3 años 15 minutos	15.38	angular-13_xctesh.mp4	<h3>Curso Angular. Práctica guiada II. Vídeo 13 de pildorasinformaticas 25.853 visualizaciones hace 3 años 15 minutos</h3>	cm44dpus30003evugcwn3zx9l	2024-11-30 16:20:45.459	2024-12-04 15:23:45.179
cm44dpus3000fevugm155ddum	Curso Angular. Práctica guiada I. Vídeo 12 de pildorasinformaticas 32.846 visualizaciones hace 3 años 19 minutos	19.22	angular-12_juyct0.mp4	<h3>Curso Angular. Práctica guiada I. Vídeo 12 de pildorasinformaticas 32.846 visualizaciones hace 3 años 19 minutos</h3>	cm44dpus30003evugcwn3zx9l	2024-11-30 16:20:45.459	2024-12-04 15:23:45.179
cm44dpus3000devugevvvo9ud	Curso Angular. Event Binding. Vídeo 10 de pildorasinformaticas 41.075 visualizaciones hace 3 años 28 minutos	28.44	angular-10_jpsmh1.mp4	<h3>Curso Angular. Event Binding. Vídeo 10 de pildorasinformaticas 41.075 visualizaciones hace 3 años 28 minutos</h3>	cm44dpus30003evugcwn3zx9l	2024-11-30 16:20:45.459	2024-12-04 15:23:45.179
cm44dpus3000levuglpvyj2hc	Curso Angular. Directivas V. Vídeo 18 de pildorasinformaticas 24.429 visualizaciones hace 3 años 16 minutos	16.03	angular-18_x1zv6i.mp4	<h3>Curso Angular. Directivas V. Vídeo 18 de pildorasinformaticas 24.429 visualizaciones hace 3 años 16 minutos</h3>	cm44dpus30003evugcwn3zx9l	2024-11-30 16:20:45.459	2024-12-04 15:23:45.179
cm44dpus3000mevug6rlk68te	Curso Angular. Comunicación entre componentes I. Vídeo 19 de pildorasinformaticas 36.063 visualizaciones hace 3 años 25 minutos25.11	angular-19_mbnzgg.mp4	<h3>Curso Angular. Comunicación entre componentes I. Vídeo 19 de pildorasinformaticas 36.063 visualizaciones hace 3 años 25 minutos</h3>	cm44dpus30003evugcwn3zx9l	2024-11-30 16:20:45.459	2024-12-04 15:23:45.179
cm44dpus90019evug7awsce1y	Curso Angular. Login III. Vídeo 40 de pildorasinformaticas 9912 visualizaciones hace 2 años 9 minutos y 54 segundos	9.54	angular-40_pv3fnk.mp4	<h3>Curso Angular. Login III. Vídeo 40 de pildorasinformaticas 9912 visualizaciones hace 2 años 9 minutos y 54 segundos</h3>	cm44dpus8000pevugm2pzm3jx	2024-11-30 16:20:45.465	2024-12-04 15:23:45.179
cm44dpusc001fevugaqv8hqid	Curso Angular. Login VII. Creación de cookie para guardar login. Vídeo 44 de pildorasinformaticas 10.816 visualizaciones hace 2 años 12 minutos y 16 segundos	12.16	angular-44_r8hcai.mp4	<h3>Curso Angular. Login VII. Creación de cookie para guardar login. Vídeo 44 de pildorasinformaticas 10.816 visualizaciones hace 2 años 12 minutos y 16 segundos</h3>	cm44dpusc001bevugni7fizhr	2024-11-30 16:20:45.468	2024-12-04 15:23:45.179
cm44dpus90018evug683ecfvf	Curso Angular. Login II. Vídeo 39 de pildorasinformaticas 15.559 visualizaciones hace 2 años 12 minutos y 16 segundos	12.16	angular-39_oyohsv.mp4	<h3>Curso Angular. Login II. Vídeo 39 de pildorasinformaticas 15.559 visualizaciones hace 2 años 12 minutos y 16 segundos</h3>	cm44dpus8000pevugm2pzm3jx	2024-11-30 16:20:45.465	2024-12-04 15:23:45.179
cm44dpusc001eevugi7uz0lks	Curso Angular. Login VI. Links login y logout. Vídeo 43 de pildorasinformaticas 8135 visualizaciones hace 2 años 23 minutos	23.38	angular-43_glnnlc.mp4	<h3>Curso Angular. Login VI. Links login y logout. Vídeo 43 de pildorasinformaticas 8135 visualizaciones hace 2 años 23 minutos</h3>	cm44dpusc001bevugni7fizhr	2024-11-30 16:20:45.468	2024-12-04 15:23:45.179
cm44dpus90017evug92f355io	Curso Angular. Login I. Vídeo 38 de pildorasinformaticas 27.342 visualizaciones hace 2 años 9 minutos y 16 segundos	9.16	angular-38_vlixgk.mp4	<h3>Curso Angular. Login I. Vídeo 38 de pildorasinformaticas 27.342 visualizaciones hace 2 años 9 minutos y 16 segundos</h3>	cm44dpus8000pevugm2pzm3jx	2024-11-30 16:20:45.465	2024-12-04 15:23:45.179
cm44dpusc001devugfhdacmrg	Curso Angular. Login V. Vídeo 42 de pildorasinformaticas 8862 visualizaciones hace 2 años 8 minutos y 54 segundos	8.54	angular-42_ugomgp.mp4	<h3>Curso Angular. Login V. Vídeo 42 de pildorasinformaticas 8862 visualizaciones hace 2 años 8 minutos y 54 segundos</h3>	cm44dpusc001bevugni7fizhr	2024-11-30 16:20:45.468	2024-12-04 15:23:45.179
cm44dtbv3000tevcs80hyrqy7	Curso Django. Envío de mails. Vídeo 24 de pildorasinformaticas 51.727 visualizaciones hace 4 años 17 minutos	17.4	django-24_hicjmu.mp4	<h3>Curso Django. Envío de mails. Vídeo 24 de pildorasinformaticas 51.727 visualizaciones hace 4 años 17 minutos</h3>	cm44dtbv3000pevcscjrehwdu	2024-11-30 16:23:27.568	2024-12-04 15:23:45.179
cm44dtbv3000sevcsltfb7w05	Curso Django. Formularios III. Vídeo 23 de pildorasinformaticas 50.599 visualizaciones hace 4 años 15 minutos	15.22	django-23_qtgg4v.mp4	<h3>Curso Django. Formularios III. Vídeo 23 de pildorasinformaticas 50.599 visualizaciones hace 4 años 15 minutos</h3>	cm44dtbv3000pevcscjrehwdu	2024-11-30 16:23:27.568	2024-12-04 15:23:45.179
cm44dtbv3000uevcsg8ulrpf4	Curso Django. API Forms Vídeo 25 de pildorasinformaticas 55.975 visualizaciones hace 4 años 32 minutos	32.02	django-25_wp2sqg.mp4	<h3>Curso Django. API Forms Vídeo 25 de pildorasinformaticas 55.975 visualizaciones hace 4 años 32 minutos</h3>	cm44dtbv3000pevcscjrehwdu	2024-11-30 16:23:27.568	2024-12-04 15:23:45.179
cm44dtbux000kevcsiwvbw40o	Curso Django. Panel de Administración II. Vídeo 17 de pildorasinformaticas 51.887 visualizaciones hace 4 años 11 minutos y 54 segundos	11.54	django-17_gopida.mp4	<h3>Curso Django. Panel de Administración II. Vídeo 17 de pildorasinformaticas 51.887 visualizaciones hace 4 años 11 minutos y 54 segundos</h3>	cm44dtbux0003evcsfhwhdfbp	2024-11-30 16:23:27.5612024-12-04 15:23:45.179
cm44dtbux000jevcsocjenxye	Curso Django. Panel de Administración I. Vídeo 16 de pildorasinformaticas 73.530 visualizaciones hace 5 años 15 minutos	15.46	django-16_hwbvrz.mp4	<h3>Curso Django. Panel de Administración I. Vídeo 16 de pildorasinformaticas 73.530 visualizaciones hace 5 años 15 minutos</h3>	cm44dtbux0003evcsfhwhdfbp	2024-11-30 16:23:27.561	2024-12-04 15:23:45.179
cm44dtbv3000wevcslls3rdei	Curso Django. Proyecto web completo II. Vídeo 27 de pildorasinformaticas 61.056 visualizaciones hace 4 años 12 minutos y 29 segundos	12.29	django-27_yrr2v0.mp4	<h3>Curso Django. Proyecto web completo II. Vídeo 27 de pildorasinformaticas 61.056 visualizaciones hace 4 años 12 minutos y 29 segundos</h3>	cm44dtbv3000pevcscjrehwdu	2024-11-30 16:23:27.5682024-12-04 15:23:45.179
cm44dtbv3000zevcsj6ue8c2g	Curso Django. Proyecto web completo V. Vídeo 30 de pildorasinformaticas 56.701 visualizaciones hace 4 años 19 minutos	19.37	django-30_vo2dgr.mp4	<h3>Curso Django. Proyecto web completo V. Vídeo 30 de pildorasinformaticas 56.701 visualizaciones hace 4 años 19 minutos</h3>	cm44dtbv3000pevcscjrehwdu	2024-11-30 16:23:27.568	2024-12-04 15:23:45.179
cm44dtbux000levcsj4uuahea	Curso Django. Panel de Administración III. Vídeo 18 de pildorasinformaticas 44.853 visualizaciones hace 4 años 13 minutos y 16 segundos	13.16	django-18_ehjcrc.mp4	<h3>Curso Django. Panel de Administración III. Vídeo 18 de pildorasinformaticas 44.853 visualizaciones hace 4 años 13 minutos y 16 segundos</h3>	cm44dtbux0003evcsfhwhdfbp	2024-11-30 16:23:27.561	2024-12-04 15:23:45.18
cm44dtbv8001nevcsc6v9mn4p	Curso Django. Proyecto web completo XXVII. Vídeo 52 de pildorasinformaticas 18.844 visualizaciones hace 3 años 16 minutos	16.33	django-52_krhtih.mp4	<h3>Curso Django. Proyecto web completo XXVII. Vídeo 52 de pildorasinformaticas 18.844 visualizaciones hace 3 años 16 minutos</h3>	cm44dtbv8001bevcsrzplq638	2024-11-30 16:23:27.572	2024-12-04 15:23:45.179
cm44dtbv8001fevcs99k819f4	Curso Django. Proyecto web completo XIX. Vídeo 44 de pildorasinformaticas 20.739 visualizaciones hace 3 años 22 minutos	22.19	django-44_cftxip.mp4	<h3>Curso Django. Proyecto web completo XIX. Vídeo 44 de pildorasinformaticas 20.739 visualizaciones hace 3 años 22 minutos</h3>	cm44dtbv8001bevcsrzplq638	2024-11-30 16:23:27.572	2024-12-04 15:23:45.179
cm44dtbv8001sevcsuwv7iu6p	Curso Django. Proyecto web completo XXII. Vídeo 57 de pildorasinformaticas 19.339 visualizaciones hace 3 años 10 minutos y 54 segundos	10.54	django-57_wucvdo.mp4	<h3>Curso Django. Proyecto web completo XXII. Vídeo 57 de pildorasinformaticas 19.339 visualizaciones hace 3 años 10 minutos y 54 segundos</h3>	cm44dtbv8001bevcsrzplq638	2024-11-30 16:23:27.5722024-12-04 15:23:45.179
cm44dtbv8001gevcs35c0sqiv	Curso Django. Proyecto web completo XX. Vídeo 45 de pildorasinformaticas 21.782 visualizaciones hace 3 años 20 minutos	20.02	django-45_x4ps3u.mp4	<h3>Curso Django. Proyecto web completo XX. Vídeo 45 de pildorasinformaticas 21.782 visualizaciones hace 3 años 20 minutos</h3>	cm44dtbv8001bevcsrzplq638	2024-11-30 16:23:27.572	2024-12-04 15:23:45.179
cm44dtbv8001revcs1oet9kjp	Curso Django. Proyecto web completo XXI. Vídeo 56 de pildorasinformaticas 19.003 visualizaciones hace 3 años 20 minutos	20.5	django-56_cch80h.mp4	<h3>Curso Django. Proyecto web completo XXI. Vídeo 56 de pildorasinformaticas 19.003 visualizaciones hace 3 años 20 minutos</h3>	cm44dtbv8001bevcsrzplq638	2024-11-30 16:23:27.572	2024-12-04 15:23:45.179
cm44dtbv8001oevcszc28gknw	Curso Django. Proyecto web completo XXVIII. Vídeo 53 de pildorasinformaticas 19.631 visualizaciones hace 3 años 15 minutos	15.19	django-53_qe5vhz.mp4	<h3>Curso Django. Proyecto web completo XXVIII. Vídeo 53 de pildorasinformaticas 19.631 visualizaciones hace 3 años 15 minutos</h3>	cm44dtbv8001bevcsrzplq638	2024-11-30 16:23:27.572	2024-12-04 15:23:45.179
\.


--
-- Data for Name: ratings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ratings (id, rating, comment, user_id, course_id, "createdAt", "updatedAt") FROM stdin;
cm4g00h1e0001jqgdjhpsdnbl	3.5	Curso muy completo tocando temas de bajo nivel como: el manejo de la memoria, referencias y punteros.	cm3p0gqr7000292pn6sirtw06	cm44dgkig0001evo01ztw5oqb	2024-12-08 19:30:20.355	2025-02-08 19:15:36.524
\.


--
-- Data for Name: units; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.units (id, title, course_id, "createdAt", "updatedAt") FROM stdin;
cm44dgkip0003evo0vf5ht9qd	Unidad 1	cm44dgkig0001evo01ztw5oqb	2024-11-30 16:13:32.258	2024-11-30 16:13:32.258
cm44dgkjc000pevo0raen3zme	Unidad 2	cm44dgkig0001evo01ztw5oqb	2024-11-30 16:13:32.28	2024-11-30 16:13:32.28
cm44dgkjm001bevo0riwu6jzy	Unidad 3	cm44dgkig0001evo01ztw5oqb	2024-11-30 16:13:32.29	2024-11-30 16:13:32.29
cm44dgkjr001xevo0xskvi990	Unidad 4	cm44dgkig0001evo01ztw5oqb	2024-11-30 16:13:32.295	2024-11-30 16:13:32.295
cm44dpus30003evugcwn3zx9l	Unidad 1	cm44dpurx0001evug6imnm4e5	2024-11-30 16:20:45.459	2024-11-30 16:20:45.459
cm44dpus8000pevugm2pzm3jx	Unidad 2	cm44dpurx0001evug6imnm4e5	2024-11-30 16:20:45.465	2024-11-30 16:20:45.465
cm44dpusc001bevugni7fizhr	Unidad 3	cm44dpurx0001evug6imnm4e5	2024-11-30 16:20:45.468	2024-11-30 16:20:45.468
cm44dtbux0003evcsfhwhdfbp	Unidad 1	cm44dtbus0001evcsj57fhlmv	2024-11-30 16:23:27.561	2024-11-30 16:23:27.561
cm44dtbv3000pevcscjrehwdu	Unidad 2	cm44dtbus0001evcsj57fhlmv	2024-11-30 16:23:27.568	2024-11-30 16:23:27.568
cm44dtbv8001bevcsrzplq638	Unidad 3	cm44dtbus0001evcsj57fhlmv	2024-11-30 16:23:27.572	2024-11-30 16:23:27.572
cm44dtbvb001xevcsx80zh22s	Unidad 4	cm44dtbus0001evcsj57fhlmv	2024-11-30 16:23:27.576	2024-11-30 16:23:27.576
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, first_name, last_name, email, password, subscription_id, role, title, github, website, linkedin, "createdAt", "updatedAt", avatar) FROM stdin;
cm3p0fbti000092pnuaseg0oe	Admin	Admin	admin@admin.com	$2b$10$6GEraF5zTcx8WO7O9m3z7eDOnekJaeU148qi/WTLxY6enyDi2sJCm	\N	admin	\N	\N	\N	\N	2024-11-19 22:12:06.678	2024-11-19 22:12:06.678	\N
cm3p0gf1f000192pnrvpzzqud	Juan	Díaz	juan@juan.com	$2b$10$6JzQcPqCc.LzElT.fzdJl.Ekug4UjZsUlya.053tyOuVUTPpLau7G	\N	instructor	Creador del canal pildorasinformaticas y portal de formación con el mismo nombre	\N	https://www.pildorasinformaticas.es/	https://www.linkedin.com/in/juan-d-11328824	2024-11-19 22:12:57.507	2024-12-04 19:48:42.394	1517068446530-1733092272741-1733341721160.jpg
cm3p0gqr7000292pn6sirtw06	Pablo	Suárez	pablo@pablo.com	$2b$10$yLYOybzCuJ3vx8zskKQXjeVAgPNlcvof4j/9g6HcfAktkvebb8cBW	sub_1QQtcbCPIqfW5pHV5SF6O7B0	user	Técnico Superior en Desarrollo de Aplicaciones Multiplataforma	https://github.com/psuarezdev	https://psuarez.pages.dev/	https://www.linkedin.com/in/pablosuarezbm/	2024-11-19 22:13:12.692	2024-12-05 17:09:46.038	canarias_skills2-1733594607007.jpg
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

CREATE UNIQUE INDEX "users_subscriptionId_key" ON public.users USING btree (subscription_id);


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
