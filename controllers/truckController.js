const TruckModel = require('../models/truckmodel');

const TruckController = {
  getAll: (req, res) => {
    TruckModel.getAll((err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(results);
    });
  },
  add: (req, res) => {
    const truck = req.body;
    TruckModel.add(truck, (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: result.insertId });
    });
  },
  delete: (req, res) => {
    const { id } = req.params;
    TruckModel.delete(id, (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ success: true });
    });
  },
};

module.exports = TruckController;
