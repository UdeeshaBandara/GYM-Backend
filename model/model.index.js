const {Sequelize, DataTypes} = require("sequelize");

const sequelize = new Sequelize(process.env.DB, process.env.USER, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: process.env.DIALECT,

});

const db = {};

db.Sequelize = Sequelize;
db.DataTypes = DataTypes;
db.sequelize = sequelize;


db.user = require("./user.model.js")(sequelize, Sequelize, DataTypes);
db.exercise = require("./exercise.model.js")(sequelize, Sequelize, DataTypes);
db.category = require("./category.model.js")(sequelize, Sequelize, DataTypes);
db.exerciseCategory = require("./exercise.category.model.js")(sequelize, Sequelize, DataTypes);

//Table relationships
db.exercise.belongsToMany(db.category, {through: db.exerciseCategory});
db.category.belongsToMany(db.exercise, {through: db.exerciseCategory});

module.exports = db;
