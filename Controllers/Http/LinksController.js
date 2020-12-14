const mongoose = require('mongoose');
const JWT = require('jsonwebtoken')
const authController = require('../Auth/AuthController')


exports.getAllLinks = async function(req, res){
    try {

        var user = authController.authUser(req)

        let foods;
        foods = await mongoose.model('Link').find({ idUser: user.userId }, null, { sort: { '_id': -1 }}).populate('category');

        res.json(foods)

    } catch (error) {
        res.status(500).json(error.toString())
    }
}

exports.getLinksPerCategory = async function(req, res){
    try {

        var user = authController.authUser(req)

        let foods;
        foods = await mongoose.model('Link').find({ idUser: user.userId, category: req.params.id }, null, { sort: { '_id': -1 }}).populate('category');

        res.json(foods)

    } catch (error) {
        res.status(500).json(error.toString())
    }
}

exports.createLink = function(req, res){
    try {
        var user = authController.authUser(req)

        console.log(req.body);

        let newlinks = new mongoose.model('Link')(req.body)
        newlinks.idUser = user.userId

        newlinks.save(function (error, links) {
            if (error)
                res.send(error)

            res.json(links)
        })

    } catch (error) {
        res.status(500).json(error.toString())
    }
}

exports.updateLink = function(req, res){
    try {

        let user = authController.authUser(req)

        let link = req.body

        let results = mongoose.models.Link.findOneAndUpdate({ _id: req.params.id, idUser: user.userId },
            link,
            function (error, links) {
                if (error)
                    res.send(error)

                res.json({ msg: "update success" })
            })
    } catch (error) {
        res.json({ msg: "error when update link" })
    }
}

exports.deleteLink = async  function(req, res){
    try {
        let foods;
        foods = await mongoose.model('Link').deleteOne({ _id: req.params.id })

        res.status(200).send({ msg: "Deleteado com sucesso", code: "2" })

    } catch (error) {
        res.status(500).json(error.toString())
    }
}