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
db.customSchedules = require("./custom.schedules.model.js")(sequelize, Sequelize, DataTypes);
db.customScheduleExercises = require("./custom.schedule.exercise.model.js")(sequelize, Sequelize, DataTypes);

//Table relationships
db.exercise.belongsToMany(db.category, {through: db.exerciseCategory});
db.category.belongsToMany(db.exercise, {through: db.exerciseCategory});
db.customSchedules.belongsToMany(db.exercise, {through: db.customScheduleExercises});
db.user.hasMany(db.customSchedules);
db.customSchedules.belongsTo(db.user);
db.exercise.belongsToMany(db.customSchedules, {through: db.customScheduleExercises});
db.customSchedules.belongsToMany(db.exercise, {through: db.customScheduleExercises});

module.exports = db;
