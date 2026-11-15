import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('PG_POOL')
    private readonly pool: Pool,
  ) {}
}
