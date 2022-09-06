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
import DownloadIcon from '@mui/icons-material/Download';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

/** GRAPHQL */
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from 'graphql-tag';

/** Firebase */
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import firebaseApp from "../../firebase/credentials";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const GET_USUARIOS = gql`
    query GetUsuarios {
        getUsuarios {
            id
            nombres
            apellidos
            email
            cvs {
                ruta
            }
        }
}
`;

const UsuariosAdmin = () => {
    const {loading, error, data} = useQuery(GET_USUARIOS);

    if(loading) return <p>Cargando...</p>;
    if(error) console.error(error);

    if(data) console.log(data);

    const columns = [{
        field: 'id', headerName: 'ID', width: '50'
    },{
        field: 'nombres', headerName: 'Nombres', width: '70'
    },{
        field: 'apellidos', headerName: 'Apellidos', width: '100'
    },{
        field: 'email', headerName: 'Correo', width: '150'
    },{
        field: 'cvs', headerName: 'CVS', width: '100', renderCell: (cellValues) => {
            return (
                <a href={cellValues.row.cvs[0].ruta} target="_blank"><Button variant="outlined" ><DownloadIcon /></Button></a>
            );
        }
    },{
        headerName: 'PDF', width: '100', renderCell: (cellValues) => {
            return (
                <a href="#"><Button variant="outlined" ><PictureAsPdfIcon /></Button></a>
            );
        }
    }]

    return (
        <Container>
            <Box sx={{ alignItems: 'center', justifyContent: 'center', display: 'flex', margin: 3 }}>
                <Typography variant="h6">
                    Usuarios registrados en la plataforma
                </Typography>
            </Box>
            <Box sx={{ marginTop: 3 }}>
                <div style={{ height: 300, width: '100%' }}>
                    <DataGrid
                        columns={columns}
                        rows={data.getUsuarios ? data.getUsuarios : []}
                    />
                </div>
            </Box>
        </Container>
    )
}

export default UsuariosAdmin;