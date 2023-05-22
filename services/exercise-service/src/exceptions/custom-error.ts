export type ResponseError = {
    message: string;
    additionalInfo?: string;
};

export class CustomError extends Error {
    status!: number;
    message!: string;
    additionalInfo!: any;

    constructor(status: number = 500, message: string, additionalInfo: any = undefined) {
        super(message);
        this.status = status;
        this.message = message;
        this.additionalInfo = additionalInfo;
    }
}
