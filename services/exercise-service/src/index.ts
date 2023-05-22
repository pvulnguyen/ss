import { app } from './app';
import { config } from './config';

const PORT = config.serverPort;

app.listen(PORT, async () => {
    console.log(`Listening on port ${PORT}`);
});
