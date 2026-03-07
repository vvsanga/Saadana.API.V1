import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PinoLogger } from 'nestjs-pino';
import { join } from 'path';
import { CoreModule } from './core/core.module';
import { RequestContextMiddleware } from './core/middlewares/request-context.middleware';
import { DbConfigService } from './core/services/db-config.service';
import { AcademicsModule } from './modules/academic/academics.module';
import { AuthModule } from './modules/auth/auth.module';
import { ExamsModule } from './modules/exam/exams.module';
import { InfraModule } from './modules/infra/infra.module';
import { MetaModule } from './modules/meta/meta.module';
import { OrdersModule } from './modules/orders/orders.module';
import { SecurityModule } from './modules/security/security.module';
import { UsersModule } from './modules/user/users.module';

@Module({
  imports: [
    // 1. Environmental Configuration with Validation
    ConfigModule.forRoot({
  isGlobal: true,
  // This allows Nest to load the .env file if it exists (local dev),
  // but it will NOT crash if the file is missing (Docker), 
  // and it will still pull from process.env (Docker's injected variables).
  envFilePath: ['.env'], 
  cache: true,
  expandVariables: true,
}),

    // 2. Static Files
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public'),
      exclude: ['/api/(.*)'],
    }),

    // 3. Database with Injected Config
    TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService, PinoLogger],
  useFactory: async (configService: ConfigService, pino: PinoLogger) => {
    // If it's still undefined here, we fallback to the raw process.env
    const host = configService.get<string>('DB_HOST') || process.env.DB_HOST;
    
    if (!host) {
      throw new Error('❌ CRITICAL: DB_HOST is undefined in both ConfigService and process.env');
    }

    const dbConfig = new DbConfigService(configService, pino);
    const options = dbConfig.createTypeOrmOptions();
    
    // Explicitly override the host to ensure the value from process.env is used
    return { ...options, host };
  },
}),
    // TypeOrmModule.forRootAsync({
    //   useClass: DbConfigService,
    // }),

    // 4. Feature and Infrastructure Modules
    CoreModule,
    SecurityModule,
    InfraModule,
    UsersModule,
    AuthModule,
    AcademicsModule,
    ExamsModule,
    OrdersModule,
    MetaModule
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RequestContextMiddleware)
      .exclude(
        { path: 'health', method: RequestMethod.GET },
        { path: 'metrics', method: RequestMethod.GET },
        'auth/(.*)', // Example: exclude auth routes if needed
      )
      .forRoutes('*');
  }
}

// envFilePath: join(process.cwd(), 'environments', `.env.${process.env.NODE_ENV || 'development'}`),
// envFilePath: path.resolve(process.cwd(), 'environments', `.env.${process.env.NODE_ENV || 'development'}`),