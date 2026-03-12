import { ForbiddenException } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from '../../modules/logger/services/logger.service';

export const getCorsOptions = (
  configService: ConfigService,
  logger: LoggerService
): CorsOptions => {
  const envOrigins = configService.get<string>('ALLOWED_ORIGINS') || '';
 const whitelist = [
    ...envOrigins.split(',').map((o) => o.trim()).filter(o => o !== ''),
    'http://localhost',       // Android Production
    'http://localhost:8100',  // Ionic/Angular Development
    'capacitor://localhost',  // iOS Production
  ];

  return {
    origin: (origin, callback) => {
      // 1. Allow if no origin (Mobile Native/Server-to-Server) 
      // 2. Allow if origin is in our whitelist
      if (!origin || whitelist.includes(origin)) {
        callback(null, true);
      } else {
        // LOG THE UNAUTHORIZED ATTEMPT
        const errorMessage = `CORS Blocked: Unauthorized access attempt from Origin: ${origin}`;

        // Use your custom logger service
        logger.log(errorMessage, 'CorsConfig');

        callback(new ForbiddenException(errorMessage));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-App-Secret'],
  };
};
