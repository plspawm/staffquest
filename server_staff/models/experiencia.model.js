module.exports = (sequelize, Sequelize) => {
    const Experiencia = sequelize.define("experiencia", {
        cargo: {
            type: Sequelize.STRING
        },
        empresa: {
            type: Sequelize.STRING
        },
        fecha_desde: {
            type: Sequelize.DATE
        },
        fecha_hasta: {
            type: Sequelize.DATE
        },
        trabajo_actual: {
            type: Sequelize.STRING
        },
        descripcion: {
            type: Sequelize.STRING(2000)
        }
    });
    return Experiencia;
}