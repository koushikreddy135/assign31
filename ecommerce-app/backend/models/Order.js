const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  order_date: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ['pending', 'shipped', 'delivered'],
    default: 'pending'
  },

  // ONE-TO-MANY: many orders → one customer
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  }
});

module.exports = mongoose.model('Order', orderSchema);