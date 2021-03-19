import { QuoteService } from '../../src/services/QuoteService.mjs';
import { STATUS_CODES } from '../../src/utilities/constants.mjs';

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

        it('should get currency exchanges value from cache if it exists', () => {
            cache.getValue.and.returnValue(rates);

            quoteService.getConvertedAmount('USD', 'EUR', 1);

            expect(currencyExchangeService.fetchCurrencies).not.toHaveBeenCalled();
        });

        it('should get currency exchanges value from external api and set value to cache if response is successful', () => {
            cache.getValue.and.returnValue(undefined);
            currencyExchangeService.fetchCurrencies.and.returnValue(Promise.resolve({ json: () => rates, status: 200 }));

            quoteService.getConvertedAmount('USD', 'EUR', 1);

            expect(currencyExchangeService.fetchCurrencies).toHaveBeenCalledWith('USD', 'EUR');
        });

        it('should respond with external API error when external api response is not successful', async () => {
            const badRequestResult = {
                statusCode: STATUS_CODES.BAD_REQUEST,
                messages: ['External API error. test']
            };
            const res = {};
            res.status = jasmine.createSpy('status').and.returnValue(res);
            res.json = jasmine.createSpy('json');
            cache.getValue.and.returnValue(undefined);
            currencyExchangeService.fetchCurrencies.and.returnValue(Promise.resolve({ json: () => ({ error: 'test' }), status: STATUS_CODES.BAD_REQUEST }));

            await quoteService.getConvertedAmount('USD', 'EUR', 100, res);

            expect(res.status).toHaveBeenCalledWith(STATUS_CODES.BAD_REQUEST);
            expect(res.json).toHaveBeenCalledWith(badRequestResult);
        });

        it('should get exchange rate and quote amount' , async () => {
            cache.getValue.and.returnValue({rates: { EUR: 1.5678 }});

            const result = await quoteService.getConvertedAmount('USD', 'EUR', 100);

            expect(result).toEqual({ quote_amount: 157, exchange_rate: 1.568 });
        });
    });
});