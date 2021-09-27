const express = require("express");
const router = express.Router();
const Order = require('../models/order');
const multer = require('multer');


router.get("/now", (req, res) => {
     res.render('order');
});

var storage = multer.diskStorage({
     destination: function(req, file, cb){
          cb(null, './uploads');
     },
     filename: function(req, file, cb){
          cb(null, file.fieldname+"_"+Date.now()+"_"+file.originalname);
     },
});

var upload = multer({
     storage: storage,
}).single("image");

//insert order in to database route
router.post("/now", upload, (req, res) => {
     const order = new Order({
          Email: req.body.Email,
          PatientName: req.body.PatientName,
          PatientAge: req.body.PatientAge,
          DeliveryLocation: req.body.DeliveryLocation,
          Alergic: req.body.Alergic,
          Gender: req.body.Gender,
          ContactNo: req.body.ContactNo,
          image: req.file.filename,
     });
     order.save((err) => {
          if(err){
               res.json({message: err.message, type: 'danger'});
          }else{
             res.render('success');
          }
           
     })
});



module.exports = router;