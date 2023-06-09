const AuthMiddleware = require('../middleware/authorization.middleware')
const ExerciseController = require('../controller/exercise.controller')
exports.routesConfig = function (app) {

    app.get('/exercise/home', [
        AuthMiddleware.validJWTNeeded,
        ExerciseController.getExerciseByCategory
    ]);
    app.get('/exercise', [
        AuthMiddleware.validJWTNeeded,
        ExerciseController.getAllExercises
    ]);
    app.post('/exercise', [
        AuthMiddleware.validJWTNeeded,
        ExerciseController.create
    ]);



};
