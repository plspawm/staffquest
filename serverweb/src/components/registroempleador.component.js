import React, { useState, useContext, useEffect } from "react";

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
import { SnackbarProvider, useSnackbar } from 'notistack';

/** GRAPHQL */
import { useQuery, gql, useMutation } from "@apollo/client";

/** Firebase */
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import firebaseApp from "../firebase/credentials";

const CREATE_EMPLEADOR = gql`
    mutation createEmpleador($nombres: String, $apellido: String, $email: String!, $uid: String, $tel_contacto: String, 
    $rut_empresa: String, $nombre_empresa: String) {
        createEmpleador(nombres: $nombres, apellido: $apellido, email: $email, uid: $uid, tel_contacto: $tel_contacto,
        rut_empresa: $rut_empresa, nombre_empresa: $nombre_empresa) {
            nombres,
            uid,
            nombre_empresa,
            email
        }
    }
`;

const RegistroEmpleador = () => {
    const [usuario, setUsuario] = useState('');
    const auth = getAuth(firebaseApp);
    const [formErrors, setFormErrors] = useState({});
    const [crearEmpleador, { loaging, error, data }] = useMutation(CREATE_EMPLEADOR);
    const theme = createTheme();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    if (error) {
        console.error(error.message);
    }

    const handleChangeUsuario = (valor, nombre) => {
        setUsuario({ ...usuario, [nombre]: valor })
    }

    const ingresarEmpleador = (e) => {
        e.preventDefault();
        if (!validateForm(usuario)) {
            return;
        }

        createUserWithEmailAndPassword(auth, usuario.email, usuario.password)
            .then(user => {
                crearEmpleador({
                    variables: {
                        nombres: usuario.nombres,
                        apellido: usuario.apellido,
                        email: usuario.email,
                        uid: user.user.uid,
                        tel_contacto: usuario.tel_contacto,
                        rut_empresa: usuario.rut_empresa,
                        nombre_empresa: usuario.nombre_empresa
                    }
                });
                enqueueSnackbar('Usuario registrado con exito!', {variant: 'success'});
            })
            .catch(err => {
                console.error(err);
                enqueueSnackbar(err.message, {variant: 'error'});
            });
    }

    const validateForm = () => {
        let errors = {};

        if (usuario.password !== usuario.password_confirm) {
            errors.password = "El password debe ser el mismo!";
        }

        setFormErrors(errors);
        if (Object.keys(errors).length === 0) {
            return true;
        } else {
            return false;
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Registro
                    </Typography>
                    <Box component="form" noValidate onSubmit={ingresarEmpleador} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="nombres"
                                    required
                                    fullWidth
                                    id="nombres"
                                    label="Nombres"
                                    autoFocus
                                    onChange={(e) => handleChangeUsuario(e.target.value, "nombres")}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="apellido"
                                    label="Apellido"
                                    name="apellido"
                                    autoComplete="family-name"
                                    onChange={(e) => handleChangeUsuario(e.target.value, "apellido")}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="rut_empresa"
                                    required
                                    fullWidth
                                    id="rut_empresa"
                                    label="Rut Empresa"
                                    autoFocus
                                    onChange={(e) => handleChangeUsuario(e.target.value, "rut_empresa")}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="nombre_empresa"
                                    required
                                    fullWidth
                                    id="nombre_empresa"
                                    label="Nombre Empresa"
                                    autoFocus
                                    onChange={(e) => handleChangeUsuario(e.target.value, "nombre_empresa")}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="tel_contacto"
                                    required
                                    fullWidth
                                    id="tel_contacto"
                                    label="Telefono de Contacto"
                                    autoFocus
                                    onChange={(e) => handleChangeUsuario(e.target.value, "tel_contacto")}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Correo"
                                    name="email"
                                    autoComplete="email"
                                    onChange={(e) => handleChangeUsuario(e.target.value, "email")}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    onChange={(e) => handleChangeUsuario(e.target.value, "password")}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password_2"
                                    label="Confirmar Password"
                                    type="password"
                                    id="password_2"
                                    autoComplete="confirm-password"
                                    onChange={(e) => handleChangeUsuario(e.target.value, "password_confirm")}
                                />
                                {formErrors.password && (
                                    <Alert severity="error">{formErrors.password}</Alert>
                                )}
                            </Grid>
                            {/* <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                            </Grid> */}
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            REGISTRAR
                        </Button>
                        {error && <p>{error.message}</p>}
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    Ya tienes una cuenta, ingresa aqui.
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                {/* <Copyright sx={{ mt: 5 }} /> */}
            </Container>
        </ThemeProvider>
    )
}

//export default RegistroEmpleador;
export default function IntegrationNotistack() {
    return (
        <SnackbarProvider maxSnack={3}>
            <RegistroEmpleador />
        </SnackbarProvider>
    );
}