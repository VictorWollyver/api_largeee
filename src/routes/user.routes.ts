import express from 'express'
import UserController from '../controllers/userController'

const User = express.Router()

User.post('/create', UserController.getUser)

export default User