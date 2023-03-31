const mysql = require("mysql");
const path = require('path');

const db = mysql.createConnection({ //to create a connection to our mysql db, we provide the metadata for connection below
    host: process.env.DATABASE_HOST, //if i was using a server, we put the ip address of server here
    user: process.env.DATABASE_USER, //xampp default username and pass is root and "(nothing)"
    password: process.env.DATABASE_PASSWORD, //we use this syntax to access the env file contents
    database: process.env.DATABASE
})

const imageDir = path.join(__dirname, '../../client/public/img_upload/')


//To actually connect to the db
db.connect((error) => { //we give a parameter called error, so that if an error is coming up, deal with it somehow
    if(error){
        console.log(error)
    }
    else{
        console.log("MySQL (VC) Connected...")
    }
})


exports.newVisitor = (req,res) => {
    
    let visitorImage;
    let uploadPath;
    //req.files.visitorImage?
    
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
      }
    
    visitorImage = req.files.visitorImage;
    //change file name
    uploadPath = imageDir + visitorImage.name;//change visitorImage.name to change name.

    visitorImage.mv(uploadPath, function (err) {
        
        if (err) return res.status(500).send(err);

    //   db.query('UPDATE visit SET profile_image = ? WHERE visit_id ="1034"', [visitorImage.name], (err) => {
    //     if (!err) {
    //       res.redirect('/visit/nvisitorLoad');
    //     } else {
    //       console.log(err);
    //     }
    //   });

    const { vname, vphone, vemail, vpurpose, vlocation } = req.body;

    db.query('INSERT INTO visit SET name = ?, phone = ?, email = ?, purpose = ?, location = ?, profile_image = ?', [vname, vphone, vemail, vpurpose, vlocation, visitorImage.name], (err, result) => {
      if (!err) {
        let insertedUser = encodeURIComponent(result.insertId);
        res.redirect('/visit/nvisitorLoad/?inserted=' + insertedUser);//maybe hash and send the id
        //res.redirect('/visit/nvisitorApprove/?inserted=' + insertedUser);//maybe hash and send the id
      } else {
        console.log(err);
      }
    });

    });
    

};


exports.approvedVisitor = (req,res) => {
    db.query('SELECT * FROM visit WHERE visit_id = ?', [req.query.inserted], (err, rows) => {
        if (!err) {
          res.render('ApprovePass', { rows });
        } else {
            console.log(err);
          }
      });
};

exports.rejectedVisitor = (req,res) => {
    db.query('SELECT * FROM visit WHERE visit_id = ?', [req.query.inserted], (err, rows) => {
        if (!err) {
          res.render('RejectPass', { rows });
        } else {
            console.log(err);
          }
      });
};


exports.checkStatus = (req,res) => {
    db.query('SELECT * FROM visit WHERE visit_id = ?', [req.query.inserted], (err, rows) => {
        if (!err) {
          res.render('loadingScreen', { rows });
        } else {
            console.log(err);
          }
      });
};