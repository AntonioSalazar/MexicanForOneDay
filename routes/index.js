const express     = require('express');
const router      = express.Router();
const User        = require("../models/user");
const Tour        = require("../models/tour");
const bcrypt      = require("bcrypt");
const bcryptSalt  = 10;
const ensureLogin = require("connect-ensure-login");
const uploadCloud = require('../config/cloudinary.js');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});


router.get("/profile/edit", (req, res, next) =>{
  let userId = req.query.user_id
  console.log(userId);
  User.findOne({"_id": userId})
  .then( user =>{
    res.render("profile-edit", {user})
  })
  .catch(err => next(err))
})

router.post("/profile/edit", uploadCloud.single('photo'),(req, res, next ) =>{
  const { username, email, password, description } = req.body;
  const imgPath = req.file.url;
  const imgName = req.file.originalname;
  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password, salt);
  User.updateOne({"_id": req.query.user_id}, {$set: {username, email, password: hashPass, description, imgPath, imgName}}, { new: true})
  .then(user =>{
    res.redirect(`/profile/${req.query.user_id}`);
  }) 
  .catch(err => next(err));
})


router.get("/dashboard", async(req, res, next ) =>{
  try{
    const user = req.user
    const tours = await(Tour.find())
    res.render("dashboard", {tours, user})
  }
  catch (err){
    next(err)
  }
})

router.post("/dashboard", uploadCloud.single("photo"), (req, res, next) =>{
  const {title, descriptionPreview, description, duration, rate, capacity, tourType, comments, tips} = req.body
  const user = req.user
  const imgPath = req.file.url;
  const imgName = req.file.originalname;
  const newTour = new Tour({ title, descriptionPreview, description, duration, rate, imgPath, imgName, capacity, tourType, author: user.id, username: user.username, comments, tips})
  newTour.save()
  .then(tour =>{
    res.redirect("/dashboard")
  })
  .catch(err => next(err))
})


router.get("/experience/add", (req, res, next) =>{
  res.render("experience-add")
})

router.get("/group_tour/add", (req, res, next ) =>{
  res.render("group-tour-add")
})

router.get("/walking_tour/add", (req, res, next ) =>{
  res.render("walking-tour-add")
})



router.get("/detail_experience/:id", (req, res, next ) =>{
  let tourId = req.params.id
  Tour.findOne({"_id": tourId})
  .then(tour =>{
    res.render("detail-experience", {tour})
  })
  .catch(err => next(err))
})

router.get("/detail_group_tour/:id", (req, res, next) =>{
  let groupTourId = req.params.id;
  Tour.findOne({"_id": groupTourId})
  .then((groupTour) => {
    res.render("detail-group-tour", {groupTour})
  }).catch(err => {
    next(err)
  });
})

router.get("/detail_walking_tour/:id", (req, res, next ) =>{
  let walkingTourId = req.params.id;
  Tour.findOne({"_id": walkingTourId})
  .then( walkingTour => {
    res.render("detail-walking-tour", {walkingTour})
  }).catch(err => {
    next(err)
  });
});

router.post('/reviews/add', (req, res, next) => {
  const { user, comments } = req.body;
  Tour.updateOne({ _id: req.query.tour_id }, { $push: { reviews: { user, comments }}})
  .then(tour => {
    res.redirect('/dashboard')
  })
  .catch(err => next(err))
});

router.get("/profile/:id", (req, res, next ) =>{
  let userId = req.params.id;
  if (!/^[0-9a-fA-F]{24}$/.test(userId)) { 
    return res.status(404).render('not-found');
  }
  User.findOne({"_id": userId})
  .populate("author")
  .then(user =>{
    res.render("profile", { user })
  })
  .catch(err => next(err))
})

router.get("/private-page", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("private", { user: req.user });
});

module.exports = router;