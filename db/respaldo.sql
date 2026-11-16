--
-- PostgreSQL database dump
--

\restrict HljNWSXNccnnUFbLuURCgoC1VvOEEj4Ve1z2vHfuqJ9xnnloN36Thftd4QBgXva

-- Dumped from database version 18.7
-- Dumped by pg_dump version 18.7

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id uuid NOT NULL,
    nombre character varying(50) NOT NULL,
    descripcion character varying(200),
    categoria character varying(50),
    precio numeric,
    stock integer,
    marca character varying(50),
    fecha_alta timestamp with time zone,
    ultima_actualizacion time with time zone
);


ALTER TABLE public.products OWNER TO postgres;

--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (id, nombre, descripcion, categoria, precio, stock, marca, fecha_alta, ultima_actualizacion) FROM stdin;
\.


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

\unrestrict HljNWSXNccnnUFbLuURCgoC1VvOEEj4Ve1z2vHfuqJ9xnnloN36Thftd4QBgXva

