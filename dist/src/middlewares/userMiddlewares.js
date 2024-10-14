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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
class UserMiddlewares {
    static verifyIfTokenExists(req, res, next) {
        const token = req.headers.authorization;
        if (!token)
            return res.status(401).json({ auth: false, message: 'Nenhum token informado' });
        const tokenFormated = token.replace('Bearer ', '');
        res.locals.tokenFormated = tokenFormated;
        next();
    }
    static verifyIfTokenIsValid(req, res, next) {
        const { tokenFormated } = res.locals;
        jsonwebtoken_1.default.verify(tokenFormated, process.env.JWT_SECRET, (err, decoded) => {
            if (err)
                return res.status(401).json({ auth: false, message: 'create an account to add to cart' });
            res.locals.decoded = decoded;
            next();
        });
    }
    static verifyIfEmailAlreadyExists(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            const user = yield userModel_1.default.getUserByEmail(email);
            if (user) {
                return res.status(400).send('Email já existe');
            }
            next();
        });
    }
}
exports.default = UserMiddlewares;
