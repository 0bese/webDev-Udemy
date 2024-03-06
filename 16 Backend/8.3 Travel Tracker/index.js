import express from "express";
import bodyParser from "body-parser";
import pg from "pg"

const app = express();
const port = 3000;

const db = new  pg.Client({
  user: 'postgres',
  host: 'localhost',
  database: 'world',
  password: '******',
  port: 5432
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  //Write your code here.
  try {
    const result = await db.query("SELECT country_code FROM visited_countries");
    const countries = result.rows.map(row => row.country_code);
    
    res.render('index.ejs', { countries, total: countries.length });
  } catch (err) {
    console.error("Error querying visited_countries", err);
    res.status(500).send("Internal Server Error");
  }
});


app.post("/add", async (req, res) => {
  const userInput = req.body.country;
  //console.log(userInput);
  try {
    const result = await db.query("SELECT country_code FROM countries WHERE LOWER(country_name) = $1", [userInput.toLowerCase()]);
    const code = result.rows[0].country_code;
    if (result.rows.length !== 0) {
      await db.query("INSERT INTO visited_countries(country_code) VALUES ($1)", [code]);
    }
    res.redirect("/");
  } catch (err) { 
    console.error("Error querying visited_countries", err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/remove", async (req, res) => {
  const userInput = req.body.country;
  //console.log(userInput);
  try {
    const result = await db.query("SELECT country_code FROM countries WHERE LOWER(country_name) = $1", [userInput.toLowerCase()]);
    const code = result.rows[0].country_code;
    if (result.rows.length !== 0) {
      await db.query("DELETE FROM visited_countries WHERE country_code = ($1)", [code]);
    }
    res.redirect("/");
  } catch (err) { 
    console.error("Error querying visited_countries", err);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
