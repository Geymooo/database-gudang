import db from '../../lib/db';

export default function handler(req, res) {
  if (req.method === 'PUT') {
    const { id, item_name, quantity } = req.body;

    // Validasi input
    if (!id || !Number.isInteger(id)) {
      return res.status(400).json({ error: 'ID harus berupa bilangan bulat.' });
    }
    if (!item_name || typeof item_name !== 'string') {
      return res.status(400).json({ error: 'Nama barang harus berupa string dan tidak boleh kosong.' });
    }
    if (!Number.isInteger(quantity) || quantity < 0) {
      return res.status(400).json({ error: 'Jumlah barang harus berupa bilangan bulat positif.' });
    }

    db.run('UPDATE warehouse SET item_name = ?, quantity = ? WHERE id = ?', [item_name, quantity, id], function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json({ message: 'Item updated' });
    });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}


