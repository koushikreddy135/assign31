const router = require('express').Router();
const Order     = require('../models/Order');
const OrderItem = require('../models/OrderItem');

router.get('/', async (req, res) => {
  const orders = await Order.find().populate('customer_id');
  const result = await Promise.all(orders.map(async (order) => {
    const items = await OrderItem.find({ order_id: order._id }).populate('product_id');
    return { ...order.toObject(), items };
  }));
  res.json(result);
});

router.post('/', async (req, res) => {
  const { customer_id, status, items } = req.body;
  const order = await Order.create({ customer_id, status });
  const orderItems = await Promise.all(
    items.map(item =>
      OrderItem.create({
        order_id: order._id,
        product_id: item.product_id,
        quantity: item.quantity,
        unit_price: item.unit_price
      })
    )
  );
  res.json({ order, orderItems });
});

router.delete('/:id', async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);
  await OrderItem.deleteMany({ order_id: req.params.id });
  res.json({ message: 'Deleted' });
});

module.exports = router;