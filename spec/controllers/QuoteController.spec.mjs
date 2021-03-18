import { QuoteController } from '../../src/controllers/QuoteController.mjs';
import { STATUS_CODES } from '../../src/utilites/constants.mjs';

describe('QuoteController', () => {
    let quoteService;
    let quoteQueryValidator;
    let quoteController;
    let res;

    beforeEach(() => {
        res = {};
        res.status = jasmine.createSpy('status').and.returnValue(res);
        res.json = jasmine.createSpy('json');
        quoteService = jasmine.createSpyObj('quoteService', ['getConvertedAmount']);
        quoteQueryValidator = jasmine.createSpyObj('quoteQueryValidator', ['validateQueryParams']);
        quoteController = new QuoteController(quoteService, quoteQueryValidator);
    });

    describe('getCurrencies', () => {
        it('should return successful response when correct query params are passed', async () => {
            const result = { test: 'test' };
            quoteService.getConvertedAmount.and.returnValue(Promise.resolve(result));
            quoteQueryValidator.validateQueryParams.and.returnValue({ isValid: true });

            await quoteController.getCurrencies({ query : {} }, res);

            expect(res.status).toHaveBeenCalledWith(STATUS_CODES.SUCCESS);
            expect(res.json).toHaveBeenCalledWith(result);
        });

        it('should return bad request response when incorrect query params are passed', async () => {
            const badRequestResult = {
                statusCode: STATUS_CODES.BAD_REQUEST,
                messages: ['test']
            };
            quoteQueryValidator.validateQueryParams.and.returnValue({ isValid: false, errorMessages: ['test'] });

            await quoteController.getCurrencies({ query : {} }, res);

            expect(res.status).toHaveBeenCalledWith(STATUS_CODES.BAD_REQUEST);
            expect(res.json).toHaveBeenCalledWith(badRequestResult);
        });

        it('should return server error response when quote service fails to retrieve data', async () => {
            const serverErrorResult = {
                statusCode: STATUS_CODES.SERVER_ERROR,
                messages: ['test error']
            };
            quoteService.getConvertedAmount.and.returnValue(Promise.reject('test error'));
            quoteQueryValidator.validateQueryParams.and.returnValue({ isValid: true });

            await quoteController.getCurrencies({ query : {} }, res);

            expect(res.status).toHaveBeenCalledWith(STATUS_CODES.SERVER_ERROR);
            expect(res.json).toHaveBeenCalledWith(serverErrorResult);
        });
    });
});