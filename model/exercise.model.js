module.exports = (sequelize, Sequelize, DataTypes) => {

    const exercise = sequelize.define("exercise", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ""
        },

        type: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ""
        },
        demoUrl: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ""
        },
        coverImageUrl: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ""
        },
    });


    return exercise;


}
