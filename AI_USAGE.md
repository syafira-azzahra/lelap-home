# AI Usage Log - PTS Pemrograman Web

**Nama:** Syafira Az-Zahra | **NIM:** 2440304013 | **Project:** Lelap Home

## Pernyataan

Saya menggunakan Claude (Anthropic) selama pengerjaan PTS ini untuk memahami soal, menentukan varian, brainstorming tema, mendapatkan contoh dan kerangka kode, serta membantu mendiagnosis error. Kode contoh dari AI saya tempel, uji, dan sesuaikan sendiri. Saya mempelajari fungsi-fungsi utamanya agar dapat menjelaskannya saat video dan defense.

## Log

| Tanggal | AI/Tool | Tujuan | Prompt/Ringkasan | Bagian Digunakan | Verifikasi/Modifikasi |
|---|---|---|---|---|---|
| 15 Okt 2026 | Claude | Memahami soal | Menanyakan maksud soal PTS dan apakah harus membuat aplikasi baru | Pemahaman persyaratan | Membaca ulang dokumen soal untuk memastikan |
| 15 Okt 2026 | Claude | Menentukan varian NIM | Memberi 3 digit terakhir (013) dan meminta bantuan perhitungan | README bagian varian | Menghitung ulang manual: X=0, Y=1, Z=3, S=4, C=0 |
| 15 Okt 2026 | Claude | Brainstorming tema dan nama | Menanyakan ide tema (jajanan pasar, toko bangunan, toko kasur) dan batasan dataset DummyJSON | Tema Lelap Home, daftar kategori | Memilih sendiri tema dan nama; mengecek kategori di `/products/categories` |
| 15 Okt 2026 | Claude | Struktur project dan Git | Menanyakan struktur folder, satu halaman vs multi-page, dan memisahkan project PTS dari PAS | Struktur folder, `git init`, repo GitHub | Menjalankan perintah sendiri dan memeriksa dengan `git status` dan `git log` |
| 15 Okt 2026 | Claude | Kerangka HTML | Meminta kerangka `index.html` semantik | `index.html` | [ISI: bagian yang kamu ubah, misalnya teks, urutan section, identitas] |
| 15-16 Okt 2026 | Claude | Contoh CSS | Meminta CSS variables tema terang/gelap, grid responsive, dan perapian tampilan | `css/style.css` | [ISI: warna, font, jarak yang kamu ubah]; diuji di F12 mode responsive |
| 15 Okt 2026 | Claude | Dark/Light mode | Meminta contoh toggle tema dengan localStorage | `terapkanTema`, `muatTema`, `gantiTema` | Diuji: tema tetap setelah refresh; dicek di Application > Local Storage |
| 15 Okt 2026 | Claude | Fetch dan render | Meminta contoh `fetch` dengan `async/await`, `response.ok`, dan render kartu | `muatProduk`, `tampilkanProduk` | Diuji di Network tab (status 200); [ISI modifikasimu] |
| 15 Okt 2026 | Claude | Format rupiah | Menanyakan cara mengganti dolar ke rupiah | `KURS_RUPIAH`, `hargaRupiah` | Memperbaiki sendiri kesalahan tempel kode (fungsi belum ada); diuji di tampilan |
| 15-16 Okt 2026 | Claude | Filter dan statistik (Y=1) | Meminta contoh filter kategori/harga dan statistik | `terapkanFilter`, `hitungStatistik`, `isiOpsiKategori` | [ISI: hasil pengujian dan perubahan] |
| 15-16 Okt 2026 | Claude | Validasi form (Z=3) | Meminta contoh validasi minimal satu kategori | `validasiForm`, `buatCheckboxKategori` | [ISI: hasil pengujian form kosong dan valid] |
| 16 Okt 2026 | Claude | Dokumen | Meminta kerangka README dan AI Usage Log, serta rencana video | `README.md`, `AI_USAGE.md` | Jawaban 10 pertanyaan saya tulis sendiri dengan kata-kata saya |

## Hal yang tidak dibantu AI

- [ISI, contoh: menjalankan dan menguji aplikasi, mengambil screenshot, merekam video demo, menulis jawaban 10 pertanyaan]
