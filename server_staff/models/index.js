const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    port: 3306,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    },
    /* dialectOptions: {
      //useUTC: false, //for reading from database
      //dateStrings: true,
      typeCast: function (field, next) { // for reading from database
        if (field.type == 'DATETIME' || field.type == 'TIMESTAMP') {
          return new Date(field.string() + 'Z');
        }
        return next()
      }
    }, */
    timezone: '-03:00'
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.usuarios = require("./usuario.model")(sequelize, Sequelize);
db.empleador = require("./empleador.model")(sequelize, Sequelize);

module.exports = db;