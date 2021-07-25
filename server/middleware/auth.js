const jwt = require('jsonwebtoken');
const config = require('config');

const auth = (req,res,next)=>{
    // take out token from header
    const token = req.header('x-auth-token');
    // check if no token is there
    if(!token)
    {
        return res.status(401).json({msg:"user has not registered"})
    }
    
    try {
        const decodedtoken = jwt.verify(token,config.get('jwtsecret'));
      
        req.user = decodedtoken.user;
        next();
    } catch (error) {
        res.status(401).json({msg:"token is not valid"})
    }

}

module.exports = auth;