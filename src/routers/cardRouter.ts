import { Router } from 'express';

import { cardMiddlewares } from '../middlewares';
import { cardController } from '../controllers';

const cardRouter = Router();

cardRouter.post('/cards', cardMiddlewares.checkCreationRequest, cardController.createCard);

export default cardRouter;
