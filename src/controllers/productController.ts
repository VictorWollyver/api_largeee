import { Request, Response } from "express";
import ProductModel from "../models/productModel";
import commentProductModel from "../models/commentProductModel";

class ProductController {

  static async getProducts(req: Request, res: Response) {
    const products = await ProductModel.getAllProducts()
    res.status(200).json(products)
  }

  static async getProductByID(req: Request, res: Response) {
    const { id } = req.params
    const product = await ProductModel.getProductByID(id)
    const comments = await commentProductModel.getCommentPostByID(id)
    res.status(200).json({...product, comments})
  }

  static async postNewCommentProduct(req: Request, res: Response) {
    const { id } = req.params
    const { author, comment } = req.body
    const newComment = new commentProductModel(id, author, comment)
    newComment.postComment()
    res.status(200).json(newComment)
  }

}

export default ProductController