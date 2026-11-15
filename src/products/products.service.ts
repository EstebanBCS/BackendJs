import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { CreateProductDto } from './dto/create-product.dto.js';

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
}
