const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const {load_contact, find_contact} = require('./utils/contacts')

const app = express();
const port = 3000;

//EJS
app.set("view engine", "ejs");

//Third Party Middleware
app.use(expressLayouts);

//Build in Middleware
app.use(express.static('public'))



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
    contacts
  });
});

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
