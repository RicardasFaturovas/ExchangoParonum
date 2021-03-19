import { STATUS_CODES } from '../utilites/Constants.mjs';
import { ExternalAPIError } from '../utilites/ExtrenalAPIError.mjs';

export class QuoteService {
    constructor(cache, currencyExchangeService) {
        this.cache = cache;
        this.currencyExchangeService = currencyExchangeService;
    }

    async getCurrencyRates(baseCurrency, quoteCurrency) {
        let currencyRates = this.cache.getValue(baseCurrency);
        if (!currencyRates) {
            const response = await this.currencyExchangeService.fetchCurrencies(baseCurrency, quoteCurrency);
            const parsedRepsonse = await response.json();
            const status = response.status;
            if (status === STATUS_CODES.SUCCESS ) {
                currencyRates = parsedRepsonse;
                this.cache.setValue(baseCurrency, currencyRates);
            } else {
                throw new ExternalAPIError(status, parsedRepsonse.error);
            }
        }

        return currencyRates;
    }

    async getConvertedAmount(baseCurrency, quoteCurrency, baseAmount, res) {
        try {
            const currencyRates = await this.getCurrencyRates(baseCurrency, quoteCurrency, res);
            const quoteCurrencyRate = currencyRates.rates[quoteCurrency];
            const quoteAmount = Math.round(baseAmount * quoteCurrencyRate);
            const roundedQuoteCurrencyRate = parseFloat(quoteCurrencyRate.toFixed(3));

            return { quote_amount: quoteAmount, exchange_rate: roundedQuoteCurrencyRate };
        }
        catch (error) {
            if (error instanceof ExternalAPIError) {
                res.status(error.statusCode).json({
                    statusCode: error.statusCode,
                    messages: [error.message]
                });
            } else {
                return Promise.reject(error);
            }
        }
    }
}