const functions = require("firebase-functions");
const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors({ origin: true }));
app.use(express.json());

// ✅ Use your Razorpay Test Keys from Firebase environment variables
const razorpay = new Razorpay({
  key_id: functions.config().razorpay.key_id,
  key_secret: functions.config().razorpay.key_secret,
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

// Export as Firebase Function
exports.api = functions.https.onRequest(app);
