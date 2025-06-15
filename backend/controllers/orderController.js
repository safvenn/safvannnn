import Order from '../models/Order.js';
import Product from '../models/Product.js';

// Create a new order (checkout)
export const createOrder = async (req, res) => {
  const { items } = req.body;

  try {
    const productsWithDetails = await Promise.all(
      items.map(async (item) => {
        const product = await Product.findById(item.productId);
        return {
          productId: product._id,
          name: product.name,
          quantity: item.quantity,
          price: product.price,
        };
      })
    );

    const total = productsWithDetails.reduce((sum, item) => sum + item.quantity * item.price, 0);

    const order = await Order.create({
      user: req.user._id,
      items: productsWithDetails,
      total,
      paid: true, // Assume payment done for now
    });

    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Order creation failed' });
  }
};

// Get logged-in user's orders
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort('-createdAt');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

// Admin: Get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email').sort('-createdAt');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch all orders' });
  }
};
