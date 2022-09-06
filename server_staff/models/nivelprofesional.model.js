module.exports = (sequelize, Sequelize) => {
    const Nivelprofesional = sequelize.define("nivelprofesional", {
        nombre: {
            type: Sequelize.STRING
        },
    });
    return Nivelprofesional;
}