module.exports = (sequelize, Sequelize) => {
    const Academica = sequelize.define("academica", {
        titulo: {
            type: Sequelize.STRING
        },
        institucion: {
            type: Sequelize.STRING
        },
        fecha_desde: {
            type: Sequelize.DATE
        },
        fecha_hasta: {
            type: Sequelize.DATE
        },
        estado: {
            type: Sequelize.STRING
        },
        ruta: {
            type: Sequelize.STRING
        }
    });
    return Academica;
}