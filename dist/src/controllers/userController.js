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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
const productModel_1 = __importDefault(require("../models/productModel"));
const cartUserModel_1 = __importDefault(require("../models/cartUserModel"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
class UserController {
    static createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password, email } = req.body;
            bcrypt_1.default.hash(password, 10, (err, hash) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    res.status(400).json({ message: err.message });
                }
                const user = new userModel_1.default(username, hash, email);
                const id = yield user.createUser();
                const secret = process.env.JWT_SECRET;
                const token = jsonwebtoken_1.default.sign({ user_id: id, username: user.username }, secret);
                res.status(201).json({ auth: true, token: token });
            }));
        });
    }
    static loginUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const user = yield userModel_1.default.getUserByEmail(email);
            if (!user)
                return res.status(404).send('Não existe conta com esse email');
            const validatePassword = bcrypt_1.default.compareSync(password, user.password);
            if (!validatePassword)
                return res.status(401).json({ auth: false, token: null, message: 'Senha invalida' });
            const secret = process.env.JWT_SECRET;
            const token = jsonwebtoken_1.default.sign({ user_id: user._id, username: user.username }, secret);
            return res.status(201).json({ auth: true, token: token });
        });
    }
    static getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { decoded } = res.locals;
            res.status(200).json(decoded);
        });
    }
    static getCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { decoded } = res.locals;
            const cartList = yield cartUserModel_1.default.getCartByID(decoded.user_id);
            res.status(200).json(cartList);
        });
    }
    static addProductCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { product_id } = req.params;
            const { decoded } = res.locals;
            const productUserAlreadyExists = yield cartUserModel_1.default.verifyIfUserCartAlreadyExists(decoded.user_id, product_id);
            if (productUserAlreadyExists) {
                cartUserModel_1.default.updateAmountProduct(decoded.user_id, product_id);
            }
            else {
                const product = yield productModel_1.default.getProductByID(product_id);
                cartUserModel_1.default.addProductCart(product, decoded.user_id);
            }
            res.status(201).json({ message: 'Adicionado com Sucesso' });
        });
    }
    static removeProductCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { product_id } = req.params;
            const { decoded } = res.locals;
            const productUserAlreadyExists = yield cartUserModel_1.default.verifyIfUserCartAlreadyExists(decoded.user_id, product_id);
            if (productUserAlreadyExists && productUserAlreadyExists.amount > 1) {
                cartUserModel_1.default.removeOneAmountProduct(decoded.user_id, product_id);
                res.status(200).json({ message: 'Removido com Sucesso' });
            }
            else if (productUserAlreadyExists && productUserAlreadyExists.amount === 1) {
                cartUserModel_1.default.deleteProductCart(decoded.user_id, product_id);
                res.status(200).json({ message: 'Deletado com Sucesso' });
            }
        });
    }
}
exports.default = UserController;
