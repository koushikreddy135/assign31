const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name:  { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },

  // ONE-TO-MANY: many products → one category
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }
});

module.exports = mongoose.model('Product', productSchema);