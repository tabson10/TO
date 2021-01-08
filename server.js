//create the client class
const {MongoClient} = require("mongodb");
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const ejs = require('ejs');
const mongoose = require("mongoose");
//const MongoClient = require("mongodb").MongoClient
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

const mongoString = "mongodb://localhost:27017/pilka";

mongoose.connect(mongoString, { useNewUrlParser: true, useUnifiedTopology: true });

const appSchema = {
    first_name: String,
    last_name: String,
    club: String,
    number: String,
    gender: String,
}

const Note = mongoose.model('player', appSchema);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/add_player.html');
    })

app.post("/", function (req, res) {
    let newNote = new Note({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        club: req.body.club,
        number: req.body.number,
        gender: req.body.gender,
    });
    newNote.save();
    res.redirect('/index.html');
})

app.get('/index.html', function (req, res) {
    res.sendFile(__dirname + '/index.html');
    })

app.get('/add_player.html', function (req, res) {
    res.sendFile(__dirname + '/add_player.html');
    })

app.get('/all', (req, res) => {
    Note.find({}, function(err, players){
        res.render('index', {
            playersList: players
        })
    })
    })    

app.get('/delete.html', function (req, res) {
    res.sendFile(__dirname + '/delete.html');
    })

app.post("/delete.html", function (req, res) {
    let newNote = new Note({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        club: req.body.club,
        number: req.body.number,
        gender: req.body.gender,
    });
    newNote.remove();
    res.redirect('/index.html');
})

app.listen(3000, function() {
    console.log("server us running on 3000");
    })