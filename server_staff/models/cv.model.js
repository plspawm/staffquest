module.exports = (sequelize, Sequelize) => {
    const CV = sequelize.define("cv", {
        nombre: {
            type: Sequelize.STRING
        },
        ruta: {
            type: Sequelize.STRING
        }
    });
    return CV;
}