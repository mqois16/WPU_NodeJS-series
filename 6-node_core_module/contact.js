//core module
//file system
const fs = require("fs");
const chalk = require("chalk");
const validator = require("validator");

// console.log(fs)

//string sync
// try{
//     fs.writeFileSync('data/test.txt', 'Hello World!')
// } catch(e){
//     fs.writeFileSync('error/log.txt', e)
// }

//string async
// fs.writeFile('data/test.txt', 'Hello World! async', (e)=>{
//     console.log(e)
// })

//baca file sync
// const data = fs.readFileSync('data/test.txt', 'utf-8');
// console.log(data)

//baca file async
// const data = fs.readFile('data/test.txt', 'utf8',(err, data) => {
//   if (err) throw err;
//   console.log(data);
// });
// console.log(data)

const dirPath = "./data";

//check folder
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

const dataPath = "data/kontak.json";
//check file
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

const load_contact = () => {
  const file = fs.readFileSync("data/kontak.json", "utf-8");
  const kontaks = JSON.parse(file);
  return kontaks;
};

const simpanKontak = (nama, email, no) => {
  const kontak = { nama, email, no };
  const kontaks = load_contact();

  //filter duplikat
  const duplikat = kontaks.find((kontak) => kontak.nama === nama);
  if (duplikat) {
    console.log(chalk.red.inverse.bold("Kontak telah terdaftar!"));
    return false;
  }

  //check email
  if (email) {
    if (!validator.isEmail(email)) {
      console.log(chalk.red.inverse.bold("Email tidak valid!"));
      return false;
    }
  }

  //check nomor
  if (!validator.isMobilePhone(no, "id-ID")) {
    console.log(chalk.red.inverse.bold("Nomor tidak valid!"));
    return false;
  }

  kontaks.push(kontak);

  fs.writeFileSync("data/kontak.json", JSON.stringify(kontaks));

  console.log(chalk.green.inverse.bold("Data telah tersimpan!"));
};

//listKontak
const listKontak = () => {
  const kontaks = load_contact();
  kontaks.forEach((kontak, i) => {
    console.log(`| ${i + 1} | ${kontak.nama} | ${kontak.no} |`);
  });
};

//detailKontak
const detailKontak = (nama) => {
  const kontaks = load_contact();
  const kontaknya = kontaks.find(
    (kontaknya) => kontaknya.nama.toLowerCase() === nama.toLowerCase()
  );

  if (!kontaknya) {
    console.log(chalk.red.inverse.bold(`Nama ${nama} tidak ditemukan!`));
    return false;
  }

  console.log(chalk.cyan.inverse.bold(kontaknya.nama));
  console.log(kontaknya.no);
  if (kontaknya.email) {
    console.log(kontaknya.email);
  }
};

//hapusKontak
const hapusKontak = (nama) => {
 const kontaks = load_contact();
 const new_kontaks =  kontaks.filter(
    (kontaknya)=>kontaknya.nama.toLowerCase() !== nama.toLowerCase()
)

if (kontaks.length === new_kontaks.length) {
    console.log(chalk.red.inverse.bold(`Nama ${nama} tidak ditemukan!`));
    return false;
  }

  fs.writeFileSync("data/kontak.json", JSON.stringify(new_kontaks));

  console.log(chalk.green.inverse.bold(`Kontak ${nama} berhasil dihapus`));

};

module.exports = {
  simpanKontak,
  listKontak,
  detailKontak,
  hapusKontak
};
