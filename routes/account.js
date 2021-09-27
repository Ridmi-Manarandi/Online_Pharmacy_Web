const express = require("express");
const router = express.Router();
const User = require('../models/User');
require('dotenv').config();
const Order = require('../models/order');
const multer = require('multer');



router.get('/:id', (req, res) => {
    const id = req.params.id;
    User.findById(id)
      .then(result => {
        res.render('details', { user: result ,  title: 'User Details' });
      })
      .catch(err => {
        console.log(err);
      });
  });

  router.get('/edit/:id', (req, res) => {
    const id = req.params.id;
    User.findById(id)
     .then(result => {
    res.render('edit', { user: result, title: "Update User Details" });
     })
     .catch(err => {
      console.log(err);
    });
  });

  /*app.get('/account/order/:id', (req, res) => {
    const id = req.params.id;
    User.findById(id)
     .then(result => {
    res.render('order', {  user: result, title: "order medicine" });
     })
     .catch(err => {
      console.log(err);
    });
  });*/

router.post("/edit/:id", (req, res) => {
    const body = req.body
    const user = {
      name: body.name,
      email: body.email,
      password: body.password,
    }
  User.findByIdAndUpdate(req.params.id, user, {new: true})  
  .then(result =>  res.redirect('/dashboard'))
  .catch(err => {
    console.log(err);
  });
  });

router.get('/show/:id', (req, res) => {
    const id = req.params.id;
    User.findById(id)
     .then(result => {
    res.render('show', { user: result, title: "View my Details" });
     })
     .catch(err => {
      console.log(err);
    });
  });

router.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    User.findByIdAndDelete(id, function (err, docs) {
      if (err){
          console.log(err)
      }
      else{
          //console.log("Deleted : ", docs);
          res.redirect('/medicine');
      }
  });
});


module.exports = router;