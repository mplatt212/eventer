const express = require('express');
const mysql = require('mysql2');
const router = express.Router();
const bcrypt = require('bcrypt');

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'Mwp2123847!',
  database: 'Eventer_DB',
});

router.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});

router.get('/', (req, res) => {
  res.send('You made it to the auth API.');
});

router.post('/create_account', (req, res) => {
  connection.connect(err => {
    if (err) {
      throw new err();
    }

    const saltRounds = 10;
    bcrypt.hash(req.body.pw, saltRounds, (err, hash) => {
      if (err) {
        throw err;
      }

      connection.query(
        `INSERT INTO eventer_db.users (first_name, last_name, email, username, password) VALUES 
    ('${req.body.fName}', '${req.body.lName}', '${req.body.email}', '${req.body.username}', '${hash}')`,
        (err, result, fields) => {
          if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
              res.status(404).send({
                message: 'That username already exists.',
                err_code: `${err.code}`,
              });
              return;
            }
            res
              .status(404)
              .send({message: `${err.sqlMessage}`, err_code: `${err.code}`});
            return;
          }

          res
            .status(200)
            .send({message: 'Account created successfully.', code: 200});
        },
      );
    });
  });
});

router.post('/login', (req, res) => {
  connection.connect(err => {
    if (err) {
      throw err;
    }

    let hash;
    console.log('un', req.body.username);
    connection
      .promise()
      .query(
        `SELECT password FROM eventer_db.users WHERE username = '${req.body.username}'`,
      )
      .then(result => (hash = result[0][0].password))
      .then(() => {
        console.log('hash', hash);
        bcrypt.compare(String(req.body.pw), String(hash), (err, result) => {
          if (err) {
            throw err;
          }
          console.log(result);
        });
      });
  });
});

module.exports = router;
