export class QuoteService {
    constructor(cache, currencyExchangeService) {
        this.cache = cache;
        this.currencyExchangeService = currencyExchangeService;
    }

    async getCurrencyRates(baseCurrency, quoteCurrency) {
        let currencyRates = this.cache.getValue(baseCurrency);
        if (!currencyRates) {
            const response = await this.currencyExchangeService.fetchCurrencies(baseCurrency, quoteCurrency);
            currencyRates = await response.json();

            this.cache.setValue(baseCurrency, currencyRates);
        }

        return currencyRates;
    }

    async getConvertedAmount(baseCurrency, quoteCurrency, baseAmount) {
        try {
            const currencyRates = await this.getCurrencyRates(baseCurrency, quoteCurrency);
            const quoteCurrencyRate = currencyRates.rates[quoteCurrency];
            const quoteAmount = Math.round(baseAmount * quoteCurrencyRate);
            const roundedQuoteCurrencyRate = parseFloat(quoteCurrencyRate.toFixed(3));

            return { quote_amount: quoteAmount, exchange_rate: roundedQuoteCurrencyRate };
        }
        catch (error) {
            return Promise.reject(error);
        }
    }
}