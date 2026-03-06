import { SetMetadata } from '@nestjs/common';

export const PUBLIC_ROUTE_KEY = 'route_public';
export const REFRESH_ROUTE_KEY = 'route_refresh';
export const INTERNAL_ROUTE_KEY = 'route_internal';

export const PublicRoute = () => SetMetadata(PUBLIC_ROUTE_KEY, true);
export const RefreshRoute = () => SetMetadata(REFRESH_ROUTE_KEY, true);
export const InternalRoute = () => SetMetadata(INTERNAL_ROUTE_KEY, true);
