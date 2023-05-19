const {exercise, customSchedules, customScheduleExercises} = require("../model/model.index");

exports.getAllCustomExercises = async (req, res) => {

    const customExercises = await customSchedules.findAll({
        include: {
            model: exercise
        },

    }).catch(err => {
        console.log('err', err)
        return res.status(200).send({status: false, data: "Failed to retrieve exercises"});


    });

    return res.status(201).send({status: true, data: customExercises});

};
exports.insert = async (req, res) => {
    customSchedules.create({
        name: req.body.name,
        userId: req.jwt.userId
    }).then((result) => {



        req.body.exercises.forEach(oneExercise => {
            customScheduleExercises.create({
                customScheduleId: result.id,
                exerciseId: oneExercise.exerciseId,
                repCount: oneExercise.repCount,
                setCount: oneExercise.setCount,
            });
        });

        res.status(201).send({status: true, data: result});
    }).catch(err => {
        res.status(200).send({status: false, data: "Failed to save user " + err.message});


    });

};
