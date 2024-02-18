import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

const today = new Date();
const day = today.getDay();
var week = "";
var info ="";

function weekdayOrNot(req, res, next) {
    if (day >= 1 && day <= 5){
        week = "weekday"
        info = "it's time to work hard"
    }
    else {
        week = "weekend"
        info = "it's time to have fun"
    }
    next();
}

app.use(weekdayOrNot);
app.get('/', (req, res) => {
    res.render(__dirname + "/views/index.ejs",
    {weektype : week, message : info});
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});