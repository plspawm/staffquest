const db = require("../models");
const usuario = db.usuarios;
const empleador = db.empleador;

const Query = {
    getUsuarios: async (root) => {
        try {
            const usuarios = await usuario.findAll();
            return usuarios;
        } catch(err) {
            console.log(err);
        }
    },

    getEmpleadores: async (root) => {
        const empleadores = await empleador.findAll();
    }
}

const Mutation = {
    createUsuario: (root, { nombres, apellidos, email, rut, sexo, pais, fecha_nacimiento, uid }) => {
        return usuario.create({ nombres, apellidos, email, rut, sexo, pais, fecha_nacimiento, uid })
      },
    
    createEmpleador: (root, {nombres,apellidos, email, rut_empresa, nombre_empresa, uid}) => {
        return empleador.create({nombres, apellidos, email, rut_empresa, nombre_empresa, uid})
    }
}

//db.sequelize.sync();
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});

module.exports = {Query, Mutation}