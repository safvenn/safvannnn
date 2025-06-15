import express from 'express';

const router = express.Router();

router.post('/process-order', async (req, res) => {
  const { cart, email, shipping, paymentMethod } = req.body;

  // Debug log
  

  // Validate required fields
  if (
    !cart || cart.length === 0 ||
    !email ||
    !shipping ||
    !shipping.address || !shipping.city || !shipping.postalCode || !shipping.country ||
    !paymentMethod
  ) {
    return res.json({ success: false, message: 'Missing required fields.' });
  }

  try {
    // Mock order processing
    const order = {
      cart,
      email,
      shipping,
      paymentMethod,
      status: paymentMethod === 'Cash on Delivery' ? 'Pending' : 'Paid',
      createdAt: new Date()
    };

    console.log('Order saved:', order); // Simulate DB save

    res.json({ success: true, message: 'Order processed successfully.' });
  } catch (err) {
    console.error('Order error:', err);
    res.status(500).json({ success: false, message: 'Server error processing order.' });
  }
});

export default router;