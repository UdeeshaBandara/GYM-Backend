const AuthMiddleware = require('../middleware/authorization.middleware')
const AuthController = require('../controller/auth.controller')
const ExerciseController = require('../controller/exercise.controller')
exports.routesConfig = function (app) {



    app.get('/exercise/home', [
        AuthMiddleware.validJWTNeeded,

        ExerciseController.getExerciseByCategory
    ]);
    app.post('/exercise', [
        AuthMiddleware.validJWTNeeded,
        ExerciseController.create
    ]);



};
