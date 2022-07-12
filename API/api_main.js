const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'Mwp2123847!',
  database: 'Eventer_DB',
});

const app = express();

app.use(express.json());

app.get('/test', (req, res) => {
  res.send('testing...');
});

app.get('/events', (req, res) => {
  connection.connect(err => {
    if (err) {
      throw err;
    }
    connection.query(
      'SELECT * FROM eventer_db.events',
      (error, result, fields) => {
        if (error) {
          throw error;
        }
        res.send(result);
      },
    );
  });
});

app.post('/new_event/:event', (req, res) => {
  console.log(req.body);
  connection.connect(err => {
    if (err) {
      throw err;
    }
    console.log('API data', req.body);
    console.log(res);
    connection.query(
      `INSERT INTO eventer_db.events (name, location, start_date, end_date) VALUES ('${req.body.name}', '${req.body.location}', '${req.body.startDate}', '${req.body.endDate}')`,
      (error, result, fields) => {
        if (error) {
          throw error;
        }

        res.send(result);
      },
    );
  });
});

app.listen(3000, () => {
  console.log('Hello!');
});
