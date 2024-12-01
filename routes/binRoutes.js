const express = require('express');
const BinController = require('../controllers/binController');

const router = express.Router();

router.get('/', BinController.getAll);
router.post('/', BinController.add);
router.delete('/:id', BinController.delete);

module.exports = router;
