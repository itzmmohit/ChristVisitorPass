const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const { Console } = require("console");

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
        console.log("MySQL (UC) Connected...")
    }
})

 //View all visitors
exports.view = (req, res) => {
    //rows will have the data from table
    //Todays visitors: SELECT * FROM visitors WHERE rowAge = "new"
    db.query('SELECT * FROM visitors', (err, rows) => {
        if (!err) { //NOTE: if not error
          let removedUser = req.query.removed;
          res.render('visitors', { rows, removedUser });
        } else {
          console.log(err);
        }
        // console.log('The data from user table: \n', rows);
      });
}

 //View all visitors
 exports.viewRequests = (req, res) => {
        
  db.query('SELECT * FROM visitors WHERE status = ?', ['Pending'], (err, rows) => {
    if (!err) {
      let statusChange = req.query.schange;
      res.render('requests', { rows, statusChange });
    } else {
      console.log(err);
    }
  });
}



// Find User by Search
exports.find = (req, res) => {
    let searchTerm = req.body.search; //req.body.search is basically accessing the name="search" form element on submitting. 
    
    db.query('SELECT * FROM visitors WHERE name LIKE ? OR purpose LIKE ?', ['%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
      if (!err) {
        res.render('visitors', { rows });
      } else {
        console.log(err);
      }
    //   console.log('The data from user table: \n', rows);
    });
}


// Add new user
exports.addVisitor = (req, res) => {
    const { vname, vphone, vemail, vpurpose, vstatus } = req.body;

    db.query('INSERT INTO visitors SET name = ?, phone = ?, email = ?, purpose = ?, status = ?', [vname, vphone, vemail, vpurpose, vstatus], (err) => {
      if (!err) {
        res.render('addvisitor', { alert: 'Visitor added successfully' });
      } else {
        console.log(err);
      }
    });
  }

// Edit user (taking id from url)
exports.editVisitor = (req, res) => {
  db.query('SELECT * FROM visitors WHERE id = ?', [req.params.id], (err, rows) => {
    if (!err) {
      res.render('editvisitor', { rows });
    } else {
      console.log(err);
    }
  });
}


// Update Visitor
exports.updateVisitor = (req, res) => {
  const { vname, vphone, vemail, vpurpose, vstatus } = req.body;

  db.query('UPDATE visitors SET name = ?, phone = ?, email = ?, purpose = ?, status = ? WHERE id = ?', [vname, vphone, vemail, vpurpose, vstatus, req.params.id], (err) => {

    if (!err) {
      db.query('SELECT * FROM visitors WHERE id = ?', [req.params.id], (err, rows) => {
        if (!err) {
          res.render('editvisitor', { rows, alert: `${vname} has been updated.` });
        } else {
          console.log(err);
        }
      });
    } else {
      console.log(err);
    }
  });
}


// Delete Visitor
exports.deleteVisitor = (req, res) => {
  db.query('DELETE FROM visitors WHERE id = ?', [req.params.id], (err) => {
    if (!err) {
      let removedUser = encodeURIComponent('Visitor successfully removed.'); //https://www.freecodecamp.org/news/javascript-url-encode-example-how-to-use-encodeuricomponent-and-encodeuri/
      res.redirect('/admin/visitors/?removed=' + removedUser); //This shows that you can pass data while in redirect as well through encoding in url
    } else {
      console.log(err);
    }
  });

}

// Approve Visitor
exports.approveVisitor = (req, res) => {
  db.query('UPDATE visitors SET status = ? WHERE id = ?', ['Approved',req.params.id], (err) => {
    if (!err) {
      let approvedUser = encodeURIComponent('Approved'); //https://www.freecodecamp.org/news/javascript-url-encode-example-how-to-use-encodeuricomponent-and-encodeuri/
      res.redirect('/admin/requests/?schange=' + approvedUser); //This shows that you can pass data while in redirect as well through encoding in url
    } else {
      console.log(err);
    }
  });

}


// Reject Visitor
exports.rejectVisitor = (req, res) => {
  db.query('UPDATE visitors SET status = ? WHERE id = ?', ['Rejected',req.params.id], (err) => {
    if (!err) {
      let rejectedUser = encodeURIComponent('Rejected'); //https://www.freecodecamp.org/news/javascript-url-encode-example-how-to-use-encodeuricomponent-and-encodeuri/
      res.redirect('/admin/requests/?schange=' + rejectedUser); //This shows that you can pass data while in redirect as well through encoding in url
    } else {
      console.log(err);
    }
  });

}

exports.viewVisitor = (req, res) => {

  db.query('SELECT * FROM visitors WHERE id = ?', [req.params.id], (err, rows) => {
    if (!err) {
      res.render('viewvisitor', { rows });
    } else {
      console.log(err);
    }
  });

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

                //req.user = results[0]; //get table row user values of name, email, ...
                return next();
            })
        }catch(error){
            console.log(error);
            return next();
        }
    }else{
        return res.redirect('/admin/login');
    }
    //next is there so that after running this controller,
    //we need to continue our execution onto next function in the /profile routing in pages.js (i.e. the (req, res) function)
    //if we dont call next(), the fn after executing just stops execution to any new place.
}

//Dashboard Module

//For counting number of Approved, Rejected and Pending Visitors
exports.dash = (req, res) => {
  db.query('SELECT labels.label_name, COALESCE(visit_counts.visitor_count, 0) AS visitor_count FROM (SELECT "ALUMNI" AS label_name UNION SELECT "ADMISSION" AS label_name UNION SELECT "BANK" AS label_name UNION SELECT "FEST" AS label_name UNION SELECT "GUEST" AS label_name UNION SELECT "MEET" AS label_name UNION SELECT "OTHERS" AS label_name) AS labels LEFT JOIN (SELECT UPPER(purpose) AS purpose_name, COUNT(*) AS visitor_count FROM visitors WHERE status = "Approved" GROUP BY UPPER(purpose)) AS visit_counts ON labels.label_name = visit_counts.purpose_name ORDER BY labels.label_name', (err, rows) => {
    if (!err) {
      db.query('SELECT labels.label_name, COALESCE(visit_counts.visitor_count, 0) AS visitor_count FROM (SELECT "ALUMNI" AS label_name UNION SELECT "ADMISSION" AS label_name UNION SELECT "BANK" AS label_name UNION SELECT "FEST" AS label_name UNION SELECT "GUEST" AS label_name UNION SELECT "MEET" AS label_name UNION SELECT "OTHERS" AS label_name) AS labels LEFT JOIN (SELECT UPPER(purpose) AS purpose_name, COUNT(*) AS visitor_count FROM visitors WHERE status = "Pending" GROUP BY UPPER(purpose)) AS visit_counts ON labels.label_name = visit_counts.purpose_name ORDER BY labels.label_name', (err, rows1) => {
        if (!err) {
          db.query('SELECT labels.label_name, COALESCE(visit_counts.visitor_count, 0) AS visitor_count FROM (SELECT "ALUMNI" AS label_name UNION SELECT "ADMISSION" AS label_name UNION SELECT "BANK" AS label_name UNION SELECT "FEST" AS label_name UNION SELECT "GUEST" AS label_name UNION SELECT "MEET" AS label_name UNION SELECT "OTHERS" AS label_name) AS labels LEFT JOIN (SELECT UPPER(purpose) AS purpose_name, COUNT(*) AS visitor_count FROM visitors WHERE status = "Rejected" GROUP BY UPPER(purpose)) AS visit_counts ON labels.label_name = visit_counts.purpose_name ORDER BY labels.label_name', (err, rows2) => {
            if (!err) {
              res.render('dashboard', { rows,rows1,rows2 });
            } else {
              console.log(err);
            }
          });
        } else {
          console.log(err);
        }
      });
    } else {
      console.log(err);
    }
  });
}