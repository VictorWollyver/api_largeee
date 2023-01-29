import { Request, Response } from "express"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from "../models/userModel";
import ProductModel from "../models/productModel";
import cartUserModel from "../models/cartUserModel";
import { config } from "dotenv";

config()
class UserController {

  static async createUser(req: Request, res: Response) {
    const { username, password, email } = req.body;
    bcrypt.hash(password, 10, async (err, hash) => {
      if(err) {
        res.status(400).json({message: err.message})
      } 
      const user = new User(username, hash, email)
      const id = await user.createUser()
      const secret = process.env.JWT_SECRET as string
      const token = jwt.sign({ user_id: id, username: user.username }, secret )
      res.status(201).json({auth: true, token: token})
    })
  }

  static async loginUser(req: Request, res: Response) {
    const { email, password } = req.body
    const user = await User.getUserByEmail(email)
    if(!user) return res.status(404).send('Não existe conta com esse email')
    
    const validatePassword = bcrypt.compareSync(password, user.password)
    if(!validatePassword) return res.status(401).json({auth: false, token: null, message: 'Senha invalida'})

    const secret = process.env.JWT_SECRET as string
    const token = jwt.sign({ user_id: user._id, username: user.username }, secret )

    return res.status(201).json({auth: true, token: token})
  }

  static async getUser(req: Request, res: Response) {
    const { decoded } = res.locals
    res.status(200).json(decoded) 
  }

  static async getCart(req: Request, res: Response) {
    const { decoded } = res.locals
    const cartList = await cartUserModel.getCartByID(decoded.user_id)
    res.status(200).json(cartList)
  }

  static async addProductCart(req: Request, res: Response) {
    const { product_id } = req.params
    const { decoded } = res.locals
    const productUserAlreadyExists = await cartUserModel.verifyIfUserCartAlreadyExists(decoded.user_id, product_id)

    if(productUserAlreadyExists) {
      cartUserModel.updateAmountProduct(decoded.user_id, product_id)
    } else {
      const product = await ProductModel.getProductByID(product_id)
      cartUserModel.addProductCart(product, decoded.user_id)
    }
    res.status(201).json({message: 'Adicionado com Sucesso'})
  }

  static async removeProductCart(req: Request, res: Response) {
    const { product_id } = req.params
    const { decoded } = res.locals
    const productUserAlreadyExists = await cartUserModel.verifyIfUserCartAlreadyExists(decoded.user_id, product_id)

    if(productUserAlreadyExists && productUserAlreadyExists.amount > 1) {
      cartUserModel.removeOneAmountProduct(decoded.user_id, product_id)
      res.status(200).json({message: 'Removido com Sucesso'})
    } else if(productUserAlreadyExists && productUserAlreadyExists.amount === 1) {
      cartUserModel.deleteProductCart(decoded.user_id, product_id)
      res.status(200).json({message: 'Deletado com Sucesso'})
    }
  }
}

export default UserController
