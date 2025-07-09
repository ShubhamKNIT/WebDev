import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const { Pool } = pg;

const app = express();
const port = 3000;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "permalist",
  password: "postgres",
  port: 5433
}); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// let items = [
//   { id: 1, title: "Buy milk" },
//   { id: 2, title: "Finish homework" },
// ];
// let items = [];

app.get("/", async (req, res) => {
  const result = await pool.query("SELECT * FROM items");
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: result.rows,
  });
});

app.post("/add", async (req, res) => {
  const item = req.body.newItem;
  // items.push({ title: item });
  const result = await pool.query("INSERT INTO items (title) VALUES ($1)", [item]);
  console.log("Item added: ", result.rows[0]);
  res.redirect("/");
});

app.post("/edit", async (req, res) => {
  const updatedTitle = req.body.updatedItemTitle;
  const updatedItemId = req.body.updatedItemId;

  const result = await pool.query(
    "UPDATE items\
     SET title = $1\
     WHERE id = $2",
    [updatedTitle, updatedItemId]
  );

  console.log(`Item updated with id ${updatedItemId}: ${result.rows[0]}`);
  res.redirect("/");
});

app.post("/delete", async (req, res) => {
  const itemId = req.body.deleteItemId;

  const result = await pool.query(
    "DELETE FROM items\
     WHERE id = $1",
    [itemId]
  );

  console.log(`Item deleted with id ${result.rows[0]}`);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
