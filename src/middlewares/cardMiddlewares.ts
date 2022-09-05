import { Request, Response, NextFunction } from 'express';

import { cardSchemas } from '../schemas';

export function checkCreationRequest(req: Request, res: Response, next: NextFunction) {
  const headValidation = cardSchemas.APIKeySchema.validate(req.headers);
  const bodyValidation = cardSchemas.newCardSchema.validate(req.body);
  if (headValidation.error || bodyValidation.error) {
    return res.status(422).send('There is something wrong with your request body or header.');
  }

  res.locals.APIKey = headValidation.value['x-api-key'];
  res.locals.newCardInfo = bodyValidation.value;
  return next();
}

export function checkActivationRequest(req: Request, res: Response, next: NextFunction) {
  const validation = cardSchemas.activateCardSchema.validate(req.body);
  if (validation.error) {
    return res.status(422).send('There is something wrong with your request body.');
  }

  res.locals.activationInfo = validation.value;
  return next();
}
