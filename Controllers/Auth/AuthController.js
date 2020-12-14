const mongoose = require('mongoose')
const JWT = require('jsonwebtoken')
const bcrypt = require("bcrypt");
require("dotenv").config();

var auth = require('./AuthController')

exports.authUser = function (req) {
    try {
        const token = req.headers.authorization.split(' ')[1]

        let decoded = JWT.verify(token, process.env.SECRET_KEY)

        return decoded
    } catch (error) {
        res.status(500).send({
            msg: "error_when_get_user"
        })
    }
}

exports.createAccount = function (req, res) {

    try {
        let user = req.body

        let newUser = '';
        let results = '';

        results = mongoose.model('User').find({ email: user.email }, function name(error, users) {

            if (users.length) {
                res.status(200).send({ msg: "an account already exists with this registered email address" })
            } else {
                newUser = new mongoose.model('User')(user)

                newUser.save(function (error, newUser) {

                    if (error) {
                        res.send(error)
                    } else {
                        let userId = newUser._id.toString()

                        let dataUser = {
                            userId, user
                        }

                        const token = JWT.sign(dataUser, process.env.SECRET_KEY, {
                            expiresIn: 7200
                        })

                        res.status(200).send({ msg: "Account Created", dataUser })
                    }


                })

            }

        })
    } catch (error) {
        res.status(500).send({
            msg: "error when create user"
        })
    }

}


exports.login = async function (req, res) {

    try {
        const { email, passwordUser } = req.body;

        let user = ""
        user = await mongoose.model('User').findOne({ email }).select("+password");

        if (user) {

            let { password } = user

            let verificationPassword = await bcrypt.compare(passwordUser, password);

            if (verificationPassword) {

                let userId = user._id.toString()

                let dataUser = {
                    userId, user
                }

                const token = await JWT.sign(dataUser, process.env.SECRET_KEY, {
                    expiresIn: 7200
                })

                res.status(200).send({ token, dataUser })

            } else {
                res.status(401).send({ msg: "username or password do not match" })
            }

        } else {
            res.status(404).send({ msg: "User not found" })
        }
    } catch (error) {
        res.status(500).send({
            msg: "error when create user"
        })
    }

}