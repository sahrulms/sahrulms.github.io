const getDate = new Date();
const year = getDate.getFullYear();
const month = getDate.getMonth() + 1;
const day = getDate.getDate();



function hari() {
    if (day < 10)
        hari = `0${day}`;
    hari = day;
    return hari;
}

function bulan() {
    if (month < 10) {
        bulan = `0${month}`;
    } else {
        bulan = month;
    }
    return bulan;
}

const tanggal = `${year}-${bulan()}-${hari()}`;

let namaKota = localStorage.idkota;
function cekKota() {
    if (!namaKota) {
        cekKota = 667;
    } else {
        cekKota = namaKota;
    }
    return cekKota;
}



function getJadwalDay() {
    fetch('https://api.banghasan.com/sholat/format/json/jadwal/kota/' + cekKota() + '/tanggal/' + tanggal)
        .then(response => response.json())
        .then(data => {
            const jadwal = data.jadwal.data;
            dataJadwal(jadwal);
        });
}

function dataJadwal(jadwal) {
    document.querySelector('.Imsak').textContent = jadwal.imsak;
    document.querySelector('.Subuh').textContent = jadwal.subuh;
    document.querySelector('.Terbit').textContent = jadwal.terbit;
    document.querySelector('.Dzuhur').textContent = jadwal.dzuhur;
    document.querySelector('.Ashar').textContent = jadwal.ashar;
    document.querySelector('.Maghrib').textContent = jadwal.maghrib;
    document.querySelector('.Isya').textContent = jadwal.isya;
    document.querySelector('.tanggal').textContent = jadwal.tanggal;
    if (!localStorage.namakota) {
        window.localStorage.setItem('namakota', 'Jakarta');
    }
    document.querySelector('#judul-kota').textContent = localStorage.namakota;
}


const namaListKota = document.querySelector('.cari-kota');
const addKota = document.querySelector('.nama-list-kota');
namaListKota.addEventListener('keyup', function () {
    const kotakota = namaListKota.value.length;
    if (kotakota > 0) {
        addKota.classList.remove('hidden-list');
        fetch('https://api.banghasan.com/sholat/format/json/kota')
            .then(response => response.json())
            .then(response => {
                const kota = response.kota;
                let likota = ``;
                kota.forEach(k => {
                    likota += `<a href="#" data-idkota="${k.id}" id="inikota" class="list-group-item list-group-item-action">${k.nama}</a>`;
                });
                const listKota = document.querySelector('.nama-list-kota');
                listKota.innerHTML = likota;

                // ketika pilih kota
                const inikota = document.querySelectorAll('#inikota');
                inikota.forEach(k => {
                    const filterText = namaListKota.value.toLowerCase();
                    const itemText = k.firstChild.textContent.toLowerCase();

                    if (itemText.indexOf(filterText) != -1) {
                        k.setAttribute("style", "display: block;");
                    } else {
                        k.setAttribute("style", "display: none !important");
                    }

                    k.addEventListener('click', function () {
                        const idkota = this.dataset.idkota;
                        const namaKota = this.textContent;
                        window.localStorage.setItem('idkota', idkota);
                        window.localStorage.setItem('namakota', namaKota);
                        document.querySelector('#judul-kota').textContent = localStorage.namakota;
                        addKota.classList.add('hidden-list');
                        namaListKota.value = '';
                        location.reload();
                        alert(`Kota ${namaKota} berhasil dipilih`);
                    });
                });

            });
    } else {
        addKota.classList.add('hidden-list');
    }

});




    


getJadwalDay();
