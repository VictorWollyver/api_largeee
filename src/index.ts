import express from "express";
import { config } from "dotenv";
import User from "./routes/user.routes";
import Product from "./routes/product.routes";
import cors from 'cors'




config()
const port = process.env.PORT || 3001
const domain = 'https:localhost:3000'
const app = express();

app.use(express.json());
app.use(cors());
app.use("/user", User);
app.use('/products', Product)

app.get("/", (req, res) => {
  res.status(200).json({ message: "Sucesso" });
});


app.post('/create-checkout-session', async (req, res) => {
    const product = await stripe.products.create()
   const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: '{{PRICE_ID}}',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${domain}?success=true`,
    cancel_url: `${domain}?canceled=true`,
  });

  res.redirect(303, session.url);
})

app.listen(port, () => console.log("Servidor rodando na porta " + port));
