const router = require('express').Router();
const Product = require('../models/Product');

router.get('/', async (req, res) =>
  res.json(await Product.find().populate('category_id'))
);
router.post('/', async (req, res) => res.json(await Product.create(req.body)));
router.delete('/:id', async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;