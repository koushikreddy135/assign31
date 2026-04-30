const router = require('express').Router();
const Customer = require('../models/Customer');

router.get('/', async (req, res) => res.json(await Customer.find()));
router.post('/', async (req, res) => res.json(await Customer.create(req.body)));
router.delete('/:id', async (req, res) => {
  await Customer.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;