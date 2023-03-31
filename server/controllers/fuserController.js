const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

// To add validation on back-end: use the module Express-validator
//https://express-validator.github.io/docs/

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
        console.log("MySQL (FUC) Connected...")
    }
})

 //View all visitors
exports.view = (req, res) => {
    //rows will have the data from table
    //Todays visitors: SELECT * FROM visitors WHERE rowAge = "new"
        res.render('fvisitors');
}




// Add new user
exports.addVisitor = (req, res) => {
    const { vname, vphone, vemail, vpurpose, vlocation, vstatus } = req.body;

    db.query('INSERT INTO visit SET name = ?, phone = ?, email = ?, purpose = ?, location = ?, status = ?', [vname, vphone, vemail, vpurpose, vlocation, vstatus], (err, result) => {
      if (!err) {
        res.render('faddvisitor', { alert: 'Visitor added successfully', rid: result.insertId });
      } else {
        console.log(err);
      }
    });
  }


exports.isLoggedIn = async (req, res, next) => {
    //req.message = "Inside middleware"
    //console.log(req.cookies); //display the cookies in browser
    if(req.cookies.fCookie)//if a cookie called userCookie exists
    {
        try{
            //since our cookie value is hashed, we need to first decode it to get the user id
            const decoded = await promisify(jwt.verify)(req.cookies.fCookie, process.env.JWT_SECRET);
            //console.log(decoded);
            //the above log will print { id: 8, iat: 1677939111, exp: 1685715111 }

            //check if user still exists
            db.query('SELECT * FROM guests WHERE id = ?', [decoded.id], (error, results) => {
                //console.log(results);

                if(!results){
                    return next();//return will stop all upcoming execution and do only that return statement.
                }

                //req.user = results[0]; //get table row user values of name, email, ...
                return next();
            })
        }catch(error){
            console.log(error);
            return next();
        }
    }else{
        return res.redirect('/faculty/login');
    }


    
    //next is there so that after running this controller,
    //we need to continue our execution onto next function in the /profile routing in pages.js (i.e. the (req, res) function)
    //if we dont call next(), the fn after executing just stops execution to any new place.
}
