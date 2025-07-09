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
  port: 5433
});
pool.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

async function checkVisited(country_name) {
  try {
    const result = await pool.query(
      "SELECT * FROM visited_countries\
       WHERE country_code = (\
        SELECT country_code FROM countries\
        WHERE country_name = $1)",
      [country_name]
    );

    if (result.rows.length > 0) return true;
    else return false;
  } catch (error) {
    console.log(error.message);
  }
}

// const result = await(checkVisited("India"));
// console.log(result);

async function addCountry(country_name) {
  try {
    const result = await pool.query(
      `INSERT INTO visited_countries (country_code)
      SELECT country_code FROM countries
      WHERE country_name = $1`,
      [country_name]
    );
    return result;
  } catch (error) {
    console.log(error.message);
  }
}



// get all visited countries code
app.get("/", async (req, res) => {
  //Write your code here.
  const result = await pool.query("SELECT country_code FROM visited_countries");
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  console.log(result.rows);
  res.render("index.ejs", { countries: countries, total: countries.length });
  // res.render("index.ejs", { country_codes: result.rows, total: result.rows.length });
});

// add new country code
app.post("/add", async(req, res) => {
  try {
    const country_name = req.body.country;
    const visited = await checkVisited(country_name);
    if (!visited) {
      const result = await addCountry(country_name);
      console.log(result.rows[0]);
      res.redirect("/");
    } 
    else {
      console.log("Country already visited");
      res.redirect("/");
    }   
  } catch (error) {
    console.log(error.message);
  }
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
