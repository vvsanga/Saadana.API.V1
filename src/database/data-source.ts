import { config } from 'dotenv';
import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { DbNamingStrategy } from '../core/services/db-naming-strategy';

const nodeEnv = process.env.NODE_ENV || 'development';
config({ path: join(process.cwd(), 'environments', `.env.${nodeEnv}`) });

export const getDataSourceOptions = (): DataSourceOptions => {
  const isProd = nodeEnv === 'production';
  const isTest = nodeEnv === 'test';
  const isDev = nodeEnv === 'development';

  const rootDir = isDev ? 'src' : 'dist';
  const fileExt = isDev ? 'ts' : 'js';

  return {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    namingStrategy: new DbNamingStrategy(),
    entities: [
      join(process.cwd(), `${rootDir}/**/*.entity.${fileExt}`),
    ],
    migrations: [
      join(process.cwd(), `${rootDir}/database/migrations/*.${fileExt}`),
    ],
    synchronize: isTest,
    migrationsRun: !isTest,
    migrationsTransactionMode: 'all',
    logging: !isProd ? ['query', 'error', 'schema'] : ['error'],
    ssl: {
      rejectUnauthorized: false,
    },
    extra: {
      max: 20,
    },
  };
};

const dataSource = new DataSource(getDataSourceOptions());
export default dataSource;

// ssl: isProd
//   ? { rejectUnauthorized: false }
//   : false,
