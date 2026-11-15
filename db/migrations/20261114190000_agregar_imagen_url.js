/**
 * @type {import('node-pg-migrate').MigrationBuilder}
 */

export const up = (pgm) => {
  pgm.addColumn('products', {
    imagen_url: {
      type: 'text',
      notNull: false,
    },
  });
};

export const down = (pgm) => {
  pgm.dropColumn('products', 'imagen_url');
};
