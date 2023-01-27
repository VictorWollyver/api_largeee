import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/userModel";

class UserMiddlewares {

  static verifyIfTokenExists(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization
    if(!token) return res.status(401).json({ auth: false, message: 'Nenhum token informado'})
    const tokenFormated = token.replace('Bearer ', '')
    res.locals.tokenFormated = tokenFormated
    next()
  }

  static verifyIfTokenIsValid(req: Request, res: Response, next: NextFunction) {
    const { tokenFormated } = res.locals
    jwt.verify(tokenFormated, process.env.JWT_SECRET as string, (err: any , decoded: any) => {
      if(err) return res.status(401).json({auth: false, message: 'create an account to add to cart'})
      res.locals.decoded = decoded
      next()
    })
  }

  static async verifyIfEmailAlreadyExists(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body
    const user = await User.getUserByEmail(email)

    if(user) {
      return res.status(400).send('Email já existe')
    }
    next()
  }
}

export default UserMiddlewares