import * as dotenv from 'dotenv';

if (process.env.NODE_ENV === 'production') {
    dotenv.config({ path: '.env' });
} else {
    dotenv.config({ path: '.env.local' });
}

const JWT_SECRET_KEY = process.env.JWT_SECRET;

if (!JWT_SECRET_KEY) {
    console.error('JWT secret not set.');
    process.exit(1);
}

export const config = {
    apiPrefix: process.env.API_PREFIX,
    serverPort: process.env.SERVER_PORT || 7000,
    jwtSecretKey: JWT_SECRET_KEY,
};
