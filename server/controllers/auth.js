//https://www.geeksforgeeks.org/how-to-separate-routers-and-controllers-in-node-js/
// Controllers are responsible for handling incoming requests and returning responses to the client. 
//In short, they are basically functions.
/*
- "Routes" to forward the supported requests (and any information encoded in request URLs) to the appropriate controller functions.
- Controller functions to get the requested data from the models, create an HTML page displaying the data, and return it to the user to view in the browser.
- Views (templates) used by the controllers to render the data.
*/

const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { promisify } = require('util'); //to extract only a specific function(promisify) from a module (util from nodejs), we use { function_name }

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
        console.log("MySQL (AC) Connected...")
    }
})


exports.register = (req, res) => {
    //console.log(req.body); //grab data from form and log it in terminal

    const {name, email, password, passwordConfirm, adminCode} = req.body;
    
    /*The above code is same as below 4 lines (destructuring in JS):
    const name = req.body.name; //get the name field of form
    const email = req.body.email; //get the email field of form and so on..
    const password = req.body.password;
    const passwordConfirm = req.body.passwordConfirm;*/

    //The below code will see where emails from relation = email from form
    //? is a positional paramter so that we are safe against sql injections.
    //? explaination: https://www.w3schools.com/nodejs/nodejs_mysql_where.asp#:~:text=Escaping%20Query%20Values
    //In db.query, we first give the sql query, then either additional parameters and finally we give a function on what to do with those extracted values.
    //In this case, we use an async function because hashing the pass should be done before doing any other operations(using await).
    db.query('SELECT email FROM users WHERE email = ?', [email], async(error, results) => {
        if(error){//when we run this query, if we have error do this. like validation.
            console.log(error);
        }

        //https://www.codingninjas.com/codestudio/library/res-render-function-in-express
        //Below is an example of passing a local variable to view, in res.render.
        //(we use often elsewhere as well, either as function or variables)

        if(results.length>0) //The sql query could give us multiple rows as results, which is like an array. So we iterate through the results.
        {
            return res.render('register', {
               message: 'That email is already in use!' //send message value to register page
            });
        }
        else if(password != passwordConfirm) //if user's both passwords entered in form dont match
        {
            return res.render('register', {
                message: 'Passwords do not match!' //send message value to register page 
             });
        }
        else if(adminCode != "ACCESS_CODE")
        {
            return res.render('register', {
                message: 'Invalid Admin Code!' //send message value to register page 
             });
        }

        //https://www.geeksforgeeks.org/using-async-await-in-node-js/

        //hash the password 8 times. 
        let hashedPassword = await bcrypt.hash(password, 8);//we can use await only for async fns.
        //console.log(hashedPassword);
        
        //The below query is similiar to: INSERT INTO users SET nameAttributeInTable=nameValueFromForm, and so on...
        //Then we run a callback fn (a function done after a function).
        db.query('INSERT INTO users SET ? ', {name: name, email: email, password: hashedPassword}, (errors, results) => {
            if(error)
            {
                console.log(error);
            }
            else
            {
                //console.log(results);
                return res.render('register', {
                    message: 'User Registered!' //send message value to register page 
                 });
            }
        })

    });//This is so that same email doesnt register more than once
    //[email] is the email in line 24
    //(error, results) is a function that takes in an error or a results.
    

};

//Why we use async and await? Some of our actions need more time to execute.
//So, we need to make sure the server waits for these actions to complete before moving to next lines of code.
exports.login = async(req,res) => {
    //the below try catch is same as the above if else for error catching.
    try {
        const {email, password} = req.body; //grabbing the email and pass from request.body

        if(!email || !password)//if someone submits without email/pass (validation)
        {
            return res.status(400).render('login', {
                message: "Please provide an email and password!"
            });//400 is forbidden status code
            //in res.render() after the url, i can give either a callback fn with () => or an object with {} (as shown above).
        }

        //after selecting the data, run the async fn
        db.query('SELECT * FROM users WHERE email = ?', [email], async(error, results) => {
            //console.log(results)
            //bcrypt.compare() compares the given password  with the hashedPassword. (so that we dont have to unhash the pass from db and compare)
            //we use await so that we make sure the operation is finished.
            //we give results[0] because if there is only one email, we will only have one row in our results array (in first index or 0).
            if(!results.length  || !(await bcrypt.compare(password,results[0].password))) //If there are no users with that email || the password from form and db don't equal.
            {
                //status code of 401 is forbidden code for not being able to login properly.
                res.status(401).render('login', {
                    message: "The email or password is incorrect!"
                })
            }
            else
            {
                const id = results[0].id;//get id from table

                //create a unique token for a logged in user (that is like a hashed pass)
                //when signing(creating) a token, we need to pass a secret key with which we hash it.
                const token = jwt.sign({id: id}, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN //specify that token(not cookie) should expire in 90 days
                })

                //console.log(" The token: " + token)

                const cookieOptions = {
                    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),//converting to milliseconds)
                    httpOnly: true//setup cookie in httpOnly browsers only (to prevent hacking)
                }
                //create cookie
                res.cookie('userCookie', token, cookieOptions);
                res.status(200).redirect("/admin");
            }
        });

    } catch (error) {
        console.log(error);
    }
}


exports.isLoggedIn = async (req, res, next) => {
    //req.message = "Inside middleware"
    //console.log(req.cookies); //display the cookies in browser
    if(req.cookies.userCookie)//if a cookie called userCookie exists
    {
        try{
            //since our cookie value is hashed, we need to first decode it to get the user id
            const decoded = await promisify(jwt.verify)(req.cookies.userCookie, process.env.JWT_SECRET);
            //console.log(decoded);
            //the above log will print { id: 8, iat: 1677939111, exp: 1685715111 }

            //check if user still exists
            db.query('SELECT * FROM users WHERE id = ?', [decoded.id], (error, results) => {
                //console.log(results);

                if(!results){
                    return next();//return will stop all upcoming execution and do only that return statement.
                }

                req.user = results[0]; //get table row user values of name, email, ...
                return next();
            })
        }catch(error){
            console.log(error);
            return next();
        }
    }else{
        next(); //if no cookie, just go next
    }


    
    //next is there so that after running this controller,
    //we need to continue our execution onto next function in the /profile routing in pages.js (i.e. the (req, res) function)
    //if we dont call next(), the fn after executing just stops execution to any new place.
}


exports.logout = async (req, res) => {
    //if we have a cookie named userCookie already, this will overwrite it to 'logout' and expire the cookie in 2 s.
    res.cookie('userCookie', 'logout', {
        expires: new Date(Date.now()+2*1000), 
        httpOnly:true
    }) 

    res.status(200).redirect('/admin');
}
//Can also give const register = ... instead of exports.register = ... directly. then at end just put,
//exports.register = register;
//Why exports.? -> to let other files export the objects and functions all.
//For ref: https://www.sitepoint.com/understanding-module-exports-exports-node-js/

