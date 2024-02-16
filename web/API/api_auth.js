const express = require("express");
const mysql = require("mysql2");
const router = express.Router();
const bcrypt = require("bcrypt");

// const connection = mysql.createConnection({
//   connectionLimit: 100,
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });

const connection = mysql.createConnection({
  // connectionLimit: 100,
  host: "127.0.0.1",
  user: "root",
  password: "Mwp2123847!",
  database: "eventer_db",
  port: 3307,
});

router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});

router.get("/", (req, res) => {
  res.send("You made it to the auth 192.168.68.61.");
});

router.post("/create_account", (req, res) => {
  connection.connect((err) => {
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
            if (err.code === "ER_DUP_ENTRY") {
              res.status(404).send({
                message: "That username already exists.",
                err_code: `${err.code}`,
              });
              return;
            }
            res
              .status(404)
              .send({ message: `${err.sqlMessage}`, err_code: `${err.code}` });
            return;
          }

          res
            .status(200)
            .send({ message: "Account created successfully.", code: 200 });
        }
      );
    });
  });
});

router.post("/login", (req, res) => {
  console.log("reached login");
  connection.connect((err) => {
    if (err) {
      throw err;
    }

    let hash;
    connection
      .promise()
      .query(
        `SELECT id, password, first_name, last_name, email, username FROM eventer_db.users WHERE username = '${req.body.username}'`
      )
      .then((result) => {
        console.log(result[0]);
        if (result[0].length > 0) {
          hash = result[0][0].password;
          bcrypt.compare(
            String(req.body.pw),
            String(hash),
            (bcrypt_err, bcrypt_result) => {
              if (bcrypt_err) {
                throw err;
              }
              if (bcrypt_result === true) {
                res.status(200).send({
                  login: true,
                  id: result[0][0].id,
                  first_name: result[0][0].first_name,
                  last_name: result[0][0].last_name,
                  email: result[0][0].email,
                  username: result[0][0].username,
                });
              } else {
                res.status(401).send({
                  login: false,
                  message: "Your password does not match our records.",
                });
              }
            }
          );
        } else {
          res.status(401).send({
            message: "Your user name does not match our records.",
          });
        }
      });
  });
});

module.exports = router;
