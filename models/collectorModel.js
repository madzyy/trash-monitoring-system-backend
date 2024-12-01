const db = require('../database');

const CollectorModel = {
    getAll: (callback) => {
        const sql = `
          SELECT 
            gc.id AS collector_id, 
            gc.name AS collector_name, 
            gc.truck_id, 
            t.vehicle_number AS truck_number 
          FROM garbage_collectors gc
          LEFT JOIN trucks t ON gc.truck_id = t.id
        `;
        db.query(sql, callback);
      },
  add: (collector, callback) => {
    const sql = `INSERT INTO garbage_collectors (name, truck_id) VALUES (?, ?)`;
    const values = [collector.name, collector.truck_id];
    db.query(sql, values, callback);
  },
  delete: (id, callback) => {
    const sql = 'DELETE FROM garbage_collectors WHERE id = ?';
    db.query(sql, [id], callback);
  },
};

module.exports = CollectorModel;
