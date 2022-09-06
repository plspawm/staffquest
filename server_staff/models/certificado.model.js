module.exports = (sequelize, Sequelize) => {
    const Certificado = sequelize.define("certificado", {
        nombre: {
            type: Sequelize.STRING
        },
        ruta: {
            type: Sequelize.STRING
        }
    });
    return Certificado;
}