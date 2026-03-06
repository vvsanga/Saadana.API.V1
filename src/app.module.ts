import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
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
      cache: true,
      expandVariables: true,
      envFilePath: join(process.cwd(), 'environments', `.env.${process.env.NODE_ENV || 'development'}`),
    }),

    // 2. Static Files
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public'),
      exclude: ['/api/(.*)'],
    }),

    // 3. Database with Injected Config
    TypeOrmModule.forRootAsync({
      useClass: DbConfigService,
    }),

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

// envFilePath: path.resolve(process.cwd(), 'environments', `.env.${process.env.NODE_ENV || 'development'}`),