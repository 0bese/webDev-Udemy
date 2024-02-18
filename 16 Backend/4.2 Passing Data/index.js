import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
var firstName = "";
var lastName = "";
let length = 0;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render('index.ejs');
});

app.post("/submit", (req, res) => {
  firstName = req.body.fName;
  lastName = req.body.lName;
  length = firstName.length + lastName.length;
  res.render('index.ejs', { len : length});
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
