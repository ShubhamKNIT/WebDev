import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
const { Pool } = pg;

const app = express();
const port = 3000;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "postgres",
  port: 5433,
});
pool.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 1;

let users = [
  { id: 1, name: "Angela", color: "teal" },
  { id: 2, name: "Jack", color: "powderblue" },
];

async function checkVisisted() {
  const result = await pool.query(
    "SELECT v.country_code FROM visited_countries v\
    JOIN users u\
    ON u.id = v.user_id\
    WHERE v.user_id = $1",
    [currentUserId]
  );
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country);
  });
  return countries;
}

async function getCurrentUser() {
  const result = await pool.query("SELECT * FROM users");
  ids = result.rows;
  return ids.find((user) => user.id === currentUserId);
}

// home page
app.get("/", async (req, res) => {
  const countries = await checkVisisted();
  currentUserId = await getCurrentUser();
  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color: currentUserId.color,
  });
});

// home page - add new visited country for user
app.post("/add", async (req, res) => {
  const country_name = req.body["country"];
  const currentUser = await getCurrentUser();

  try {
    const result = await pool.query(
      "SELECT country_code\
       FROM countries\
       WHERE LOWER(country_name) == $1",
       [country_name.toLowerCase()]
    )

    const country_code = result.rows[0].country_code;

    try {
      await pool.query(
        "INSERT INTO\
         visited_countries (coutry_code, user_id)\
         VALUES ($1 $2)",
        [country_code, currentUserId]
      );
      res.redirect("/");
    } catch(error) {
      console.log(err);
    }
  } catch (error) {
    console.log(error);
  }
});

// add a new user page
app.post("/user", async (req, res) => {
  if (req.body.add === "new") {
    res.render("new.ejs");
  } else {
    currentUserId = req.body.user;
    res.render("/");
  }
});

// create a new user
app.post("/new", async (req, res) => {
  //Hint: The RETURNING keyword can return the data that was inserted.
  //https://www.postgresql.org/docs/current/dml-returning.html
  const name = req.body.name;
  const color = req.body.color;

  const result = await pool.query(
    "INSERT INTO users (name, color) VALUES ($1, $2)",
    [name, color]
  )

  const id = result.rows[0].id;
  currentUserId = id;

  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
