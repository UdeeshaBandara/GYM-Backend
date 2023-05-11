const express = require('express');
require('dotenv').config();
const UserRouter = require('./routes/user.route');
const ExerciseRouter = require('./routes/exercise.route');

const admin = require("firebase-admin");
const serverKey = require('./private_key.json');

const app = express();
app.use(express.json());

admin.initializeApp({
    credential: admin.credential.cert(serverKey),
    storageBucket: "gs://gym-ios-437db.appspot.com"
});

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    } else {
        return next();
    }
});


UserRouter.routesConfig(app);
ExerciseRouter.routesConfig(app);

app.listen(process.env.PORT || 3600, function () {
});
