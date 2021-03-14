import { QuoteQueryValidator } from '../../src/utilites/quoteQueryValidator.mjs';
import { ERROR_MESSAGES } from '../../src/utilites/Constants.mjs';

describe('QuoteQueryValidator', () => {
    let quoteQueryValidator;

    beforeEach(() => {
        quoteQueryValidator = new QuoteQueryValidator();
    });

    describe('validateQueryParams', () => {
        const invalidQueryParamTestCases = [
            {
                queryParams: { base_currency: 'USD', quote_currency: 'EUR', base_amount: 'string' },
                message: ERROR_MESSAGES.INVALID_INT_PARAM,
                case: 'base amount is not a valid int'
            },
            {
                queryParams: { base_currency: 'CAD', quote_currency: 'EUR', base_amount: '1' },
                message: ERROR_MESSAGES.UNSUPPORTED_BASE_CURRENCY,
                case: 'provided base currency is not supported'
            },
            {
                queryParams: { base_currency: 'EUR', quote_currency: 'CAD', base_amount: '1' },
                message: ERROR_MESSAGES.UNSUPPORTED_QUOTE_CURRENCY,
                case: 'provided quote currency is not supported'
            }
        ];

        invalidQueryParamTestCases.forEach((testCase) => {
            it(`Should set validation result as in valid and set appropriate error message when ${testCase.case}`, () => {
                const result = quoteQueryValidator.validateQueryParams(testCase.queryParams);
                expect(result).toEqual({
                    isValid: false,
                    message: testCase.message
                });
            });
        });
    });
});