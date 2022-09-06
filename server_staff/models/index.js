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
db.estudio = require("./estudio.model")(sequelize, Sequelize);
db.nivelprofesional = require("./nivelprofesional.model")(sequelize, Sequelize);
db.academica = require("./academica.model")(sequelize, Sequelize);
db.certificado = require("./certificado.model")(sequelize, Sequelize);
db.experiencia = require("./experiencia.model")(sequelize, Sequelize);
db.cv = require("./cv.model")(sequelize, Sequelize);

//Asociaciones
//Un usuario tiene muchas formaciones academicas
db.usuarios.hasMany(db.academica, {as: "academia"});
db.academica.belongsTo(db.usuarios, {foreingKey: "usuarioId", as: "usuario"});

//Un usuario tiene muchos certificados
db.usuarios.hasMany(db.certificado, {as: "certificados"});
db.certificado.belongsTo(db.usuarios, {foreingKey: "usuarioId", as: "usuario"});

//Un usuario tiene muchas experiencias
db.usuarios.hasMany(db.experiencia, {as: "experiencias"});
db.experiencia.belongsTo(db.usuarios, {foreingKey: "usuarioId", as: "usuario"});

//Un usuario tiene muchos cv
db.usuarios.hasMany(db.cv, {as: "cvs"});
db.cv.belongsTo(db.usuarios, {foreingKey: "usuarioId", as: "usuario"});

module.exports = db;