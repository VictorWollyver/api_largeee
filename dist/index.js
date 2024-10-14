"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const user_routes_1 = __importDefault(require("./src/routes/user.routes"));
const product_routes_1 = __importDefault(require("./src/routes/product.routes"));
const server_1 = __importDefault(require("./src/payments/server"));
const cors_1 = __importDefault(require("cors"));
(0, dotenv_1.config)();
const port = process.env.PORT;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/user", user_routes_1.default);
app.use('/products', product_routes_1.default);
app.use('/payments', server_1.default);
app.get("/", (req, res) => {
    res.status(200).json({ message: "Sucesso" });
});
app.listen(port, () => console.log("Servidor rodando na porta " + port));
