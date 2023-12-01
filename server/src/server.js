const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require("dotenv").config({path: '../.env'})
const pool = require('./db');
const router = express.Router();
const cors = require('cors');

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(cors())
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Methods", "GET PATCH DELETE POST");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    next();
});

const routes = require("./routes/routes");
app.use('/', routes)


app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})





