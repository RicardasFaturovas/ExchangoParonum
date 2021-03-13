import { VALID_CURRENCIES, ERROR_MESSAGES } from './Constants.mjs';

const validateRequiredQueryParams = (queryParams) => {
    let errorMessage = '';
    let isValid = true;
    Object.keys(queryParams).forEach(key => {
        if (!queryParams[key]) {
            isValid = false;
            errorMessage = errorMessage === '' ? `${errorMessage}Missing query param: ${key}.` : `${errorMessage} Missing query param: ${key}.`;
        }
    });

    return { isValid, errorMessage };
};

const isValidInt = (value) => {
    return !isNaN(value) && Number.isInteger(parseFloat(value));
};

const isSupportedCurrency = (currency) => VALID_CURRENCIES.includes(currency);

export class QuoteQueryValidator {
     validateQueryParams(queryParams) {
        const requiredParamsValidationResult = validateRequiredQueryParams(queryParams);
        const validationResult = { isValid: true };

        if (!requiredParamsValidationResult.isValid) {
            validationResult.isValid = false;
            validationResult.message = requiredParamsValidationResult.errorMessage;
        }

        if (!isValidInt(queryParams.base_amount)) {
            validationResult.isValid = false;
            validationResult.message = ERROR_MESSAGES.INVALID_INT_PARAM;
        }

        if (!isSupportedCurrency(queryParams.base_currency)) {
            validationResult.isValid = false;
            validationResult.message = ERROR_MESSAGES.UNSUPPORTED_BASE_CURRENCY;
        }

        if (!isSupportedCurrency(queryParams.quote_currency)) {
            validationResult.isValid = false;
            validationResult.message = ERROR_MESSAGES.UNSUPPORTED_QUOTE_CURRENCY;
        }

        return validationResult;
    }
}
