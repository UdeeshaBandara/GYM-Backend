module.exports = (sequelize, Sequelize, DataTypes) => {

    const personalGoals = sequelize.define("personalGoals", {
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
        iconUrl: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "",
            unique: false,

        }
    });


    return personalGoals;


}
