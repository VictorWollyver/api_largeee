import express from 'express'
import UserController from '../controllers/userController'
import UserMiddlewares from "../middlewares/userMiddlewares";

const User = express.Router()

User.post('/create', UserMiddlewares.verifyIfEmailAlreadyExists, UserController.createUser)

User.post('/login', UserController.loginUser)

User.get('/', UserMiddlewares.verifyIfTokenExists, UserMiddlewares.verifyIfTokenIsValid, UserController.getUser)

User.post('/addProductCart/:product_id', UserMiddlewares.verifyIfTokenExists, UserMiddlewares.verifyIfTokenIsValid, UserController.addProductCart)

User.get('/cart', UserMiddlewares.verifyIfTokenExists, UserMiddlewares.verifyIfTokenIsValid, UserController.getCart)

export default User