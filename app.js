const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set('view engine', 'ejs');

const tasks = [];

app.get("/", function(req, res) {

    const day = date.getDate();

    res.render('list', {kindOfDay: day, tasks: tasks}); 
});

app.post("/", function (req, res) {

    const newTask = req.body.inputTask;
    tasks.push(newTask);

    res.redirect("/");
});

app.post("/delete", function (req, res) {

    const taskIndex = req.body.index;
    tasks.splice(taskIndex, 1);

    res.redirect("/");
});


app.listen(3000, function() {
    console.log("Server is running on port 3000");
});




// //Finding the day
// var today = new Date();
// var currentDay = today.getDay()
// var daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
// var day = daysOfTheWeek[currentDay];;