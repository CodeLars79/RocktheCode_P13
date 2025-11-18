const Stripe = require('stripe')
const Poster = require('../models/poster')
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const createCheckoutSession = async (req, res, next) => {
  try {
    const { posterId } = req.body
    const poster = await Poster.findById(posterId)

    if (!poster) {
      return res.status(404).json({ message: 'Poster not found' })
    }

    if (poster.price === 0) {
      return res
        .status(400)
        .json({ message: 'Poster is free; no payment required.' })
    }

    const frontendUrl = process.env.FRONTEND_URL

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: poster.title,
              images: [poster.image]
            },
            unit_amount: Math.round(poster.price * 100)
          },
          quantity: 1
        }
      ],
      success_url: `${frontendUrl}/success`,
      cancel_url: `${frontendUrl}/cancel`
    })

    res.json({ url: session.url })
  } catch (error) {
    console.error('Stripe session error:', error)
    res.status(500).json({
      message: 'Error creating checkout session',
      error: error.message
    })
  }
}

module.exports = { createCheckoutSession }
