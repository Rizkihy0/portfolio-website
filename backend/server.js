const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ===== Middleware cek password admin =====
function checkAdminKey(req, res, next) {
  const key = req.headers['x-admin-key'];
  if (key !== process.env.ADMIN_KEY) {
    return res.status(401).json({ error: 'Password admin salah' });
  }
  next();
}

// ===== GET semua skills =====
app.get('/api/skills', (req, res) => {
  db.query('SELECT * FROM skills', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

// ===== TAMBAH skill baru =====
app.post('/api/skills', checkAdminKey, (req, res) => {
  const { name } = req.body;
  db.query('INSERT INTO skills (name) VALUES (?)', [name], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: result.insertId, name });
  });
});

// ===== HAPUS skill =====
app.delete('/api/skills/:id', checkAdminKey, (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM skills WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Skill berhasil dihapus' });
  });
});

// ===== GET semua portfolio =====
app.get('/api/portfolio', (req, res) => {
  db.query('SELECT * FROM portfolio', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

// ===== TAMBAH proyek baru =====
app.post('/api/portfolio', checkAdminKey, (req, res) => {
  const { title, description, tags, link, link_text } = req.body;
  db.query(
    'INSERT INTO portfolio (title, description, tags, link, link_text) VALUES (?, ?, ?, ?, ?)',
    [title, description, tags, link, link_text],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: result.insertId, title, description, tags, link, link_text });
    }
  );
});

// ===== HAPUS proyek =====
app.delete('/api/portfolio/:id', checkAdminKey, (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM portfolio WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Proyek berhasil dihapus' });
  });
});

// ===== Route dasar (cek server hidup) =====
app.get('/', (req, res) => {
  res.send('Portfolio Backend API is running');
});

// ===== Nyalakan server (SELALU PALING BAWAH) =====
app.listen(PORT, () => {
  console.log(`Server jalan di http://localhost:${PORT}`);
});