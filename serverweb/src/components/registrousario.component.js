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

/** GRAPHQL */
import { useQuery, gql, useMutation } from "@apollo/client";

const CREATE_USER = gql`
    mutation createUsuario($nombres: String, $apellidos: String, $email: String!) {
        createUsuario(nombres: $nombres, apellidos: $apellidos, email: $email) {
            nombres
        }
    }
`;

const RegistroUsuario = () => {
    const theme = createTheme();
    const [value, setValue] = useState(null);
    const [crearUsuario, {loaging, error, data}] = useMutation(CREATE_USER);
    const [usuario, setUsuario] = useState('');
    const [formErrors, setFormErrors] = useState({});

    if(data) {
        console.log("Usuario creado", data);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!validateForm(usuario)) {
            return;
        }
        crearUsuario({variables: {
            nombres: usuario.nombres,
            apellidos: usuario.apellidos,
            email: usuario.email
        }});
    }

    const handleChangeUsuario = (valor, nombre) => {
        setUsuario({...usuario,[nombre]: valor})
    }

    const validateForm = () => {
        let errors = {};

        if(usuario.password !== usuario.password_confirm) {
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
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
                                    onChange={(e)=>handleChangeUsuario(e.target.value,"nombres")}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="apellidos"
                                    label="Apellidos"
                                    name="apellidos"
                                    autoComplete="family-name"
                                    onChange={(e)=>handleChangeUsuario(e.target.value,"apellidos")}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="rut"
                                    required
                                    fullWidth
                                    id="rut"
                                    label="Rut"
                                    autoFocus
                                    onChange={(e)=>handleChangeUsuario(e.target.value,"rut")}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="sexo"
                                    required
                                    fullWidth
                                    id="sexo"
                                    label="Sexo"
                                    autoFocus
                                    onChange={(e)=>handleChangeUsuario(e.target.value,"sexo")}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="pais"
                                    required
                                    fullWidth
                                    id="pais"
                                    label="País"
                                    autoFocus
                                    onChange={(e)=>handleChangeUsuario(e.target.value,"pais")}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                {/* <TextField
                                    name="fecha_nacimiento"
                                    required
                                    fullWidth
                                    id="fecha_nacimiento"
                                    label="Fecha Nacimiento"
                                    autoFocus
                                /> */}
                                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={esLocale}>
                                    <DatePicker
                                        label="Fecha Nacimiento"
                                        value={value}
                                        onChange={(e)=>handleChangeUsuario(e.target.value,"fecha_nacimiento")}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Correo"
                                    name="email"
                                    autoComplete="email"
                                    onChange={(e)=>handleChangeUsuario(e.target.value,"email")}
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
                                    onChange={(e)=>handleChangeUsuario(e.target.value,"password")}
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
                                    onChange={(e)=>handleChangeUsuario(e.target.value,"password_confirm")}
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
                                <Link href="#" variant="body2">
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

export default RegistroUsuario;