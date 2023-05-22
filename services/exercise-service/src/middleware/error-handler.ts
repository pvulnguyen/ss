import { NextFunction, Request, Response } from 'express';
import { CustomError, type ResponseError } from '../exceptions/custom-error';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    console.error(err);

    if (!(err instanceof CustomError)) {
        res.status(500).send({ message: 'Server error, please try again later' });
    } else {
        const customError = err as CustomError;
        let response = { message: customError.message } as ResponseError;
        if (customError.additionalInfo) {
            response.additionalInfo = customError.additionalInfo;
        }

        res.status(customError.status).type('json').send(response);
    }
}
