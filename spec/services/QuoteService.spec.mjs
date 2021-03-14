import { QuoteService } from '../../src/services/QuoteService.mjs';

describe('QuoteService', () => {
    let cache;
    let currencyExchangeService;
    let quoteService;

    beforeEach(() => {
        cache = jasmine.createSpyObj('cache', ['getValue', 'setValue']);
        currencyExchangeService = jasmine.createSpyObj('currencyExchangeService', ['fetchCurrencies']);
        quoteService = new QuoteService(cache, currencyExchangeService);
    });

    describe('getConvertedAmount', () => {
        const rates = { rates: { EUR: 1 } };

        it('should get currency exhcnages value from cache if it exists', () => {
            cache.getValue.and.returnValue(rates);
            quoteService.getConvertedAmount('USD', 'EUR', 1);
            expect(currencyExchangeService.fetchCurrencies).not.toHaveBeenCalled();
        });

        it('should get currency exhcnages value from external api and set value to cache', () => {
            cache.getValue.and.returnValue(undefined);
            currencyExchangeService.fetchCurrencies.and.returnValue(Promise.resolve({ json: () => rates }));
            quoteService.getConvertedAmount('USD', 'EUR', 1);
            expect(currencyExchangeService.fetchCurrencies).toHaveBeenCalledWith('USD', 'EUR');
        });

        it('should get exchange rate and quote amount' , async () => {
            cache.getValue.and.returnValue({rates: { EUR: 1.5678 }});
            const result = await quoteService.getConvertedAmount('USD', 'EUR', 100);

            expect(result).toEqual({ quote_amount: 157, exchange_rate: 1.568 });
        });
    });
});