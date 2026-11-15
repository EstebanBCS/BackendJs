export const up = (pgm) => {
  pgm.addColumn('products', {
    activo: {
      type: 'boolean',
      notNull: true,
      default: true,
    },
  });
};

export const down = (pgm) => {
  pgm.dropColumn('products', 'activo');
};
