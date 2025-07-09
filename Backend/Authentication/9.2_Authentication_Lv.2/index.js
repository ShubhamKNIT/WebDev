import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";
import https from "https";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 3000;
const saltRounds = 10;  

const { Pool } = pg;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "secrets",
  password: "postgres",
  port: 5433,
});
// pool.connect();

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
  const email = req.body.username;
  // raw password
  // const passowrd = req.body.password;

  // hashing + salting with bcrypt
  const password = await bcrypt.hash(req.body.password, saltRounds);

  try {
    const checkResult = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (checkResult.rows.length > 0) {
      res.send("Email already exists. Try logging in.");
    } else {
      const result = await pool.query(
        "INSERT INTO users (email, password) VALUES ($1, $2)",
        [email, password]
      );
      console.log(result);
      res.render("secrets.ejs");
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const storedPassword = user.password;

      if (await bcrypt.compare(password, storedPassword)) {
        res.render("secrets.ejs");
      } else {
        res.send("Incorrect Password");
      }
    } else {
      res.send("User not found");
    }
  } catch (err) {
    console.log(err);
  }
});

app.use((req, res, next) => {
  if (req.protocol === "http") {
    res.redirect("https://" + req.headers.host + req.url);
  } else {
    next();
  }
});


// app.listen(port, () => {
//   console.log(`Secure TLS Server running on port https://localhost:${port}`);
// });

const option = {
  key: fs.readFileSync(process.env.KEY_PATH),
  cert: fs.readFileSync(process.env.CERTIFICATE_PATH),
};

https.createServer(option, app).listen(port, () => {
  console.log(`🚀 HTTPS server running at https://localhost:${port}`);
});

// mkdir certs
// cd certs
// openssl req -nodes -new -x509 -keyout key.pem -out cert.pem
// add certificate(public key) key(private key)