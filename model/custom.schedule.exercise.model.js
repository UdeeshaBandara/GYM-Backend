module.exports = (sequelize, Sequelize, DataTypes) => {

    const customScheduleExercises = sequelize.define("customScheduleExercises", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        customScheduleId: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "",
            references: {
                model: 'customSchedules',
                key: 'scheduleId'
            }
        },
        exerciseId: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "",
            references: {
                model: 'exercises',
                key: 'exerciseId'
            }
        },
        repCount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        setCount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },

    });


    return customScheduleExercises;


}
