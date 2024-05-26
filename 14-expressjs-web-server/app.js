const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();

const port = 3000;

//EJS
app.set("view engine", "ejs");
app.use(expressLayouts);

//Build in Middleware
app.use(express.static('public'))

//App Level Middleware
app.use((req,res,next)=>{
  console.log('Time: ', Date.now());
  next()
})

//Third Party Middleware


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
  res.render("contact", {
    title: "Contact",
    layout: "layouts/main",
  });
});

app.use("/", (req, res) => {
  res.status(404);
  res.render("else", { title: "404", layout: "layouts/main" });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost/${port}`);
});
