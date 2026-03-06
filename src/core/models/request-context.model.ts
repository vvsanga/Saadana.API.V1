import { AsyncLocalStorage } from 'async_hooks';
import { AppUser } from '../../modules/user/entities/app-user.entity';

export interface IRequestMetaContext {
    url?: string;
    method?: string;
    headers?: Record<string, string>;
    agent?: string;
    device?: string;
    os?: string;
    platform?: string;
    sourceType?: string;
}

export interface INetworkContext {
    ip: string;
    geo?: {
        countryCode?: string;
        region?: string;
        city?: string;
        latitude?: number;
        longitude?: number;
        timezone?: string;
        isProxy?: boolean;
    };
}

export interface IRequestContext {
    requestId: number;
    requestUid: string;
    startTime: number;
    policyFilter?: Record<string, any>;
    network?: INetworkContext;
    meta?: IRequestMetaContext;
    user?: AppUser;
    userId?: number;
}

export class RequestContext {
    private static readonly als = new AsyncLocalStorage<IRequestContext>();

    static run(ctx: IRequestContext, callback: () => void) {
        this.als.run(ctx, callback);
    }

    static getStore(): IRequestContext | undefined {
        return this.als.getStore();
    }

    static set(values: Partial<IRequestContext>) {
        const store = this.als.getStore();
        if (store) Object.assign(store, values);
    }

    static get user() { return this.getStore()?.user; }
    static get userId() { return this.getStore()?.userId; }
    static get requestId() { return this.getStore()?.requestId; }
    static get requestUid() { return this.getStore()?.requestUid; }
    static get network() { return this.getStore()?.network; }
    static get duration(): number {
        const start = this.getStore()?.startTime;
        return start ? Date.now() - start : 0;
    }
}
