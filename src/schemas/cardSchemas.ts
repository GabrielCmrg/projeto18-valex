import Joi from 'joi';

export const newCardSchema = Joi.object({
  cardType: Joi
    .string()
    .trim()
    .required()
    .allow(['groceries', 'restaurants', 'transport', 'education', 'health']),
  employeeId: Joi.number().integer().greater(0),
});

export const APIKeySchema = Joi.object({
  'x-api-key': Joi.string().trim().required()
}).unknown(true);
