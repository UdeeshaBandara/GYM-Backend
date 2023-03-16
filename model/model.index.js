const dbConfig = require("../config/env.config.js");
const  { Sequelize, DataTypes, Model } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,

});

const db = {};

db.Sequelize = Sequelize;
db.DataTypes = DataTypes;
db.sequelize = sequelize;



db.user = require("./user.model.js")(sequelize, Sequelize,DataTypes);

//Table relationships

module.exports = db;
