import * as jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { BodyLogin } from '../interfaces/users/IUser';

const jwtSecret = process.env.JWT_SECRET || 'secret';
export default class Validations {
  private static passwordMinLength = 6;
  private static emailRegex = /^[a-z0-9]+@[a-z0-9]+\.[a-z0-9]+$/;
  public static isValidEmail(email: string): boolean {
    return this.emailRegex.test(email);
  }

  static validateLogin(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body as BodyLogin;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    if (!Validations.isValidEmail(email) || password.length < Validations.passwordMinLength) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    next();
  }

  static validateToken(req: Request, res: Response, next: NextFunction): Response | void {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }
    try {
      const tokenWithoutBearer = authorization.replace(/^bearer /i, '');
      const jwtVerify = jwt.verify(tokenWithoutBearer, jwtSecret);
      res.locals.token = jwtVerify;

      next();
    } catch (err) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  }

  static validateMatch(req: Request, res: Response, next: NextFunction): Response | void {
    const { homeTeamId, awayTeamId } = req.body;

    if (homeTeamId === awayTeamId) {
      return res.status(422).json(
        { message: 'It is not possible to create a match with two equal teams' },
      );
    }

    next();
  }
}
