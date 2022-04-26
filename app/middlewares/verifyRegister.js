const db = require("../models");
const ROLES = db.ROLES;
const User = db.User;

const checkDuplicateUsername = (req, res, next) => {
  User.findOne({
    username: req.body.username
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({message: err });
      return;
    }

    if (user) {
      res.status(400).send({ message: "Username already in use." });
      return;
    }

    next();
  });
}

const checkDuplicateEmail = (req, res, next) => {
  User.findOne({
    email: req.body.email
  }).exec(( err, user ) => {
    if (err) {
      res.status(500).send({message: err});
      return;
    }

    if (user) {
      res.status(400).send({ message: "Email already in use."});
      return;
    }

    next();
  });
}

const checkRolesExist = (req, res, next) => {
  if(res.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: `Role ${req.body.roles[i]} does not exist.`
        });
        return;
      }
    }
  }

  next();
}

const verifyRegister = {
  checkDuplicateUsername,
  checkDuplicateEmail,
  checkRolesExist
};

module.exports = verifyRegister;