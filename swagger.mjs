import { PORT } from './src/config/serverConfig.mjs';

export default {
    'swagger': '2.0',
    'info': {
        'version': '1.0.0',
        'title': 'Currency exchange api',
        'description': 'API providing functionality convert amount between several different currencies',
        'license': {
            'name': 'MIT',
            'url': 'https://opensource.org/licenses/MIT'
        }
    },
    'paths': {
        '/quote': {
            'get': {
                'tags': [
                    'Quote'
                ],
                'summary': 'Convert provided amount based on provided base and quote currencies',
                'parameters': [
                    {
                        'name': 'base_currency',
                        'in': 'query',
                        'enum': ['USD', 'EUR', 'GBP', 'ILS'],
                        'description': '3 letters ISO currency code. Currency to convert from.',
                        'type': 'string'
                    },
                    {
                        'name': 'quote_currency',
                        'in': 'query',
                        'enum': ['USD', 'EUR', 'GBP', 'ILS'],

                        'description': '3 letters ISO currency code. Currency to convert to.',
                        'type': 'string'
                    },
                    {
                        'name': 'base_amount',
                        'in': 'query',
                        'description': 'The amount to convert in cents. Example: 100 (1 USD)',
                        'type': 'number'
                    }
                ],
                'responses': {
                    '200': {
                        'description': 'OK',
                        'schema': {
                            '$ref': '#/definitions/QuoteResponse'
                        }
                    },
                    '400': {
                        'description': 'BAD REQUEST',
                        'schema': {
                            '$ref': '#/definitions/BadRequestResponse'
                        }
                    },
                    '404': {
                        'description': 'NOT FOUND',
                        'schema': {
                            '$ref': '#/definitions/NotFoundResponse'
                        }
                    },
                    '500': {
                        'description': 'SERVER ERROR',
                        'schema': {
                            '$ref': '#/definitions/ServerErrorResponse'
                        }
                    }
                }
            }
        }
    },
    'definitions': {
        'QuoteResponse': {
            'type': 'object',
            'properties': {
                'quote_amount': {
                    'type': 'number'
                },
                'exchange_rate': {
                    'type': 'number'
                }
            }
        },
        'BadRequestResponse': {
            'type': 'object',
            'properties': {
                'status code': {
                    'type': 'number',
                    'enum': [400]
                },
                'messages': {
                    'type': 'array',
                    'items': {
                        'type': 'string'
                    }
                }
            }
        },
        'NotFoundResponse': {
            'type': 'object',
            'properties': {
                'status code': {
                    'type': 'number',
                    'enum': [404]
                },
                'messages': {
                    'type': 'array',
                    'items': {
                        'type': 'string'
                    }
                }
            }
        },
        'ServerErrorResponse': {
            'type': 'object',
            'properties': {
                'status code': {
                    'type': 'number',
                    'enum': [500]
                },
                'messages': {
                    'type': 'array',
                    'items': {
                        'type': 'string'
                    }
                }
            }
        }
    },
    'host': `localhost:${PORT}`,
    'basePath': '/',
    'tags': [
        {
            'name': 'Quote',
            'description': 'API to get converted amounts based on exchange rates'
        }
    ],
    'schemes': [
        'http'
    ],
    'consumes': [
        'application/json'
    ],
    'produces': [
        'application/json'
    ]
};