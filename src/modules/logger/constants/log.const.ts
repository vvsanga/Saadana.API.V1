const C_LOG_FALLBACK = {
    FILE_ENABLE: false,
    FILE_SIZE_MAX: '10m'
}

export const C_LOG = {
    FILE_ENABLE: Boolean(process.env.LOG_FILE_ENABLE) || C_LOG_FALLBACK.FILE_ENABLE,
    FILE_SIZE_MAX: process.env.LOG_FILE_SIZE_MAX || C_LOG_FALLBACK.FILE_SIZE_MAX,
};