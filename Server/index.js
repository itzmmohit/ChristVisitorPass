const express = require('express')
const app = express()
var cors = require('cors')
const bodyParser = require('body-parser')
const mysql = require('mysql2')

const port = 3308
const hostname = 'localhost'
const db = "cvp"
const tbl = "visitor"

app.use(cors())

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));

var corsOptions = {
    origin: '*',
    methods: "GET",
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// MySQl connection
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: db
});

// Connect with MySql
connection.connect((err) => {
    if (err)
        throw (err)
    console.log("MySql Connected")
})