export interface IMsg91EmailTo {
    name: string,
    email: string
}

export interface IEmail {
    to: any[];
    subject: string;
    templateId: string;
    otp: string;
    otpExpMins: number;
}
