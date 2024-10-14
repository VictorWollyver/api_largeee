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
const stripe_1 = __importDefault(require("stripe"));
const dotenv_1 = require("dotenv");
const express_1 = __importDefault(require("express"));
const Payments = express_1.default.Router();
const domain = 'https://largeee.vercel.app/';
(0, dotenv_1.config)();
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2022-11-15'
});
Payments.post('/create-checkout-session', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listProducts = req.body.listProducts;
    const lineItems = listProducts.map(({ name, price, amount }) => {
        return ({
            price_data: {
                currency: 'brl',
                product_data: {
                    name: name
                },
                unit_amount: price * 100
            },
            quantity: amount
        });
    });
    const session = yield stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: 'payment',
        success_url: `${domain}/checkout-success`,
        cancel_url: `${domain}/user/cart`,
    });
    res.send(session.url);
}));
exports.default = Payments;
