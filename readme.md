# Currency exchange api

Api to be used to convert amounts between different currencies using a 3rd party API

## Getting Started

### Dependencies

* NodeJS

### Installing

```
npm install
```

### Launching API

The API uses a 3rd party API to which requires to register an account here https://manage.exchangeratesapi.io/signup/free. After creating an account you will be presented with an access key. Change the `ACCESS_KEY` variable located in 
`currency-exchange\src\config` to the access key you received from the registration prior to launching the API.

To launch API -
```
npm run dev
```

### Running unit tests

```
npm run test
```

