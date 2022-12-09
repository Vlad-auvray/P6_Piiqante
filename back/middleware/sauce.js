const express = require("express");

//Fonction de validation des entrées lors de la création d'une sauce
module.exports = (req, res, next) => {

  if (req.body.sauce) {
    const sauce = JSON.parse(req.body.sauce);
    console.log(sauce.name.length < 3);

    if (!sauce.name || sauce.name.length < 3) {
      return res.status(401).json({ "message": "Le nom de la sauce est introuvable ou contient moins de trois caractères" });
    }

    if (!sauce.description || sauce.description.length < 3) {
      return res.status(401).json({ "message": "La description de la sauce est introuvable ou contient moins de trois caractères" });
    }

    if (!sauce.mainPepper || sauce.mainPepper.lenght < 3) {
      return res.status(401).json({ "message": "L'ingrédiant principal de la sauce est introuvable ou contient moins de trois caractères" });
    }

    if (!sauce.manufacturer || sauce.manufacturer.length < 3) {
      return res.status(401).json({ "message": "Le nom du fabriquant de la sauce est introuvable ou contient moins de trois caractères" });
    }

    if (req.auth.userId !== sauce.userId) {
      return res.status(401).json({ "message": "L'utilisateur qui essaie d'effectuer cette opération est différent de l'utilisateur connecté." });
    }

    next();

  } else {
    return res.status(401).json({ "message": "Une ou plusieurs informations de la sauce sont introuvables." });
  }
};