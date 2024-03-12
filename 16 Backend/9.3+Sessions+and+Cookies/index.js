import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy } from "passport-local";
import session from "express-session";


const app = express();
const port = 3000;
const saltRounds = 10;

app.use(
  session({
    secret: "TOPSECRET",
    resave: false,
    saveUninitialized: true
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(passport.initialize());
app.use(passport.session());


const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "secrets",
  password: "*****",
  port: 5432,
});
db.connect();

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.get("/logout", (req, res) => {
  req.logout( (err) =>{
    if (err){
      return next(err);
    }
    res.redirect("/");
  })
});

app.get("/secrets", (req, res) => {
  if (req.isAuthenticated()){
    res.render("secrets.ejs")
  } else {
    res.redirect("/login");
  }
});

app.post("/login", 
  passport.authenticate("local", {
    successRedirect: "/secrets",
    failureRedirect: "/login",
  })
);

app.post("/register", async (req, res) => {
   try {
    let email = req.body.username;
    let password = req.body.password;

    const check = await db.query("SELECT * FROM users WHERE email = $1", [email]);

    if (check.rows.length > 0){
      res.send("Email already exists, try logging in...")
    } else {
      bcrypt.hash(password, saltRounds, async (err, hashed) => {
        if (err){
          console.log("Error hashing password:", err);
        }else{
          const result = await db.query("INSERT INTO users(email, password) VALUES ($1, $2) RETURNING *", [email, hashed]);
          const user = result.rows[0];
          req.login(user, (err) => {
            console.log("success");
            res.redirect("/secrets");
          });
        }
      });
    }
  } catch (error) {
    res.send("Error: " + error.message);
    console.log(error);
  }
});



passport.use(
  new Strategy(async function verify(username, password, cb){
    try {
      
      const response = await db.query("SELECT email, password FROM users WHERE email = $1", [username]);
      console.log(response);
      if (response.rows.length > 0){
        const user = response.rows[0];
        const hashedpassword = user.password;

        bcrypt.compare(password, hashedpassword, (err, result) => {
          if (err) {
            console.log("Error comparing passwords: " + err.message);
            return cb(err);
          } else {
            if (result){
              return cb(null, user);
            } else {
              return cb(null, false);
            }
          }
        });
      } else {
        return cb("User not found, try registering");
      }
  
    } catch (error) {
      res.send("Error: " + error.message);
      console.log(error);
    }
  })
)


passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
