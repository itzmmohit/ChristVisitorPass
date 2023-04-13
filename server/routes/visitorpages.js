const express = require('express');
const visitorController = require('../controllers/visitorController');
const router = express.Router();
const path = require('path');



router.get('/nvisitor', (req,res) => {
    res.render('visitPage'); 
});


router.get('/nvisitorApprove', visitorController.approvedVisitor);

router.get('/nvisitorReject', visitorController.rejectedVisitor);

//Use similiar way of delete visitor to display visitor pass
//First submit the details and get id in a url (POST)
//Then redirect to the same page but with get and now having the id in url using query (URI component and ?)
//the page will load until status changes (refresh page every 10 s)
//Then redirect to a visior pass - reject or pass page by checking status
router.post('/nvisitor',visitorController.newVisitor);

router.get('/nvisitorLoad', visitorController.checkStatus);

//for visitor's checkout
router.post('/checkout', visitorController.updateCheckoutTime);

router.post('/checkoutVehicle', visitorController.updateCheckoutTimeVehicle);


router.get('/nvehicle', (req,res) => {
    res.render('vehiclePage'); 
});


router.get('/nvehicleApprove', visitorController.approvedVehicle);

router.get('/nvehicleReject', visitorController.rejectedVehicle);

router.post('/nvehicle',visitorController.newVehicle);

router.get('/nvehicleLoad', visitorController.checkStatusVehicle);

module.exports = router;