//core module
//file system
const fs = require("fs");

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

//load seluruh data
const load_contact = () => {
  const file = fs.readFileSync("data/kontak.json", "utf-8");
  const kontaks = JSON.parse(file);
  return kontaks;
};

//cari kontak nama tertentu
const find_contact = (nama) => {
  const kontaks = load_contact();
  console.log(kontaks.nama)
  const kontaknya = kontaks.find(
    (kontaknya) => kontaknya.nama.toLowerCase() === nama.toLowerCase()
  );
  return kontaknya;
};

module.exports = {
  load_contact,
  find_contact
};
