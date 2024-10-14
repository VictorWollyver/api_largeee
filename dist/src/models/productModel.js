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
const mongodb_1 = require("mongodb");
const conn_1 = __importDefault(require("../db/conn"));
const db = conn_1.default.db('Largeee');
const Products = db.collection('products');
class ProductModel {
    constructor({ color, illustration, name, price, tissue }) {
        this.color = color;
        this.illustration = illustration;
        this.name = name;
        this.price = price;
        this.tissue = tissue;
    }
    static getAllProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            const ProductsList = yield Products.find({}).toArray();
            return ProductsList;
        });
    }
    static getProductByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const Product = yield Products.findOne({ _id: new mongodb_1.ObjectId(id) });
            return Product;
        });
    }
    static getProductsFeatured() {
        return __awaiter(this, void 0, void 0, function* () {
            const Product = yield Products.find({ category: 'featured' }).toArray();
            return Product;
        });
    }
}
exports.default = ProductModel;
