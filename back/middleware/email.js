module.exports = (req, res, next) => {
    const validEmail = (email) => {
        let emailRegexp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
        let isRegexTrue = emailRegexp.test(email)
        isRegexTrue ? next() : res.status(400).json({ message: 'Email invalide. Merci de choisir une adresse sous le format: nom@exemple.com'});
    }
    validEmail(req.body.email)
  };