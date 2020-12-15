const { Router } = require("express");


var AuthMiddleware = require('../Middlewares/AuthMiddleware')
var AuthController = require('../Controllers/Auth/AuthController')

// CONTROLLERS
var LinksController = require('../Controllers/Http/LinksController')
var CategorysController = require('../Controllers/Http/CategorysController')

const Route = Router()

Route.get('/', function(req, res){
    res.status(200).json("links api v1.0.1")
})

Route.post('/login',  AuthController.login);
Route.post('/createaccount',  AuthController.createAccount);

Route.get('/links', AuthMiddleware.session, LinksController.getAllLinks)
Route.get('/onelink/:id', AuthMiddleware.session, LinksController.getOneLink);
Route.get('/links/:id', AuthMiddleware.session, LinksController.getLinksPerCategory)
Route.post('/link', AuthMiddleware.session, LinksController.createLink)
Route.put('/link/:id', AuthMiddleware.session, LinksController.updateLink)
Route.delete('/link/:id', AuthMiddleware.session, LinksController.deleteLink)


Route.get('/category', AuthMiddleware.session, CategorysController.getCategorys)
Route.post('/category', AuthMiddleware.session, CategorysController.createCategory)
Route.delete('/category/:id', AuthMiddleware.session, CategorysController.deleteCategory)


module.exports = Route
