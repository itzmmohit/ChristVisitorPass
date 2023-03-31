//this file is for creating the routes for all the admin pages to be used.

const express = require('express');
const authController = require('../controllers/auth');
const userController = require('../controllers/userController');
const router = express.Router();

//change the below urls of router.get to /admin/given_value later

//Node.js callbacks are a special type of function passed as an argument to
//another function. They're called when the function that contains the callback as an argument completes its execution, and
//allows the code in the callback to run in the meantime. Callbacks help us make asynchronous calls
//below is an example of callback function, the (req,res) arrow function.

router.get('/', authController.isLoggedIn, (req,res) => { //This means that whenever we go to "/" page in url, do this function (takes a request and response obj)
    res.render('index', {
        user: req.user//same controller given in /profile
    });  //this will go to index.hbs file
});

router.get('/register', (req,res) => {
    res.render('register'); //this will render register.hbs file when we go to /register url
});

router.get('/login', (req,res) => {
    res.render('login'); //this will render register.hbs file when we go to /register url
});

//before going to the profile page, first we run a middleware(the controller function), then run the (req,res) fn
//This controller fn makes sure that only a logged in user can access the profile page.
router.get('/profile', authController.isLoggedIn, (req, res) => {
    //console.log(req.message);//grab var from middleware (authController.isLoggedIn)
    if(req.user) //after the middleware controller execution, we see if we get a req.user back from it.
    {
        res.render('profile', {
            user: req.user//pass user details to profile page
        });
    }else{
        res.redirect('/admin/login');
    }
    
});

router.get('/visitors', userController.isLoggedIn, userController.view); //there was a res.render('visitors'); here as (req, res)

router.get('/requests', userController.isLoggedIn, userController.viewRequests);

//You can create a get and post request for same url also
router.post('/visitors', userController.find); 

//Add user static form page from visitor page button
router.get('/addvisitor', userController.isLoggedIn, (req,res) => {
    //same code as /profile
    // if(req.user) 
    // {
        res.render('addvisitor');
    // }
});

//Edit user static form page from visitor page button inside table
router.get('/editvisitor/:id', userController.isLoggedIn, userController.editVisitor);

//Send data from add user page form
router.post('/addvisitor', userController.addVisitor);

//Send data from edit user page form
router.post('/editvisitor/:id', userController.updateVisitor);

//Get visitors page after Delete data
router.get('/deletevisitor/:id', userController.isLoggedIn, userController.deleteVisitor);

//Get requests page after status change
router.get('/approvevisitor/:id', userController.isLoggedIn, userController.approveVisitor);
router.get('/rejectvisitor/:id', userController.isLoggedIn, userController.rejectVisitor);

//View the visitor's visitor Pass
router.get('/viewvisitor/:id', userController.isLoggedIn, userController.viewVisitor);

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

