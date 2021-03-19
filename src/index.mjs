import express from 'express';
import quoteRouter from './routes/QuoteRoute.mjs';
import swaggerUi from 'swagger-ui-express';
import swaggerConfig from '../swagger.mjs';
import { STATUS_CODES, ERROR_MESSAGES } from './utilities/Constants.mjs';

const app = express();

app.use(express.json());
app.use('/quote', quoteRouter);
app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerConfig)
);
app.use((req, res) => {
    return res.status(STATUS_CODES.NOT_FOUND).json({
        statusCode: STATUS_CODES.NOT_FOUND,
        messages: ERROR_MESSAGES.NOT_FOUND
    });
});

export default app;