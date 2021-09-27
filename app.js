const express = require('express');
const morgan = require('morgan');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const { update, result } = require('lodash');
//const User = require('./models/User');
require('dotenv').config();

const app = express();

// Passport Config
require('./config/passport')(passport);

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true ,useUnifiedTopology: true}
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.use(express.urlencoded({extended: false}));
app.use(express.json());

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');
//app.engine('ejs', require('ejs').__express);

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

app.use(express.static('public'));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));
app.use('/order', require("./routes/orders.js"));
app.use('/account', require("./routes/account.js"));
app.use('/send', require('./routes/send.js'));

app.get('/home', (req, res) => {
  res.render('home')
})
app.get('/contact', (req, res) => {
  res.render('contact')
})
app.get('/aboutus', (req, res) => {
  res.render('aboutus')
})
app.get('/medicine', (req, res) => {
  res.render('medicine')
})


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on  ${PORT}`));

/*app.get('/account/:id', (req, res) => {
    const id = req.params.id;
    User.findById(id)
      .then(result => {
        res.render('details', { user: result ,  title: 'User Details' });
      })
      .catch(err => {
        console.log(err);
      });
  });

  app.get('/account/edit/:id', (req, res) => {
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
/*
  app.post("/account/edit/:id", (req, res) => {
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

  app.get('/account/show/:id', (req, res) => {
    const id = req.params.id;
    User.findById(id)
     .then(result => {
    res.render('show', { user: result, title: "View my Details" });
     })
     .catch(err => {
      console.log(err);
    });
  });

  app.get('/account/delete/:id', (req, res) => {
    const id = req.params.id;
    User.findByIdAndDelete(id, function (err, docs) {
      if (err){
          console.log(err)
      }
      else{
          //console.log("Deleted : ", docs);
          res.redirect('/');
      }
  });
});
  */
