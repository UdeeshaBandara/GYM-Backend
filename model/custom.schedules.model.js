module.exports = (sequelize, Sequelize, DataTypes) => {

    const customSchedules = sequelize.define("customSchedules", {
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
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ""
        },

    });


    return customSchedules;


}
