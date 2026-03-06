import { Global, Module, OnApplicationShutdown, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule as PinoModule } from 'nestjs-pino';
import { LogDeviceController } from './controllers/log-device.controller';
import { LogErrorController } from './controllers/log-error.controller';
import { LogRequestController } from './controllers/log-request.controller';
import { LogResponseController } from './controllers/log-response.controller';
import { LogDevice } from './entities/log-device.entity';
import { LogError } from './entities/log-error.entity';
import { LogRequest } from './entities/log-request.entity';
import { LogResponse } from './entities/log-response.entity';
import { LogRepository } from './repositories/log.repository';
import { ExceptionParser } from './services/exception-parser';
import { LogDeviceService } from './services/log-device.service';
import { LogErrorService } from './services/log-error.service';
import { LogRequestService } from './services/log-request.service';
import { LogResponseService } from './services/log-response.service';
import { LoggerService } from './services/logger.service';
import { getLogDestination } from './utils/log.util';

@Global()
@Module({
    imports: [
        TypeOrmModule.forFeature([LogRequest, LogResponse, LogError, LogDevice]),
        PinoModule.forRoot({
            pinoHttp: {

                // 1. Basic Metadata Stripping
                base: undefined,
                messageKey: 'msg',

                // 2. Prevent the bulky Request/Response objects from being attached
                serializers: {
                    req: () => undefined,
                    res: () => undefined,
                    err: () => undefined,
                },

                quietReqLogger: false,
                autoLogging: false,
                timestamp: false,

                transport: {
                    targets: [
                        {
                            // MUST be pino-pretty to support messageFormat and ignore
                            target: 'pino-pretty',
                            options: {
                                destination: getLogDestination(),
                                mkdir: true,
                                colorize: false,
                                singleLine: true,
                                // Tells pino-pretty to extract ONLY your pipe-string
                                messageFormat: '{msg}',
                                // Tells pino-pretty to suppress the JSON metadata keys
                                ignore: 'time,level,hostname,pid,req,res,context,reqId,type',
                            },
                        }
                    ]
                }
            }
        }),
    ],
    providers: [
        ExceptionParser,
        LoggerService,
        LogRepository,
        LogDeviceService,
        LogRequestService,
        LogResponseService,
        LogErrorService,
    ],
    controllers: [
        LogRequestController,
        LogResponseController,
        LogErrorController,
        LogDeviceController
    ],
    exports: [LoggerService],
})
export class LoggerModule implements OnModuleInit, OnApplicationShutdown {
    constructor(private readonly logger: LoggerService) { }

    onModuleInit() {
        this.logger.log('API service is starting up...', 'App Start');
        this.logger.console('API service is starting up...', 'App Start');
    }

    onApplicationShutdown(signal?: string) {
        this.logger.log(`API service is shutting down...`, 'App Stop');
        this.logger.console(`API service is shutting down...`, 'App Stop');
    }
}



// {
//     target: 'pino/file',
//     options: {
//         destination: getLogDestination(),
//         mkdir: true,
//         colorize: false,
//         singleLine: true,

//         // 3. THE "PURE TEXT" ENGINE: 
//         // This tells Pino: "Just print the 'msg' text (your pipe string)"
//         messageFormat: '{msg}',

//         // 4. THE CLEANER: 
//         // We explicitly tell pino-pretty to HIDE these internal keys
//         ignore: 'time,level,hostname,pid,req,res,context,reqId,type',
//     }
// }
