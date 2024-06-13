const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(process.cwd(), 'lib', 'warehouse.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Failed to connect to the database:', err);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS warehouse (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      item_name TEXT,
      quantity INTEGER
    )
  `);
});

module.exports = db;
