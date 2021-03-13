import app from './index.mjs';
import { port } from './config/serverConfig.mjs';

app.listen(port, () => console.info(`Server running in http://127.0.0.1:${port}`));
