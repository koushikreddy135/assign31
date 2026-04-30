const router = require('express').Router();
const Category = require('../models/Category');

router.get('/', async (req, res) => res.json(await Category.find()));
router.post('/', async (req, res) => res.json(await Category.create(req.body)));
router.delete('/:id', async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;