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

const PublicarOferta = () => {

    return (
        <Container>
            <Box sx={{
                justifyItems: 'center',
                display: 'flex',
                alignItems: 'center',
                boxShadow: 1,
                margin: 3,
            }}>
                <Grid container spacing={2} sx={{margin: 2}}>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Titulo" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Vacantes" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Nombre Empresa" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Telefono" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Email" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Inicio Contratación" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Duración Trabajo" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label="Salario" />
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ justifyItems: 'center', display: 'center', alignItems: 'center', boxShadow: 1, margin: 3 }}>
                <TextField label="Descripción" multiline rows={5} fullWidth />
            </Box>
            <Divider variant='middle' sx={{ marginTop: 3 }}></Divider>
            <Box sx={{ alignItems: 'end', marginTop: 3, display: 'flex', justifyContent: 'right' }}>
                <Button variant="contained">Agregar Oferta</Button>
            </Box>
        </Container>
    )
}

export default PublicarOferta;