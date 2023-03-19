const AuthMiddleware = require('../middleware/authorization.middleware')
const AuthController = require('../controller/auth.controller')
const UsersController = require('../controller/user.controller')
exports.routesConfig = function (app) {

    app.get('/', [

        AuthController.welcome
    ]);

    app.post('/auth/register', [
        AuthMiddleware.hasAuthValidFields,
        AuthMiddleware.checkEmailPhoneNumber,
        UsersController.insert
    ]);

    app.post('/auth/login', [
        AuthMiddleware.hasAuthValidFields,
        AuthMiddleware.isPasswordAndUserMatch,
        AuthController.login
    ]);
    app.post('/user/wizard', [
        AuthMiddleware.validJWTNeeded,
        AuthMiddleware.validateWizardFields,
        AuthController.updateUserProfile
    ]);
    app.get('/user', [
        AuthMiddleware.validJWTNeeded,
        AuthController.getUserInfo
    ]);


};
