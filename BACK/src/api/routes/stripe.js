const express = require('express')
const { isAuth } = require('../../middleware/isAuth')
const { createCheckoutSession } = require('../controllers/stripe')

const router = express.Router()

router.post('/create-checkout-session', isAuth, createCheckoutSession)

module.exports = router
