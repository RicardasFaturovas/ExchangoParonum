import { QuoteQueryValidator } from '../../src/utilities/quoteQueryValidator.mjs';
import { ERROR_MESSAGES } from '../../src/utilities/Constants.mjs';

describe('QuoteQueryValidator', () => {
    let quoteQueryValidator;

    beforeEach(() => {
        quoteQueryValidator = new QuoteQueryValidator();
    });

    describe('validateQueryParams', () => {
        const invalidQueryParamTestCases = [
            {
                queryParams: { base_currency: 'USD', quote_currency: 'EUR', base_amount: 'string' },
                messages: [ ERROR_MESSAGES.INVALID_INT_PARAM ],
                case: 'base amount is not a valid int'
            },
            {
                queryParams: { base_currency: 'CAD', quote_currency: 'EUR', base_amount: '1' },
                messages: [ ERROR_MESSAGES.UNSUPPORTED_BASE_CURRENCY ],
                case: 'provided base currency is not supported'
            },
            {
                queryParams: { base_currency: 'EUR', quote_currency: 'CAD', base_amount: '1' },
                messages: [ ERROR_MESSAGES.UNSUPPORTED_QUOTE_CURRENCY ],
                case: 'provided quote currency is not supported'
            },
            {
                queryParams: { base_currency: 'test', quote_currency: 'test', base_amount: 'test' },
                messages: [ ERROR_MESSAGES.INVALID_INT_PARAM, ERROR_MESSAGES.UNSUPPORTED_BASE_CURRENCY, ERROR_MESSAGES.UNSUPPORTED_QUOTE_CURRENCY ],
                case: 'when multiple params are incorrect'
            }
        ];

        invalidQueryParamTestCases.forEach((testCase) => {
            it(`Should set validation result as invalid and set appropriate error messages when ${testCase.case}`, () => {
                const result = quoteQueryValidator.validateQueryParams(testCase.queryParams);

                expect(result).toEqual({
                    isValid: false,
                    errorMessages: testCase.messages
                });
            });
        });
    });
});