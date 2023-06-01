import { config } from './config';
import { connectToDatabase } from './database';
import { startServer } from './server';

const uri = config.db.uri;
connectToDatabase(uri)
    .then(() => {
        startServer();
    })
    .catch((error) => {
        console.error('Database connection failed.', error);
        process.exit(1);
    });

process.on('unhandledRejection', (error) => {
    console.error('Unhandled Promise Rejection:', error);
    process.exit(1);
});
