module.exports = (sequelize, Sequelize, DataTypes) => {

    const exercise = sequelize.define("exercises", {
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
