const db = require('../database');

const TruckModel = {
  getAll: (callback) => {
    const sql = 'SELECT * FROM trucks';
    db.query(sql, callback);
  },
  add: (truck, callback) => {
    const sql = `INSERT INTO trucks (vehicle_number, driver_name, latitude, longitude, description)
                 VALUES (?, ?, ?, ?, ?)`;
    const values = [truck.vehicle_number, truck.driver_name, truck.latitude, truck.longitude, truck.description];
    db.query(sql, values, callback);
  },
  delete: (id, callback) => {
    const sql = 'DELETE FROM trucks WHERE id = ?';
    db.query(sql, [id], callback);
  },
};

module.exports = TruckModel;
