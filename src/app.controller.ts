import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service.js';
import { Pool } from 'pg';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('PG_POOL') private readonly pool: Pool,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // endpoint health para ver si funciona correctamente + probar la conexion a postgres
  @Get('health')
  async checkHealth() {
    try {
      await this.pool.query('SELECT 1');

      return {
        status: 'ok',
        database: 'conectado',
      };
    } catch {
      return {
        status: 'error',
        database: 'desconectado',
      };
    }
  }
}
