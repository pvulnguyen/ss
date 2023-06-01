import { NextFunction, Request, Response } from 'express';
import type { Req } from './auth';

/**
 * Async handler to wrap the API routes, allowing for async error handling.
 *
 * @param fn Function to call for the API endpoint
 * @returns Promise with a catch statement
 */

export function asyncHandler(fn: (req: Req, res: Response, next: NextFunction) => void) {
    return (req: Request, res: Response, next: NextFunction) => {
        return Promise.resolve(fn(req, res, next)).catch(next);
    };
}
