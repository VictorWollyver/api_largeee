import express from "express";
import { config } from "dotenv";
import User from "./src/routes/user.routes";
import Product from "./src/routes/product.routes";
import Payments from "./src/payments/server";
import cors from 'cors'

config()
const port = process.env.PORT

const app = express();

app.use(cors())

app.use(express.json());
app.use("/user", User);
app.use('/products', Product)
app.use('/payments', Payments)

app.get("/", (req, res) => {
  res.status(200).json({ message: "Sucesso" });
});

app.listen(port, () => console.log("Servidor rodando na porta " + port));
