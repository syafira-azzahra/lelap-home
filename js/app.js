const KUNCI_TEMA = "lelapHome_tema";
const tombolTema = document.getElementById("tombol-tema");

function terapkanTema(tema) {
  document.documentElement.setAttribute("data-theme", tema);
  const gelap = tema === "gelap";
  tombolTema.textContent = gelap ? "Mode Terang" : "Mode Gelap";
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

// ===== FORMAT RUPIAH =====
const KURS_RUPIAH = 16000; // perkiraan 1 USD = Rp 16.000

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
    elStatus.textContent = `Berhasil memuat ${semuaProduk.length} produk.`;
    tampilkanProduk(semuaProduk);
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
    kartu.innerHTML = `
      <img src="${p.thumbnail}" alt="${p.title}">
      <h3>${p.title}</h3>
      <p class="harga">${hargaRupiah(p.price)}</p>
      <p class="kategori">${p.category}</p>
      <p class="rating">Rating: ${p.rating}</p>
    `;
    wadah.appendChild(kartu);
  });
}

muatProduk();