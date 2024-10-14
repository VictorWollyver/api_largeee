"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const productModel_1 = __importDefault(require("../models/productModel"));
const commentProductModel_1 = __importDefault(require("../models/commentProductModel"));
class ProductController {
    static getProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield productModel_1.default.getAllProducts();
            res.status(200).json(products);
        });
    }
    static getProductByID(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const product = yield productModel_1.default.getProductByID(id);
            res.status(200).json(product);
        });
    }
    static getProductsFeatured(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield productModel_1.default.getProductsFeatured();
            res.status(200).json(product);
        });
    }
    static postNewCommentProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { comment } = req.body;
            const { decoded } = res.locals;
            const newComment = new commentProductModel_1.default(id, decoded.username, comment);
            newComment.postComment();
            res.status(200).json(newComment);
        });
    }
    static getCommentsByProductID(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const comments = yield commentProductModel_1.default.getCommentPostByID(id);
            res.status(200).json(comments);
        });
    }
}
exports.default = ProductController;
