const crypto = require("crypto");
const jwtSecret = require('../config/env.config.js').jwt_secret,
    jwt = require('jsonwebtoken');
const user = require("../model/model.index").user;

exports.welcome = (req, res) => {
    try {

        res.status(200).send({"message": "Gym backend up and running!!!"});
    } catch (err) {
        res.status(200).send({status: false, errors: err});
    }
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

        res.status(200).send({status: true, accessToken: token, refreshToken: refresh_token});


    } catch (err) {
        res.status(200).send({status: false, errors: err});
    }
};
exports.updateUserProfile = (req, res) => {
    if (req.body) {

        user.update(req.body, {
            where: {
                email: req.jwt.email
            }
        }).then((result) => {


            res.status(200).send({
                status: true,
                data: "User profile updated successfully",
            });

        }).catch(err => {

            res.status(200).send({status: false, data: "Failed to update user"});


        });


    }
};
