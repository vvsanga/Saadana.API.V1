import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { PinoLogger } from 'nestjs-pino';
import { join } from 'path';
import { DbFileLogger } from './db-file.logger';
import { DbNamingStrategy } from './db-naming-strategy';

@Injectable()
export class DbConfigService implements TypeOrmOptionsFactory {
    constructor(
        private readonly configService: ConfigService,
        private readonly pino: PinoLogger,
    ) { }

    createTypeOrmOptions(): TypeOrmModuleOptions {
        const nodeEnv = this.configService.get<string>('NODE_ENV') || 'development';
        const isProd = nodeEnv === 'production';
        const isTest = nodeEnv === 'test';
        const isDev = nodeEnv === 'development';

        return {
            type: 'postgres',
            host: this.configService.get<string>('DB_HOST'),
            port: this.configService.get<number>('DB_PORT'),
            username: this.configService.get<string>('DB_USER'),
            password: this.configService.get<string>('DB_PASS'),
            database: this.configService.get<string>('DB_NAME'),

            // Automatic Entity & Migration Discovery
            autoLoadEntities: true,
            namingStrategy: new DbNamingStrategy(),
            entities: [join(__dirname, '..', '**', '*.entity{.ts,.js}')],
            migrations: [join(__dirname, '..', 'database', 'migrations', '*{.ts,.js}')],

            // Migration & Sync Settings
            migrationsRun: !isTest,
            migrationsTransactionMode: 'all',
            synchronize: isTest,

            // --- SILENT LOGGING ARRANGEMENT ---
            // We enable logging so TypeORM produces events, 
            // but we use our Custom Logger to pipe them to the file only.
            logging: true,
            logger: new DbFileLogger(this.pino),
            // ----------------------------------

            // ssl: {
            //     rejectUnauthorized: false,
            // },
            ssl: isProd ? { rejectUnauthorized: false } : false,

            // Connection Pool & Timeouts
            connectTimeoutMS: 10000,
            extra: {
                max: 20, // Connection pool size
            },
        };
    }
}

// @Injectable()
// export class DbConfigService implements TypeOrmOptionsFactory {
//     constructor(private readonly configService: ConfigService) { }

//     createTypeOrmOptions(): TypeOrmModuleOptions {
//         const nodeEnv = this.configService.get<string>('NODE_ENV') || 'development';
//         const isProd = nodeEnv === 'production';
//         const isTest = nodeEnv === 'test';
//         const isDev = nodeEnv === 'development';
//         const rootDir = isDev ? 'src' : 'dist';
//         const fileExt = isDev ? 'ts' : 'js';

//         return {
//             type: 'postgres',
//             host: this.configService.get<string>('DB_HOST'),
//             port: this.configService.get<number>('DB_PORT'),
//             username: this.configService.get<string>('DB_USER'),
//             password: this.configService.get<string>('DB_PASS'),
//             database: this.configService.get<string>('DB_NAME'),
//             autoLoadEntities: true,
//             namingStrategy: new SnakeNamingStrategy(),
//             entities: [join(__dirname, '..', '**', '*.entity{.ts,.js}')],
//             migrations: [join(__dirname, '..', 'database', 'migrations', '*{.ts,.js}')],
//             migrationsRun: !isTest,
//             migrationsTransactionMode: 'all',
//             synchronize: isTest,
//             logging: !isProd ? ['query', 'error', 'schema'] : ['error'],
//             ssl: {
//                 rejectUnauthorized: false,
//             },
//             connectTimeoutMS: 10000,
//             extra: {
//                 max: 20,
//             },
//         };
//     }
// }
