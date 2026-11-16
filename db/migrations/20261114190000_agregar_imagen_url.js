export const up = (pgm) => {
  pgm.sql(`
    ALTER TABLE public.products
    ADD COLUMN IF NOT EXISTS imagen_url TEXT;
  `);
};

export const down = (pgm) => {
  pgm.sql(`
    ALTER TABLE public.products
    DROP COLUMN IF EXISTS imagen_url;
  `);
};
