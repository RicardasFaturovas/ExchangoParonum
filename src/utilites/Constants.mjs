export const BASE_CURRENCY_EXCHANGE_API_URL = 'https://api.exchangeratesapi.io/latest';

export const STATUS_CODES = {
    SUCCESS: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    SERVER_ERROR: 500
};

export const ERROR_MESSAGES = {
    INVALID_INT_PARAM: 'The provided value is not a valid integer',
    UNSUPPORTED_BASE_CURRENCY: 'The provided base currency is unsupported',
    UNSUPPORTED_QUOTE_CURRENCY: 'The provided quote currency is unsupported',
    NOT_FOUND: 'Unable to find requested resource'
};

export const VALID_CURRENCIES = ['USD','EUR','GBP','ILS'];
