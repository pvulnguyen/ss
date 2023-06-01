import express from 'express';
import type { Application } from 'express';

import compression from 'compression';
import cors from 'cors';
import expressWinston from 'express-winston';
import helmet from 'helmet';

import { config } from './config';
import { asyncHandler, authenticate, errorHandler } from './middleware';
import { router } from './router';

export function startServer(): void {
    const app: Application = express();
    app.disable('x-powered-by');

    app.use(helmet());
    app.use(cors());
    app.use(compression());
    app.use(expressWinston.logger(config.logger));

    app.use('/' + config.app.apiPrefix, authenticate, asyncHandler(router));

    app.use(errorHandler);

    const port = config.app.port;
    const server = app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });

    process.on('SIGTERM', () => {
        console.log('SIGTERM signal received: closing HTTP server');
        server.close(() => {
            console.log('HTTP server closed');
            process.exit(0);
        });
    });
}
