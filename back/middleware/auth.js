const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
const token = req.headers.authorization.split(' ')[1];
const decodedToekn = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
const userId = decodedToekn.userID;
req.auth ={
    userId: userId
};
    }
    catch(error){
        res.status(401).json({error});
   }
};