const AuthMiddleware = require('../middleware/authorization.middleware')
const AuthController = require('../controller/auth.controller')
exports.routesConfig = function (app) {

    app.get('/', [

        AuthController.welcome
    ]);

    app.post('/auth/login', [
        AuthMiddleware.hasAuthValidFields,
        AuthMiddleware.isPasswordAndUserMatch,
        AuthController.welcome
    ]);

};
