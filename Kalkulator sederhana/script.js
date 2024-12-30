function hitung() {
    let bilangan1 = document.getElementById('bilangan1').value;
    let bilangan2 = document.getElementById('bilangan2').value;
    
    if (bilangan1 === '' || bilangan2 === '') {
        alert("Masukin Angkanya Banh");
        return;
    }

    let hasil = parseFloat(bilangan1) + parseFloat(bilangan2);
    
    document.getElementById('hasil').textContent = hasil;
}
