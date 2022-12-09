const Sauce = require('../models/Sauce');
const fs = require('fs');

// Fonction de la création de sauce
exports.createSauce = (req, res, next) => {
  
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes:0,
        usersLiked: [' '],
        usersDisliked: [' ']
    });
    sauce.save()
    .then(() => res.status(201).json({message: "Sauce ajoutée !"}))
    .catch(error => res.status(400).json({error}));
    console.log('Nouvelle sauce');
};

// Fonction pour afficher une sauce
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({_id: req.params.id})
  .then(sauces => res.status(200).json(sauces))
  .catch(error => res.status(400).json({error}));  
  console.log('Sauce trouvée !'); 
};

// Fonction pour modifier une sauce existante
exports.updateSauce = (req, res ,next) => {
//Si on trouve une nouvelle image, on recupere la chaine de caractères, on lest fait un objet puis on modifie l'url de l'image
  const sauceObject = req.file ?
      {
          ...JSON.parse(req.body.sauce),
          imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    //Sinon on prend le corps de la requete et on modifie l'id de l'objet pour qu'il corresponde à l'identifiant des paramètres de requete
      } : {...req.body}
  Sauce.updateOne({_id: req.params.id}, {...sauceObject, _id: req.params.id})
      .then(() => res.status(200).json({ message: 'Sauce Modifiée !' }))
      .catch(error => res.status(400).json({ error }))
};

// Fonction de suppression d'une sauce
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
    .then(sauce => {
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
            Sauce.deleteOne({_id: req.params.id})
            .then(() => res.status(200).json({message: 'Sauce supprimée !'}))
            .catch(error => res.status(400).json({error}));  
            console.log('Sauce supprimée !'); 
        });
    })
    .catch(error => res.status(500).json({error}));
};

// Fonction pour afficher la liste des sauces
exports.getAllSauces = (req, res, next) => {
  Sauce.find()
  .then(sauces => res.status(200).json(sauces))
  .catch(error => res.status(400).json({error}));  
  console.log('Sauces trouvées !'); 
};


// Fonction pour l'ajout de like et dislike sur une sauce
exports.likeDislikeSauce = (req, res, next) => {
  let like = req.body.like
  let userId = req.body.userId
  let sauceId = req.params.id
  
  Sauce.findOne({ _id: req.params.id })
  .then(sauce => {
      // Si l'utilisateur n'a pas encore donné de like ou dislike
      if(sauce.usersDisliked.indexOf(req.body.userId) == -1 && sauce.usersLiked.indexOf(req.body.userId) == -1) {
          if(req.body.like == 1) { 
            // L'utilisateur donne un like sur la sauce
              sauce.usersLiked.push(req.body.userId);
              sauce.likes += req.body.like;
          } else if(req.body.like == -1) { 
            // L'utilisateur dislike la sauce
              sauce.usersDisliked.push(req.body.userId);
              sauce.dislikes -= req.body.like;
          };
      };
      // Si l'utilisateur change d'avis...
      //...en cas de like
      if(sauce.usersLiked.indexOf(req.body.userId) != -1 && req.body.like == 0) {
          const likesUserIndex = sauce.usersLiked.findIndex(user => user === req.body.userId);
          sauce.usersLiked.splice(likesUserIndex, 1);
          sauce.likes -= 1;
      };
      // ...en cas dislike
      if(sauce.usersDisliked.indexOf(req.body.userId) != -1 && req.body.like == 0) {
          const likesUserIndex = sauce.usersDisliked.findIndex(user => user === req.body.userId);
          sauce.usersDisliked.splice(likesUserIndex, 1);
          sauce.dislikes -= 1;
      }
      sauce.save();
      res.status(201).json({ message: 'Merci pour ton avis !' });
  })
  .catch(error => res.status(500).json({ error }));
};