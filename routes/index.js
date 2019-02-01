const express = require('express');
const router  = express.Router();
const User    = require("../models/user");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const ensureLogin = require("connect-ensure-login");
const uploadCloud = require('../config/cloudinary.js');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get("/signup", (req, res, next ) =>{
  res.render("auth/signup")
})



router.get("/profile/edit", (req, res, next ) =>{
  User.findOne({"id" : req.params.id})
  .then( user =>{
    res.render("profile-edit", { user })
  })
  .catch( err => next( err ))
})

router.post("/profile/edit", uploadCloud.single('photo'),(req, res, next ) =>{
  const { username, email, password, description } = req.body;
  const imgPath = req.file.url;
  const imgName = req.file.originalname;
  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password, salt);
  User.updateOne({"_id": req.query.user_id}, {$set: {username, email, password: hashPass, description, imgName, imgPath}}, { new: true})
  .then(user =>{
    res.redirect(`/profile/${req.query.user_id}`);
  }) 
  .catch(err => next(err));
})

// router.get("/profile", (req, res, next ) =>{
//   res.render("updated-profile")
// })


router.get("/profile/:id", (req, res, next ) =>{
  let userId = req.params.id
  User.findOne({"_id": userId})
  .then(user =>{
    res.render("profile", { user })
  })
  .catch(err => next(err))
})

router.get("/private-page", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("private", { user: req.user });
});

module.exports = router;