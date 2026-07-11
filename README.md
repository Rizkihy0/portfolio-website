# Portfolio Website - Muhammad Rizki Haryo Putro

## Deskripsi
Website portofolio pribadi (personal branding website) yang dibangun sebagai tugas mandiri magang. Menampilkan profil, skill, proyek, dan kontak sebagai calon profesional di bidang IT.

## Tech Stack
- HTML5 (native)
- CSS3 (native)
- JavaScript (Vanilla/native)

**Alasan memilih stack ini:**
karena tujuan utama tugas ini adalah membuktikan pemahaman 100% terhadap kode yang ditulis sendiri, bukan sekadar merangkai komponen dari framework/library besar. Stack ini juga paling ringan untuk di-deploy sebagai static site.

## Struktur Halaman
- Navbar
- Hero Section
- About Me
- Skills & Tools
- Portfolio/Projects
- Contact & Socials
- Footer

## Konsep Visual
- Warna utama: biru muda (`#4FA8E0`)
- Warna teks: hitam/abu gelap (`#1A1A1A`) untuk kontras dan keterbacaan
- Font: Poppins (heading) + Inter (body)
- Mode: Light mode

## Timeline
- [x] Hari 1: Planning & setup
- [x] Hari 2: Slicing UI (Hero, About, Skills)
- [x] Hari 3: Portfolio, Contact, responsivitas
- [x] Hari 4: Deployment

## Update: CMS & Backend (Fitur Tambahan)

Selain requirement awal (HTML/CSS/JS statis), website ini dikembangkan lebih lanjut menjadi **dinamis** dengan menambahkan backend dan database, supaya konten Skills dan Portfolio bisa dikelola tanpa perlu edit kode langsung.

### Arsitektur
Frontend (index.html)  →  Backend API (Node.js)  →  Database (MySQL)
↑
Admin Panel (admin.html) — untuk kelola data (tambah/hapus)

### Tech Stack Tambahan

| Bagian | Teknologi |
|---|---|
| Backend | Node.js + Express.js |
| Database | MySQL |
| Autentikasi Admin | Password sederhana lewat HTTP header (`x-admin-key`) |

### Struktur Folder Backend
backend/
├── server.js       # Entry point, definisi semua API endpoint
├── db.js           # Koneksi ke database MySQL
├── .env            # Konfigurasi sensitif (tidak di-push ke Git)
└── package.json

### API Endpoints

| Method | Endpoint | Fungsi | Butuh Password? |
|---|---|---|---|
| GET | `/api/skills` | Ambil semua skill | Tidak |
| POST | `/api/skills` | Tambah skill baru | Ya |
| DELETE | `/api/skills/:id` | Hapus skill | Ya |
| GET | `/api/portfolio` | Ambil semua proyek | Tidak |
| POST | `/api/portfolio` | Tambah proyek baru | Ya |
| DELETE | `/api/portfolio/:id` | Hapus proyek | Ya |

### Cara Menjalankan Backend (Local)

1. Masuk ke folder `backend`: `cd backend`
2. Install dependency: `npm install`
3. Buat file `.env` berisi kredensial database (lihat `.env.example` jika ada)
4. Jalankan server: `node server.js`
5. Server berjalan di `http://localhost:3000`

### Admin Panel

Akses `admin.html` untuk menambah/menghapus Skills dan Portfolio melalui form, tanpa perlu menulis query SQL manual.