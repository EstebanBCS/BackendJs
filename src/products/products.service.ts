import {
  Inject,
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
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

    try {
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
    } catch (error) {
      if (typeof error === 'object' && error !== null && 'code' in error) {
        const code = error.code;

        if (code === '23505') {
          throw new ConflictException('El producto ya existe.');
        }

        if (['23514', '23502', '22P02'].includes(String(code))) {
          throw new BadRequestException(
            'Los datos del producto no son válidos.',
          );
        }
      }

      throw error;
    }
  }

  // Listar
  async findAll(activo?: string, page?: string, limit?: string) {
    const estado = activo === 'false' ? false : true;

    const pagina = Math.max(1, Number(page) || 1);
    const limite = Math.min(100, Math.max(1, Number(limit) || 10));

    const offset = (pagina - 1) * limite;

    const [result, countResult] = await Promise.all([
      this.pool.query(
        `SELECT *
     FROM public.products
     WHERE activo = $1
     ORDER BY fecha_alta DESC
     LIMIT $2 OFFSET $3`,
        [estado, limite, offset],
      ),
      this.pool.query(
        `SELECT COUNT(*) FROM public.products
      WHERE activo = $1`,
        [estado],
      ),
    ]);

    const total = Number(countResult.rows[0].count);
    const totalPages = Math.ceil(total / limite);

    return {
      data: result.rows,
      meta: {
        total,
        page: pagina,
        limit: limite,
        totalPages,
      },
    };
  }

  // buscar por id
  async findOne(id: string) {
    const result = await this.pool.query(
      'SELECT * FROM public.products WHERE id = $1 AND activo = true',
      [id],
    );

    if (result.rows.length === 0) {
      throw new NotFoundException(
        `No se encontró un producto activo con el ID: ${id}`,
      );
    }

    return result.rows[0];
  }

  // actualizar producto
  async update(id: string, product: UpdateProductDto) {
    const { nombre, descripcion, categoria, precio, stock, marca, imagen_url } =
      product;

    const result = await this.pool.query(
      `UPDATE public.products
     SET
       nombre = CASE WHEN $1 THEN $2 ELSE nombre END,
       descripcion = CASE WHEN $3 THEN $4 ELSE descripcion END,
       categoria = CASE WHEN $5 THEN $6 ELSE categoria END,
       precio = CASE WHEN $7 THEN $8 ELSE precio END,
       stock = CASE WHEN $9 THEN $10 ELSE stock END,
       marca = CASE WHEN $11 THEN $12 ELSE marca END,
       imagen_url = CASE WHEN $13 THEN $14 ELSE imagen_url END,
       ultima_actualizacion = NOW()
     WHERE id = $15
       AND activo = true
     RETURNING *`,
      [
        nombre !== undefined,
        nombre ?? null,
        descripcion !== undefined,
        descripcion ?? null,
        categoria !== undefined,
        categoria ?? null,
        precio !== undefined,
        precio ?? null,
        stock !== undefined,
        stock ?? null,
        marca !== undefined,
        marca ?? null,
        imagen_url !== undefined,
        imagen_url ?? null,
        id,
      ],
    );

    if (result.rows.length === 0) {
      throw new NotFoundException(
        `No se encontró un producto activo con el ID: ${id}`,
      );
    }

    return result.rows[0];
  }

  // borrar producto (desactivarlo)
  async remove(id: string) {
    const result = await this.pool.query(
      `UPDATE public.products
     SET activo = false,
         ultima_actualizacion = NOW()
     WHERE id = $1
       AND activo = true
     RETURNING *`,
      [id],
    );

    if (result.rows.length === 0) {
      throw new NotFoundException(
        `No se encontró un producto activo con el ID: ${id}`,
      );
    }

    return result.rows[0];
  }

  // reactivar producto
  async activate(id: string) {
    const result = await this.pool.query(
      `UPDATE public.products
     SET activo = true,
         ultima_actualizacion = NOW()
     WHERE id = $1
       AND activo = false
     RETURNING *`,
      [id],
    );

    if (result.rows.length === 0) {
      throw new NotFoundException(
        `No se encontró un producto inactivo con el ID: ${id}`,
      );
    }

    return result.rows[0];
  }
}
