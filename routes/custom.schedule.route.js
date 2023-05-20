const AuthMiddleware = require('../middleware/authorization.middleware')
const CustomExerciseController = require('../controller/custom.schedule.controller')
exports.routesConfig = function (app) {


    app.get('/custom/exercise', [
        AuthMiddleware.validJWTNeeded,
        CustomExerciseController.getAllCustomExercises
    ]);
    app.post('/custom/exercise', [
        AuthMiddleware.validJWTNeeded,
        CustomExerciseController.insert
    ]);
    app.delete('/custom/exercise/:id', [
        AuthMiddleware.validJWTNeeded,
        CustomExerciseController.delete
    ]);



};
