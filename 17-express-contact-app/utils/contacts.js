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

//menimpa data dengan yang terbaru
const saveContacts = (contacts) => {
    fs.writeFileSync('data/kontak.json', JSON.stringify(contacts))
}

//tambah kontak baru
const add_contact = (contact) => {
    const contacts = load_contact()
    contacts.push(contact)
    saveContacts(contacts)
}

//cek nama duplikat
const cekDuplikat = (nama) =>{
    const contacts = load_contact()
    return contacts.find((contact) => contact.nama === nama)
}

//hapus contact
const delete_contact = (nama) => {
    const contacts = load_contact()
    const filteredContacts = contacts.filter((contact)=>contact.nama !== nama)
    //simpan
    saveContacts(filteredContacts)
}


module.exports = {
  load_contact,
  find_contact,
  add_contact,
  cekDuplikat,
  delete_contact
};
