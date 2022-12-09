const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const sauceCtrl = require('../controllers/sauce');
const sauceElmt = require ('../middleware/sauce.js');
const sauceModif = require ('../middleware/modify.js');

// Route affichage toute les sauces
router.get("/", auth, sauceCtrl.getAllSauces);

//Route affichage UNE sauce
router.get('/:id', auth, sauceCtrl.getOneSauce);

//Route création d'un sauce
router.post("/", auth, multer, sauceElmt, sauceCtrl.createSauce);

//Route MAJ d'une sauce (accordé uniquement à l'user qui est à l'origine de sa création)
router.put("/:id", auth, multer, sauceModif, sauceCtrl.updateSauce);

//Route suppression d'une sauce (accordé uniquement à l'user qui est à l'origine de sa création)
router.delete("/:id", auth, sauceModif, sauceCtrl.deleteSauce);

//Route pour ajout like et dislike
router.post("/:id/like", auth, sauceCtrl.likeDislikeSauce);


module.exports = router;
