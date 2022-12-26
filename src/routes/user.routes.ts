import express from 'express'
import UserController from '../controllers/userController'

const User = express.Router()

User.post('/create', UserController.createUser)
User.get('/:id', UserController.getUser)
User.post('/:id/addProductCart/:product_id', UserController.addProductCart)
User.get('/:id/cart', UserController.getCartByUserID)

export default User