const jwt = require('jsonwebtoken'), secret = require('../config/env.config.js').jwt_secret
const crypto = require("crypto");
const user = require("../model/model.index").user;
const {Op} = require("sequelize");

exports.validJWTNeeded = (req, res, next) => {
    if (req.headers['authorization']) {
        try {
            let authorization = req.headers['authorization'].split(' ');
            if (authorization[0] !== 'Bearer') {
                return res.status(401).send({status: false, data: "Unauthorized"});
            } else {
                req.jwt = jwt.verify(authorization[1], secret);
                return next();
            }

        } catch (err) {
            return res.status(401).send({status: false, data: "Unauthorized"});
        }
    } else {
        return res.status(401).send({status: false, data: "Unauthorized"});
    }
};
exports.hasAuthValidFields = (req, res, next) => {

    if (req.body) {
        if (!req.body.email) {
            return res.status(200).send({status: false, data: "Email is required"});

        } else if (!req.body.password) {
            return res.status(200).send({status: false, data: "Password is required"});
        } else {
            return next();
        }
    } else {
        return res.status(200).send({status: false, data: 'Missing email and password fields'});
    }
};


exports.isPasswordAndUserMatch = (req, res, next) => {

    if (!req.body.email) {
        return res.status(200).send({status: false, data: 'Invalid e-mail'});
    }
    user.findAll({
        where: {
            email: req.body.email, userType: 0
        }
    }).then((result) => {


        if (!result[0]) {
            res.status(200).send({status: false, data: 'Invalid account'});
        } else if (!req.body.fcm) {
            res.status(200).send({status: false, data: 'Failed to login'});
        } else {
            let passwordFields = result[0].password.split('$');
            let salt = passwordFields[0];
            let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
            if (hash === passwordFields[1]) {
                req.body = {
                    userId: result[0].id,
                    email: result[0].email,
                    fcm: req.body.fcm,
                    name: result[0].firstName + ' ' + result[0].lastName,
                };
                return next();
            } else {
                return res.status(200).send({status: false, data: 'Invalid password'});
            }
        }

    });

};

exports.checkEmailExist = (req, res, next) => {

    if (!req.body.email) {
        return res.status(200).send({status: false, data: 'Invalid e-mail'});
    }

    user.findAll({
        where: {
            [Op.or]: [
                {email: req.body.email}

            ]
        }
    }).then((result) => {

        if (result.length >= 1) {
            res.status(200).send({status: false, data: 'E-mail already exist'});
        } else {

            return next();

        }

    });

};

exports.login = (req, res) => {
    try {
        let refreshId = req.body.userId + jwtSecret;
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512', salt).update(refreshId).digest("base64");
        req.body.refreshKey = salt;
        let token = jwt.sign(req.body, jwtSecret);
        let b = Buffer.from(hash);
        let refresh_token = b.toString('base64');


        user.update({fcm: req.body.fcm}, {
            where: {
                email: req.body.email
            }
        }).then((result) => {
            console.log(result);

            res.status(200).send({status: true, accessToken: token, refreshToken: refresh_token});

        }).catch(err => {
            err.errors.map(e =>
                res.status(200).send({
                    status: false,
                    message: e.message
                }));
        });

    } catch (err) {
        res.status(200).send({status: false, errors: err});
    }
};