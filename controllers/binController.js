const BinModel = require('../models/binModel');

const BinController = {
  getAll: (req, res) => {
    BinModel.getAll((err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(results);
    });
  },
  add: (req, res) => {
    const bin = req.body;
    BinModel.add(bin, (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: result.insertId });
    });
  },
  delete: (req, res) => {
    const { id } = req.params;
    BinModel.delete(id, (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ success: true });
    });
  },
};

module.exports = BinController;
