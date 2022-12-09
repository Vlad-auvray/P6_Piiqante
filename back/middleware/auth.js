const jwt = require('jsonwebtoken');
require('dotenv').config();

// Fonction de vérification de la présence d'un utilisaeur enregistré (comparaison entre l'userID et l'iD associé au Token)
module.exports = (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return res.status(401).json({ "message": "Token introvable" });
    }

    const authorizationData = req.headers.authorization.split(" ");
    if (!authorizationData) {
      return res.status(401).json({ "message": "Token introvable" });
    }

    const token = authorizationData[1];

    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

    req.auth = {
      userId: decodedToken.userId
    };

    if (!decodedToken.userId) {
      return res.status(401).json({ "message": "Token invalide" });
    } else {
      next();
    }
  } catch {
    return res.status(401).json({ "message": "Une erreur est survenue lors de la vérification du token" });
  }
};