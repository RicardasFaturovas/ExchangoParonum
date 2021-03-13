import Router from 'express';

import { QuoteController } from '../controllers/QuoteController.mjs';
import { LRUCache } from '../services/CacheService.mjs';
import { QuoteService } from '../services/QuoteService.mjs';
import { QuoteQueryValidator } from '../utilites/QuoteQueryValidator.mjs';

const quoteRouter = Router();
const lruCache = new LRUCache();
const quoteQueryValidator = new QuoteQueryValidator();
const quoteService = new QuoteService(lruCache);
const quoteController = new QuoteController(quoteService, quoteQueryValidator);

quoteRouter.get('',
    (req, res) => quoteController.getCurrencies(req, res)
);

export default quoteRouter;