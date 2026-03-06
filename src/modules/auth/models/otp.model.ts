import { TChannel, TOtpType } from "../constants/otp.const";

export interface IIssueOtp {
  type: TOtpType;
  channel: TChannel;
  identifier: string;
}

export interface IValidateOtp {
  type: TOtpType;
  channel: TChannel;
  identifier: string;
  otp: string;
}