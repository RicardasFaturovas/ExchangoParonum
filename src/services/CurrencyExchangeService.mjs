import fetch from 'node-fetch';
import { BASE_CURRENCY_EXCHANGE_API_URL } from '../utilites/constants.mjs';

export class CurrencyExchangeService {
    async fetchCurrencies(baseCurrency, quoteCurrency) {
        try {
            return await fetch(`${BASE_CURRENCY_EXCHANGE_API_URL}?base=${baseCurrency}&symbols=${quoteCurrency}`);
        }
        catch(error) {
            Promise.reject(error);
        }
    }
}