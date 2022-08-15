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
  console.log('body', req.body);
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
    if (req.body.id < 0) {
      connection.query(
        `INSERT INTO eventer_db.events (name, location, start_date, end_date) VALUES ('${req.body.name}', '${req.body.location}', '${start_date}', '${end_date}')`,
        (error, result, fields) => {
          if (error) {
            throw error;
          }

          res.send(result);
        },
      );
    } else {
      connection.query(
        `UPDATE eventer_db.events set name='${req.body.name}', location='${req.body.location}', start_date='${start_date}', end_date='${end_date}' WHERE event_id = ${req.body.id}`,
        (error, result, fields) => {
          if (error) {
            throw error;
          }

          res.send(result);
        },
      );
    }
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

app.post('/fetch_event/:id', (req, res) => {
  connection.connect(err => {
    if (err) {
      throw err;
    }
    connection.query(
      `SELECT * FROM eventer_db.events WHERE event_id = ${req.params.id}`,
      (error, result, fields) => {
        if (error) {
          throw error;
        }
        res.send(result);
      },
    );
  });
});

app.post('/new_meal_date/:date/:mealTypes/:event_id', (req, res) => {
  console.log('params', req.params);
  connection.connect(err => {
    if (err) {
      throw err;
    }

    const date = new Date(req.params.date)
      .toISOString()
      .slice(0, 19)
      .replace('T', ' ')
      .split(' ')[0];

    const meals = req.params.mealTypes.split(',');

    for (let x = 0; x < meals.length; x++) {
      let mealExists = false;
      connection
        .promise()
        .query(
          `SELECT * FROM eventer_db.meals WHERE event_id = ${req.params.event_id} AND meal_type = '${meals[x]}' AND date = '${date}'`,
        )
        .then(result => {
          if (result[0].length > 0) {
            mealExists = true;
          }
        })
        .then(() => {
          if (!mealExists) {
            connection.query(
              `INSERT INTO eventer_db.meals (event_id, meal_type, date) VALUES ('${req.params.event_id}', '${meals[x]}', '${date}')`,
              (error, result, fields) => {
                if (error) {
                  throw error;
                }
                res.send(result);
              },
            );
          } else {
            res.status(400).json({
              status: 400,
              message: `You already have a ${meals[x]} planned for ${date}.`,
            });
          }
        });
    }
  });
});

app.get('/meals/:event_id', (req, res) => {
  connection.connect(err => {
    if (err) {
      throw err;
    }
    let dates;
    connection.query(
      `SELECT date FROM eventer_db.meals WHERE event_id = ${req.params.event_id} GROUP BY date ORDER BY date`,
      (error, result, fields) => {
        if (error) {
          throw error;
        }
        dates = result;
      },
    );

    connection.query(
      `SELECT meals.meal_id, event_id, meal_type as meals, date, item_id, group_concat(name) as food_names FROM eventer_db.meals meals
      LEFT JOIN eventer_db.food_items food on food.meal_id = meals.meal_id
      WHERE event_id = ${req.params.event_id}
      GROUP BY meals.meal_id`,
      (error, result, fields) => {
        if (error) {
          throw error;
        }

        let meals = [];
        for (let x = 0; x < dates.length; x++) {
          let meal = {};
          meal.date = dates[x].date;
          let mealsArr = [];
          result.map(el => {
            if (el.date.getDate() === dates[x].date.getDate()) {
              mealsArr.push({
                meal_id: el.meal_id,
                meal: el.meals,
                food_items: el.food_names
                  ? Array.from(el.food_names.split(','))
                  : [],
              });
            }
          });
          meal.meals = mealsArr;
          meals.push(meal);
        }
        res.send(meals);
      },
    );
  });
});

app.post('/new_menu_item/:meal_id/:name', (req, res) => {
  connection.query(
    `INSERT INTO eventer_db.food_items (meal_id, name) VALUES (${req.params.meal_id}, '${req.params.name}')`,
    (error, result, fields) => {
      if (error) {
        throw error;
      }
      res.send(result);
    },
  );
});

app.listen(3000, () => {
  console.log('Hello!');
});
