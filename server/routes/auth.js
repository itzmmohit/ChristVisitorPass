//this file is for creating the routes for all the pages to be used.

const express = require('express');
const router = express.Router();
//Use another file as a module as shown below
const authController = require('../controllers/auth'); //../ means go one level up, then go to controllers folder and auth.js.

//change the below urls of router.get to /admin/given_value later
//we submitted data by post, so we use .post
//we will create a controller that will deal with the data of the form
//This means that whenever we go to "/auth/register" page in url, do this function(controller)
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/logout', authController.logout);//since we are not submitting any data we can use get method
module.exports = router;

//Module exports are the instructions that tell Node. js which bits of code (functions, objects, etc.) to export from a
// given file so that other files are allowed to access the exported code. In this case, the object is router.



