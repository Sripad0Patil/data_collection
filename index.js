const express = require("express");
const path = require("path");
// const fs = require("fs");
const app = express();
var mongoose = require("mongoose");
const bodyparser = require("body-parser");
const dotenv = require("dotenv")

dotenv.config()

// mongoose.connect('mongodb://localhost/DataCollectionForm');

mongoose.connect(process.env.MONGO_URI);

const port = 8000;

var DataShcema = new mongoose.Schema({
    name: String,
    age: String,
    gender: String,
    address: String,
    more: String
});

var Data = mongoose.model('Data', DataShcema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')); // Serve static files (CSS, JS, images, etc.)
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

// SERVING HTML FILES
// app.get('/', (req, res) => {
//     // Serve the HTML file directly
//     res.sendFile(path.join(__dirname, 'views', 'index.html'));
// });

//html stuff

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.get('/',(req, res) =>{
    const params = { }
    res.status(200).render('index', params);
});

app.post('/index',(req, res) => {
    var myData = new Data(req.body);
    myData.save().then(()=>{
        res.send("This data has been saved to database.")
    }).catch(()=>{
        res.status(400).send("Error: Data was not saved.")
    });
})



// START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on port ${port} :: http://localhost:${port}`);
});
