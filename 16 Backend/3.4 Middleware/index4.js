import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import morgan from "morgan";

const app = express();
const port = 3000;
var bandName = "";
const __dirname = dirname(fileURLToPath(import.meta.url));

function bandNameGenerator(req, res, next) {
  bandName = req.body.street + req.body.pet;
  next();
}

app.use(morgan("tiny"));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bandNameGenerator);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post('/submit', (req, res) => {
    res.send(`<h1> Your bandname is </h1> <h2>${bandName} ✌🏾</h2>`);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
