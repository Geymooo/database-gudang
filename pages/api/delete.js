import db from '../../lib/db';

export default function handler(req, res) {
  if (req.method === 'DELETE') {
    const { id } = req.body;

    // Validasi input
    if (!id || !Number.isInteger(id)) {
      return res.status(400).json({ error: 'ID harus berupa bilangan bulat.' });
    }

    db.run('DELETE FROM warehouse WHERE id = ?', [id], function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json({ message: 'Item deleted' });
    });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
