import React, { useEffect, useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import firebaseApp from "./firebase/credentials";
import { Routes, Route, Link } from "react-router-dom";

/** Importe de paginas */
import RegistroUsuario from './components/registrousario.component';

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
    </Routes>
  );
}

export default App;
