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
const cart = db.collection('cart_user');
class cartUserModel {
    static addProductCart({ color, illustration, name, price, tissue, src, _id }, id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield cart.insertOne({ user_id: id, product_id: _id, color, illustration, name, price, tissue, src, amount: 1 });
        });
    }
    static getCartByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const listCart = yield cart.find({ user_id: id }).toArray();
            return listCart;
        });
    }
    static verifyIfUserCartAlreadyExists(user_id, product_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const alreadyExists = yield cart.findOne({ user_id: user_id, product_id: new mongodb_1.ObjectId(product_id) });
            return alreadyExists;
        });
    }
    static updateAmountProduct(user_id, product_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const update = yield cart.updateOne({ user_id: user_id, product_id: new mongodb_1.ObjectId(product_id) }, { $inc: { amount: 1 } });
            return update;
        });
    }
    static removeOneAmountProduct(user_id, product_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const update = yield cart.updateOne({ user_id: user_id, product_id: new mongodb_1.ObjectId(product_id) }, { $inc: { amount: -1 } });
            return update;
        });
    }
    static deleteProductCart(user_id, product_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleted = yield cart.deleteOne({ user_id: user_id, product_id: new mongodb_1.ObjectId(product_id) });
            return deleted;
        });
    }
}
exports.default = cartUserModel;
