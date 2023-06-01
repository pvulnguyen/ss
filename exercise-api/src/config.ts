import * as dotenv from 'dotenv';
import winston from 'winston';

dotenv.config({ path: process.env.NODE_ENV === 'production' ? '.env' : '.env.local' });

function checkEnv(variable: string | undefined, message: string) {
    if (typeof variable === 'undefined') throw new Error(message);
}

const { API_PREFIX, SUPABASE_ANON_KEY, SUPABASE_URL } = process.env;
checkEnv(API_PREFIX, 'API prefix not set.');
checkEnv(SUPABASE_ANON_KEY, 'Supabase anon key not set.');
checkEnv(SUPABASE_URL, 'Supabase URL not set.');

export const config = {
    app: {
        apiPrefix: API_PREFIX!,
        port: process.env.PORT || 7001,
    },
    supabase: {
        key: SUPABASE_ANON_KEY!,
        url: SUPABASE_URL!,
    },
    logger: {
        meta: false,
        transports: [new winston.transports.Console()],
        format: winston.format.combine(
            winston.format.json(),
            winston.format.prettyPrint(),
            winston.format.colorize({ all: true }),
        ),
    },
};
