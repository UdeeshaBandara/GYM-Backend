const jwt = require('jsonwebtoken');
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
                req.jwt = jwt.verify(authorization[1], process.env.JWT_SECRET);
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

exports.validateWizardFields = (req, res, next) => {

    if (req.body) {
        if (!req.body.gender) {
            return res.status(200).send({status: false, data: "Gender is required"});
        } else if (!req.body.weight) {
            return res.status(200).send({status: false, data: "Weight is required"});
        } else if (!req.body.age) {
            return res.status(200).send({status: false, data: "Age is required"});
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
        } else {
            let passwordFields = result[0].password.split('$');
            let salt = passwordFields[0];
            let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
            if (hash === passwordFields[1]) {
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

exports.checkEmailPhoneNumber = (req, res, next) => {

    if (!req.body.name) {
        return res.status(200).send({status: false, data: 'Invalid parameter for name'});
    }
    if (!req.body.telephone) {
        return res.status(200).send({status: false, data: 'Invalid telephone number'});
    }

    user.findAll({
        where: {
            [Op.or]: [
                {email: req.body.email},
                {telephone: req.body.telephone}
            ]
        }
    }).then((result) => {

        if (result.length >= 1) {
            res.status(200).send({status: false, data: 'E-mail or telephone already exist'});
        } else {

            return next();

        }

    });

};
