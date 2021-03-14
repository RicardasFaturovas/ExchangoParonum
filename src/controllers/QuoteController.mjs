import { STATUS_CODES } from '../utilites/Constants.mjs';

export class QuoteController {
    constructor(quoteService, quoteQueryValidator) {
        this.quoteService = quoteService;
        this.quoteQueryValidator = quoteQueryValidator;
    }

    async getCurrencies(req, res) {
        try {
            const { base_currency, quote_currency, base_amount } = req.query;
            const queryParams = { base_currency, quote_currency, base_amount };
            const validationResult = this.quoteQueryValidator.validateQueryParams(queryParams);
            if (!validationResult.isValid) {
                return res.status(STATUS_CODES.BAD_REQUEST).json({
                    statusCode: STATUS_CODES.BAD_REQUEST,
                    message: validationResult.message
                });
            }

            const response = await this.quoteService.getConvertedAmount(base_currency, quote_currency, base_amount);

            return res.status(STATUS_CODES.SUCCESS).json(response);
        }
        catch(error) {
           res.status(STATUS_CODES.SERVER_ERROR).json({
               statusCode: STATUS_CODES.SERVER_ERROR,
               message: error
           });
        }
    }
}