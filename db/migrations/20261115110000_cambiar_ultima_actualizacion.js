export const up = (pgm) => {
  pgm.sql(`
    ALTER TABLE public.products
    ALTER COLUMN ultima_actualizacion
    TYPE TIMESTAMPTZ
    USING (
      (CURRENT_DATE + ultima_actualizacion::time)
      AT TIME ZONE 'America/Mazatlan'
    );
  `);
};

export const down = (pgm) => {
  pgm.sql(`
    ALTER TABLE public.products
    ALTER COLUMN ultima_actualizacion
    TYPE TIME WITH TIME ZONE
    USING ultima_actualizacion::time;
  `);
};
