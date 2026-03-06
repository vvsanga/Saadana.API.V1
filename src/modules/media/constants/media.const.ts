const C_MEDIA_FALLBACK = {
    SENDER_EMAIL: `support@email.leoora.org`,
    SENDER_NAME: `Leoora`,
    DOMAIN_EMAIL: `email.leoora.org`,
    // DOMAIN:`www.leoora.org`, 
}

export const C_MEDIA = { //communication 
    SENDER_NAME: process.env.SENDER_NAME || C_MEDIA_FALLBACK.SENDER_NAME,
    SENDER_EMAIL: process.env.SENDER_EMAIL || C_MEDIA_FALLBACK.SENDER_EMAIL,
    DOMAIN_EMAIL: process.env.DOMAIN_EMAIL || C_MEDIA_FALLBACK.DOMAIN_EMAIL,
    SUB: {
        VERIFY_OTP: `Verify Your Email Address`
    }
}

// SENDER_NAME=Leoora
// SENDER_EMAIL=support@email.leoora.org
// DOMAIN_EMAIL=email.leoora.org
