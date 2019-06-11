const jwt = require('jsonwebtoken');
const config = require('../config/config');


module.exports = async (req, res, next) =>{
    const token = req.header('x-auth-token');
    if(!token) {
        res.status(401).json({msg: "No token found. Access denied"});
    }
    try{
        const decoded = await jwt.decode(token, config.jwtSecret);
        req.user = decoded.user;
        next();
    }catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}