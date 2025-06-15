import express from 'express';
import { createOrder, getMyOrders, getAllOrders } from '../controllers/orderController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/checkout', protect, createOrder);          // Checkout
router.get('/orders', protect, getMyOrders);  // My orders
router.get('/', protect, isAdmin, getAllOrders); // Admin only

export default router;
