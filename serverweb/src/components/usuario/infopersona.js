import React, { useState, useContext, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import externos from "../../services/externos";

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
import Divider from '@mui/material/Divider';

/** Material UI Icons */
import FlagIcon from '@mui/icons-material/Flag';
import SchoolIcon from '@mui/icons-material/School';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import TransgenderIcon from '@mui/icons-material/Transgender';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';

/** GRAPHQL */
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from 'graphql-tag';

/** Firebase */
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import firebaseApp from "../../firebase/credentials";
import { gl } from "date-fns/locale";
import { InfoRounded } from "@mui/icons-material";

const READ_NIVEL = gql`
    query getNivelProfesionales {
        getNivelProfesionales {
            id,
            nombre
        }
    }
`;

const READ_ESTUDIOS = gql`
    query getEstudios {
        getEstudios {
            id,
            nombre
        }
    }
`;

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
            descripcion
        }
    }
`;

const UPDATE_USUARIO = gql`
    mutation UpdateUsuario($updateUsuarioId: ID!, $input: UsuarioInput) {
        updateUsuario(id: $updateUsuarioId, input: $input) {
            id
            nombres
            apellidos
        }
    }
`;

const InfoPersonal = () => {
    const theme = createTheme();
    const auth = getAuth(firebaseApp);
    const [user, loading, error] = useAuthState(auth);
    const [uid, setUid] = useState('');
    const { loading: nivelLoading, error: nivelError, data: nivelData } = useQuery(READ_NIVEL);
    const { loading: estudioLoading, error: estudioError, data: estudioData } = useQuery(READ_ESTUDIOS);
    const { loading: usuarioLoading, error: usuarioError, data = { getUsuario: [] } } = useQuery(READ_USUARIO, { variables: { uid: uid } });
    const [actualizarUsuario, {loading: updateLoading, error: updateError, data: updateData}] = useMutation(UPDATE_USUARIO);
    const [regiones, setRegiones] = useState([]);
    const [info, setInfo] = useState('');

    useEffect(() => {
        if (loading) return;
        if (user) {
            setUid(user.uid);
        }
        externos.getRegiones()
            .then(resp => {
                setRegiones(resp);
            })
            .catch(err => {
                console.error(err);
            });
        setInfo(data.getUsuario[0]);
    }, [user, loading, data]);

    if (nivelLoading || estudioLoading || usuarioLoading || updateLoading) return (<p>Loaging...</p>);
    if (nivelError || estudioError || usuarioError || updateError) return console.error(updateError);

    if(updateData) {
        console.log("UP DATA", updateData);
    }

    const handleInfo = (valor, nombre) => {
        setInfo({ ...info, [nombre]: valor });
    }

    const actualizar = () => {
        console.log("Info", info);
        var arr = [];
        arr.push(info);
        console.log(arr);
        //Actualizamos
        actualizarUsuario({variables: {
            updateUsuarioId: info.id,
            input: {
                "nombres": info.nombres,
                "apellidos": info.apellidos,
                "email": info.email,
                "rut": info.rut,
                "sexo": info.sexo,
                "pais": info.pais,
                "fecha_nacimiento": info.fecha_nacimiento,
                "direccion": info.direccion,
                "region": info.region,
                "nacionalidad": info.nacionalidad,
                "disponiblidad": info.disponibilidad,
                "telefono": info.telefono,
                "especialidad": info.especilidad,
                "nivel_estudio": info.nivel_estudio,
                "nivel_profesional": info.nivel_profesional,
                "anios_experiencia": info.anios_experiencia,
                "discapacidad": info.discapacidad,
                "descripcion": info.descripcion
              }
        }});
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xl">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Información Personal
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    autoComplete="given-name"
                                    name="nombres"
                                    required
                                    fullWidth
                                    id="nombres"
                                    label="Nombres"
                                    value={info ? info.nombres : ""}
                                    onChange={(e) => handleInfo(e.target.value, 'nombres')}
                                //autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    required
                                    fullWidth
                                    id="apellidos"
                                    label="Apellidos"
                                    name="apellidos"
                                    value={info ? info.apellidos : ""}
                                    autoComplete="family-name"
                                    onChange={(e) => handleInfo(e.target.value, 'apellidos')}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    fullWidth
                                    id="direccion"
                                    label="Dirección"
                                    name="direccion"
                                    value={info ? info.direccion : ""}
                                    autoComplete="family-name"
                                    onChange={(e) => handleInfo(e.target.value, 'direccion')}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment>
                                                <HomeIcon />
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    fullWidth
                                    id="pais"
                                    label="País"
                                    name="pais"
                                    value={info ? info.pais : ""}
                                    autoComplete="family-name"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <FlagIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                    onChange={(e) => handleInfo(e.target.value, 'pais')}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormControl fullWidth>
                                    <InputLabel id="nivel">Región</InputLabel>
                                    <Select
                                        labelId="region"
                                        id="region"
                                        label="Región"
                                        value={info ? info.region : ""}
                                        onChange={(e) => handleInfo(e.target.value, 'region')}
                                    >
                                        {regiones.map(item => {
                                            return (
                                                <MenuItem key={item.codigo} value={item.nombre}>{item.nombre}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    fullWidth
                                    id="nacionalidad"
                                    label="Nacionalidad"
                                    name="nacionalidad"
                                    value={info ? info.nacionalidad : ""}
                                    autoComplete="family-name"
                                    onChange={(e) => handleInfo(e.target.value, 'nacionalidad')}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    fullWidth
                                    id="horario"
                                    label="Disponigilidad de Horario"
                                    name="horario"
                                    value={info ? info.disponibilidad : ""}
                                    autoComplete="family-name"
                                    onChange={(e) => handleInfo(e.target.value, 'disponibilidad')}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    fullWidth
                                    id="correo"
                                    label="Correo"
                                    name="correo"
                                    autoComplete="family-name"
                                    value={info ? info.email : ""}
                                    disabled
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <EmailIcon />
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    fullWidth
                                    id="telefono"
                                    label="Telefono"
                                    name="telefono"
                                    value={info ? info.telefono : ""}
                                    autoComplete="family-name"
                                    onChange={(e) => handleInfo(e.target.value, 'telefono')}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    fullWidth
                                    id="rut"
                                    label="Rut"
                                    name="rut"
                                    value={info ? info.rut : ""}
                                    autoComplete="family-name"
                                    onChange={(e) => handleInfo(e.target.value, 'rut')}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormControl fullWidth>
                                    <InputLabel id="nivel">Genero</InputLabel>
                                    <Select
                                        labelId="genero"
                                        id="genero"
                                        label="Genero"
                                        value={info ? info.sexo : ""}
                                        startAdornment={(
                                            <InputAdornment position="start">
                                                <TransgenderIcon />
                                            </InputAdornment>
                                        )}
                                        onChange={(e) => handleInfo(e.target.value, 'sexo')}
                                    >
                                        <MenuItem value="Masculino">Masculino</MenuItem>
                                        <MenuItem value="Femenino">Femenino</MenuItem>
                                        <MenuItem value="Otro">Otro</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    fullWidth
                                    id="especialidad"
                                    label="Especialidad"
                                    name="especialidad"
                                    value={info ? info.especialidad : ""}
                                    autoComplete="family-name"
                                    onChange={(e) => handleInfo(e.target.value, 'especialidad')}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    fullWidth
                                    id="fecha_nacimiento"
                                    label="Fecha de Nacimiento"
                                    name="fecha_nacimiento"
                                    value={info ? info.fecha_nacimiento : ""}
                                    autoComplete="family-name"
                                    onChange={(e) => handleInfo(e.target.value, 'fecha_nacimiento')}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                {/* <TextField
                                    fullWidth
                                    id="nivel_estudio"
                                    label="Nivel de Estudio"
                                    name="nivel_estudio"
                                    autoComplete="family-name"
                                /> */}
                                <FormControl fullWidth>
                                    <InputLabel id="nivel">Nivel Estudios</InputLabel>
                                    <Select
                                        labelId="nivel_esudios"
                                        id="nivel_estudios"
                                        label="Nivel Estudios"
                                        value={info ? info.nivel_estudio : ""}
                                        startAdornment={(
                                            <InputAdornment position="start">
                                                <SchoolIcon />
                                            </InputAdornment>
                                        )}
                                        onChange={(e) => handleInfo(e.target.value, 'nivel_estudio')}
                                    >
                                        <MenuItem value="">Seleccione Nivel ...</MenuItem>
                                        {estudioData.getEstudios.map(item => {
                                            return (
                                                <MenuItem key={item.id} value={item.nombre}>{item.nombre}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormControl fullWidth>
                                    <InputLabel id="nivel">Nivel Profesional</InputLabel>
                                    <Select
                                        labelId="nivel"
                                        id="nivel"
                                        label="Nivel Profesional"
                                        value={info ? info.nivel_profesional : ""}
                                        startAdornment={(
                                            <InputAdornment position="start">
                                                <HistoryEduIcon />
                                            </InputAdornment>
                                        )}
                                        onChange={(e) => handleInfo(e.target.value, 'nivel_profesional')}
                                    >
                                        <MenuItem value="">Seleccione Nivel ...</MenuItem>
                                        {nivelData.getNivelProfesionales.map(item => {
                                            return (
                                                <MenuItem key={item.id} value={item.nombre}>{item.nombre}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    fullWidth
                                    id="anio_experiencia"
                                    label="Años Experiencia Laboral"
                                    name="anios_experiencia"
                                    value={info ? info.anio_experiencia : ""}
                                    autoComplete="family-name"
                                    onChange={(e) => handleInfo(e.target.value, 'anios_experiencia')}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    fullWidth
                                    id="discapacidad"
                                    label="Discapacidad"
                                    name="discapacidad"
                                    value={info ? info.discapacidad : ""}
                                    autoComplete="family-name"
                                    onChange={(e) => handleInfo(e.target.value, 'discapacidad')}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    fullWidth
                                    id="descripcion"
                                    label="Descripción"
                                    name="descripcion"
                                    value={info ? info.descripcion : ""}
                                    autoComplete="family-name"
                                    onChange={(e) => handleInfo(e.target.value, 'descripcion')}
                                />
                            </Grid>
                        </Grid>
                        <Divider variant="middle" sx={{ marginTop: 3 }}></Divider>
                        <Box sx={{ justifyContent: 'left', display: 'flex' }} mt={3}>
                            <Button variant="contained" onClick={actualizar}>ACTUALIZAR</Button>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default InfoPersonal;