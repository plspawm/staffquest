module.exports = (sequelize, Sequelize) => {
    const Usuario = sequelize.define("usuario", {
        nombres: {
            type: Sequelize.STRING
        },
        apellidos: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        rut: {
            type: Sequelize.STRING
        },
        sexo: {
            type: Sequelize.STRING
        },
        pais: {
            type: Sequelize.STRING
        },
        fecha_nacimiento: {
            type: Sequelize.STRING
        },
        uid: {
            type: Sequelize.STRING
        }
    });
    return Usuario;
}