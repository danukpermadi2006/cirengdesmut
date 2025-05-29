const hargaPerCireng = 5000;

function updateTotalHarga() {
  const jumlah = parseInt(document.getElementById("jumlah").value);
  const totalText = document.getElementById("total-harga");

  if (!isNaN(jumlah) && jumlah > 0) {
    const total = hargaPerCireng * jumlah;
    totalText.textContent = `Total: Rp${total.toLocaleString("id-ID")}`;
  } else {
    totalText.textContent = "Total: Rp0";
  }
}

document.getElementById("jumlah").addEventListener("input", updateTotalHarga);

function tampilkanNotifikasi(pesan, warna = "white") {
  const notif = document.getElementById("notifikasi");
  notif.textContent = pesan;
  notif.style.color = warna;
  setTimeout(() => {
    notif.textContent = "";
  }, 4000);
}

function kirimPesanan(event) {
  event.preventDefault();

  const nama = document.getElementById("nama").value.trim();
  const jumlah = parseInt(document.getElementById("jumlah").value);
  const rasa = document.getElementById("rasa").value;
  const tombol = document.getElementById("tombol-submit");

  if (nama.length < 3) {
    tampilkanNotifikasi("Nama minimal 3 huruf.", "yellow");
    return;
  }

  if (isNaN(jumlah) || jumlah < 1 || jumlah > 100) {
    tampilkanNotifikasi("Jumlah harus antara 1 sampai 100.", "yellow");
    return;
  }

  if (!rasa) {
    tampilkanNotifikasi("Silakan pilih rasa.", "yellow");
    return;
  }

  const total = hargaPerCireng * jumlah;
  document.getElementById("total-harga").textContent = `Total: Rp${total.toLocaleString("id-ID")}`;

  const pesan = `Halo! Saya mau pesan cireng:\n\n` +
    `Nama: ${nama}\n` +
    `Jumlah: ${jumlah} pcs\n` +
    `Rasa: ${rasa}\n` +
    `Total: Rp${total.toLocaleString("id-ID")}`;

  const nomorWA = "6283174352992"; // ganti dengan nomormu
  const urlWA = `https://wa.me/${nomorWA}?text=${encodeURIComponent(pesan)}`;

  // Prevent double submit
  tombol.disabled = true;
  tampilkanNotifikasi("Membuka WhatsApp...", "lightgreen");

  setTimeout(() => {
    window.open(urlWA, "_blank");
    tombol.disabled = false;
  }, 1500); // simulasi loading
}