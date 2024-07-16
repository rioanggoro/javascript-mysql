const express = require('express');
const mysql = require('mysql2');

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

//setup konfigurasi database
const db = mysql.createConnection({
  host: 'localhost',
  database: 'school',
  user: 'root',
  password: 'Anggoro22',
});

//membuka koneksi database
db.connect((err) => {
  if (err) throw err; // jika terjadi error maka lempar error
  console.log('connected to database'); // dan jika tidak ada error, tampilkan 'connected to database'
  const sql = 'SELECT * FROM user';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      return;
    }
    const users = JSON.parse(JSON.stringify(result));
    console.log('Hasil database ->', users);
    app.get('/', (req, res) => {
      res.render('index', { users: users, title: 'Daftar Murid' }); // untuk menampilkan index.ejs dan menampilkan data users
    });
  });
});

app.listen(8000, () => {
  console.log('server ready');
});
