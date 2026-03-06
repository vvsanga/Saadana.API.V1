import { HttpService } from '@nestjs/axios';
import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { firstValueFrom } from 'rxjs';
import { ELogType } from '../../modules/logger/constants/log.enum';
import { LoggerService } from '../../modules/logger/services/logger.service';
import { RequestContext } from '../models/request-context.model';

@Injectable()
export class HttpClientService {
    constructor(
        private readonly http: HttpService,
        private readonly logger: LoggerService
    ) { }

    async request<T = any>(config: AxiosRequestConfig): Promise<T> {
        const start = Date.now();
        const uid = RequestContext?.requestUid!;

        try {
            this.logger.log(`${config.method} ${config.url}`, 'External HttpClient', uid, ELogType.REQ);
            const res = await firstValueFrom(this.http.request<T>(config));
            const duration = Date.now() - start;
            this.logger.log(`${res.status} (${duration}ms)`, 'External HttpClient', uid, ELogType.RES);
            return res.data;
        } catch (err) {
            return await this.handleError(err as AxiosError, start);
        }
    }

    private async handleError(error: AxiosError, start: number): Promise<never> {
        const uid = RequestContext?.requestUid!;
        const rid = RequestContext?.requestId!;
        const duration = Date.now() - start;
        const normalized = await this.logger.logException(uid, rid, error);
        this.logger.logException(uid, rid, error);
        throw new ServiceUnavailableException({
            message: `External communication failed: ${normalized.message}`,
            status: normalized.status,
            durationMs: duration
        });
    }
}
