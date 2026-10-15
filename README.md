# Lelap Home - Interactive Data Dashboard

**PTS Pemrograman Web - Teknik Komputer, Universitas Borneo Tarakan (2026)**

## 1. Identitas

| | |
|---|---|
| Nama | Syafira Az-Zahra |
| NIM | 2440304013 |
| Kelas | [ISI] |
| Kode MK | 26TJ453127 |
| Repository | https://github.com/syafira-azzahra/lelap-home |
| Video demo | [ISI link video] |

## 2. Nama Aplikasi dan Deskripsi

**Lelap Home** adalah dashboard katalog perlengkapan kamar dan rumah. Aplikasi mengambil data produk dari REST API DummyJSON, menampilkannya sebagai kartu, menyediakan filter dan statistik yang dihitung dengan JavaScript, serta form pendaftaran dengan validasi.

Konteks penggunaan: etalase digital untuk pengunjung yang ingin melihat dan menyaring produk perlengkapan rumah. Aplikasi ini adalah **dashboard data, bukan toko online**, sehingga tidak ada fitur pemesanan.

Catatan kemasan:
- Tema "perlengkapan rumah" hanyalah kemasan. Data tetap berasal dari DummyJSON, dan aplikasi hanya menampilkan tiga kategori yang relevan: `furniture`, `home-decoration`, `kitchen-accessories` (disaring dengan `filter()` di JavaScript).
- Harga asli dari API dalam USD. Untuk tampilan, harga dikonversi ke rupiah dengan kurs tetap perkiraan Rp 16.000 per 1 USD.
- [Hapus baris ini jika tidak ada section Kontak] Informasi pada section Kontak adalah data contoh, bukan toko sungguhan.

## 3. Perhitungan Varian Berdasarkan NIM

Tiga digit terakhir NIM: **013**, sehingga X = 0, Y = 1, Z = 3.

| Digit | Nilai | Hasil |
|---|---|---|
| X | 0 | Dataset **Products** |
| Y | 1 | Fitur **Filter data + statistik sederhana** |
| Z | 3 | Validasi **minimal satu kategori/preferensi dipilih** |

Challenge: S = X + Y + Z = 0 + 1 + 3 = 4, C = 4 mod 4 = **0**, yaitu **Light/Dark Mode** dengan preferensi disimpan di localStorage.

## 4. Dataset / API

- Sumber: DummyJSON
- Endpoint: `https://dummyjson.com/products?limit=0`
- Metode: `GET` dengan Fetch API dan `async/await`
- Data diambil sekali, lalu disaring dan diolah di sisi browser.

## 5. Fitur Utama dan Challenge

- **Data produk dari REST API**, tampil sebagai kartu (gambar, nama, harga rupiah, kategori, rating).
- **Filter (Y=1)**: berdasarkan kategori dan harga maksimal (Rp).
- **Statistik (Y=1)**: harga rata-rata, produk termahal, dan jumlah kategori. Dihitung dengan `reduce()`, `map()`, dan `Set`, serta ikut berubah mengikuti hasil filter.
- **Form dengan validasi (Z=3)**: nama wajib diisi dan minimal satu kategori favorit harus dicentang. Pesan error berupa teks (dengan ikon), bukan hanya warna. Pesan sukses muncul saat valid.
- **Light/Dark Mode (C=0)**: tombol toggle, pilihan disimpan di `localStorage` dengan kunci `lelapHome_tema`.
- **Loading, success, dan error state** pada `#status`.
- **Responsive** (CSS Grid dan Flexbox) dan **dapat dipakai dengan keyboard**.

Teknologi: HTML, CSS, dan Vanilla JavaScript. Tidak memakai framework atau library.

## 6. Cara Menjalankan

1. Clone repository:
   ```
   git clone https://github.com/syafira-azzahra/lelap-home.git
   ```
2. Buka folder `lelap-home`.
3. Buka `index.html` di browser, atau jalankan dengan Live Server (VS Code) atau Laragon (`http://localhost/nama-folder`).
4. Koneksi internet diperlukan karena data diambil dari DummyJSON.

Struktur folder:

```
lelap-home/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── app.js
├── README.md
└── AI_USAGE.md
```

## 7. Screenshot

| Tampilan | File |
|---|---|
| Desktop (terang) | [ISI: screenshots/desktop-terang.png] |
| Desktop (gelap) | [ISI: screenshots/desktop-gelap.png] |
| Mobile | [ISI: screenshots/mobile.png] |
| Error state | [ISI: screenshots/error.png] |

## 8. Endpoint REST API

| Method | URL | Kegunaan |
|---|---|---|
| GET | `https://dummyjson.com/products?limit=0` | Mengambil seluruh produk |

Referensi daftar kategori: `https://dummyjson.com/products/categories`

## 9. Jawaban 10 Pertanyaan Penjelasan Kode

> **Penting:** tulis jawaban dengan kata-katamu sendiri setelah kamu paham kodenya. Di bawah ini hanya petunjuk isi. Hapus petunjuknya setelah jawabanmu selesai.

**1. Alur dari halaman dibuka sampai data tampil.**
Petunjuk: sebut urutan `<script defer>` dimuat, `muatTema()`, pemasangan event listener, lalu `muatProduk()`, `fetch(API_URL)`, `response.json()`, penyaringan kategori, `isiOpsiKategori()`, `terapkanFilter()`, `tampilkanProduk()`, dan `hitungStatistik()`.

[ISI jawabanmu]

**2. Mengapa `response.ok` tetap diperiksa setelah `fetch()` selesai.**
Petunjuk: `fetch` hanya gagal (reject) kalau jaringan bermasalah. Respons 404 atau 500 tetap dianggap "berhasil" oleh `fetch`, jadi `response.ok` yang membedakannya. Beri contoh kasus di aplikasimu, misalnya `API_URL` salah.

[ISI jawabanmu]

**3. Satu data JSON menjadi elemen DOM.**
Petunjuk: pilih satu produk (misalnya `title`, `price`, `thumbnail`), lalu jelaskan `createElement("article")`, template string di `innerHTML`, dan `appendChild`.

[ISI jawabanmu]

**4. Internet terputus, endpoint salah, HTTP 404/500.**
Petunjuk: jelaskan `try...catch`, `throw new Error` saat `!response.ok`, dan pesan di `#status`. Sebutkan hasil percobaanmu sendiri (matikan internet atau ubah `API_URL`).

[ISI jawabanmu]

**5. Cara kerja fitur Y=1 (filter + statistik).**
Petunjuk: sebut `terapkanFilter()`, event `change` pada kategori dan `input` pada harga, `filter()` dengan dua syarat, serta `hitungStatistik()` dengan `reduce()`, `map()`, dan `Set`.

[ISI jawabanmu]

**6. Cara kerja validasi Z=3 dan mengapa input tidak valid tidak boleh diproses.**
Petunjuk: sebut `validasiForm()`, `event.preventDefault()`, `querySelectorAll('input[name="kategori"]:checked')`, dan pengecekan `length === 0`. Jelaskan akibat data kosong atau salah kalau tetap diproses.

[ISI jawabanmu]

**7. Penggunaan localStorage.**
Petunjuk: data yang disimpan adalah pilihan tema (`"terang"` atau `"gelap"`) dengan kunci `lelapHome_tema`. Dibaca di `muatTema()` saat halaman dibuka, diubah di `gantiTema()` saat tombol diklik. Alasan: pilihan tidak hilang setelah refresh. Jelaskan juga mengapa kuncinya diberi awalan.

[ISI jawabanmu]

**8. Satu fungsi penting (maksimal 15 baris) dan input - proses - output.**
Petunjuk: `muatProduk()` atau `hitungStatistik()` cocok. Tempel potongan kodenya, lalu jelaskan input, proses, dan output.

```javascript
// [ISI: tempel potongan kode maksimal 15 baris]
```

[ISI penjelasan input - proses - output]

**9. Bug/error paling sulit.**
Petunjuk: tulis pengalamanmu sendiri. Misalnya fungsi `hargaRupiah` belum ditempel sehingga muncul error "not defined" dan produk tidak tampil, atau statistik tetap "-". Sebutkan penyebab, cara menemukannya (Console), dan cara memperbaiki.

[ISI jawabanmu]

**10. Dua perbaikan teknis jika diberi satu minggu lagi.**
Petunjuk: pilih dua yang kamu yakini, misalnya memecah `app.js` menjadi beberapa modul, menambah validasi nama dan email, atau menyimpan cache data API agar tidak fetch ulang. Jelaskan alasannya.

[ISI jawabanmu]

## 10. AI Usage Log

Penggunaan AI dicatat lengkap pada file [`AI_USAGE.md`](AI_USAGE.md).
