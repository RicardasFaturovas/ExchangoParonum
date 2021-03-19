import { ERROR_MESSAGES } from './Constants.mjs';

export class ExternalAPIError {
    constructor(statusCode, message) {
        this.statusCode = statusCode;
        this.message = `${ERROR_MESSAGES.EXTERNAL_API_ERROR}. ${message}`;
    }
}