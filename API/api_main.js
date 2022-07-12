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

app.post('/new_event', (req, res) => {
  console.log(req.body);
  const start_date = new Date(req.body.startDate)
    .toISOString()
    .slice(0, 19)
    .replace('T', ' ');
  const end_date = new Date(req.body.endDate)
    .toISOString()
    .slice(0, 19)
    .replace('T', ' ');
  connection.connect(err => {
    if (err) {
      throw err;
    }
    connection.query(
      `INSERT INTO eventer_db.events (name, location, start_date, end_date) VALUES ('${req.body.name}', '${req.body.location}', '${start_date}', '${end_date}')`,
      (error, result, fields) => {
        if (error) {
          throw error;
        }

        res.send(result);
      },
    );
  });
});

app.post('/delete_event/:id', (req, res) => {
  console.log('delete API');
  console.log('event id', req.params.id);
  connection.connect(err => {
    if (err) {
      throw err;
    }
    connection.query(
      `DELETE FROM eventer_db.events WHERE event_id = ${req.params.id}`,
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
