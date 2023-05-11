module.exports = (sequelize, Sequelize, DataTypes) => {

    const category = sequelize.define("categories", {
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


    return category;


}
