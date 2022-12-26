import { Request, Response } from "express"
import User from "../models/userModel";
import ProductModel from "../models/productModel";
import cartUserModel from "../models/cartUserModel";
class UserController {

  static async createUser(req: Request, res: Response) {
    const { username, password } = req.body;
    const user = new User(username, password)
    const id = await user.createUser()
    res.status(201).json({id, username, password})
  }

  static async getUser(req: Request, res: Response) {
    const { id } = req.params
    const user = await User.getUserByID(id)
    res.status(200).json(user)
  }

  static async getCartByUserID(req: Request, res: Response) {
    const { id } = req.params
    const cartList = await cartUserModel.getCartByID(id)
    res.status(200).json(cartList)
  }

  static async addProductCart(req: Request, res: Response) {
    const { id, product_id } = req.params
    const product = await ProductModel.getProductByID(product_id)
    cartUserModel.addProductCart(product, id)
    res.status(201).json({message: 'Adicionado com Sucesso'})
  }
}

export default UserController
