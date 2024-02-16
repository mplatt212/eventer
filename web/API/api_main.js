const express = require("express");
const mysql = require("mysql2");
const auth = require("./api_auth");

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

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use("/auth", auth);

app.get("/", (req, res) => {
  res.send("You made it to the main 192.168.68.61.");
});

app.get("/events/:userID", (req, res) => {
  connection.connect((err) => {
    if (err) {
      throw err;
    }
    const userID = req.params.userID;
    connection.query(
      `SELECT * FROM eventer_db.events WHERE user_id = '${userID}'`,
      (error, result, fields) => {
        if (error) {
          throw error;
        }
        res.send(result);
      }
    );
  });
});

app.post("/new_event/:userID/:editDayOffset", (req, res) => {
  console.log("body", req.body, req.params.userID);
  const start_date = new Date(req.body.startDate)
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");
  const end_date = new Date(req.body.endDate)
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");
  connection.connect((err) => {
    if (err) {
      throw err;
    }
    if (req.body.id < 0) {
      connection.query(
        `INSERT INTO eventer_db.events (name, location, start_date, end_date, user_id) VALUES ('${req.body.name}', '${req.body.location}', '${start_date}', '${end_date}', '${req.params.userID}')`,
        (error, result, fields) => {
          if (error) {
            throw error;
          }

          res.send(result);
        }
      );
    } else {
      connection.query(
        `UPDATE eventer_db.events SET name='${req.body.name}', location='${req.body.location}', start_date='${start_date}', end_date='${end_date}' WHERE event_id = ${req.body.id}`,
        (error, result, fields) => {
          if (error) {
            throw error;
          }
          if (req.params.editDayOffset === -1) {
            res.send(result);
          }
        }
      );
      if (req.params.editDayOffset !== -1) {
        connection.query(
          `UPDATE IGNORE eventer_db.meals SET date = date_add(date, interval ${req.params.editDayOffset} day) WHERE event_id = ${req.body.id};`,
          (error, result, fields) => {
            if (error) {
              throw error;
            }
            res.send(result);
          }
        );
      }
    }
  });
});

app.post("/delete_event/:id", (req, res) => {
  console.log("delete 192.168.68.61");
  console.log("event id", req.params.id);
  connection.connect((err) => {
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
      }
    );
  });
});

app.post("/fetch_event/:id", (req, res) => {
  connection.connect((err) => {
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
      }
    );
  });
});

app.post("/new_meal_date/:date/:mealTypes/:event_id", (req, res) => {
  console.log("params", req.params);
  connection.connect((err) => {
    if (err) {
      throw err;
    }

    const date = new Date(req.params.date)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ")
      .split(" ")[0];

    const meals = req.params.mealTypes.split(",");

    for (let x = 0; x < meals.length; x++) {
      let mealExists = false;
      connection
        .promise()
        .query(
          `SELECT * FROM eventer_db.meals WHERE event_id = ${req.params.event_id} AND meal_type = '${meals[x]}' AND date = '${date}'`
        )
        .then((result) => {
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
              }
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

app.get("/meals/:event_id", (req, res) => {
  connection.connect((err) => {
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
      }
    );

    connection.query(
      `SELECT meals.meal_id, event_id, meal_type as meals, date, group_concat(item_id) as item_id, group_concat(name) as food_names, 
      group_concat(first_name) as first_name,  group_concat(last_name) as last_name, group_concat(username) as username, group_concat(id) as user_id
      FROM eventer_db.meals meals
      LEFT JOIN eventer_db.food_items food on food.meal_id = meals.meal_id
      LEFT JOIN eventer_db.users users on food.user_id = users.id
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
          result.map((el) => {
            if (el.date.getDate() === dates[x].date.getDate()) {
              let foodItemArr = [];
              if (el.food_names) {
                for (
                  let i = 0;
                  i < Array.from(el.food_names.split(",")).length;
                  i++
                ) {
                  const itemsArr = Array.from(el.food_names.split(","));
                  const idArr = Array.from(el.item_id.split(","));
                  let fNameArr = [];
                  let lNameArr = [];
                  let usernameArr = [];
                  let userIDArr = [];
                  if (el.first_name) {
                    fNameArr = Array.from(el.first_name.split(","));
                  }
                  if (el.last_name) {
                    lNameArr = Array.from(el.last_name.split(","));
                  }
                  if (el.username) {
                    usernameArr = Array.from(el.username.split(","));
                  }
                  if (el.user_id) {
                    userIDArr = Array.from(el.user_id.split(","));
                  }
                  foodItemArr.push({
                    id: Number(idArr[i]),
                    menu_item: itemsArr[i],
                    first_name: fNameArr[i],
                    last_name: lNameArr[i],
                    username: usernameArr[i],
                    user_id: userIDArr[i],
                  });
                }
              }
              mealsArr.push({
                meal_id: el.meal_id,
                meal: el.meals,
                food_items: el.food_names ? foodItemArr : [],
              });
            }
          });
          meal.meals = mealsArr;
          meals.push(meal);
        }
        res.send(meals);
      }
    );
  });
});

app.post("/new_menu_item/:meal_id/:name", (req, res) => {
  connection.query(
    `INSERT INTO eventer_db.food_items (meal_id, name) VALUES (${req.params.meal_id}, '${req.params.name}')`,
    (error, result, fields) => {
      if (error) {
        throw error;
      }
      res.send(result);
    }
  );
});

app.post("/delete_menu_item/:item_id", (req, res) => {
  connection.query(
    `DELETE FROM eventer_db.food_items WHERE item_id = ${req.params.item_id}`,
    (error, result, fields) => {
      if (error) {
        throw error;
      }

      res.send(result);
    }
  );
});

app.get("/ingredients/:event_id/:date", (req, res) => {
  connection.query(
    `SELECT ingred_id, item_id as menu_item_id, ing.name as ing, meals.meal_id, users.first_name, users.last_name, users.id as user_id FROM eventer_db.ingredients ing
      LEFT JOIN eventer_db.food_items food ON food.item_id = ing.food_item_id
      LEFT JOIN eventer_db.meals meals ON food.meal_id = meals.meal_id
      LEFT JOIN eventer_db.users users ON ing.user_id = users.id
      WHERE event_id = ${req.params.event_id} AND date = '${req.params.date}'`,
    (error, result, fields) => {
      if (error) {
        throw error;
      }
      res.send(result);
    }
  );
});

app.post("/add_ingredient/:food_item_id/:ing_name", (req, res) => {
  connection.query(
    `INSERT INTO eventer_db.ingredients (food_item_id, name) VALUES (${req.params.food_item_id}, '${req.params.ing_name}')`,
    (error, result, fields) => {
      if (error) {
        throw error;
      }

      res.send(result);
    }
  );
});

app.post("/delete_ingredient/:ing_id", (req, res) => {
  connection.query(
    `DELETE FROM eventer_db.ingredients WHERE ingred_id = ${req.params.ing_id}`,
    (error, result, fields) => {
      if (error) {
        throw error;
      }

      res.send(result);
    }
  );
});

app.post("/user_take_food_item/:food_item_id/:user_id", (req, res) => {
  let userTaken = false;

  connection.query(
    `SELECT user_id FROM eventer_db.food_items WHERE item_id = ${req.params.food_item_id}`,
    (err, result, fields) => {
      if (err) {
        throw err;
      }
      if (result.length > 0) {
        userTaken = true;
      }
    }
  );

  if (userTaken === true) {
    connection
      .promise()
      .query(
        `UPDATE eventer_db.food_items SET user_id = null WHERE item_id = ${req.params.food_item_id}`
      )
      .then(
        connection.query(
          `UPDATE eventer_db.ingredients SET user_id = null WHERE food_item_id = ${req.params.food_item_id}`,
          (error, result, fields) => {
            if (error) {
              throw error;
            }
            console.log("null", result);
            res.send(result);
          }
        )
      );
  } else {
    connection
      .promise()
      .query(
        `UPDATE eventer_db.food_items SET user_id = ${req.params.user_id} WHERE item_id = ${req.params.food_item_id}`
      )
      .then(
        connection.query(
          `UPDATE eventer_db.ingredients SET user_id = ${req.params.user_id} WHERE food_item_id = ${req.params.food_item_id}`,
          (error, result, fields) => {
            if (error) {
              throw error;
            }
            console.log("take", result);
            res.send(result);
          }
        )
      );
  }
});

app.listen(3000, () => {
  console.log("Hello!");
});
