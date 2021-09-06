const router = require('express').Router();
const Stripe = require('stripe')

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/', async (req, res) => {
  try {
    const { id, amount } = req.body;
    const payment = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      payment_method: id,
      description: 'Test payment for gaming keyboard',
      confirm: true
      // payment_method_types: ['card'],
      // receipt_email: req.body.email,
      // metadata: { integration_check: 'accept_a_payment' },
    })
    console.log(payment);
    res.send({ msg: 'Payment successful' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: error.raw.message });
  }

});

module.exports = router