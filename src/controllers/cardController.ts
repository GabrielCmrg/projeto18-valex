import { Request, Response } from 'express';

import { createNewCard } from '../services/cardService';

export async function createCard(req: Request, res: Response) {
  const { APIKey, newCardInfo } = res.locals;
  const { cardType, employeeId } = newCardInfo;
  const card = await createNewCard(APIKey, employeeId, cardType);
  return res.status(201).json(card);
}
