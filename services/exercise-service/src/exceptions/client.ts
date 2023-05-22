import { CustomError } from './custom-error';

export class ClientError extends CustomError {
    constructor(message: string) {
        super(400, message);
    }
}
