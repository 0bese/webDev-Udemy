import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "*****",
  port: 5432
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let items = [];

//gets items on the ToDo list
async function getItems(){
  const result = await db.query("SELECT * FROM items");
  items = result.rows;
}


app.get("/", async (req, res) => {
  await getItems();

  res.render("index.ejs", {
    listTitle: "To Do List",
    listItems: items,
  });
});

app.post("/add",async (req, res) => {
  try {
    let item = req.body.newItem;
    await db.query("INSERT INTO items(title) VALUES($1)", [item])
    res.redirect("/");
  } catch (error) {
    res.send("Error adding item");
  }
});

app.post("/edit", async (req, res) => {
  try {
    let itemID = req.body.updatedItemId;
    let updatedTitle = req.body.updatedItemTitle;
    await db.query("UPDATE items SET title = $1 WHERE id = $2", [updatedTitle, itemID]);
    res.redirect("/");
  } catch (error) {
    res.send("Error editing item");
  }
});

app.post("/delete", async (req, res) => {
  try {
    let itemID = req.body.deleteItemId;
    await db.query("DELETE FROM items WHERE id = $1", [itemID]);
    res.redirect("/");
  } catch (error) {
    res.send("Error deleting item");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
