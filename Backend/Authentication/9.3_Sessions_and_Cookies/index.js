import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";
import session from "express-session";
import passport from "passport";
import { Strategy } from "passport-local";
import fs from "fs";
import https from "https";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 3000;
const saltRounds = 10;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// session first  // creates session key
// cookie can be scraped/hikacked
// app.use(
//   session({
//     secret: "topsecret",
//     resave: false,
//     saveUninitialized: true,
//   })
// );

// app.use(
//   session({
//     secret: "topsecret",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       httpOnly: true, // prvents access from JS, protects from XSS
//       secure: true, // only send cookie over https
//       sameSite: "lax", // mitigates CSRF (can also use `strict`)
//       maxAge: 1000 * 60 * 60 * 60 * 24,   // 1 day validity
//     },
//   })
// );

app.use(
  session({
    secret: "topsecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true, // prvents access from JS, protects from XSS
      secure: true, // only send cookie over https
      sameSite: "lax", // mitigates CSRF (can also use `strict`)
      maxAge: 1000 * 60 * 60 * 60 * 24,   // 1 day validity
    },
  })
);

// passport second (used for authentication)
app.use(passport.initialize());
app.use(passport.session());

const { Pool } = pg;
const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABSE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
});
// pool.connect(); // not needed when using pool

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.get("/secrets", (req, res) => {
  console.log(req.user);
  if (req.isAuthenticated()) {
    res.render("secrets.ejs");
  } else {
    res.redirect("/login");
  }
});

app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    const checkResult = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (checkResult.rows.length > 0) {
      res.send("Email already exists. Try logging in.");
    } else {
      //hashing the password and saving it in the database
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
        } else {
          console.log("Hashed Password:", hash);
          const result = await pool.query(
            "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
            [email, hash]
          );
          // res.render("secrets.ejs");
          
          const user = result.rows[0];
          req.login(user, (err) => {
            console.log(err);
            res.redirect("/secrets");
          });
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", passport.authenticate("local", {
  successRedirect: "/secrets",
  failureRedirect: "/login",
}));

passport.use(new Strategy(async function verify(username, password, cb) {
  // cb is callback of passport.js
  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      username,
    ]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const storedHashedPassword = user.password;
      bcrypt.compare(password, storedHashedPassword, (err, result) => {
        if (err) {
          // console.error("Error comparing passwords:", err);
          return cb(err);
        } else {
          if (result) {
            // res.render("secrets.ejs");
            return cb(err, user);
          } else {
            // res.send("Incorrect Password");
            return cb(null, false);
          }
        }
      });
    } else {
      // res.send("User not found");
      return cb("User not found");
    }
  } catch (err) {
    // console.log(err);
    return cb(err);
  }
}));

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

app.use((req, res, next) => {
  if (req.protocol === "http") {
    res.redirect("https://" + req.headers.host + req.url);
  } else {
    next();
  }
});

const option = {
  key: fs.readFileSync(process.env.KEY_PATH),
  cert: fs.readFileSync(process.env.CERTIFICATE_PATH),
};

https.createServer(option, app).listen(port, () => {
  console.log(`🚀 HTTPS server running at https://localhost:${port}`);
})