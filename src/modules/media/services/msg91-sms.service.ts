import { Injectable } from '@nestjs/common';
import { HttpClientService } from '../../../core/services/http-client.service';
import { C_MSG91 } from '../constants/msg91.const';
import { ISms } from '../models/sms.model';

export abstract class ISmsService {
  abstract sendOtp(sms: ISms): any;
}

@Injectable()
export class Msg91SmsService implements ISmsService {
  constructor(private readonly http: HttpClientService) { }

  async sendOtp(sms: ISms) {
    return this.http.request({
      method: 'POST',
      url: C_MSG91.SMS.API,
      headers: {
        authkey: C_MSG91.AUTH_KEY,
        'Content-Type': 'application/json',
      },
      data: {
        template_id: C_MSG91.SMS.OTP_TMPL_ID,
        recipients: [
          {
            mobiles: sms.phone,
            // VAR_SENDER_NAME: C_COMMUNICATION.SENDER_NAME,
            VAR_OTP: sms.otp,
            VAR_OTP_EXP_MINS: sms.otpExpMins,
          }
        ]
      },
    });
  }
}
