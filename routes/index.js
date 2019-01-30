const express = require('express');
const router  = express.Router();
const User    = require("../models/user");

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get("/signup", (req, res, next ) =>{
  res.render("auth/signup")
})


router.get("/profile/edit", (req, res, next ) =>{
  User.findOne({"id" : req.query.user_id})
  .then( user =>{
    res.render("profile-edit", { user })
  })
  .catch( err => next( err ))
})

router.post("/profile/edit", (req, res, next ) =>{
  const { username, email, password } = req.body;
  User.updateOne({"_id": req.query.user_id}, {$set: {username, email, password}}, { new: true})
  .then(user =>{
    res.redirect("/profile");
  }) 
  .catch(err => next(err))
})

router.get("/profile/:id", (req, res, next ) =>{
  let userId = req.params.id
  User.findOne({"_id": userId})
  .then(user =>{
    res.render("profile", { user })
  })
  .catch(err => next(err))
})

module.exports = router;
