import React, { useState, useContext, useEffect, useInsertionEffect } from "react";
import externos from "../../services/externos";
import { useAuthState } from "react-firebase-hooks/auth";

/** MUI Design */
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import esLocale from 'date-fns/locale/es';
import Alert from '@mui/material/Alert';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import SvgIcon from "@mui/material/SvgIcon";
import { DataGrid, esES } from '@mui/x-data-grid';
import { display, Stack } from "@mui/system";
import Modal from '@mui/material/Modal';
import Divider from '@mui/material/Divider';
import { AppBar } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CircularProgress from '@mui/material/CircularProgress';

/** GRAPHQL */
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from 'graphql-tag';

/** Firebase */
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import firebaseApp from "../../firebase/credentials";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const READ_USUARIO = gql`
    query getUsuario($uid: String!) {
        getUsuario(uid: $uid) {
            id
            nombres
            apellidos
            email
            rut
            sexo
            pais
            fecha_nacimiento
            uid
            direccion
            region
            nacionalidad
            disponiblidad
            telefono
            especialidad
            nivel_estudio
            nivel_profesional
            anios_experiencia
            discapacidad
            descripcion,
            certificados {
                id,
                nombre,
                ruta
            }
        }
    }
`;

/* const READ_CERTIFICADOS = gql`
    query getCertificados {
        getCertificados {
            id,
            nombre,
            ruta
        }
    }
`; */

const CREATE_CERTIFICADO = gql`
    mutation createCertificado($nombre: String, $ruta: String, $usuarioId: Int) {
        createCertificado(nombre: $nombre, ruta: $ruta, usuarioId: $usuarioId) {
            id,
            nombre,
            ruta
        }
    }
`;

function CircularProgressWithLabel(props) {
    return (
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress variant="determinate" {...props} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="caption" component="div" color="text.secondary">
            {`${(props.value)}%`}
          </Typography>
        </Box>
      </Box>
    );
  }

const Certificados = () => {
    const auth = getAuth(firebaseApp);
    const storage = getStorage(firebaseApp);
    const [user, loading, error] = useAuthState(auth);
    const [uid, setUid] = useState('');
    const [file, setFile] = useState('');
    const [nombre, setNombre] = useState('');
    const [percent, setPercent] = useState(0);
    const { loading: usuarioLoading, error: usuarioError, data = { getUsuario: [] } } = useQuery(READ_USUARIO, { variables: { uid: uid } });
    const [crearCertificado, { loading: certLoading, error: certError, data: certData }] = useMutation(CREATE_CERTIFICADO,{
        refetchQueries: ['getUsuario']
    });

    useEffect(() => {
        if (!user) return;
        setUid(user.uid);
    }, [user, loading]);

    if (usuarioLoading || certLoading) return <p>Cargando ...</p>;
    if (usuarioError || certError) return console.log({
        "usuario": usuarioError,
        "cert": certError
    });

    if (data) {
        console.log("Data", data.getUsuario[0]);
    }

    const columns = [{
        field: 'id', headerName: 'ID'
    }, {
        field: 'nombre', headerName: 'Nombre', flex: 1
    }, {
        field: 'ruta', headerName: 'Ruta', flex: 1
    }];

    function handleFile(event) {
        setFile(event.target.files[0]);
    }

    const handleUpload = () => {
        if (!file) {
            alert("Please upload an image first!");
        }
        const storageRef = ref(storage, `/files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setPercent(percent);
            },
            (err) => console.log(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    console.log(url);
                    crearCertificado({
                        variables: {
                            nombre: nombre,
                            ruta: url,
                            usuarioId: parseInt(data.getUsuario[0].id)
                        }
                    })
                });
            }
        );
    };

    return (
        <Container>
            <Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }} mt={4}>
                <Stack direction='row' spacing={2} sx={{ alignItems: 'center', display: 'flex' }}>
                    <TextField
                        id="nombre_certificado"
                        label="Nombre certificado"
                        variant="standard"
                        onChange={(e)=>setNombre(e.target.value)}
                    />
                    <Button variant="contained" component="label" endIcon={<CloudUploadIcon />}>
                        Subir Certificado
                        <input hidden type="file" onChange={handleFile} />
                    </Button>
                    <Button variant="contained" onClick={handleUpload}>Guardar</Button>
                </Stack>
                <CircularProgressWithLabel value={percent} />
            </Box>
            <div style={{ height: 300, width: '100%', marginTop: 4 }}>
                <DataGrid
                    columns={columns}
                    rows={data.getUsuario[0] ? data.getUsuario[0].certificados : []}
                />
            </div>
        </Container>
    )
}

export default Certificados;