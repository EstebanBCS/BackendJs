import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('PG_POOL')
    private readonly pool: Pool,
  ) {}

  async create(product: CreateProductDto) {
    const { nombre, descripcion, categoria, precio, stock, marca, imagen_url } =
      product;

    // crear producto
    const result = await this.pool.query(
      `INSERT INTO public.products (
      id,
      nombre,
      descripcion,
      categoria,
      precio,
      stock,
      marca,
      fecha_alta,
      ultima_actualizacion,
      imagen_url
    )
    VALUES (
      gen_random_uuid(),
      $1, $2, $3, $4, $5, $6,
      NOW(),
      NOW(),
      $7
    )
    RETURNING *`,
      [
        nombre,
        descripcion ?? null,
        categoria ?? null,
        precio,
        stock,
        marca ?? null,
        imagen_url ?? null,
      ],
    );

    return result.rows[0];
  }

  // Listar
  async findAll() {
    const result = await this.pool.query(
      `SELECT *
     FROM public.products
     ORDER BY fecha_alta DESC`,
    );
    return result.rows;
  }

  // buscar por id
  async findOne(id: string) {
    const result = await this.pool.query(
      'SELECT * FROM public.products WHERE id = $1',
      [id],
    );

    return result.rows[0];
  }

  // actualizar producto
  async update(id: string, product: UpdateProductDto) {
    const { nombre, descripcion, categoria, precio, stock, marca, imagen_url } =
      product;

    const result = await this.pool.query(
      `UPDATE public.products
     SET
       nombre = COALESCE($1, nombre),
       descripcion = COALESCE($2, descripcion),
       categoria = COALESCE($3, categoria),
       precio = COALESCE($4, precio),
       stock = COALESCE($5, stock),
       marca = COALESCE($6, marca),
       imagen_url = COALESCE($7, imagen_url),
       ultima_actualizacion = NOW()
     WHERE id = $8
     RETURNING *`,
      [
        nombre ?? null,
        descripcion ?? null,
        categoria ?? null,
        precio ?? null,
        stock ?? null,
        marca ?? null,
        imagen_url ?? null,
        id,
      ],
    );

    return result.rows[0];
  }
}
