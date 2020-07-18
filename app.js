const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set('view engine', 'ejs');

mongoose.connect(`mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.xnz6g.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true});

const taskSchema = {
    name: {
      type: String,
      required: [true, 'Fill in the form!']
    },
};

const Task = mongoose.model('Task', taskSchema);

// const task1 = new Task({
//     name: "Welcome"
// });

// const defaultTasks = [task1];

// Task.insertMany(defaultTasks, function(err) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("success")
//     }
// });

app.get("/", function(req, res) {

    const day = date.getDate();

    Task.find({}, function(err, tasks) {
        res.render('list', {kindOfDay: day, tasks: tasks}); 
    });

});

app.post("/", function (req, res) {

    const newTask = req.body.inputTask;

    const task = new Task({
        name: newTask
    });

    task.save();

    res.redirect("/");
});

app.post("/delete", function (req, res) {

    const taskIndex = req.body.index;

    Task.deleteOne({ _id: taskIndex }, function (err) {
        if (err) return handleError(err);
      });

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