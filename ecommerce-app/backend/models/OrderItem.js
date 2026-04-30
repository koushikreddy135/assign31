const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  quantity:   { type: Number, required: true },
  unit_price: { type: Number, required: true },

  // MANY-TO-MANY junction: order_id + product_id are reference keys
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  }
});

module.exports = mongoose.model('OrderItem', orderItemSchema);