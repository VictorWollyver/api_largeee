import express from 'express'
import ProductController from '../controllers/productController'
import UserMiddlewares from '../middlewares/userMiddlewares'


const Product = express.Router()

Product.get('/', ProductController.getProducts)
Product.get('/featured', ProductController.getProductsFeatured)
Product.get('/:id', ProductController.getProductByID)
Product.post('/:id/comments', UserMiddlewares.verifyIfTokenExists, UserMiddlewares.verifyIfTokenIsValid, ProductController.postNewCommentProduct)
Product.get('/:id/comments', ProductController.getCommentsByProductID)


export default Product