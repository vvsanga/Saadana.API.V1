import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerModule } from '../modules/logger/logger.module';
import { UsersModule } from '../modules/user/users.module';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { DbFileLogger } from './services/db-file.logger';
import { DbNamingStrategy } from './services/db-naming-strategy';
import { HttpClientService } from './services/http-client.service';
import { OwnershipService } from './services/ownership.service';

@Global()
@Module({
    imports: [
        HttpModule.register({ timeout: 5000, maxRedirects: 5 }),
        LoggerModule,
        UsersModule,
    ],
    providers: [
        HttpClientService,
        OwnershipService,
        DbFileLogger,
        DbNamingStrategy,
        { provide: APP_FILTER, useClass: AllExceptionsFilter },
        { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor },
    ],
    exports: [HttpClientService, OwnershipService, DbFileLogger, DbNamingStrategy],
})
export class CoreModule { }
