module.exports = (sequelize, Sequelize) => {
    const Empleador = sequelize.define("empleador", {
        nombres: {
            type: Sequelize.STRING
        },
        apellidos: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        rut_empresa: {
            type: Sequelize.STRING
        },
        nombre_empresa: {
            type: Sequelize.STRING
        },
        uid: {
            type: Sequelize.STRING
        },
        tel_contacto: {
            type: Sequelize.STRING
        }
    });
    return Empleador;
}