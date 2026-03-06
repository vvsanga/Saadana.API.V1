export enum EOrderStatus {
    PENDING = 'PEND',
    COMPLETED = 'COMP',
    FAILED = 'FAIL',
    CANCELLED = 'CANC',
}

export enum EPaymentStatus {
    PENDING = 'PEND',
    PAID = 'PAID',
    FAILED = 'FAIL',
    REFUNDED = 'REFU',
    CANCELLED = 'CANC'
}

export enum EPaymentMethod {
    CREDITCARD = "CRE",
    DEBITCARD = "DEB",
    WALLET = "WAL",
    UPI = "UPI",
    BANK = "BAN",
    MOCK = "MOC"
}

export enum EAmountType {
    SUBTOTAL = 'SUBTOTAL',
    DISCOUNT = 'DISCOUNT',
    COUPON = 'COUPON',
    TAX = 'TAX',
    TOTAL = 'TOTAL',
}

export enum ESubscriptionStatus {
  ACTIVE = 'ACT',
  INACTIVE = 'INA',
  CANCELLED = 'CAN',
  EXPIRED = 'EXP',
}
