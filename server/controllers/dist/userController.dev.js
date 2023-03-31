"use strict";

var mysql = require("mysql");

var jwt = require('jsonwebtoken');

var _require = require('util'),
    promisify = _require.promisify;

var _require2 = require("console"),
    Console = _require2.Console; // To add validation on back-end: use the module Express-validator
//https://express-validator.github.io/docs/


var db = mysql.createConnection({
  //to create a connection to our mysql db, we provide the metadata for connection below
  host: process.env.DATABASE_HOST,
  //if i was using a server, we put the ip address of server here
  user: process.env.DATABASE_USER,
  //xampp default username and pass is root and "(nothing)"
  password: process.env.DATABASE_PASSWORD,
  //we use this syntax to access the env file contents
  database: process.env.DATABASE
}); //To actually connect to the db

db.connect(function (error) {
  //we give a parameter called error, so that if an error is coming up, deal with it somehow
  if (error) {
    console.log(error);
  } else {
    console.log("MySQL (UC) Connected...");
  }
}); //View all visitors

exports.view = function (req, res) {
  //rows will have the data from table
  //Todays visitors: SELECT * FROM visitors WHERE rowAge = "new"
  db.query('SELECT * FROM visitors', function (err, rows) {
    if (!err) {
      //NOTE: if not error
      var removedUser = req.query.removed;
      res.render('visitors', {
        rows: rows,
        removedUser: removedUser
      });
    } else {
      console.log(err);
    } // console.log('The data from user table: \n', rows);

  });
}; //View all visitors


exports.viewRequests = function (req, res) {
  db.query('SELECT * FROM visitors WHERE status = ?', ['Pending'], function (err, rows) {
    if (!err) {
      var statusChange = req.query.schange;
      res.render('requests', {
        rows: rows,
        statusChange: statusChange
      });
    } else {
      console.log(err);
    }
  });
}; // Find User by Search


exports.find = function (req, res) {
  var searchTerm = req.body.search; //req.body.search is basically accessing the name="search" form element on submitting. 

  db.query('SELECT * FROM visitors WHERE name LIKE ? OR purpose LIKE ?', ['%' + searchTerm + '%', '%' + searchTerm + '%'], function (err, rows) {
    if (!err) {
      res.render('visitors', {
        rows: rows
      });
    } else {
      console.log(err);
    } //   console.log('The data from user table: \n', rows);

  });
}; // Add new user


exports.addVisitor = function (req, res) {
  var _req$body = req.body,
      vname = _req$body.vname,
      vphone = _req$body.vphone,
      vemail = _req$body.vemail,
      vpurpose = _req$body.vpurpose,
      vstatus = _req$body.vstatus;
  db.query('INSERT INTO visitors SET name = ?, phone = ?, email = ?, purpose = ?, status = ?', [vname, vphone, vemail, vpurpose, vstatus], function (err) {
    if (!err) {
      res.render('addvisitor', {
        alert: 'Visitor added successfully'
      });
    } else {
      console.log(err);
    }
  });
}; // Edit user (taking id from url)


exports.editVisitor = function (req, res) {
  db.query('SELECT * FROM visitors WHERE id = ?', [req.params.id], function (err, rows) {
    if (!err) {
      res.render('editvisitor', {
        rows: rows
      });
    } else {
      console.log(err);
    }
  });
}; // Update Visitor


exports.updateVisitor = function (req, res) {
  var _req$body2 = req.body,
      vname = _req$body2.vname,
      vphone = _req$body2.vphone,
      vemail = _req$body2.vemail,
      vpurpose = _req$body2.vpurpose,
      vstatus = _req$body2.vstatus;
  db.query('UPDATE visitors SET name = ?, phone = ?, email = ?, purpose = ?, status = ? WHERE id = ?', [vname, vphone, vemail, vpurpose, vstatus, req.params.id], function (err) {
    if (!err) {
      db.query('SELECT * FROM visitors WHERE id = ?', [req.params.id], function (err, rows) {
        if (!err) {
          res.render('editvisitor', {
            rows: rows,
            alert: "".concat(vname, " has been updated.")
          });
        } else {
          console.log(err);
        }
      });
    } else {
      console.log(err);
    }
  });
}; // Delete Visitor


exports.deleteVisitor = function (req, res) {
  db.query('DELETE FROM visitors WHERE id = ?', [req.params.id], function (err) {
    if (!err) {
      var removedUser = encodeURIComponent('Visitor successfully removed.'); //https://www.freecodecamp.org/news/javascript-url-encode-example-how-to-use-encodeuricomponent-and-encodeuri/

      res.redirect('/admin/visitors/?removed=' + removedUser); //This shows that you can pass data while in redirect as well through encoding in url
    } else {
      console.log(err);
    }
  });
}; // Approve Visitor


exports.approveVisitor = function (req, res) {
  db.query('UPDATE visitors SET status = ? WHERE id = ?', ['Approved', req.params.id], function (err) {
    if (!err) {
      var approvedUser = encodeURIComponent('Approved'); //https://www.freecodecamp.org/news/javascript-url-encode-example-how-to-use-encodeuricomponent-and-encodeuri/

      res.redirect('/admin/requests/?schange=' + approvedUser); //This shows that you can pass data while in redirect as well through encoding in url
    } else {
      console.log(err);
    }
  });
}; // Reject Visitor


exports.rejectVisitor = function (req, res) {
  db.query('UPDATE visitors SET status = ? WHERE id = ?', ['Rejected', req.params.id], function (err) {
    if (!err) {
      var rejectedUser = encodeURIComponent('Rejected'); //https://www.freecodecamp.org/news/javascript-url-encode-example-how-to-use-encodeuricomponent-and-encodeuri/

      res.redirect('/admin/requests/?schange=' + rejectedUser); //This shows that you can pass data while in redirect as well through encoding in url
    } else {
      console.log(err);
    }
  });
};

exports.viewVisitor = function (req, res) {
  db.query('SELECT * FROM visitors WHERE id = ?', [req.params.id], function (err, rows) {
    if (!err) {
      res.render('viewvisitor', {
        rows: rows
      });
    } else {
      console.log(err);
    }
  });
};

exports.isLoggedIn = function _callee(req, res, next) {
  var decoded;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!req.cookies.userCookie) {
            _context.next = 14;
            break;
          }

          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(promisify(jwt.verify)(req.cookies.userCookie, process.env.JWT_SECRET));

        case 4:
          decoded = _context.sent;
          //console.log(decoded);
          //the above log will print { id: 8, iat: 1677939111, exp: 1685715111 }
          //check if user still exists
          db.query('SELECT * FROM users WHERE id = ?', [decoded.id], function (error, results) {
            //console.log(results);
            if (!results) {
              return next(); //return will stop all upcoming execution and do only that return statement.
            } //req.user = results[0]; //get table row user values of name, email, ...


            return next();
          });
          _context.next = 12;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](1);
          console.log(_context.t0);
          return _context.abrupt("return", next());

        case 12:
          _context.next = 15;
          break;

        case 14:
          return _context.abrupt("return", res.redirect('/admin/login'));

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 8]]);
}; //Dashboard Module
//For counting number of Approved, Rejected and Pending Visitors


exports.dash = function (req, res) {
  db.query('SELECT labels.label_name, COALESCE(visit_counts.visitor_count, 0) AS visitor_count FROM (SELECT "ALUMNI" AS label_name UNION SELECT "ADMISSION" AS label_name UNION SELECT "BANK" AS label_name UNION SELECT "FEST" AS label_name UNION SELECT "GUEST" AS label_name UNION SELECT "MEET" AS label_name UNION SELECT "OTHERS" AS label_name) AS labels LEFT JOIN (SELECT UPPER(purpose) AS purpose_name, COUNT(*) AS visitor_count FROM visitors WHERE status = "Approved" GROUP BY UPPER(purpose)) AS visit_counts ON labels.label_name = visit_counts.purpose_name ORDER BY labels.label_name', function (err, rows) {
    if (!err) {
      db.query('SELECT labels.label_name, COALESCE(visit_counts.visitor_count, 0) AS visitor_count FROM (SELECT "ALUMNI" AS label_name UNION SELECT "ADMISSION" AS label_name UNION SELECT "BANK" AS label_name UNION SELECT "FEST" AS label_name UNION SELECT "GUEST" AS label_name UNION SELECT "MEET" AS label_name UNION SELECT "OTHERS" AS label_name) AS labels LEFT JOIN (SELECT UPPER(purpose) AS purpose_name, COUNT(*) AS visitor_count FROM visitors WHERE status = "Pending" GROUP BY UPPER(purpose)) AS visit_counts ON labels.label_name = visit_counts.purpose_name ORDER BY labels.label_name', function (err, rows1) {
        if (!err) {
          db.query('SELECT labels.label_name, COALESCE(visit_counts.visitor_count, 0) AS visitor_count FROM (SELECT "ALUMNI" AS label_name UNION SELECT "ADMISSION" AS label_name UNION SELECT "BANK" AS label_name UNION SELECT "FEST" AS label_name UNION SELECT "GUEST" AS label_name UNION SELECT "MEET" AS label_name UNION SELECT "OTHERS" AS label_name) AS labels LEFT JOIN (SELECT UPPER(purpose) AS purpose_name, COUNT(*) AS visitor_count FROM visitors WHERE status = "Rejected" GROUP BY UPPER(purpose)) AS visit_counts ON labels.label_name = visit_counts.purpose_name ORDER BY labels.label_name', function (err, rows2) {
            if (!err) {
              res.render('dashboard', {
                rows: rows,
                rows1: rows1,
                rows2: rows2
              });
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
};