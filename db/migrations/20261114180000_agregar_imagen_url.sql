-- migrate:up
ALTER TABLE public.products
ADD COLUMN imagen_url TEXT;

-- migrate:down
ALTER TABLE public.products
DROP COLUMN imagen_url;