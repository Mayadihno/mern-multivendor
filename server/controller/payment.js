const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const catchAsyncError = require("../middleware/catchAsyncError");

router.post(
  "/payment-process",
  catchAsyncError(async (req, res, next) => {
    const myPayment = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "usd",
      metadata: {
        company: "maya salon",
      },
    });
    res.status(200).json({
      success: true,
      client_secret: myPayment.client_secret,
    });
  })
);

router.get(
  "/get-stripe-api-key",
  catchAsyncError(async (req, res, next) => {
    res.status(201).json({
      stripeApiKey: process.env.STRIPE_API_KEY,
    });
  })
);

module.exports = router;
