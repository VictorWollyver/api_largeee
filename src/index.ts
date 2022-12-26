import express from "express";
import { config } from "dotenv";
import User from "./routes/user.routes";
import Product from "./routes/product.routes";

config()
const port = process.env.PORT || 3001
const app = express();

app.use(express.json());
app.use("/user", User);
app.use('/products', Product)

app.get("/", (req, res) => {
  res.status(200).json({ message: "Sucesso" });
});

app.listen(port, () => console.log("Servidor rodando na porta " + port));
