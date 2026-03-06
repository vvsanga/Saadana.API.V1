import geoip from 'geoip-lite';
import { DateTime } from 'luxon';
import UAParser from 'ua-parser-js';

export class RequestUtil {

    static ip(headers: any, socket: any, reqIp?: string): string {
        return (
            headers['x-forwarded-for']?.split(',')[0]?.trim() ||
            socket?.remoteAddress ||
            reqIp ||
            'unknown'
        );
    }

    static geo(ip: string) {
        try {
            return geoip.lookup(ip) || undefined;
        } catch {
            return undefined;
        }
    }

    static timezone(headers: any, geoTimezone?: string): string {
        const headerTz = headers['x-user-timezone'];
        if (headerTz && DateTime.local().setZone(headerTz).isValid) {
            return headerTz;
        }
        if (geoTimezone && DateTime.local().setZone(geoTimezone).isValid) {
            return geoTimezone;
        }
        return 'UTC';
    }

    static userAgent(headers: any) {
        const agent = headers['user-agent'] || '';
        const parser = new UAParser.UAParser(agent);
        const osInfo = parser.getOS();
        const deviceInfo = parser.getDevice();
        const browserInfo = parser.getBrowser();

        const os =
            `${osInfo.name || ''} ${osInfo.version || ''}`.trim() || undefined;

        const device =
            deviceInfo.vendor || deviceInfo.model || deviceInfo.type
                ? `${deviceInfo.vendor || ''} ${deviceInfo.model || ''} ${deviceInfo.type || ''}`.trim()
                : undefined;

        const browser =
            browserInfo.name
                ? `${browserInfo.name} ${browserInfo.version || ''}`.trim()
                : undefined;

        return { os, device, browser };
    }
}
