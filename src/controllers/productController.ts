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
    res.status(200).json(product)
  }

  static async getProductsFeatured(req: Request, res: Response) {
    const product = await ProductModel.getProductsFeatured()
    res.status(200).json(product)
  }

  static async postNewCommentProduct(req: Request, res: Response) {
    const { id } = req.params
    const { comment } = req.body
    const { decoded } = res.locals
    const newComment = new commentProductModel(id, decoded.username, comment)
    newComment.postComment()
    res.status(200).json(newComment)
  }

   static async getCommentsByProductID(req: Request, res: Response) {
    const { id } = req.params
    const comments = await commentProductModel.getCommentPostByID(id)
    res.status(200).json(comments)
  }

}

export default ProductController