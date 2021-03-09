import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export function checkAuthorization(req: Request, res: Response, next: NextFunction) {
  try {
    console.log(req.headers, process.env.SECRET_KEY);
    // const token = req.headers.authorization.split(' ')[1];
    // const decodedToken = jwt.verify(token, process.env.SECRET_KEY as string) as { email?: string };
    // const userEmail = decodedToken.email;
    // if (req.body.userEmail && req.body.userEmail !== userEmail) {
    //   res.status(401).json({ status: 'ERROR_EMAIL', error: new Error('Invalid user email!') });
    // } else {
    //   next();
    // }
  } catch {
    res.status(401).json({
      status: 'ERROR_EMAIL',
      error: new Error('Invalid request!'),
    });
  }
}
