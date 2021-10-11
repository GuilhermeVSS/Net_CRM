const authConfig = require('../../config/auth');
const jwt = require('jsonwebtoken');
const User = require('../models/User')

class SessionController {
    async store(request, response) {

        const { email, password } = request.body

        const user = await User.findOne({ where: { email } })

        if (!user) {
            return response.status(404).json({
                statusCode: 404,
                error: "User not found"
            });
        }
        if (! await user.checkPassword(password)) {
            return response.status(401).json({
                statusCode: 401,
                error: "Passord does not match"
            });
        }

        const { id, name } = user

        return response.status(200).json({
            statusCode: 200,
            data: {
                id: id,
                name: name,
                email: email
            },
            //hash generated by md5online 
            token: jwt.sign({ id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn
            }),
        })
        
    }
}

module.exports = new SessionController()