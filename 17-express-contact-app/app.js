const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const {load_contact, find_contact, add_contact, cekDuplikat} = require('./utils/contacts')
const {check,body, validationResult} = require('express-validator')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')

const app = express();
const port = 3000;

//configurasi flash
app.use(cookieParser('secret'))
app.use(session({
  cookie : {maxAge:6000},
  secret : 'secret',
  resave : true,
  saveUninitialized : true
}));

app.use(flash())


//EJS
app.set("view engine", "ejs");

//Third Party Middleware
app.use(expressLayouts);

//Built in Middleware
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))



app.get("/", (req, res) => { 
  const politisi = [
    {
      nama: "Jokowi",
      partai: "PDIP",
    },
    {
      nama: "Anies",
      partai: "Non Partai",
    },
    {
      nama: "Bamsoet",
      partai: "Golkar",
    },
    {
      nama: "Syahroni",
      partai: "Nasdem",
    },
    {
      nama: "Imin",
      partai: "PKB",
    },
  ];

  res.render("index", { nama: "Sadhika", title: "Home", politisi: politisi, layout: 'layouts/main'});
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About", layout: "layouts/main" });
});

app.get("/contact", (req, res) => {
  const contacts = load_contact()
  res.render("contact", {
    title: "Contact",
    layout: "layouts/main",
    contacts,
    msg:req.flash('msg')
  });
});

//halaman form tambah data kontak
app.get('/contact/add', (req,res)=>{
  res.render('add-contact',{
    title: 'Form Tambah Data Kontak',
    layout: 'layouts/main'
  })
})

//proses data contact
app.post('/contact', 
[body('nama').custom((value)=>{
  const duplikat = cekDuplikat(value)
  if(duplikat){
    throw new Error('Nama kontak sudah digunakan!')
  }

  return true
}),
  check('email', 'Email tidak valid!').isEmail(),
check('no', 'Nomor telepon tidak valid!').isMobilePhone('id-ID'),
],
 (req,res)=>{
  const errors = validationResult(req)
  if (!errors.isEmpty()){
    // return res.status(400).json({errors: errors.array()})
    res.render('add-contact',{
      title : 'Form Tambah Data Kontak',
      layout: 'layouts/main',
      errors: errors.array(),
    })
  } else {
    add_contact(req.body)
    req.flash('msg', 'Data kontak berhasil disimpan!')
    res.redirect('/contact')
  }
})


//halaman detail data kontak

app.get("/contact/:nama", (req, res) => {
  const contact = find_contact(req.params.nama)
  res.render("detail", {
    title: "Halaman Detail Contact",
    layout: "layouts/main",
    param: req.params.nama,
    contact
  });
});

app.use("/", (req, res) => {
  res.status(404);
  res.render("else", { title: "404", layout: "layouts/main" });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost/${port}`);
});
