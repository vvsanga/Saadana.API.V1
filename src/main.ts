import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';
import { getCorsOptions } from './core/configs/cors.config';
import { setupSwagger } from './core/utils/swagger.util';
import { LoggerService } from './modules/logger/services/logger.service';

async function bootstrap() {

  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  const logger = app.get(LoggerService);
  const config = app.get(ConfigService);

  app.useLogger(app.get(Logger));
  app.enableShutdownHooks();
  app.enableCors(getCorsOptions(config, logger));

  if (process.env.SWAGGER_FOR_PROD === 'true' || process.env.NODE_ENV !== 'production') {
    setupSwagger(app);
  }

  const port = process.env.API_PORT ?? 3000;
  await app.listen(port, '0.0.0.0');

  logger.console(`🚀 API running on http://localhost:${port}/`, 'Bootstrap');
  logger.console(`📝 Docs running on http://localhost:${port}/api/docs`, 'Bootstrap');
}
bootstrap();
