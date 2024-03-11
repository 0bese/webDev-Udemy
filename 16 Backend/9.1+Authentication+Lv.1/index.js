import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "secrets",
  password: "********",
  port: 5432
});

db.connect();


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
    let email = req.body.username;
    let password = req.body.password;

    const check = await db.query("SELECT * FROM users WHERE email = $1", [email]);

    if (check.rows.length > 0){
      res.send("Email already exists, try logging in...")
    } else {
      await db.query("INSERT INTO users(email, password) VALUES ($1, $2)", [email, password]);
      res.render("secrets.ejs");
    }
  } catch (error) {
    res.send("Error: " + error.message);
    console.log(error);
  }
});

app.post("/login", async (req, res) => {
  try {
    let lemail = req.body.username;
    let lpassword = req.body.password;
    
    const response = await db.query("SELECT email, password FROM users");
    const result = response.rows
    let found = result.find(({ email }) => email === lemail)
    
    if (found){
      if (found.password === lpassword) {
        res.render("secrets.ejs");
      } else {
        res.send("Incorrect password");
      }
    } else {
      res.send("User not found, try registering");
    }

  } catch (error) {
    res.send("Error: " + error.message);
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
