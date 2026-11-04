
"use strict";

// 1. VARIABEL DAN DATA PRODUK
const namaToko = "UMKM MAJU JAYA";
const produk = [
    {
        nama: "Buku Tulis",
        harga: 5000,
        stok: 20
    },
    {
        nama: "Pulpen",
        harga: 3000,
        stok: 30
    },
    {
        nama: "Tas Sekolah",
        harga: 75000,
        stok: 10
    },
    {
        nama: "Penggaris",
        harga: 4000,
        stok: 25
    }
];
let jumlahTransaksi = 0;

// ========================================
// 2. MANIPULASI STRING
// ========================================
function formatNama(nama) {
    return nama
        .trim()
        .toLowerCase()
        .split(" ")
        .filter(kata => kata !== "")
        .map(kata =>
            kata.charAt(0).toUpperCase() + kata.slice(1)
        )
        .join(" ");
}


// ========================================
// 3. FORMAT RUPIAH
// ========================================

function formatRupiah(nilai) {

    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(nilai);
}


// ========================================
// 4. MENAMPILKAN PRODUK (LOOPING)
// ========================================

const productList = document.getElementById("productList");

function tampilkanProduk() {

    let html = "";

    for (let i = 0; i < produk.length; i++) {

        html += `
            <div class="product-item">

                <div class="product-info">
                    <h3>${produk[i].nama}</h3>

                    <p>
                        ${formatRupiah(produk[i].harga)}
                        | Stok: ${produk[i].stok}
                    </p>
                </div>

                <input
                    type="number"
                    id="jumlah-${i}"
                    min="0"
                    max="${produk[i].stok}"
                    value="0"
                    placeholder="Jumlah"
                >

            </div>
        `;
    }

    productList.innerHTML = html;
}

tampilkanProduk();


// ========================================
// 5. PROSES PERHITUNGAN KASIR
// ========================================

function hitungPembayaran() {

    // Mengambil data pelanggan
    let nama = document.getElementById("namaPelanggan").value;

    let statusMember =
        document.getElementById("statusMember").value === "true";

    // Manipulasi string
    nama = formatNama(nama);

    // Validasi menggunakan IF
    if (nama === "") {

        alert("Nama pelanggan harus diisi!");

        return;
    }

    // Variabel perhitungan
    let totalBelanja = 0;
    let totalProduk = 0;

    let detailProduk = [];

    // ====================================
    // 6. LOOPING DAN OPERATOR ARITMATIKA
    // ====================================

    for (let i = 0; i < produk.length; i++) {

        let jumlah = Number(
            document.getElementById(`jumlah-${i}`).value
        );

        // Validasi jumlah pembelian
        if (
            !Number.isInteger(jumlah) ||
            jumlah < 0 ||
            jumlah > produk[i].stok
        ) {

            alert(
                "Jumlah " + produk[i].nama +
                " tidak valid atau melebihi stok!"
            );

            return;
        }

        // Menghitung subtotal
        let subtotal = produk[i].harga * jumlah;

        // Operator penugasan
        totalBelanja += subtotal;

        totalProduk += jumlah;

        if (jumlah > 0) {

            detailProduk.push({
                nama: produk[i].nama,
                jumlah: jumlah,
                subtotal: subtotal
            });
        }
    }

    // ========================================
    // 7. OPERATOR PERBANDINGAN DAN IF
    // ========================================

    let diskon = 0;

    if (totalBelanja >= 100000) {

        diskon = totalBelanja * 0.10;

    } else if (totalBelanja >= 50000) {

        diskon = totalBelanja * 0.05;

    } else {

        diskon = 0;
    }


    // ====================================
    // 8. OPERATOR LOGIKA
    // ====================================

    if (statusMember && totalBelanja >= 50000) {

        diskon += totalBelanja * 0.05;
    }


    // ====================================
    // 9. MENGHITUNG PEMBAYARAN
    // ====================================

    let totalSetelahDiskon = totalBelanja - diskon;

    let ongkir = 10000;

    if (totalSetelahDiskon >= 50000 || statusMember) {

        ongkir = 0;
    }

    let totalPembayaran = totalSetelahDiskon + ongkir;


    // ====================================
    // 10. OPERATOR UNARY
    // ====================================

    if (totalProduk > 0) {

        jumlahTransaksi++;

    } else {

        alert("Pilih minimal satu produk!");

        return;
    }


    // ========================================
    // 11. MENAMPILKAN HASIL TRANSAKSI
    // ========================================

    document.getElementById("hasilNama").textContent = nama;

    document.getElementById("hasilMember").textContent =
        statusMember ? "Member" : "Non-Member";

    document.getElementById("hasilProduk").textContent = totalProduk;

    document.getElementById("hasilBelanja").textContent =
        formatRupiah(totalBelanja);

    document.getElementById("hasilDiskon").textContent =
        formatRupiah(diskon);

    document.getElementById("hasilOngkir").textContent =
        formatRupiah(ongkir);

    document.getElementById("hasilTotal").textContent =
        formatRupiah(totalPembayaran);


    // ========================================
    // 12. MANIPULASI STRING DAN OUTPUT
    // ========================================

    let pesan = "";

    if (totalBelanja >= 100000) {

        pesan = "Selamat! Anda mendapatkan diskon 10%.";

    } else if (totalBelanja >= 50000) {

        pesan = "Anda mendapatkan diskon 5%.";

    } else {

        pesan = "Terima kasih telah berbelanja.";
    }

    if (statusMember) {

        pesan += " Anda pelanggan member.";
    }

    document.getElementById("pesan").textContent = pesan;

    // Menampilkan detail di console
    console.log("TOKO:", namaToko);
    console.log("DETAIL PRODUK:", detailProduk);
    console.log("TOTAL BELANJA:", totalBelanja);
    console.log("DISKON:", diskon);
    console.log("ONGKIR:", ongkir);
    console.log("TOTAL PEMBAYARAN:", totalPembayaran);
    console.log("JUMLAH TRANSAKSI:", jumlahTransaksi);

    alert("Transaksi berhasil diproses!");
}


// ========================================
// 13. RESET TRANSAKSI
// ========================================
function resetTransaksi() {

    document.getElementById("namaPelanggan").value = "";

    document.getElementById("statusMember").value = "false";

    for (let i = 0; i < produk.length; i++) {

        document.getElementById(`jumlah-${i}`).value = 0;
    }
    document.getElementById("hasilNama").textContent = "-";

    document.getElementById("hasilMember").textContent = "-";

    document.getElementById("hasilProduk").textContent = "0";

    document.getElementById("hasilBelanja").textContent =
        formatRupiah(0);

    document.getElementById("hasilDiskon").textContent =
        formatRupiah(0);

    document.getElementById("hasilOngkir").textContent =
        formatRupiah(0);

    document.getElementById("hasilTotal").textContent =
        formatRupiah(0);

    document.getElementById("pesan").textContent = "";
}

// ========================================
// 14. EVENT LISTENER
// ========================================
document
    .getElementById("btnHitung")
    .addEventListener("click", hitungPembayaran);
document
    .getElementById("btnReset")
    .addEventListener("click", resetTransaksi);
