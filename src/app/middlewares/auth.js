const authConfig = require('../../config/auth');
const jwt = require('jsonwebtoken');
const {promisify} = require('util');

module.exports = async(request, response, next) => {
    const authHeader = request.headers.authorization
    if(!authHeader){
        return response.status(401).json({error:"Token not provided"})
    }
    const [, token] = authHeader.split(' ')

    try{
        const decoded = await promisify(jwt.verify)(token, authConfig.secret)
        request.userID = decoded.id
        return next()
    }catch(error){
        return response.status(401).json({error:"Token invalid"})
    }
    return next()
}
