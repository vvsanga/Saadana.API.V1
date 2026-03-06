// src/core/configs/swagger.config.ts

export const SWAGGER_CONFIG = {
  title: process.env.SWAGGER_TITLE || 'Saadana API',
  description: 
    process.env.SWAGGER_DESCRIPTION || 
    'The Saadana API documentation. Modular monolith architecture designed for microservice decomposition.',
  version: process.env.SWAGGER_VERSION || '1.0',
  path: process.env.SWAGGER_PATH || 'api/docs',
  contact: {
    name: 'Saadana Support',
    url: 'https://saadana.com',
    email: 'support@saadana.com',
  },
};