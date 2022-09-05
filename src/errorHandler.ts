import { Request, Response, NextFunction } from 'express';

export default function errorHandler(
  //Ideally the type should be Error, and treat the error according to it's type inside the method
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(error);
  return res.status(500).send('Something broke internally');
}
