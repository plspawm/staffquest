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
        },
        direccion: {
            type: Sequelize.STRING
        },
        region: {
            type: Sequelize.STRING
        },
        nacionalidad: {
            type: Sequelize.STRING
        },
        disponibilidad: {
            type: Sequelize.STRING
        },
        telefono: {
            type: Sequelize.STRING
        },
        especialidad: {
            type: Sequelize.STRING
        },
        nivel_estudio: {
            type: Sequelize.STRING
        },
        nivel_profesional: {
            type: Sequelize.STRING
        },
        anios_experiencia: {
            type: Sequelize.STRING
        },
        discapacidad: {
            type: Sequelize.STRING
        },
        descripcion: {
            type: Sequelize.STRING
        },
    });
    return Usuario;
}