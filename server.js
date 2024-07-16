const express = require('express');
const bodyParser = require('body-parser'); // perbaiki penulisan body-parser
const mysql = require('mysql2');

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');
//set template engine ejsgu

app.use(bodyParser.urlencoded({ extended: true })); //body-parser untuk post form agar bisa ditangkap hasil inputannya

// setup konfigurasi database
const db = mysql.createConnection({
  host: 'localhost',
  database: 'school',
  user: 'root',
  password: 'Anggoro22',
});

// membuka koneksi database
db.connect((err) => {
  if (err) throw err; // jika terjadi error maka lempar error
  console.log('connected to database'); // dan jika tidak ada error, tampilkan 'connected to database'

  // untuk get data
  app.get('/', (req, res) => {
    const sql = 'SELECT * FROM user'; // ketika slash '/' diakses, maka akan select semua data
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        return;
      }
      const users = JSON.parse(JSON.stringify(result));
      res.render('index', { users: users, title: 'Daftar Murid' }); // untuk menampilkan index.ejs dan menampilkan data users
    });
  });
  // untuk insert data
  app.post('/tambah', (req, res) => {
    const insertSql = `INSERT INTO user (nama, kelas) VALUES ('${req.body.nama}', '${req.body.kelas}');`;
    db.query(insertSql, (err, result) => {
      if (err) throw err;
      res.redirect('/');
    });
  });
});

app.listen(8000, () => {
  console.log('server ready');
});
