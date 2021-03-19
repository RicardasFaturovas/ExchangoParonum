import Router from 'express';

import { QuoteController } from '../controllers/QuoteController.mjs';
import { LRUCache } from '../services/CacheService.mjs';
import { CurrencyExchangeService } from '../services/CurrencyExchangeService.mjs';
import { QuoteService } from '../services/QuoteService.mjs';
import { QuoteQueryValidator } from '../utilities/QuoteQueryValidator.mjs';

const quoteRouter = Router();
const lruCache = new LRUCache();
const currencyExchangeService = new CurrencyExchangeService();
const quoteQueryValidator = new QuoteQueryValidator();
const quoteService = new QuoteService(lruCache, currencyExchangeService);
const quoteController = new QuoteController(quoteService, quoteQueryValidator);

quoteRouter.get('',
    (req, res) => quoteController.getCurrencies(req, res)
);

export default quoteRouter;