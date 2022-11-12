const passwordSchema = require('../models/password');

module.exports = (req, res, next) => {
    if (!passwordSchema.validate(req.body.password)) {
        res.status(400).json({ message: 'Mot de passe trop faible. Il doit faire 8 caractères min., et inclure min. un chiffre, une majuscule et une minuscule.' });
    } else {
        next();
    }
};