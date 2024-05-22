const kontak = require('./contact')

const main = async () => {
    const nama = await kontak.tulisPertanyaan("Masukkan Nama Anda: ");
    const email = await kontak.tulisPertanyaan("Masukkan Email Anda: ");
    const no = await kontak.tulisPertanyaan("Masukkan nomor Anda: ");
    kontak.simpanKontak(nama, email, no);
  };
  
  main();
  