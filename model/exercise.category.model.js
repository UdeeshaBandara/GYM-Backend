module.exports = (sequelize, Sequelize, DataTypes) => {

    const exerciseCategory = sequelize.define("ExerciseCategory", {
        exerciseId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'exercises',
                key: 'exerciseId'
            }
        },
        categoryId: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "",
            references: {
                model: 'categories',
                key: 'categoryId'
            }
        }
    });


    return exerciseCategory;


}
