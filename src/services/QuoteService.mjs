import fetch from 'node-fetch';
import { BASE_CURRENCY_EXCHANGE_API_URL } from '../utilites/constants.mjs';

export class QuoteService {
    constructor(cache) {
        this.cache = cache;
    }
    async fetchCurrencies(baseCurrency, quoteCurrency, baseAmount) {
        try {
            let currencyRates = this.cache.get(baseCurrency);
            if (!currencyRates) {
                const response = await fetch(`${BASE_CURRENCY_EXCHANGE_API_URL}?base=${baseCurrency}&symbols=${quoteCurrency}`);
                currencyRates = await response.json();

                this.cache.set(baseCurrency, currencyRates);
            }
            const quoteCurrencyRate = currencyRates.rates[quoteCurrency];
            const quoteAmount = baseAmount * quoteCurrencyRate;
            const roundedQuoteCurrencyRate = quoteCurrencyRate.toFixed(3);

            return { quote_amount: quoteAmount, exchange_rate: roundedQuoteCurrencyRate };
        }
        catch (error) {
            return Promise.reject(error);
        }
    }
}