const mongoose = require('mongoose');
const JWT = require('jsonwebtoken')
const authController = require('../Auth/AuthController')


exports.getCategorys = async function(req, res){
    try {

        var user = authController.authUser(req)

        let Category;
        Category = await mongoose.model('Category').find({ idUser: user.userId }, null, { sort: { '_id': -1 }});

        res.json(Category)

    } catch (error) {
        res.status(500).json(error.toString())
    }
}

exports.createCategory = function(req, res){
    try {
        var user = authController.authUser(req)

        console.log(req.body)

        let newCategory = new mongoose.model('Category')(req.body)
        newCategory.idUser = user.userId

        newCategory.save(function (error, Category) {
            if (error)
                res.send(error)

            res.json(Category)
        })

    } catch (error) {
        res.status(500).json(error.toString())
    }
}

// exports.updateLink = function(req, res){
//     try {

//         let user = authController.authUser(req)

//         let link = req.body

//         let results = mongoose.models.Link.findOneAndUpdate({ _id: req.params.id, idUser: user.userId },
//             link,
//             function (error, links) {
//                 if (error)
//                     res.send(error)

//                 res.json({ msg: "update success" })
//             })
//     } catch (error) {
//         res.json({ msg: "error when update link" })
//     }
// }

// exports.deleteLink = async  function(req, res){
//     try {
//         let foods;
//         foods = await mongoose.model('Link').deleteOne({ _id: req.params.id })

//         res.json(foods)

//     } catch (error) {
//         res.status(500).json(error.toString())
//     }
// }