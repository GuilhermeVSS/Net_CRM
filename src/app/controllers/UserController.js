
const jwt = require('jsonwebtoken');
const User = require('../models/User')
const authConfig = require('../../config/auth')

const generateToken = (key) => jwt.sign(key, authConfig.secret, {
    expiresIn: authConfig.expiresIn,
});

class UserController {
    async store(request, response) {
        try {
            const userExists = await User.findOne({ where: { email: request.body.email } })

            if (userExists) {
                return response.status(400).send({ error: "User already exists" })
            }
            const { id, name, email } = await User.create(request.body)
            return response.status(201).json({
                statusCode: 201,
                data: {
                    id: id,
                    name: name,
                    email: email
                },
                token: generateToken({id})
            })

        } catch (error) {
            response.status(500).json({
                statusCode: 500,
                error: "Something went wrong"
            })
        }
    }

    async update(request, response) {
        try {
            const { email, oldPassword } = request.body

            const user = await User.findByPk(request.userID)

            if (email !== user.email) {
                const userExists = await User.findOne({ where: { email } })

                if (userExists) {
                    return response.status(400).send({ error: "User already exists" })
                }
            }
            if (oldPassword && !(await user.checkPassword(oldPassword))) {
                return response.status(401).json({ error: "Password does not match" })
            }

            const { id, name } = await user.update(request.body)

            return response.status(201).json({
                statusCode: 201,
                data: {
                    id: id,
                    name: name,
                    email: email
                }
            })
        } catch (error) {
            return response.status(500).json({
                statusCode: 500,
                error: "Somethin went wrong"
            });
        }

    }

    async list(request, response) {
        try {
            let users = await User.findAll();
            users = users.map(user => {
                delete user.dataValues.password_hash
                return user;
            });
            return response.status(200).json({
                statusCode: 200,
                data: users
            });
        } catch (error) {
            console.log(error);
            return response.status(500).json({
                statusCode: 500,
                error: "Somethin went wrong"
            })
        }
    }

    async get(request, response) {
        const { id } = request.params;
        try {
            const user = await User.findByPk(id);
            if (!user) {
                return response.status(404).json({
                    statusCode: 404,
                    error: "User not found"
                });
            }
            delete user.dataValues.password_hash;
            return response.status(200).json({
                statusCode: 200,
                data: user
            });
        } catch (error) {
            return response.status(500).json({
                statusCode: 500,
                error: "Somethin went wrong"
            });
        }
    }

    async delete(request, response) {
        const { id } = request.params;
        try {
            const user = await User.findByPk(id);
            if (!user) {
                return response.status(400).json({
                    statusCode: 400,
                    error: "User not found"
                });
            }
            await user.destroy();
            return response.status(200).json({
                statusCode: 200,
                message: "User deleted successfully"
            });
        } catch (error) {
            return response.status(500).json({
                statusCode: 500,
                error: "Somethin went wrong"
            })
        }
    }
}

module.exports = new UserController()