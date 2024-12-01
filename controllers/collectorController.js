const CollectorModel = require('../models/collectorModel');

const CollectorController = {
  getAll: (req, res) => {
    CollectorModel.getAll((err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(results);
    });
  },
  add: (req, res) => {
    const { name, truck_id } = req.body;

    if (!name || !truck_id) {
      return res.status(400).json({ error: 'Name and truck ID are required.' });
    }

    CollectorModel.add({ name, truck_id }, (err, result) => {
      if (err) {
        console.error('Error adding garbage collector:', err.message);
        return res.status(500).json({ error: 'Database error.' });
      }
      res.json({ id: result.insertId, message: 'Garbage collector added successfully.' });
    });
  },
  delete: (req, res) => {
    const { id } = req.params;
    CollectorModel.delete(id, (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ success: true });
    });
  },
};




module.exports = CollectorController;
