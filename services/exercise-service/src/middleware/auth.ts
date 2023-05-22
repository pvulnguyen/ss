import express from 'express';
import jwt from 'jsonwebtoken';

import { config } from '../config';

interface AuthReq extends express.Request {
    user?: {
        id: string;
    };
}

export function authenticate(req: AuthReq, res: express.Response, next: express.NextFunction) {
    const token = req.headers.authorization?.split(' ')[1] || req.cookies?.token;
    if (!token) return res.status(401).send({ message: 'Access token not provided.' });

    try {
        const decoded = jwt.verify(token, config.jwtSecretKey);
        req.user = decoded as { id: string };

        next();
    } catch (error) {
        return res.status(401).send({ message: 'Token provided is invalid or has expired.' });
    }
}
