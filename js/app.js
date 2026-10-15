const KUNCI_TEMA = "lelapHome_tema";
const tombolTema = document.getElementById("tombol-tema");

function terapkanTema(tema) {
  document.documentElement.setAttribute("data-theme", tema);
  const gelap = tema === "gelap";
  // Menambahkan emoji pada teks tombol
  tombolTema.textContent = gelap ? "Mode ☀️" : "Mode 🌙";
  tombolTema.setAttribute("aria-pressed", String(gelap));
}

function muatTema() {
  const tersimpan = localStorage.getItem(KUNCI_TEMA);
  terapkanTema(tersimpan === "gelap" ? "gelap" : "terang");
}

function gantiTema() {
  const sekarang = document.documentElement.getAttribute("data-theme");
  const berikutnya = sekarang === "gelap" ? "terang" : "gelap";
  terapkanTema(berikutnya);
  localStorage.setItem(KUNCI_TEMA, berikutnya);
}

tombolTema.addEventListener("click", gantiTema);
muatTema();

const API_URL = "https://dummyjson.com/products?limit=0";

const KATEGORI_TERPILIH = ["furniture", "home-decoration", "kitchen-accessories"];

// Objek pemetaan kategori ditambahkan di sini
const LABEL_KATEGORI = {
  "furniture": "Perabot Kamar",
  "home-decoration": "Dekorasi Rumah",
  "kitchen-accessories": "Perlengkapan Dapur"
};

const KURS_RUPIAH = 16000; 

const formatRupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0
});

function hargaRupiah(dolar) {
  return formatRupiah.format(dolar * KURS_RUPIAH);
}

let semuaProduk = [];

async function muatProduk() {
  const elStatus = document.getElementById("status");
  try {
    elStatus.textContent = "Memuat produk...";
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    const data = await response.json();
    semuaProduk = data.products.filter((p) =>
      KATEGORI_TERPILIH.includes(p.category)
    );
    isiOpsiKategori();
    terapkanFilter();
  } catch (error) {
    elStatus.textContent = `Gagal memuat data: ${error.message}`;
  }
}

function tampilkanProduk(daftar) {
  const wadah = document.getElementById("daftar-produk");
  wadah.innerHTML = "";

  daftar.forEach((p) => {
    const kartu = document.createElement("article");
    kartu.className = "kartu-produk";
    
    // Menggunakan LABEL_KATEGORI untuk tampilan teks
    const namaKategori = LABEL_KATEGORI[p.category] || p.category;
    
    kartu.innerHTML = `
      <img src="${p.thumbnail}" alt="${p.title}">
      <h3>${p.title}</h3>
      <p class="harga">${hargaRupiah(p.price)}</p>
      <p class="kategori">${namaKategori}</p>
      <p class="rating">Rating: ${p.rating}</p>
    `;
    wadah.appendChild(kartu);
  });
}

function isiOpsiKategori() {
  const select = document.getElementById("filter-kategori");
  KATEGORI_TERPILIH.forEach((k) => {
    const opsi = document.createElement("option");
    opsi.value = k; // value tetap menggunakan bahasa asli untuk logika filter
    opsi.textContent = LABEL_KATEGORI[k] || k; // teks yang tampil di dropdown diterjemahkan
    select.appendChild(opsi);
  });
}

function hitungStatistik(daftar) {
  const elRata = document.getElementById("stat-rata");
  const elTermahal = document.getElementById("stat-termahal");
  const elKategori = document.getElementById("stat-kategori");

  if (daftar.length === 0) {
    elRata.textContent = "-";
    elTermahal.textContent = "-";
    elKategori.textContent = "0";
    return;
  }

  const total = daftar.reduce((jumlah, p) => jumlah + p.price, 0);
  const termahal = daftar.reduce((maks, p) => (p.price > maks.price ? p : maks));
  const jumlahKategori = new Set(daftar.map((p) => p.category)).size;

  elRata.textContent = hargaRupiah(total / daftar.length);
  elTermahal.textContent = `${termahal.title} (${hargaRupiah(termahal.price)})`;
  elKategori.textContent = jumlahKategori;
}

function terapkanFilter() {
  const kategori = document.getElementById("filter-kategori").value;
  const hargaMaks = Number(document.getElementById("filter-harga").value);

  const hasil = semuaProduk.filter((p) => {
    const cocokKategori = kategori === "semua" || p.category === kategori;
    const cocokHarga = !hargaMaks || p.price * KURS_RUPIAH <= hargaMaks;
    return cocokKategori && cocokHarga;
  });

  tampilkanProduk(hasil);
  hitungStatistik(hasil);
  document.getElementById("status").textContent =
    hasil.length === 0
      ? "Tidak ada produk yang cocok dengan filter."
      : `Menampilkan ${hasil.length} produk.`;
}

document.getElementById("filter-kategori").addEventListener("change", terapkanFilter);
document.getElementById("filter-harga").addEventListener("input", terapkanFilter);

function buatCheckboxKategori() {
  const wadah = document.getElementById("pilihan-kategori");
  KATEGORI_TERPILIH.forEach((k) => {
    const id = `pref-${k}`;
    const baris = document.createElement("div");
    
    // Menggunakan LABEL_KATEGORI untuk label checkbox
    const namaKategori = LABEL_KATEGORI[k] || k;
    
    baris.innerHTML = `
      <input type="checkbox" id="${id}" name="kategori" value="${k}">
      <label for="${id}">${namaKategori}</label>
    `;
    wadah.appendChild(baris);
  });
}

function validasiForm(event) {
  event.preventDefault();
  
  const nama = document.getElementById("nama").value.trim();
  const dipilih = document.querySelectorAll('input[name="kategori"]:checked');
  
  const errNama = document.getElementById("error-nama");
  const errKategori = document.getElementById("error-kategori");
  const sukses = document.getElementById("pesan-sukses");
  
  errNama.textContent = "";
  errKategori.textContent = "";
  sukses.textContent = "";
  
  let valid = true;
  
  if (nama === "") {
    errNama.textContent = "⚠️ Nama wajib diisi.";
    valid = false;
  }
  
  if (dipilih.length === 0) {
    errKategori.textContent = "⚠️ Pilih minimal satu kategori favorit.";
    valid = false;
  }
  
  if (valid) {
    // Menerjemahkan kategori yang dipilih di pesan sukses
    const daftar = Array.from(dipilih).map((c) => LABEL_KATEGORI[c.value] || c.value).join(", ");
    sukses.textContent = `✅ Terima kasih, ${nama}! Kategori favoritmu: ${daftar}.`;
    event.target.reset();
  }
}

document.getElementById("form-daftar").addEventListener("submit", validasiForm);
buatCheckboxKategori();

muatProduk();