import { DateTime } from 'luxon';
import { RequestContext } from '../../core/models/request-context.model';

export interface ITimePart {
  hours: number;
  minutes: number;
  seconds: number;
}

export class DateTimeUtil {

  private static tz(): string {
    return RequestContext.network?.geo?.timezone || 'UTC';
  }

  private static isDateLike(value: any): boolean {
    return (
      value instanceof Date ||
      (typeof value === 'string' && DateTime.fromISO(value, { setZone: true }).isValid)
    );
  }

  static nowLocal() {
    return DateTime.now().setZone(this.tz()).toISO();
  }

  static nowUTC(): Date {
    // Use .toJSDate() to return a native Date object that TypeORM loves
    return DateTime.now().setZone(this.tz()).toUTC().toJSDate();
  }

  static nowISO() {
    // Use this for API responses or JSON logging
    return DateTime.now().setZone(this.tz()).toUTC().toISO();
  }

  static toUTC(input: any): any {
    return this.convert(input, true);
  }

  static toLocal(input: any): any {
    return this.convert(input, false);
  }

  static secondsToHMS(seconds: number, appendLabel: false): ITimePart;
  static secondsToHMS(seconds: number, appendLabel?: true): string;
  static secondsToHMS(seconds: number, appendLabel: boolean = true): ITimePart | string {
    if (!Number.isFinite(seconds) || seconds < 0) {
      return appendLabel ? '' : { hours: 0, minutes: 0, seconds: 0 };
    }

    const secs = Math.floor(seconds);

    const hms: ITimePart = {
      hours: Math.floor(secs / 3600),
      minutes: Math.floor((secs % 3600) / 60),
      seconds: secs % 60
    };

    if (!appendLabel) {
      return hms;
    }

    const parts: string[] = [];

    if (hms.hours > 0) {
      parts.push(`${hms.hours} hours`);
    }
    if (hms.minutes > 0) {
      parts.push(`${hms.minutes} minutes`);
    }
    if (hms.seconds > 0) {
      parts.push(`${hms.seconds} seconds`);
    }

    return parts.join(' ');
  }


  private static convert(value: any, toUTC: boolean): any {
    if (value === null || value === undefined) return value;

    if (value instanceof Date) {
      const dt = DateTime.fromJSDate(value).setZone(this.tz());
      return toUTC ? dt.toUTC().toISO() : dt.toISO();
    }

    if (typeof value === 'string' && this.isDateLike(value)) {
      const dt = DateTime.fromISO(value, { setZone: true });
      const zoned = dt.setZone(this.tz());
      return toUTC ? zoned.toUTC().toISO() : zoned.toISO();
    }

    if (Array.isArray(value)) {
      return value.map((v) => this.convert(v, toUTC));
    }

    if (typeof value === 'object') {
      const clone: any = {};
      for (const key of Object.keys(value)) {
        clone[key] = this.convert(value[key], toUTC);
      }
      return clone;
    }

    return value;
  }
}
