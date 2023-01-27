import Stripe from "stripe"
import { config } from "dotenv"
import express from "express"

const Payments = express.Router()

const domain = 'http://localhost:3000'

config()

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2022-11-15'
})

Payments.post('/create-checkout-session', async (req, res) => {
  const listProducts: ProductToBuy[] = req.body.listProducts
  const lineItems = listProducts.map(({ name, price, amount }) => {
    return (
      {
        price_data: {
          currency: 'brl',
          product_data: {
            name: name
          },
          unit_amount: price * 100
        },
        quantity: amount
      }
    )
    
  })

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: 'payment',
    success_url: `${domain}/checkout-success`,
    cancel_url: `${domain}/user/cart`,
  });

  res.send(session.url);
});

export default Payments