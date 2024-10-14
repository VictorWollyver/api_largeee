"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_1 = __importDefault(require("../controllers/productController"));
const userMiddlewares_1 = __importDefault(require("../middlewares/userMiddlewares"));
const Product = express_1.default.Router();
Product.get('/', productController_1.default.getProducts);
Product.get('/featured', productController_1.default.getProductsFeatured);
Product.get('/:id', productController_1.default.getProductByID);
Product.post('/:id/comments', userMiddlewares_1.default.verifyIfTokenExists, userMiddlewares_1.default.verifyIfTokenIsValid, productController_1.default.postNewCommentProduct);
Product.get('/:id/comments', productController_1.default.getCommentsByProductID);
exports.default = Product;
