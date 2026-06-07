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

function jalankanSimulasi() {
    const p = document.getElementById('primeP').value;
    const g = document.getElementById('genG').value;
    const a = document.getElementById('privateA').value;
    const b = document.getElementById('privateB').value;

    if (!p || !g || !a || !b) {
        alert("Mohon lengkapi semua parameter input terlebih dahulu.");
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
            text: `<strong>Langkah 3 (Proses Pertukaran):</strong> Livia mengirimkan nilai <strong>A (${publicA})</strong> ke Nawir, dan Nawir mengirimkan nilai <strong>B (${publicB})</strong> ke Livia melalui jaringan.`
        },
        {
            type: 'active-livia',
            text: `<strong>Langkah 4 (Kunci Bersama Livia):</strong> Livia menghitung Kunci Rahasia <strong>K</strong> = B<sup>a</sup> mod p <br>&raquo; ${publicB}<sup>${a}</sup> mod ${p} = <strong>${sharedKeyLivia}</strong>`
        },
        {
            type: 'active-nawir',
            text: `<strong>Langkah 5 (Kunci Bersama Nawir):</strong> Nawir menghitung Kunci Rahasia <strong>K</strong> = A<sup>b</sup> mod p <br>&raquo; ${publicA}<sup>${b}</sup> mod ${p} = <strong>${sharedKeyNawir}</strong>`
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
