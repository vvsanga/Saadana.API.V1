// src/core/utils/swagger.util.ts
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import { SWAGGER_CONFIG } from '../configs/swagger.config';

export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle(SWAGGER_CONFIG.title)
    .setDescription(SWAGGER_CONFIG.description)
    .setVersion(SWAGGER_CONFIG.version)
    .setContact(SWAGGER_CONFIG.contact.name, SWAGGER_CONFIG.contact.url, SWAGGER_CONFIG.contact.email)
    .addTag('Authentication', 'Identity and Access Management')
    .addTag('Users', 'User profile and settings')

    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();

  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,   // Keeps token on refresh
      filter: true,                // Search box
      displayRequestDuration: true, // Benchmarking
      docExpansion: 'none',        // Collapsed by default
      tagsSorter: 'alpha',         // Alphabetical categories
      operationsSorter: 'alpha',   // Alphabetical endpoints
    },
    customSiteTitle: `${SWAGGER_CONFIG.title} Documentation`,
    customfavIcon: '/favicon.ico',
    // Merged CSS from your earlier version for a cleaner UI
    customCss: `
      .swagger-ui .topbar { display: none; } 
      .swagger-ui .footer { display: none !important; }
      .swagger-ui .opblock-summary-path { font-weight: bold; }
    `,
  };

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(SWAGGER_CONFIG.path, app, document, customOptions);
}
