export const C_AUTH_LEN = {
  OTP: 4
};

export const C_OTP_EXP = {
  PHONE_VERIFY_SEC: 60, // 5 * 60, // * 1000, // 5 minutes
  EMAIL_VERIFY_SEC: 90,
  PWD_RESET_SEC: 90,
  LOGIN_SEC: 60
};

export type TOtpType = 'login' | 'verify';
export type TChannel = 'email' | 'phone';