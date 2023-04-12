"use strict";

var mysql = require("mysql");

var path = require('path');

var db = mysql.createConnection({
  //to create a connection to our mysql db, we provide the metadata for connection below
  host: process.env.DATABASE_HOST,
  //if i was using a server, we put the ip address of server here
  user: process.env.DATABASE_USER,
  //xampp default username and pass is root and "(nothing)"
  password: process.env.DATABASE_PASSWORD,
  //we use this syntax to access the env file contents
  database: process.env.DATABASE
});
var imageDir = path.join(__dirname, '../../client/public/img_upload/'); //To actually connect to the db

db.connect(function (error) {
  //we give a parameter called error, so that if an error is coming up, deal with it somehow
  if (error) {
    console.log(error);
  } else {
    console.log("MySQL (VC) Connected...");
  }
});

exports.newVisitor = function (req, res) {
  var visitorImage;
  var uploadPath; //req.files.visitorImage?

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  visitorImage = req.files.visitorImage; //change file name

  uploadPath = imageDir + visitorImage.name; //change visitorImage.name to change name.

  visitorImage.mv(uploadPath, function (err) {
    if (err) return res.status(500).send(err); //   db.query('UPDATE visit SET profile_image = ? WHERE visit_id ="1034"', [visitorImage.name], (err) => {
    //     if (!err) {
    //       res.redirect('/visit/nvisitorLoad');
    //     } else {
    //       console.log(err);
    //     }
    //   });

    var _req$body = req.body,
        vname = _req$body.vname,
        vphone = _req$body.vphone,
        vemail = _req$body.vemail,
        vpurpose = _req$body.vpurpose,
        vlocation = _req$body.vlocation;
    db.query('INSERT INTO visit SET name = ?, phone = ?, email = ?, purpose = ?, location = ?, profile_image = ?', [vname, vphone, vemail, vpurpose, vlocation, visitorImage.name], function (err, result) {
      if (!err) {
        var insertedUser = encodeURIComponent(result.insertId);
        res.redirect('/visit/nvisitorLoad/?inserted=' + insertedUser); //maybe hash and send the id
        //res.redirect('/visit/nvisitorApprove/?inserted=' + insertedUser);//maybe hash and send the id
      } else {
        console.log(err);
      }
    });
  });
};

exports.approvedVisitor = function (req, res) {
  db.query('SELECT * FROM visit WHERE visit_id = ?', [req.query.inserted], function (err, rows) {
    if (!err) {
      res.render('ApprovePass', {
        rows: rows
      });
    } else {
      console.log(err);
    }
  });
};

exports.rejectedVisitor = function (req, res) {
  db.query('SELECT * FROM visit WHERE visit_id = ?', [req.query.inserted], function (err, rows) {
    if (!err) {
      res.render('RejectPass', {
        rows: rows
      });
    } else {
      console.log(err);
    }
  });
};

exports.checkStatus = function (req, res) {
  db.query('SELECT * FROM visit WHERE visit_id = ?', [req.query.inserted], function (err, rows) {
    if (!err) {
      res.render('loadingScreen', {
        rows: rows
      });
    } else {
      console.log(err);
    }
  });
};

exports.updateCheckoutTime = function (req, res) {
  var visitId = req.body.visit_id; // Access visitId from req.body instead of req.params

  var checkoutTime = new Date(); // Get current time as checkout time

  db.query('UPDATE visit SET checkOut = ? WHERE visit_id = ?', [checkoutTime, visitId], function (err, result) {
    if (!err) {
      // res.send('Checkout time updated successfully');
      db.query('SELECT * FROM visit WHERE visit_id = ?', [visitId], function (err, rows) {
        if (!err) {
          res.render('CheckedOut', {
            rows: rows
          });
        } else {
          console.log(err);
        }
      });
    } else {
      console.log(err);
      res.status(500).send('Error updating checkout time');
    }
  });
};