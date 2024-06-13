import db from '../../lib/db';

export default function handler(req, res) {
  db.all('SELECT * FROM warehouse', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ items: rows });
  });
}
