const express = require('express');
const CollectorController = require('../controllers/collectorController');

const router = express.Router();

router.get('/', CollectorController.getAll);
router.post('/', CollectorController.add);
router.delete('/:id', CollectorController.delete);

module.exports = router;

