import { Module, OnApplicationShutdown, Inject } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Pool } from 'pg';

// implementar para que al apagar se cierre la conexion a postgres
class DatabaseShutdown implements OnApplicationShutdown {
  constructor(@Inject('PG_POOL') private readonly pool: Pool) {}

  async onApplicationShutdown() {
    await this.pool.end();
    console.log('Conexion a postgresql cerrada');
  }
}

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'PG_POOL',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return new Pool({
          connectionString: configService.get<string>('DATABASE_URL'),
        });
      },
    },
    DatabaseShutdown,
  ],
  exports: ['PG_POOL'],
})
export class DatabaseModule {}
