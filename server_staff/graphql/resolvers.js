const db = require("../models");
const dateScalar = require("./datetime");
const usuario = db.usuarios;
const empleador = db.empleador;
const estudio = db.estudio;
const nivelprofesional = db.nivelprofesional;
const academica = db.academica;
const certificado = db.certificado;
const experiencia = db.experiencia;
const cv = db.cv;

Date: dateScalar;

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

    getEstudios: async (root) => {
        try {
            const estudios = await estudio.findAll();
            return estudios;
        } catch(err) {
            console.log(err);
        }
    },

    getUsuario: async (root, {uid}) => {
        try {
            const user = await usuario.findAll({where: {uid: uid}});
            return user;
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
    },

    getNivelProfesionales: async (root) => {
        try {
            const nivelp = await nivelprofesional.findAll();
            return nivelp;
        }catch(err) {
            console.log(err);
        }
    },

    getCertificados: async (root) => {
        try {
            const certificados = await certificado.findAll();
            return certificados;
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
    },

    createEstudio: (root, {nombre}) => {
        return estudio.create({nombre})
    },

    createNivelprofesional: (root, {input}) => {
        console.log("Resolver", input)
        return nivelprofesional.create(input);
    },

    updateUsuario: async (root, {id, input}) => {
        const user = await usuario.findByPk(id);
        user.set(input);
        return user.save();
    },

    createAcademica: async (root, {input}) => {
        return academica.create(input);
    },

    createCertificado: async (root, {nombre, ruta, usuarioId}) => {
        return certificado.create({nombre, ruta, usuarioId});
    },

    createExperiencia: async (root, {cargo, empresa, fecha_desde, fecha_hasta, descripcion, trabajo_actual, usuarioId}) => {
        //var fd = new Date(fecha_desde);
        console.log("Cargo", cargo);
        console.log("Fecha Desde", fecha_desde);
        console.log("Fecha Hasta", fecha_hasta);
        console.log("Desc", descripcion);
        //console.log("FD", fd);
        //var fh = new Date(fecha_hasta);
        return experiencia.create({cargo,empresa,fecha_desde, fecha_hasta, descripcion, trabajo_actual, usuarioId});
    },

    createCv: async (root, {nombre, ruta, usuarioId}) => {
        return cv.create({nombre, ruta, usuarioId});
    }
}

const Usuario = {
    academicas: (user) => academica.findAll({where: {usuarioId: user.id}}),
    certificados: (user) => certificado.findAll({where: {usuarioId: user.id}}),
    experiencias: (user) => experiencia.findAll({where: {usuarioId: user.id}}),
    cvs: (user) => cv.findAll({where: {usuarioId: user.id}})
}

db.sequelize.sync({alter: true});
/* db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
}); */

module.exports = {Query, Mutation, Usuario}