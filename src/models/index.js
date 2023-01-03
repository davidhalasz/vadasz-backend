const dbConfig = require('../../config/db.config');

const {Sequelize, DataTypes, Op} = require('sequelize');

const sequelize = new Sequelize(process.env.DB, process.env.USER, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: process.env.dialect,
  });

  sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

const db = {};

db.Sequelize = Sequelize
db.sequelize = sequelize
db.Op = Op

db.users = require('./user.model.js')(sequelize, DataTypes)
db.products = require('./product.model')(sequelize, DataTypes)

db.users.hasMany(db.products);
db.products.belongsTo(db.users, {foreignKey: 'userId'});

db.sequelize.sync({force: false}).then(() => {
    console.log("Re-sync done!");
})

module.exports = db;