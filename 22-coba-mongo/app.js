const { MongoClient } = require('mongodb')

const uri = 'mongodb://127.0.0.1:27017'
const dbName = 'wpu'

const client = new MongoClient(uri)
// const client = new MongoClient(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })

client.connect((error, client) => {
    if (error){
        return console.log('Koneksi Gagal!')
    }

    //Pilih database
    const db = client.db(dbName)

    //Menambahkan satu data ke collection mahasiswa
    db.collection('mahasiswa').insertOne({
        nama: 'erik',
        email: 'erik@gmail.com'
    },
    (error,result)=>{
        if(error){
            return console.log("gagal menambahkan data!")
        }

        console.log("menambahkan data berhasil!")
    }
)
})