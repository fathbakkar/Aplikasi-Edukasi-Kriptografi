// ===== Utilitas Matematika =====

function modPow(base, exp, mod) {
    let result = 1n;
    base = BigInt(base) % BigInt(mod);
    exp = BigInt(exp);
    mod = BigInt(mod);

    while (exp > 0n) {
        if (exp % 2n === 1n) result = (result * base) % mod;
        base = (base * base) % mod;
        exp /= 2n;
    }
    return result;
}

// Cek bilangan prima (untuk nilai p yang wajar di konteks edukasi)
function isPrime(n) {
    n = BigInt(n);
    if (n < 2n) return false;
    if (n === 2n || n === 3n) return true;
    if (n % 2n === 0n) return false;
    for (let i = 3n; i * i <= n; i += 2n) {
        if (n % i === 0n) return false;
    }
    return true;
}

// Validasi: g harus generator (akar primitif) dari grup mod p
function isPrimitiveRoot(g, p) {
    g = BigInt(g);
    p = BigInt(p);
    if (g < 2n || g >= p) return false;
    const target = p - 1n;
    const seen = new Set();
    let val = 1n;
    for (let i = 0n; i < target; i++) {
        val = (val * g) % p;
        seen.add(val.toString());
    }
    return seen.size === Number(target); // menghasilkan semua sisa 1..p-1
}

// ===== Validasi Input =====

function validasiInput(p, g, a, b) {
    const errors = [];

    // Pastikan integer
    const semua = { p, g, a, b };
    for (const [nama, nilai] of Object.entries(semua)) {
        if (!Number.isInteger(Number(nilai))) {
            errors.push(`Parameter ${nama} harus berupa bilangan bulat.`);
        }
    }
    if (errors.length) return errors;

    p = Number(p); g = Number(g); a = Number(a); b = Number(b);

    if (p < 5) {
        errors.push("Bilangan prima (p) terlalu kecil. Gunakan minimal 5.");
    } else if (!isPrime(p)) {
        errors.push(`Nilai p = ${p} bukan bilangan prima.`);
    }

    if (p >= 5 && isPrime(p)) {
        if (!isPrimitiveRoot(g, p)) {
            errors.push(`Nilai g = ${g} bukan generator (akar primitif) yang valid untuk p = ${p}.`);
        }
    }

    // Private key harus 1 < key < p
    if (a < 1 || a >= p) {
        errors.push(`Private Key Livia (a) harus berada di rentang 1 sampai ${p - 1}.`);
    }
    if (b < 1 || b >= p) {
        errors.push(`Private Key Nawir (b) harus berada di rentang 1 sampai ${p - 1}.`);
    }

    return errors;
}

// ===== Simulasi Utama =====

function jalankanSimulasi() {
    const p = document.getElementById('primeP').value;
    const g = document.getElementById('genG').value;
    const a = document.getElementById('privateA').value;
    const b = document.getElementById('privateB').value;

    const errorBox = document.getElementById('errorBox');
    errorBox.innerHTML = '';
    errorBox.style.display = 'none';

    if (!p || !g || !a || !b) {
        tampilkanError(["Mohon lengkapi semua parameter input terlebih dahulu."]);
        return;
    }

    const errors = validasiInput(p, g, a, b);
    if (errors.length) {
        tampilkanError(errors);
        return;
    }

    const publicA = modPow(g, a, p);
    const publicB = modPow(g, b, p);
    const sharedKeyLivia = modPow(publicB, a, p);
    const sharedKeyNawir = modPow(publicA, b, p);

    const diagramArea = document.getElementById('diagramArea');
    const langkahProses = document.getElementById('langkahProses');
    const finalBadgeContainer = document.getElementById('finalBadgeContainer');

    diagramArea.style.display = 'block';
    langkahProses.innerHTML = '';
    finalBadgeContainer.innerHTML = '';

    const daftarLangkah = [
        {
            type: 'active-livia',
            text: `<strong>Langkah 1 (Lokal Livia):</strong> Livia menghitung Kunci Publik <strong>A</strong> = g<sup>a</sup> mod p <br>&raquo; ${g}<sup>${a}</sup> mod ${p} = <strong>${publicA}</strong>`
        },
        {
            type: 'active-nawir',
            text: `<strong>Langkah 2 (Lokal Nawir):</strong> Nawir menghitung Kunci Publik <strong>B</strong> = g<sup>b</sup> mod p <br>&raquo; ${g}<sup>${b}</sup> mod ${p} = <strong>${publicB}</strong>`
        },
        {
            type: 'active-exchange',
            text: `<strong>Langkah 3 (Proses Pertukaran):</strong> Livia mengirimkan nilai <strong>A (${publicA})</strong> ke Nawir, dan Nawir mengirimkan nilai <strong>B (${publicB})</strong> ke Livia melalui jaringan publik.`
        },
        {
            type: 'active-livia',
            text: `<strong>Langkah 4 (Kunci Bersama Livia):</strong> Livia menghitung Kunci Rahasia <strong>K</strong> = B<sup>a</sup> mod p <br>&raquo; ${publicB}<sup>${a}</sup> mod ${p} = <strong>${sharedKeyLivia}</strong>`
        },
        {
            type: 'active-nawir',
            text: `<strong>Langkah 5 (Kunci Bersama Nawir):</strong> Nawir menghitung Kunci Rahasia <strong>K</strong> = A<sup>b</sup> mod p <br>&raquo; ${publicA}<sup>${b}</sup> mod ${p} = <strong>${sharedKeyNawir}</strong>`
        },
        {
            type: 'active-eve',
            text: `<strong>Sisi Penyerang (Eve):</strong> Eve menyadap jaringan dan mengetahui <strong>p, g, A (${publicA}), B (${publicB})</strong>, tetapi <em>tidak mengetahui</em> private key a maupun b. Untuk menemukan kunci, Eve harus memecahkan masalah logaritma diskret (mencari a dari ${g}<sup>a</sup> mod ${p} = ${publicA}) yang secara komputasi sangat sulit. Inilah dasar keamanan Diffie-Hellman.`
        }
    ];

    daftarLangkah.forEach((item, index) => {
        setTimeout(() => {
            const div = document.createElement('div');
            div.className = `step ${item.type}`;
            div.innerHTML = item.text;
            div.style.animationDelay = `${index * 0.1}s`;
            langkahProses.appendChild(div);

            if (index === daftarLangkah.length - 1) {
                setTimeout(() => {
                    if (sharedKeyLivia === sharedKeyNawir) {
                        finalBadgeContainer.innerHTML =
                            `<div class="final-badge">✓ Shared Secret Key Berhasil Disepakati: ${sharedKeyLivia}</div>`;
                    } else {
                        finalBadgeContainer.innerHTML =
                            `<div class="final-badge" style="background: rgba(255,69,58,0.1); border-color: rgba(255,69,58,0.2); color: #ff453a;">✗ Terjadi kegagalan sinkronisasi kunci.</div>`;
                    }
                }, 400);
            }
        }, index * 600);
    });
}

// ===== Helper Error & Reset =====

function tampilkanError(daftarPesan) {
    const errorBox = document.getElementById('errorBox');
    errorBox.style.display = 'block';
    errorBox.innerHTML =
        `<strong>Input tidak valid:</strong><ul>` +
        daftarPesan.map(p => `<li>${p}</li>`).join('') +
        `</ul>`;
}

function resetSimulasi() {
    ['primeP', 'genG', 'privateA', 'privateB'].forEach(id => {
        document.getElementById(id).value = '';
    });
    document.getElementById('errorBox').style.display = 'none';
    document.getElementById('errorBox').innerHTML = '';
    document.getElementById('langkahProses').innerHTML = '';
    document.getElementById('finalBadgeContainer').innerHTML = '';
    document.getElementById('diagramArea').style.display = 'none';
}
