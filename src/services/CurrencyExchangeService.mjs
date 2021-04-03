import fetch from 'node-fetch';
import { ACCESS_KEY } from '../config/serverConfig.mjs';
import { BASE_CURRENCY_EXCHANGE_API_URL } from '../utilities/constants.mjs';

export class CurrencyExchangeService {
    async fetchCurrencies(baseCurrency) {
        try {
            return await fetch(`${BASE_CURRENCY_EXCHANGE_API_URL}?access_key=${ACCESS_KEY}&base=${baseCurrency}`);
        }
        catch(error) {
            return Promise.reject(error);
        }
    }
}