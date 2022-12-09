require('dotenv').config();
const jwt = require('jsonwebtoken');
const Sauce = require('../models/Sauce');

//Fonction de vérification qu'un utilisateur qui modifie un élément = celui qui a créé ce même élément
module.exports = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id})
        .then(sauce => {
            // On récupère token d'authentification, on vérifie
            const token = req.headers.authorization.split(' ')[1];
            const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
            
            // On récupère le userId du token
            const userId = decodedToken.userId;

            // On compare le userId de la sauce et celui du token
            if(sauce.userId && sauce.userId !== userId) {
                res.status(403).json({ message: 'Vous ne pouvez pas modifier ce contenu. Merci de vérifier vos identifiants.' });
            } else {
                next();
            }
        })
        .catch(error => {
            res.status(401).json({ error })
        });
}