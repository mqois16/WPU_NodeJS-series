const yargs = require('yargs')
const kontak = require('./contact')

//mengambil argumen


yargs.command({
    command: 'add',
    describe: 'Menambahkan kontak baru',
    builder:{
        nama:{
            describe: "nama lengkap",
            demandOption: true,
            type: 'string'
        },
        email:{
            describe: "alamat email",
            demandOption: false,
            type: 'string'
        },
        no:{
            describe: "nomor telepon",
            demandOption: true,
            type: 'string'
        },
    },
    handler(argv){
        kontak.simpanKontak(argv.nama, argv.email, argv.no)
    }
})
.demandCommand()

//Menampilkan daftar kontaks
yargs.command({
    command: 'list',
    describe: 'Menampilkan daftar seluruh kontak tersimpan',
    handler(){
        kontak.listKontak()
    }
})

//Menampilkan detail kontaks
yargs.command({
    command: 'detail',
    describe: 'Menampilkan detail kontak tersimpan',
    handler(argv){
        kontak.detailKontak(argv.nama)
    }
})

//Menghapus kontak berdasarkan nama
yargs.command({
    command: 'delete',
    describe: 'Menghapus kontak tersimpan',
    handler(argv){
        kontak.hapusKontak(argv.nama)
    }
})

yargs.parse()

// const kontak = require('./contact')

// const main = async () => {
//     const nama = await kontak.tulisPertanyaan("Masukkan Nama Anda: ");
//     const email = await kontak.tulisPertanyaan("Masukkan Email Anda: ");
//     const no = await kontak.tulisPertanyaan("Masukkan nomor Anda: ");
//     kontak.simpanKontak(nama, email, no);
//   };
  
//   main();
  