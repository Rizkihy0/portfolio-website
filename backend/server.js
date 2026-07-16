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

// ===== GET semua education =====
app.get('/api/education', (req, res) => {
  db.query('SELECT * FROM education ORDER BY id ASC', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// ===== TAMBAH education baru =====
app.post('/api/education', checkAdminKey, (req, res) => {
  const { level, institution, major, year_start, year_end, description } = req.body;
  db.query(
    'INSERT INTO education (level, institution, major, year_start, year_end, description) VALUES (?, ?, ?, ?, ?, ?)',
    [level, institution, major, year_start, year_end, description],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: result.insertId, level, institution, major, year_start, year_end, description });
    }
  );
});

// ===== EDIT education =====
app.put('/api/education/:id', checkAdminKey, (req, res) => {
  const { id } = req.params;
  const { level, institution, major, year_start, year_end, description } = req.body;
  db.query(
    'UPDATE education SET level = ?, institution = ?, major = ?, year_start = ?, year_end = ?, description = ? WHERE id = ?',
    [level, institution, major, year_start, year_end, description, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Riwayat pendidikan berhasil diperbarui' });
    }
  );
});

// ===== HAPUS education =====
app.delete('/api/education/:id', checkAdminKey, (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM education WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Riwayat pendidikan berhasil dihapus' });
  });
});

// ===== GET semua site content =====
app.get('/api/content', (req, res) => {
  db.query('SELECT * FROM site_content', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    const content = {};
    results.forEach(row => {
      content[row.content_key] = row.content_value;
    });
    res.json(content);
  });
});

// ===== UPDATE satu site content =====
app.put('/api/content/:key', checkAdminKey, (req, res) => {
  const { key } = req.params;
  const { value } = req.body;

  db.query(
    'UPDATE site_content SET content_value = ? WHERE content_key = ?',
    [value, key],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ key, value });
    }
  );
});

// ===== Route dasar (cek server hidup) =====
app.get('/', (req, res) => {
  res.send('Portfolio Backend API is running');
});

// ===== Nyalakan server (SELALU PALING BAWAH) =====
app.listen(PORT, () => {
  console.log(`Server jalan di http://localhost:${PORT}`);
});