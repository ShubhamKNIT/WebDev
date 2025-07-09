import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const { Pool } = pg;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "secrets",
  password: "postgres",
  port: 5433
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  try {
    const user = req.body.username;
    const pass = req.body.password;

    try {
      const result = await pool.query(
        "INSERT INTO users (email, password) VALUES ($1 $2)", 
        [user, pass]
      );
      console.log(result[0]);
      res.redirect("/");
    } catch (error) {
      res.send("Email already registered. Please try login.");
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/login", async (req, res) => {
  try {
    const user = req.body.username;
    const pass = req.body.password;

    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [user]
    );
    
    if (user === result.rows[0].email && pass === result.rows[0].password) {
      res.render("secrets.ejs");
    }
    else {
      res.send("Incorrect password");
    }
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
