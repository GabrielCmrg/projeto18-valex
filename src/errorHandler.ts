import { Request, Response, NextFunction } from 'express';

export default function errorHandler(
  //Ideally the type should be Error, and treat the error according to it's type inside the method
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(error);
  if (error.type === 'employeeFromAnotherCompany' || error.type === 'duplicateCard') {
    return res.status(403).send(error.message);
  }
  if (error.type === 'noCompany' || error.type === 'noEmployee') {
    return res.status(404).send(error.message);
  }
  return res.status(500).send('Something broke internally');
}
