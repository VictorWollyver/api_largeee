import express from "express";
import { config } from "dotenv";
import User from "./routes/user.routes";

config()
const port = process.env.PORT || 3001
const app = express();

app.use(express.json());

app.use("/user", User);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Sucesso" });
});

app.listen(port, () => console.log("Servidor rodando na porta " + process.env.port));
