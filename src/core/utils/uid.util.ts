import { customAlphabet } from 'nanoid';

const C_UID_LENT = 12;
const C_ALPHA_NUMERIC = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

export function GetUid(length: number = C_UID_LENT): string {
  const nanoidCustom = customAlphabet(C_ALPHA_NUMERIC, length)
  return nanoidCustom(length);
}

export function GetUidNumeric(date: Date = new Date()) {
  const pad = (num: number, size: number) => num.toString().padStart(size, '0');
  const month = date.getMonth(); // 0–11
  const mo = (month % 9) + 1;
  const d = pad(date.getDate(), 2);
  const h = pad(date.getHours(), 2);
  const m = pad(date.getMinutes(), 2);
  const s = pad(date.getSeconds(), 2);
  const t = pad(date.getMilliseconds(), 3);
  return `${mo}${d}${h}${m}${s}${t}`
  // return Number(`${mo}${d}${h}${m}${s}${t}`);
}
