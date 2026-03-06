import { Controller, Get, Redirect } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController() // Hides this from Swagger itself
@Controller()
export class AppController {
  @Get()
  @Redirect('/api/docs', 302) // Redirects root to your Swagger path
  root() {}
}
