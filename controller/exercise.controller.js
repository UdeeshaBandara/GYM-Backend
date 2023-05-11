const {exercise} = require("../model/model.index");

exports.getHomeFeed = async (req, res) => {

    let exerciseList = await exercise.findAll();

    res.status(200).send({status: true, data: exerciseList});
};
exports.create = async (req, res) => {



    exercise.create({
        name: req.body.name,
        type: req.body.type,
        description: req.body.description,
        demoUrl: req.body.demoUrl,
        coverImageUrl: req.body.coverImageUrl
    }).then((result) => {

        res.status(201).send({status: true, data: result});
    }).catch(err => {
        res.status(200).send({status: false, data: "Failed to save user " + err.message});


    });

};
