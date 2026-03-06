import { Injectable } from '@nestjs/common';
import { HttpClientService } from '../../../core/services/http-client.service';
import { C_MEDIA } from '../constants/media.const';
import { C_MSG91 } from '../constants/msg91.const';
import { IEmail } from '../models/email.model';

export abstract class IEmailService {
  abstract sendEmail(email: IEmail): any;
}

@Injectable()
export class Msg91EmailService implements IEmailService {
  constructor(private readonly httpClient: HttpClientService) { }

  async sendEmail(email: IEmail) {
    const payload = {
      domain: C_MEDIA.DOMAIN_EMAIL,
      from: {
        name: C_MEDIA.SENDER_NAME,
        email: C_MEDIA.SENDER_EMAIL,
      },
      template_id: email.templateId,
      recipients: [
        {
          to: email.to,
          variables: {
            VAR_SENDER_NAME: C_MEDIA.SENDER_NAME,
            VAR_OTP: email.otp,
            VAR_OTP_EXP_MINS: email.otpExpMins,
          },
        },
      ],
      reply_to: [
        {
          email: C_MEDIA.SENDER_EMAIL
        }
      ]
    };

    return this.httpClient.request({
      method: 'POST',
      url: C_MSG91.EMAIL.API,
      headers: {
        authkey: C_MSG91.AUTH_KEY,
        'Content-Type': 'application/json',
      },
      data: payload,
    });
  }
}
