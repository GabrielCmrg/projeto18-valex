import Joi from 'joi';

export const newCardSchema = Joi.object({
  cardType: Joi
    .string()
    .trim()
    .required()
    .allow('groceries', 'restaurants', 'transport', 'education', 'health'),
  employeeId: Joi.number().integer().greater(0).required(),
});

export const APIKeySchema = Joi.object({
  'x-api-key': Joi.string().trim().required()
}).unknown(true);

export const activateCardSchema = Joi.object({
  cardId: Joi.number().integer().greater(0).required(),
  securityCode: Joi.string().trim().required().pattern(/^[0-9]{3}$/),
  password: Joi.string().trim().required(),
});
