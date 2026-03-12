import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { CoreModule } from './core/core.module';
import { RequestContextMiddleware } from './core/middlewares/request-context.middleware';
import { DbFileLogger } from './core/services/db-file.logger';
import { DbNamingStrategy } from './core/services/db-naming-strategy';
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
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      cache: true,
      expandVariables: true,
    }),
    ServeStaticModule.forRoot(
      {
        rootPath: join(__dirname, 'assets'),
        exclude: ['/api/(.*)'],
      },
      {
        rootPath: process.env.META_PATH,
        serveRoot: '/internal/meta',
      }
    ),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule, CoreModule], // CoreModule MUST be here
      inject: [ConfigService, DbNamingStrategy, DbFileLogger],
      useFactory: (
        config: ConfigService,
        naming: DbNamingStrategy,
        dbLogger: DbFileLogger // Injected instance
      ) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASS'),
        database: config.get<string>('DB_NAME'),
        ssl: { rejectUnauthorized: false },

        autoLoadEntities: true,
        namingStrategy: naming, // Use the injected naming strategy
        logger: dbLogger,      // Use the injected logger

        logging: true,
        synchronize: config.get('NODE_ENV') === 'test',
      }),
    }),

    // Others
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
      .forRoutes('*');
  }
}


// TypeOrmModule.forRootAsync({
//   imports: [ConfigModule],
//   // Combine all injections into one array
//   inject: [ConfigService, PinoLogger],
//   useFactory: (configService: ConfigService, pino: PinoLogger) => {
//     // Define environment variables INSIDE the factory function
//     const nodeEnv = configService.get<string>('NODE_ENV') || 'development';
//     const isTest = nodeEnv === 'test';
//     return {
//       type: 'postgres',
//       host: configService.get<string>('DB_HOST'),
//       port: configService.get<number>('DB_PORT'),
//       username: configService.get<string>('DB_USER'),
//       password: configService.get<string>('DB_PASS'),
//       database: configService.get<string>('DB_NAME'),
//       // Managed DBs usually require SSL
//       ssl: {
//         rejectUnauthorized: false,
//       },

//       autoLoadEntities: true,
//       namingStrategy: new DbNamingStrategy(),

//       // Paths relative to the compiled dist folder
//       entities: [join(__dirname, '..', '**', '*.entity{.ts,.js}')],
//       migrations: [join(__dirname, '..', 'database', 'migrations', '*{.ts,.js}')],

//       migrationsRun: !isTest,
//       migrationsTransactionMode: 'all',
//       synchronize: isTest, // Dangerous in production; only use in test/dev

//       logging: true,
//       logger: new DbFileLogger(pino), // Use the injected pino instance here
//     };
//   },
// }),

// TypeOrmModule.forRootAsync({
//   imports: [ConfigModule],
//   inject: [ConfigService, PinoLogger],
//   useFactory: async (configService: ConfigService, pino: PinoLogger) => {
//     const host = configService.get<string>('DB_HOST') || process.env.DB_HOST;
//     if (!host) {
//       throw new Error('❌ CRITICAL: DB_HOST is undefined in both ConfigService and process.env');
//     }
//     const dbConfig = new DbConfigService(configService, pino);
//     const options = dbConfig.createTypeOrmOptions();
//     return { ...options, host };
//   },
// }),

// envFilePath: join(process.cwd(), 'environments', `.env.${process.env.NODE_ENV || 'development'}`),
// envFilePath: path.resolve(process.cwd(), 'environments', `.env.${process.env.NODE_ENV || 'development'}`),