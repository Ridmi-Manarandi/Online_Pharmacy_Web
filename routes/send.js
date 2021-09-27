const express = require("express");
const router = express.Router();
const Guest = require('../models/guest');

router.post('', (req, res) => {
    const guest = new Guest({
        Name: req.body.Name,
        Email: req.body.Email,
        Msg: req.body.Msg,
    });
    guest.save((err) => {
         if(err){
              console.log(err);
         }else{
              res.redirect('/contact');
         }
          
    })
});

module.exports = router;