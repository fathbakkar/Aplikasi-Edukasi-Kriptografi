# Aplikasi-Edukasi-Kriptografi
Simulasi Visual Proses Deffie-Hellman Key Exchange Pada Aplikasi Edukasi Kriptografi

Disusun oleh:
Kelompok 13

| NAMA | NIM |
|----------------|------------|
| Nawir Sultoni  | 2401020141 |
| Sandy Yahya    | 2401020139 |
| Livia De Jesus | 2401020122 |

---

## 📖 Tentang Aplikasi

Aplikasi ini adalah media edukasi interaktif yang menampilkan simulasi visual dari proses pertukaran kunci **Diffie-Hellman Key Exchange**. Dengan antarmuka yang user-friendly, pengguna dapat memahami bagaimana dua pihak dapat membuat sebuah rahasia bersama melalui saluran komunikasi yang tidak aman.

---

## 🚀 Cara Penggunaan

### Langkah 1: Buka Aplikasi
- Buka file `index.html` di browser Anda (Google Chrome, Firefox, Edge, atau browser lainnya)

### Langkah 2: Masukkan Parameter Publik
Pada bagian **"Parameter Publik (Grup Modular)"**, masukkan:
- **Bilangan Prima Publik (p)**: Masukkan bilangan prima. Contoh: `23`
- **Generator Publik (g)**: Masukkan generator primitif dari grup. Contoh: `5`

**Catatan:** Bilangan `p` harus merupakan bilangan prima, dan `g` harus lebih kecil dari `p`.

### Langkah 3: Masukkan Private Key Masing-Masing Pihak
- **Livia - Private Key (a)**: Masukkan private key Livia. Contoh: `4`
- **Nawir - Private Key (b)**: Masukkan private key Nawir. Contoh: `3`

**Catatan:** Private key harus lebih kecil dari bilangan prima (p).

### Langkah 4: Jalankan Simulasi
- Klik tombol **"Mulai Simulasi Pertukaran"**
- Aplikasi akan menampilkan proses pertukaran kunci secara visual, langkah demi langkah

### Langkah 5: Lihat Hasil
Aplikasi akan menampilkan:
1. ✅ Kunci publik masing-masing pihak
2. ✅ Proses pertukaran kunci publik
3. ✅ Perhitungan kunci rahasia bersama
4. ✅ Verifikasi bahwa kedua pihak memiliki kunci rahasia yang sama

---

## 💡 Contoh Input

Untuk simulasi awal, Anda dapat menggunakan nilai berikut:
- **p (Bilangan Prima):** 23
- **g (Generator):** 5
- **a (Private Key Livia):** 4
- **b (Private Key Nawir):** 3

---

## 📚 Konsep Dasar Diffie-Hellman

Algoritma Diffie-Hellman memungkinkan dua pihak yang tidak saling kenal untuk membentuk kunci rahasia bersama melalui saluran komunikasi publik tanpa ada pihak ketiga yang mengetahui kunci tersebut.

**Rumus Perhitungan:**
- Kunci Publik A (Livia): `A = g^a mod p`
- Kunci Publik B (Nawir): `B = g^b mod p`
- Kunci Rahasia Bersama: `K = B^a mod p = A^b mod p`

---

## 🛠️ Teknologi yang Digunakan
- **HTML5** - Struktur halaman
- **CSS3** - Styling dan desain responsif
- **JavaScript** - Logika perhitungan dan interaktivitas
