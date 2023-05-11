const  { Sequelize, DataTypes, Model } = require("sequelize");

const sequelize = new Sequelize(process.env.DB, process.env.USER, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: process.env.DIALECT,

});

const db = {};

db.Sequelize = Sequelize;
db.DataTypes = DataTypes;
db.sequelize = sequelize;



db.user = require("./user.model.js")(sequelize, Sequelize,DataTypes);
db.exercise = require("./exercise.model.js")(sequelize, Sequelize,DataTypes);

//Table relationships

module.exports = db;
