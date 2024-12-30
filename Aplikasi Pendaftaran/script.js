function Daftar() {
    let Nama = document.getElementById('Nama').value;
    let Email = document.getElementById('Email').value;
    let Alamat = document.getElementById('Alamat').value;

    if (Nama === '' || Email === '' || Alamat === '') {
        alert("Semua data harus diisi");
        return;
    } else {
        alert("Semua data terisi");
    }
}
