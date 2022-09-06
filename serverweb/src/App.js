import React, { useEffect, useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import firebaseApp from "./firebase/credentials";
import { Routes, Route, Link } from "react-router-dom";

/** Importe de paginas */
import RegistroUsuario from './components/registrousario.component';
import Login from './components/login.component';
import Principal from './components/principal.component';
import RegistroEmpleador from './components/registroempleador.component';
import Test from './components/test';
import Usuario from './components/usuario.component';
import UsuarioRouter from './components/usuarioRouter.component';
import InfoPersonal from './components/usuario/infopersona';
import Estudios from './components/maestros/estudios.component';
import NivelProfesional from './components/maestros/nivelprofesional.component';
import FormacionAcademica from './components/usuario/formacionacademica';
import LoginUsuario from './components/loginusuario.component';
import CV from './components/usuario/cv';
import Certificados from './components/usuario/certificados';
import Experiencia from './components/usuario/experiencia';
import Empleador from './components/empleador.component';
import PublicarOferta from './components/empleador/publicaroferta';
import Admin from './components/admin.component';
import UsuariosAdmin from './components/admin/usuarios';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth(firebaseApp);

  const crearUsuario = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(resp => {
        console.log(resp);
      })
      .catch(err=>{
        console.error(err);
      });
  }

  return (
    <Routes>
        <Route path="/" element={<RegistroUsuario />} />
        <Route path="/login" element={<Login />} />
        <Route path="/loginusuario" element={<LoginUsuario />} />
        <Route path="/inicio" element={<Principal />} />
        <Route path="/registroempleador" element={<RegistroEmpleador />} />
        <Route path="/test" element={<Test />} />
        <Route path="usuario" element={<Usuario />}>
          <Route path="home" element={<InfoPersonal />} />
          <Route path="formacion" element={<FormacionAcademica />} />
          <Route path="cv" element={<CV />} />
          <Route path="certificado" element={<Certificados />} />
          <Route path="experiencia" element={<Experiencia />} />
        </Route>
        <Route path="estudios" element={<Estudios />}></Route>
        <Route path="nivel" element={<NivelProfesional />}></Route>
        <Route path="empleador" element={<Empleador />}>
          <Route path="oferta" element={<PublicarOferta />} />
        </Route>
        <Route path="admin" element={<Admin />}>
        <Route path="usuarios" element={<UsuariosAdmin />} />
        </Route>
    </Routes>
  );
}

export default App;
