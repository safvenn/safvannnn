import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
      name: String,
      quantity: Number,
      price: Number,
    }
  ],
  total: {
    type: Number,
    required: true,
  },
  paid: {
    type: Boolean,
    default: false,
  }
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
