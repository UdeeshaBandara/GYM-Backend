const crypto = require("crypto");
const {exercise,user,personalGoals } = require("../model/model.index");

exports.insert = (req, res) => {

    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
    req.body.password = salt + "$" + hash;


    user.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        status: 1,
        telephone: req.body.telephone
    }).then((result) => {
        const { ['password']: password, ...userWithoutPassword } = result.dataValues
        res.status(201).send({status: true, data: userWithoutPassword});
    }).catch(err => {
        res.status(200).send({status: false, data: "Failed to save user " + err.message});


    });

};
exports.getPersonalGoals = async (req, res) => {

    let personalGoalsList = await personalGoals.findAll();

    res.status(200).send({status: true, data: personalGoalsList});
};
exports.updateUserProfile = (req, res) => {
    if (req.body) {


        req.body.personalGoalsId = req.body.goalId;
        delete req.body.goalId;
        req.body.isOnboardingCompleted = 1;
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

exports.changeUserGoal = (req, res) => {
    if (req.body) {

        user.update(req.body, {
            where: {
                id: req.jwt.userId
            }
        }).then((result) => {

            if (!result[0]) {
                res.status(200).send({status: false, data: 'Invalid user'});
            } else {

                res.status(200).send({
                    status: true,
                    data: "Your goal has been changed"
                });
            }
        }).catch(err => {

            res.status(200).send({status: false, data: "Failed to change goal"});


        });


    }
};
