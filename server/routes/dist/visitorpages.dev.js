"use strict";

var express = require('express');

var visitorController = require('../controllers/visitorController');

var router = express.Router();

var path = require('path');

router.get('/nvisitor', function (req, res) {
  res.render('visitPage');
});
router.get('/nvisitorApprove', visitorController.approvedVisitor);
router.get('/nvisitorReject', visitorController.rejectedVisitor); //Use similiar way of delete visitor to display visitor pass
//First submit the details and get id in a url (POST)
//Then redirect to the same page but with get and now having the id in url using query (URI component and ?)
//the page will load until status changes (refresh page every 10 s)
//Then redirect to a visior pass - reject or pass page by checking status

router.post('/nvisitor', visitorController.newVisitor);
router.get('/nvisitorLoad', visitorController.checkStatus); //for visitor's checkout

router.post('/checkout', visitorController.updateCheckoutTime);
module.exports = router;