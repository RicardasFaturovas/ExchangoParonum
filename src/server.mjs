import app from './index.mjs';
import { PORT } from './config/serverConfig.mjs';

app.listen(PORT, () => console.info(`Server running in http://127.0.0.1:${PORT}`));
