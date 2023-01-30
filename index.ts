import express from "express";
import { config } from "dotenv";
import User from "./src/routes/user.routes";
import Product from "./src/routes/product.routes";
import Payments from "./src/payments/server";
import cors from 'cors'

config()
const port = process.env.PORT || 3001

const app = express();

app.use((req, res, next) => {
	//Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});

app.use(express.json());
app.use("/user", User);
app.use('/products', Product)
app.use('/payments', Payments)

app.get("/", (req, res) => {
  res.status(200).json({ message: "Sucesso" });
});

app.listen(port, () => console.log("Servidor rodando na porta " + port));
