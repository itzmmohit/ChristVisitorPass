const express = require("express");
const mysql = require("mysql");
const exphbs = require("express-handlebars");
const fileUpload = require("express-fileupload");
const path = require('path');
const dotenv = require("dotenv"); //for our .env file
const cookieParser = require('cookie-parser');
//delete body-parser dependeceny?

//To store all our environment variables used in the project, we use a .env file (for our senstive info)
dotenv.config({path:'./.env'}) //This is to tell the dotenv module where the file of env variables are. (Eg: here .env)
                              // ./ means in the same dir

const port = process.env.PORT || 5001;
const app = express();

//To use the file upload
app.use(fileUpload());

const handlebars = exphbs.create({
    extname: '.hbs',
    helpers: {
      eq: function (a, b) {
        return a === b;
      },
      json: function(obj) {
        return JSON.stringify(obj);
      }
      ,
      formatDate: function(date){
        const options = {
          year: '2-digit',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        };
        if(date == null)
          return 'NIL';
        const formattedDate = new Date(date).toLocaleDateString('en-US', options);
        return formattedDate.replace(',', '');
      }
    }
  });
app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs'); //specify nodejs which template engine we are using
app.set('views', path.join(__dirname, '../client/views'));

//publicDirectory is the path where we will store our static files (css, js scripts and so on)
const publicDirectory = path.join(__dirname, '../client/public'); //__dirname will give the working directory path (if any doubt type console.log(__dirname))
//The above path is same as D:\Aaron\MCA\3SEM\Project\Login\public in my case

//To use the assets in publicDir, we tell express to use it. and then link the files in html or wherever we want.
app.use(express.static(publicDirectory));

//Parsing middleware
// Parse application/x-www-form-urlencoded
//Grab data from any forms (Parse URL-encoded {becuase of POST} bodies as sent by HTML forms)
app.use(express.urlencoded({extended: false}));
//Parse data as json
app.use(express.json());
//initiliaze cookie parser for use
app.use(cookieParser());//clear cookies in browser if localhost not coming up

//Where the sql code was: (label A)

// //since defining all the routes in the app.js file will be confusing,
// //we make a dedicated file for the routes


//Defining routes
app.use('/admin', require('./routes/adminpages')); //This means that whenever someone access '/', go to routes/pages.
app.use('/auth', require('./routes/auth')); //This means that whenever someone access '/auth', go to routes/auth which will have its subroutes.
app.use('/visit', require('./routes/visitorpages'));

app.listen(port, () => console.log(`Server Started: http://localhost:${port}/admin`)); //which port should server listen to.



//label A
//Dont really need the below code since we are not using it.
// const db = mysql.createConnection({ //to create a connection to our mysql db, we provide the metadata for connection below
//     host: process.env.DATABASE_HOST, //if i was using a server, we put the ip address of server here
//     user: process.env.DATABASE_USER, //xampp default username and pass is root and "(nothing)"
//     password: process.env.DATABASE_PASSWORD, //we use this syntax to access the env file contents
//     database: process.env.DATABASE
// })

// //To actually connect to the db
// db.connect((error) => { //we give a parameter called error, so that if an error is coming up, deal with it somehow
//     if(error){
//         console.log(error)
//     }
//     else{
//         console.log("MySQL Connected...")
//     }
// })

//To install a package and add it to package.json after intiall installs
//Eg: npm i express-fileupload --save