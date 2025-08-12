const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors({ origin: true }));
app.use(express.json());

// ✅ Use Razorpay Keys from Vercel Environment Variables
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create order endpoint
app.post("/create-order", async (req, res) => {
  try {
    const options = {
      amount: req.body.amount * 100, // amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating order");
  }
});

// Root endpoint
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Export for Vercel
module.exports = app;
