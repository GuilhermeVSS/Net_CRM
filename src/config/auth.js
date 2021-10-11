require('dotenv').config();

module.exports = {
    secret: process.env.JWT_TOKEN,
    expiresIn: process.env.JWT_EXPIRES
}