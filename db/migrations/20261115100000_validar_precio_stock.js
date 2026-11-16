/**
 * @type {import('node-pg-migrate').MigrationBuilder}
 */

export const up = (pgm) => {
  pgm.addConstraint('products', 'products_precio_no_negativo', {
    check: 'precio >= 0',
  });

  pgm.addConstraint('products', 'products_stock_no_negativo', {
    check: 'stock >= 0',
  });
};

export const down = (pgm) => {
  pgm.dropConstraint('products', 'products_precio_no_negativo');
  pgm.dropConstraint('products', 'products_stock_no_negativo');
};
