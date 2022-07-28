module.exports = {
    HOST: "servicios4j2.ddns.net",//dbperson-1.chdmwih4unji.sa-east-1.rds.amazonaws.com
    USER: "staff",
    PASSWORD: "Staffquest",//Ecora2022
    DB: "staffquest",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };