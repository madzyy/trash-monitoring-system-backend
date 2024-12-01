const express = require('express');
const TruckController = require('../controllers/truckController');

const router = express.Router();

router.get('/', TruckController.getAll);
router.post('/', TruckController.add);
router.delete('/:id', TruckController.delete);

module.exports = router;
