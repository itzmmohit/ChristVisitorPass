const express = require("express");
const mysql = require("mysql");
const exphbs = require("express-handlebars");
const path = require('path');
const dotenv = require("dotenv"); //for our .env file
const cookieParser = require('cookie-parser');

//To store all our environment variables used in the project, we use a .env file (for our senstive info)
dotenv.config({path:'./.env'}) //This is to tell the dotenv module where the file of env variables are. (Eg: here .env)
                              // ./ means in the same dir

const app = express();

app.engine('hbs', exphbs.engine( {extname: '.hbs' }));
app.set('view engine', 'hbs'); //specify nodejs which template engine we are using
app.set('views', path.join(__dirname, '../client/views'));

//publicDirectory is the path where we will store our static files (css, js scripts and so on)
const publicDirectory = path.join(__dirname, '../client/public'); //__dirname will give the working directory path (if any doubt type console.log(__dirname))
//The above path is same as D:\Aaron\MCA\3SEM\Project\Login\public in my case

//To use the assets in publicDir, we tell express to use it. and then link the files in html or wherever we want.
app.use(express.static(publicDirectory));

//Grab data from any forms (Parse URL-encoded {becuase of POST} bodies as sent by HTML forms)
app.use(express.urlencoded({extended: false}));
//Parse data as json
app.use(express.json());
//initiliaze cookie parser for use
app.use(cookieParser());//clear cookies in browser if localhost not coming up

const db = mysql.createConnection({ //to create a connection to our mysql db, we provide the metadata for connection below
    host: process.env.DATABASE_HOST, //if i was using a server, we put the ip address of server here
    user: process.env.DATABASE_USER, //xampp default username and pass is root and "(nothing)"
    password: process.env.DATABASE_PASSWORD, //we use this syntax to access the env file contents
    database: process.env.DATABASE
})

//To actually connect to the db
db.connect((error) => { //we give a parameter called error, so that if an error is coming up, deal with it somehow
    if(error){
        console.log(error)
    }
    else{
        console.log("MySQL Connected...")
    }
})

//since defining all the routes in the app.js file will be confusing,
//we make a dedicated file for the routes


//Defining routes
app.use('/', require('./routes/pages')); //This means that whenever someone access '/', go to routes/pages.
app.use('/auth', require('./routes/auth')); //This means that whenever someone access '/auth', go to routes/auth which will have its subroutes.

app.listen(5001, () => {
    console.log("Server started on Port 5001");
}); //which port should server listen to.