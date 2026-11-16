export const up = (pgm) => {
  pgm.createTable('products', {
    id: {
      type: 'uuid',
      primaryKey: true,
      default: pgm.func('gen_random_uuid()'),
    },
    nombre: {
      type: 'varchar(50)',
      notNull: true,
    },
    descripcion: {
      type: 'varchar(200)',
    },
    categoria: {
      type: 'varchar(50)',
    },
    precio: {
      type: 'numeric',
    },
    stock: {
      type: 'integer',
    },
    marca: {
      type: 'varchar(50)',
    },
    fecha_alta: {
      type: 'timestamptz',
    },
    ultima_actualizacion: {
      type: 'timestamptz',
    },
  });
};

export const down = (pgm) => {
  pgm.dropTable('products');
};
