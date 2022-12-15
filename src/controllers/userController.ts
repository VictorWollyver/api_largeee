import { Request, Response } from "express"

class UserController {
  username: string
  password: string
  constructor(username: string, password: string) {
    this.username = username
    this.password = password
  }

  static getUser(req: Request, res: Response) {
    const { username, password } = req.body
    res.status(200).json({username, password})
  }
}

export default UserController