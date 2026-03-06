
import * as bcrypt from 'bcrypt';

export const HASH_SALT_ROUNDS = 10;

export function Hash(plain: string, saltRounds = HASH_SALT_ROUNDS): string {
  if (!plain) throw new Error('Hash input cannot be empty');
  return bcrypt.hashSync(String(plain), saltRounds);
}

export function CompareHash(plain: string, hash: string): boolean {
  if (!plain || !hash) return false;
  return bcrypt.compareSync(String(plain).trim(), String(hash).trim());
}

export async function HashAsync(plain: string, saltRounds = HASH_SALT_ROUNDS): Promise<string> {
  if (!plain) throw new Error('Hash input cannot be empty');
  return bcrypt.hash(String(plain), saltRounds);
}

export async function CompareHashAsync(plain: string, hash: string): Promise<boolean> {
  if (!plain || !hash) return false;
  return bcrypt.compare(String(plain).trim(), String(hash).trim());
}

export function ParseExpirationToMs(exp: string): number {
  const match = /^(\d+)([smhd])$/.exec(exp);
  if (!match) throw new Error(`Invalid expiration format: ${exp}`);

  const [, numStr, unit] = match;
  const num = parseInt(numStr, 10);

  switch (unit) {
    case 's': return num * 1000;
    case 'm': return num * 60 * 1000;
    case 'h': return num * 60 * 60 * 1000;
    case 'd': return num * 24 * 60 * 60 * 1000;
    default: throw new Error(`Unsupported time unit: ${unit}`);
  }
}
