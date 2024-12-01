// const db = require('../database');

const updateBinFromCOMPort = (distance, latitude, longitude) => {
  const sql = `UPDATE bins SET level = ? WHERE latitude = ? AND longitude = ?`;
  db.query(sql, [distance, latitude, longitude], (err, result) => {
    if (err) console.error('Error updating bins:', err.message);
    else console.log('Database updated:', result);
  });
};

module.exports = { updateBinFromCOMPort };


const db = require('../database');

const BinModel = {
  getAll: (callback) => {
    const sql = 'SELECT * FROM bins';
    db.query(sql, callback);
  },
  add: (bin, callback) => {
    const sql = `INSERT INTO bins (latitude, longitude, level, description)
                 VALUES (?, ?, ?, ?)`;
    const values = [bin.latitude, bin.longitude, bin.level, bin.description];
    db.query(sql, values, callback);
  },
  update: (bin, callback) => {
    const sql = `UPDATE bins SET level = ? WHERE latitude = ? AND longitude = ?`;
    const values = [bin.level, bin.latitude, bin.longitude];
    db.query(sql, values, callback);
  },
  delete: (id, callback) => {
    const sql = 'DELETE FROM bins WHERE id = ?';
    db.query(sql, [id], callback);
  },
  findByLocation: (latitude, longitude, callback) => {
    const sql = `SELECT id FROM bins WHERE latitude = ? AND longitude = ?`;
    db.query(sql, [latitude, longitude], callback);
  },
};

module.exports = BinModel;
