"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controllers/userController"));
const userMiddlewares_1 = __importDefault(require("../middlewares/userMiddlewares"));
const User = express_1.default.Router();
User.post('/create', userMiddlewares_1.default.verifyIfEmailAlreadyExists, userController_1.default.createUser);
User.post('/login', userController_1.default.loginUser);
User.get('/', userMiddlewares_1.default.verifyIfTokenExists, userMiddlewares_1.default.verifyIfTokenIsValid, userController_1.default.getUser);
User.post('/addProductCart/:product_id', userMiddlewares_1.default.verifyIfTokenExists, userMiddlewares_1.default.verifyIfTokenIsValid, userController_1.default.addProductCart);
User.delete('/removeProductCart/:product_id', userMiddlewares_1.default.verifyIfTokenExists, userMiddlewares_1.default.verifyIfTokenIsValid, userController_1.default.removeProductCart);
User.get('/cart', userMiddlewares_1.default.verifyIfTokenExists, userMiddlewares_1.default.verifyIfTokenIsValid, userController_1.default.getCart);
exports.default = User;
