import express from 'express';
import Stripe from "stripe";

const paymentRouter = express.Router();

const stripe = Stripe("sk_test_51KepnpJKJ2MopKJhGPHZlubHUQ2AcvbWdHhQnlCUiGtYekuzfgZTa5d4XuqW73FzFMwMsVZEU1Zr9QJTnIJrRUt300bRt9v6Yw");
const DOMAIN = `https://jiasong214.github.io/events-client/#/payment`;
// const DOMAIN = 'http://localhost:3000/#/payment';

paymentRouter.post('/', async (req, res) => {
  const {eventID, eventName, eventPrice, quantity, seats} = req.body;

  const product = await stripe.products.create({name: eventName});

  const price = await stripe.prices.create({
    product: product.id,
    unit_amount: eventPrice,
    currency: 'aud',
  });

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: price.id,
        quantity: quantity,
      },
    ],
    metadata: {
      'event_id': eventID,
      'seats': seats.toString()
    },
    mode: 'payment',
    success_url: `${DOMAIN}?success=true&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${DOMAIN}?canceled=true`,
  });

  return res.status(200).json(session);
});


paymentRouter.post('/success', async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.body.session_id);

  if(!session) return res.status(404);
  // const customer = await stripe.customers.retrieve(session.customer);

  return res.status(200).json(session);
});


export default paymentRouter;