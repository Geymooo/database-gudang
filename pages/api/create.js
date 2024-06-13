import db from '../../lib/db';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { item_name, quantity } = req.body;

    // Validasi input
    if (!item_name || typeof item_name !== 'string') {
      return res.status(400).json({ error: 'Nama barang harus berupa string dan tidak boleh kosong.' });
    }
    if (!Number.isInteger(quantity) || quantity < 0) {
      return res.status(400).json({ error: 'Jumlah barang harus berupa bilangan bulat positif.' });
    }

    db.run('INSERT INTO warehouse (item_name, quantity) VALUES (?, ?)', [item_name, quantity], function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json({ message: 'Item created', id: this.lastID });
    });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}