import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';

import { config } from './config';
import { authenticate, errorHandler } from './middleware';
import { router } from './router';

export const app: express.Application = express();

app.disable('x-powered-by');
app.use(helmet());
app.use(cors());
app.use(compression());

app.use('/' + config.apiPrefix, authenticate, router);

app.use(errorHandler);
