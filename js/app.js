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