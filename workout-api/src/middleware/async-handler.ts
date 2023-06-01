import type { NextFunction, Request, Response } from 'express';
import type { Req } from './auth';

/**
 * A middleware function that wraps a request handler to facilitate async error handling.
 *
 * @param fn - The async request handler function.
 * @returns A promise with a catch statement.
 */

export function asyncHandler(fn: (req: Req, res: Response, next: NextFunction) => void) {
    return (req: Request, res: Response, next: NextFunction) => {
        return Promise.resolve(fn(req, res, next)).catch(next);
    };
}
