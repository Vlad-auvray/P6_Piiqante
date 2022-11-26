const bcrypt = require('bcrypt')
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const emailValidator = require("email-validator")
require('dotenv').config();

exports.signup = (req, res, next) => {
  const isValidateEmail = emailValidator.validate(req.body.email);
  if (!isValidateEmail) {
    res.writeHead(400, 'Email incorrect !"}', {
      "content-type": "application/json",
    });
    res.end("Vérifiez le format de l'email, exemple: votremail@exemple.com.");
  } else {
    bcrypt
      .hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          email: req.body.email,
          password: hash,
        });
        user
        .save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch((error) => res.status(400).json({ error }));
      })
      .catch((error) => 
         res.status(500).json({ error }));
      }
  };
  
  exports.login = (req, res, next) => {
        User.findOne({email: req.body.email })
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Merci de vérifier votre identifiant et/ou mot de passe.' });
        }
        bcrypt.compare(req.body.password, user.password)
          .then((valid) => {
            if (!valid) {
              return res.status(401).json({ error: 'Merci de vérifier votre identifiant et/ou mot de passe.' });
            }
            res.status(200).json({
              userId: user._id,
              token: jwt.sign(
                { userId: user._id },
                process.env.SECRET_KEY,
                { expiresIn: '24h', }
              ),
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };