import { C_AUTH_LEN } from "../constants/otp.const";

export function GetOtp(length: number = C_AUTH_LEN.OTP, tensGroup?: number): string {
  // OTP is built from 2-digit numbers
  // All 2-digit chunks must belong to the same “tens group”
  const resolvedTens = tensGroup !== undefined ? tensGroup : Math.floor(Math.random() * 9) + 1;

  if (resolvedTens < 1 || resolvedTens > 9) {
    throw new Error('Tens must be between 1 and 9');
  }

  let otp = '';

  while (otp.length < length) {
    const digit = Math.floor(Math.random() * 10); // 0–9
    otp += `${resolvedTens}${digit}`;
  }

  return otp.slice(0, length);
}