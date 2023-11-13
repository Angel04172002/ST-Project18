const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require("dotenv").config({path: './.env'})
const pool = require('./db');
const router = express.Router();

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");    
    next();
});

const routes = require("./routes/routes");
app.use('/', routes)


app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})