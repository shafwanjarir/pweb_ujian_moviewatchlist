# Aplikasi Daftar Tontonan Film - CRUD

Aplikasi full-stack daftar tontonan film dengan backend PHP dan frontend React.

## Tech Stack

- **Backend**: PHP 7.4+ dengan MySQL
- **Frontend**: React 18 dengan Vite
- **Database**: MySQL (via XAMPP)
- **Server**: Apache (via XAMPP)

## Prasyarat

- XAMPP terpasang dan berjalan
- Node.js 16+ dan npm terpasang
- PHP 7.4+ (sudah ada di XAMPP)

## Langkah Setup

### 1. Setup Database

1. Jalankan XAMPP dan pastikan Apache serta MySQL aktif
2. Buka browser dan akses:
   ```
   http://localhost/pweb_ujian_moviewatchlist/backend/setup/create_database.php
   ```
3. Ini akan membuat database `movie_watchlist` dan tabel `movies`

### 2. Setup Backend

1. Salin folder `backend` ke direktori `htdocs` XAMPP:
   ```
   C:\xampp\htdocs\pweb_ujian_moviewatchlist\backend\
   ```
2. Pastikan kredensial database di `backend/api/config.php` sesuai dengan pengaturan MySQL XAMPP Anda (default: root, tanpa kata sandi)

### 3. Setup Frontend

1. Masuk ke direktori frontend:
   ```bash
   cd frontend
   ```

2. Instal dependensi:
   ```bash
   npm install
   ```

3. Perbarui URL API di komponen React jika diperlukan:
   - Default: `http://localhost/pweb_moviewatchlist/backend/api/movies.php`
   - Edit di: `MovieList.jsx`, `MovieDetails.jsx`, `AddEditForm.jsx`

4. Jalankan server pengembangan:
   ```bash
   npm run dev
   ```

5. Buka browser ke:
   ```
   http://localhost:3000
   ```

## Struktur Proyek

```
pweb_moviewatchlist/
├── backend/
│   ├── api/
│   │   ├── config.php          # Konfigurasi database
│   │   └── movies.php          # Endpoint CRUD API
│   └── setup/
│       └── create_database.php # Skrip setup database
├── frontend/
│   ├── src/
│   │   ├── components/         # Komponen React
│   │   ├── styles/             # CSS
│   │   └── App.jsx             # Komponen utama
│   └── package.json            # Dependensi Node
└── README.md
```

## Fitur

- ✅ Create, Read, Update, Delete film
- ✅ Halaman detail film dengan informasi lengkap
- ✅ Pencarian dan filter film
- ✅ Urutkan berdasarkan judul, rating, atau tanggal
- ✅ Beralih antara tampilan poster dan daftar
- ✅ Tambah/edit ulasan untuk film
- ✅ Desain responsif dan ramah mobile
- ✅ Tema sinematik terinspirasi Letterboxd/Netflix
- ✅ PHP aman dengan prepared statements

## Endpoint API

- `GET /api/movies.php` - Ambil semua film
- `GET /api/movies.php?id={id}` - Ambil satu film
- `POST /api/movies.php` - Buat film baru
- `PUT /api/movies.php` - Perbarui film
- `DELETE /api/movies.php` - Hapus film

## Skema Database

```sql
movies (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255),
  description TEXT,
  plot TEXT,
  actors TEXT,
  rating DECIMAL(3,1),
  reviews JSON,
  poster_url VARCHAR(500),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)
```

## Troubleshooting

### Masalah CORS
Jika menemui error CORS, pastikan `config.php` di backend memiliki header CORS yang benar.

### Koneksi Database
Pastikan MySQL di XAMPP berjalan dan cek kredensial di `config.php`.

### API Tidak Ditemukan
Pastikan berkas backend ada di path `htdocs` XAMPP yang benar dan Apache aktif.

## Build Produksi

Untuk build produksi:

```bash
cd frontend
npm run build
```

Berkas hasil build ada di `frontend/dist/` dan dapat dilayani lewat Apache atau server statis lainnya.

## Lisensi

MIT
