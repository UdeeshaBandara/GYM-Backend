const {exercise, user, category, exerciseCategory, personalGoals} = require("../model/model.index");

exports.getAllExercises = async (req, res) => {

    let exerciseList = await exercise.findAll();

    exerciseList = exerciseList.map(el => ({
        ...el.dataValues,
        isChecked: false,
        repCount: 0,
        setCount: 0,
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


    let exerciseCategories = await category.findAll({
        include: {
            model: exercise
        },

    }).catch(err => {


        return res.status(200).send({status: false, data: "Failed to retrieve exercises"});


    });
    let reps = 0;
    let sets = 0;
    let userData = await user.findAll({
        where: {
            id: req.jwt.userId
        }
    });
    let personalGoalsId = 1;
    if (userData.length > 0) {
        personalGoalsId = userData[0].personalGoalsId;
    }
    let personalGoalsList = await personalGoals.findAll();
    let retReps = personalGoalsList.find(x => x.dataValues.id == personalGoalsId)

    if (exerciseCategories.length > 0) {
        exerciseCategories.forEach(category => {
            let exercises = category.dataValues.exercises;
            if (exercises != null && exercises.length > 0) {

                for (let i = 0; i < exercises.length; i++) {
                    exercises[i].dataValues.repCount = retReps.dataValues.repCount
                    exercises[i].dataValues.setCount = retReps.dataValues.setCount
                }
            }
        });
    }


    return res.status(201).send({status: true, data: exerciseCategories});


};
