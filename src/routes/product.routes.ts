import express from 'express'
import ProductController from '../controllers/productController'


const Product = express.Router()

Product.get('/', ProductController.getProducts)
Product.get('/:id', ProductController.getProductByID)
Product.post('/:id/comment', ProductController.postNewCommentProduct)


export default Product