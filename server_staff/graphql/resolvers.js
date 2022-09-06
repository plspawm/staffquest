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
        try {
            const empleadores = await empleador.findAll();
            return empleadores;
        } catch(err) {
            console.log(err);
        }
        
        
    },

    getUsuario: async (root, {uid}) => {
        try {
            const user = await usuario.findAll({where: {uid: uid}});
            return user[0];
        } catch(err) {
            console.log(err);
        }
    },

    getEmpleador: async (root, {uid}) => {
        try {
            const emp = await empleador.findAll({where: {uid: uid}});
            return emp;
        } catch(err) {
            console.log(err);
        }
    }
}

const Mutation = {
    createUsuario: (root, { nombres, apellidos, email, rut, sexo, pais, fecha_nacimiento, uid }) => {
        return usuario.create({ nombres, apellidos, email, rut, sexo, pais, fecha_nacimiento, uid })
      },
    
    createEmpleador: (root, {nombres,apellidos, email, rut_empresa, nombre_empresa, uid, tel_contacto}) => {
        return empleador.create({nombres, apellidos, email, rut_empresa, nombre_empresa, uid, tel_contacto})
    }
}

db.sequelize.sync();
/* db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
}); */

module.exports = {Query, Mutation}