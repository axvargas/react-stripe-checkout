const router = require('express').Router();

const checkoutRouter = require('./api/checkout');

router.use('/checkout', checkoutRouter)

module.exports = router