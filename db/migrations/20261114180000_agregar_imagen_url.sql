
-- migrate:up
ALTER TABLE public.products
ADD COLUMN IF NOT EXISTS imagen_url TEXT;

-- migrate:down
ALTER TABLE public.products
DROP COLUMN IF EXISTS imagen_url;
