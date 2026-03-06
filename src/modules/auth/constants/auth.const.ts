const C_AUTH_FALLBACK = {
    MAX_FAILS: 5, // lock after N failed logins
    LOCK_MINS: 15, // 15m lock
    CLIENT_ID: {
        GOOGLE: '133014634096-bhnavnfaiuvooku0n9efn283nu2kvcs8.apps.googleusercontent.com'
    },
    C_JWT: {
        ACCESS: {
            KEY: 'jwt-access',
            SECRET: 'your_access_secret_here',
            TTL_MINS: 15,
            ERR_MSG: {
                REQUIRED: 'JWT ACCESS SECRET must be set',
                INVALID: 'Invalid or expired access token'
            }
        },
        REFRESH: {
            KEY: 'jwt-refresh',
            SECRET: 'your_refresh_secret_here',
            TTL_DAYS: 7,
            ERR_MSG: {
                REQUIRED: 'JWT REFRESH SECRET must be set',
                INVALID: 'Invalid or expired refresh token'
            }
        }
    },
}

export const C_AUTH = {
    JWT: {
        ISSUER: 'saadana-auth-service',       // your auth service
        AUDIENCE: 'saadana-api',              // your backend API
        ACCESS: {
            SECRET: process.env.JWT_ACCESS_SECRET || C_AUTH_FALLBACK.C_JWT.ACCESS.SECRET,
            TTL_SEC: Number(process.env.JWT_ACCESS_TTL_MINS || C_AUTH_FALLBACK.C_JWT.ACCESS.TTL_MINS) * 60 // mins to seconds
        },
        REFRESH: {
            SECRET: process.env.JWT_REFRESH_SECRET || C_AUTH_FALLBACK.C_JWT.REFRESH.SECRET,
            TTL_SEC: Number(process.env.JWT_REFRESH_TTL_DAYS || C_AUTH_FALLBACK.C_JWT.REFRESH.TTL_DAYS) * 24 * 60 * 60 // days to seconds
        }
    },
    OAUTH: {
        CLIENT_ID: {
            GOOGLE: process.env.GOOGLE_CLIENT_ID || C_AUTH_FALLBACK.CLIENT_ID.GOOGLE
        }
    },
    MAX_FAILS: Number(process.env.AUTH_MAX_FAILS || C_AUTH_FALLBACK.MAX_FAILS),
    LOCK_MINS: Number(process.env.AUTH_LOCK_MINS || C_AUTH_FALLBACK.LOCK_MINS) * 60 * 1000 // mins to milliseconds
}