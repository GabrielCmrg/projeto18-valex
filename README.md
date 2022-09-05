# Valex

## Introduction

This application creates and manages fake cards for vouchers

## Features

Every feature is related to a route, and every route returns status code 500 if anything breaks internally.

### Card creation

In order to create a card it is needed to send a POST request with a header `x-api-key` and a body with:

```js
{
  cardType, // 'groceries', 'restaurants', 'transport', 'education' or 'health'
  employeeId, // number integer
}
```

This route returns:

- 422 if the body or header is wrong;
- 404 if the `x-api-key` or the `employeeId` does not point to a registered company or employee;
- 403 if the employee already have a card of the same type or if he's registered on another company.
- 201 if everything is ok, and a body with the card information like:

```js
{
}
```
