import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Pool } from 'pg';
@Injectable()
export class AppService implements OnModuleInit {
  constructor(@Inject('PG_POOL') private readonly pool: Pool) {}

  async onModuleInit() {
    const result = await this.pool.query('SELECT NOW () AS fecha ');

    console.log('Conexion a la Base de datos Postgre Exitosa:', result.rows[0]);
  }

  getHello(): string {
    return 'Backend Funcionando';
  }
}
