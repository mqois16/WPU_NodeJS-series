//core module
//file system
const { rejects } = require("assert");
const { clear } = require("console");
const fs = require("fs");
const { resolve } = require("path");

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

//Readline
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

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

const tulisPertanyaan = (pertanyaan) => {
  return new Promise((resolve, rejects) => {
    rl.question(pertanyaan, (apa) => {
      resolve(apa);
    });
  });
};

const simpanKontak = (nama,email,no) => {
  const kontak = { nama,email,no };
  const file = fs.readFileSync("data/kontak.json", "utf-8");
  const kontaks = JSON.parse(file);

  kontaks.push(kontak);

  fs.writeFileSync("data/kontak.json", JSON.stringify(kontaks));

  rl.close();
};

module.exports = {
    tulisPertanyaan, simpanKontak
}