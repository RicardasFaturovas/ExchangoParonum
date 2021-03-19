import { VALID_CURRENCIES, ERROR_MESSAGES } from './Constants.mjs';

const isValidInt = (value) => {
    return !isNaN(value) && Number.isInteger(parseFloat(value));
};

const isSupportedCurrency = (currency) => VALID_CURRENCIES.includes(currency);

export class QuoteQueryValidator {
     validateQueryParams(queryParams) {
        const validationResult = { isValid: true, errorMessages: [] };

        if (!isValidInt(queryParams.base_amount)) {
            validationResult.isValid = false;
            validationResult.errorMessages.push(ERROR_MESSAGES.INVALID_INT_PARAM);
        }

        if (!isSupportedCurrency(queryParams.base_currency)) {
            validationResult.isValid = false;
            validationResult.errorMessages.push(ERROR_MESSAGES.UNSUPPORTED_BASE_CURRENCY);
        }

        if (!isSupportedCurrency(queryParams.quote_currency)) {
            validationResult.isValid = false;
            validationResult.errorMessages.push(ERROR_MESSAGES.UNSUPPORTED_QUOTE_CURRENCY);
        }

        return validationResult;
    }
}
