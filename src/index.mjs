import express from 'express';
import quoteRouter from './routes/QuoteRoute.mjs';

const app = express();

app.use(express.json());
app.use('/quote', quoteRouter);

export default app;