module.exports = (sequelize, Sequelize) => {
    const Estudio = sequelize.define("estudio", {
        nombre: {
            type: Sequelize.STRING
        },
    });
    return Estudio;
}