const express      = require("express");
const authRoutes   = express.Router();
const User         = require("../models/user");
const passport     = require("passport");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const ensureLogin = require("connect-ensure-login");


authRoutes.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

authRoutes.post("/signup", (req, res, next ) =>{
  const username = req.body.username;
  const email    = req.body.email;
  const password = req.body.password;

  if (username == "" || password == "" || email == "") {
    res.render("auth/signup", {
      message: "Debes indicar los datos solicitados para poder continuar ☝😌"
    })
    return
  }

  User.findOne({email})
  .then(user =>{
    if(user != null){
      res.status(200).render("auth/signup", {
        message: "El usuario ingresado Ya existe! 😬"
      }) 
      return
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashPass
    })

    newUser.save((err =>{
      if (err) {
        res.status(200).render("auth/signup", {
          message: "Algo salio mal, no he podido guarduar tu usuario. Intentalo en 3 horas 2 minutos 47 segundo exactos!"
        })
      } else{
        res.redirect("/")
      }
    }))
  })
  .catch(error =>{
    next(error)
  })
})

authRoutes.get("/login", (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error") });
});

authRoutes.post("/login", passport.authenticate("local", {
  successRedirect: "/dashboard",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));



authRoutes.get("/detail_experience/:id", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.status(200).render("login", { user: req.user });
});

authRoutes.get("/detail_walking_tour/:id", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("login", { user: req.user });
});

authRoutes.get("/detail_group_tour/:id", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("login", { user: req.user });
});

authRoutes.get("/logout", (req, res) => {
  req.logout();
  res.status(200).redirect("/login");
});

module.exports = authRoutes;