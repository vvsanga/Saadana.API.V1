import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from 'express';
import { LoggerService } from "../../modules/logger/services/logger.service";
import { RequestContext } from "../models/request-context.model";
import { RequestUtil } from "../utils/request.util";
import { GetUidNumeric } from "../utils/uid.util";

@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
    constructor(private readonly logger: LoggerService) { }

    async use(req: Request, res: Response, next: NextFunction) {
        const startTime = Date.now();
        const requestUid = String(GetUidNumeric());

        const headers = req.headers;
        const socket = req.socket;

        const ip = RequestUtil.ip(headers, socket, req.ip);
        const geo = RequestUtil.geo(ip);
        const timezone = RequestUtil.timezone(headers, geo?.timezone);
        const ua = RequestUtil.userAgent(headers);

        const url = req.originalUrl || req.url;
        const method = req.method;
        const action = `${method} ${url}`;

        const device = {
            ip,
            geo: geo ? JSON.stringify(geo) : undefined,
            timezone,
            agent: JSON.stringify(ua),
        }

        const logReq = await this.logger.logRequest(requestUid, action, device, req.body, RequestContext.userId)

        RequestContext.run(
            {
                requestId: logReq.id,
                requestUid,
                startTime,
                network: {
                    ip,
                    geo: geo
                        ? {
                            countryCode: geo.country,
                            region: geo.region,
                            city: geo.city,
                            latitude: geo.ll?.[0],
                            longitude: geo.ll?.[1],
                            timezone,
                        }
                        : { timezone },
                },
                meta: {
                    url,
                    method,
                    headers: headers as Record<string, string>,
                    os: ua.os,
                    device: ua.device,
                    platform: ua.browser,
                },
            },
            async () => { next(); },
        );
    }
}
