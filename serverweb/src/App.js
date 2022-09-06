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
        <Route path="/inicio" element={<Principal />} />
        <Route path="/registroempleador" element={<RegistroEmpleador />} />
        <Route path="/test" element={<Test />} />
        <Route path="usuario" element={<Usuario />}>
          <Route path="home" element={<UsuarioRouter />} />
        </Route>
    </Routes>
  );
}

export default App;
