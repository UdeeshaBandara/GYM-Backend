const {exercise, user, category, exerciseCategory} = require("../model/model.index");

exports.getAllExercises = async (req, res) => {

    let exerciseList = await exercise.findAll();

    exerciseList = exerciseList.map(el => ({
        ...el.dataValues,
        isChecked: false
    }));
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
exports.getExerciseByCategory = async (req, res) => {


    const exerciseCategories = await category.findAll({
        include: {
            model: exercise
        },

    }).catch(err => {
        return res.status(200).send({status: false, data: "Failed to retrieve exercises"});


    });

    return res.status(201).send({status: true, data: exerciseCategories});


};
