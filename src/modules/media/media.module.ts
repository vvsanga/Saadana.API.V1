import { Module } from '@nestjs/common';
import { IEmailService, Msg91EmailService } from "./services/msg91-email.service";
import { ISmsService, Msg91SmsService } from './services/msg91-sms.service';

@Module({
    providers: [
        {
            provide: IEmailService,
            useClass: Msg91EmailService,
        },
        {
            provide: ISmsService,
            useClass: Msg91SmsService,
        }
    ],
    exports: [
        IEmailService,
        ISmsService
    ],
})
export class MediaModule { }
