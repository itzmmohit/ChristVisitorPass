//this file is for creating the routes for all the pages to be used.

const express = require('express');

const router = express.Router();

//change the below urls of router.get to /admin/given_value later

//Node.js callbacks are a special type of function passed as an argument to
//another function. They're called when the function that contains the callback as an argument completes its execution, and
//allows the code in the callback to run in the meantime. Callbacks help us make asynchronous calls
//below is an example of callback function, the (req,res) arrow function.

router.get('/', (req,res) => { //This means that whenever we go to "/" page in url, do this function (takes a request and response obj)
    res.render('index');  //this will go to index.hbs file
});

router.get('/register', (req,res) => {
    res.render('register'); //this will render register.hbs file when we go to /register url
});

router.get('/login', (req,res) => {
    res.render('login'); //this will render register.hbs file when we go to /register url
});

module.exports = router;

//Module exports are the instructions that tell Node. js which bits of code (functions, objects, etc.) to export from a
// given file so that other files are allowed to access the exported code. In this case, the object is router.






//The above router code is same as below if defined in app.js:

// app.get("/", (req, res) => { 
//     res.render('index'); 
// })

// app.get("/register", (req, res) => {
//     res.render('register'); 
// })

