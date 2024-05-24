const express = require('express')
const app = express()

const port = 3000

//EJS
app.set('view engine', 'ejs')


app.get('/', (req,res)=>{
  const politisi = [
    {
      nama: 'Jokowi',
      partai: 'PDIP'
    },
    {
      nama: 'Anies',
      partai: 'Non Partai'
    },
    {
      nama: 'Bamsoet',
      partai: 'Golkar'
    },
    {
      nama: 'Syahroni',
      partai: 'Nasdem'
    },
    {
      nama: 'Imin',
      partai: 'PKB'
    },
  ]


  res.render('index',{ nama: 'Sadhika', title: 'Home', politisi: politisi})
})

app.get('/about', (req,res)=>{
  res.render('about')
})

app.get('/contact', (req,res)=>{
  res.render('contact')
})

app.use('/', (req,res)=>{
  res.status(404)
  res.render('else')
})

app.listen(port, ()=>{
  console.log(`App listening at http://localhost/${port}`)
})