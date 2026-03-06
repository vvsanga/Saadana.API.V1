const C_MSG91_FALLBACK = {
    AUTH_KEY: `489641AXrLtB6pjvE6971b4d2P1`,
    EMAIL: {
        API: 'https://control.msg91.com/api/v5/email/send',
        OTP_TMPL_ID: `template_email_otp`,
        // AUTH_KEY: `489641AXrLtB6pjvE6971b4d2P1`,
    },
    SMS: {
        API: `https://control.msg91.com/api/v5/flow`,
        OTP_TMPL_ID: `6980ba9040c48b31fb34e1a2`,
        // AUTH_KEY: `6980ba9040c48b31fb34e1a2`,
    }
}

export const C_MSG91 = {
    AUTH_KEY: process.env.MSG91_AUTH_KEY || C_MSG91_FALLBACK.AUTH_KEY,
    EMAIL: {
        API: process.env.MSG91_EMAIL_API || C_MSG91_FALLBACK.EMAIL.API,
        OTP_TMPL_ID: process.env.MSG91_EMAIL_OTP_TMPL_ID || C_MSG91_FALLBACK.EMAIL.OTP_TMPL_ID,
    },
    SMS: {
        API: process.env.MSG91_SMS_API || C_MSG91_FALLBACK.SMS.API,
        OTP_TMPL_ID: process.env.MSG91_SMS_OTP_TMPL_ID || C_MSG91_FALLBACK.SMS.OTP_TMPL_ID,
    }
}