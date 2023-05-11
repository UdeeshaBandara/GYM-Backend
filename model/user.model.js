module.exports = (sequelize, Sequelize, DataTypes) => {

    const user = sequelize.define("users", {
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
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "",
            unique: true,
            isEmail: true,

        },
        telephone: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            unique: true

        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ""

        },
        //status 1 for active user
        //status 2 for disabled user
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1

        },
        age: {
            type: DataTypes.INTEGER,
            defaultValue: 0

        },
        gender: {
            type: DataTypes.STRING,
            defaultValue: ""

        },
        weight: {
            type: DataTypes.STRING,
            defaultValue: ""

        },
        height: {
            type: DataTypes.STRING,
            defaultValue: ""

        },
        bmi: {
            type: DataTypes.STRING,
            defaultValue: ""

        },

        //1 for admin
        //0 for normal user
        userType: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0

        }
    });


    return user;


}
