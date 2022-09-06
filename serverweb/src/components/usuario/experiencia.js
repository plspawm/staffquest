import React, { useState, useContext, useEffect, useInsertionEffect } from "react";
import externos from "../../services/externos";
import { useAuthState } from "react-firebase-hooks/auth";
import moment from 'moment';

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
            uid
            experiencias {
                id
                cargo
                empresa
                fecha_desde
                fecha_hasta
            }
        }
    }
`;

const CREATE_EXPERIENCIA = gql`
    mutation CreateExperiencia($cargo: String, $empresa: String, $fechaDesde: String, $fechaHasta: String, $descripcion: String, $trabajoActual: String, $usuarioId: Int) {
        createExperiencia(cargo: $cargo, empresa: $empresa, fecha_desde: $fechaDesde, fecha_hasta: $fechaHasta, descripcion: $descripcion, trabajo_actual: $trabajoActual, usuarioId: $usuarioId) {
            cargo
            empresa
        }
}
`;

/** Estilos CSS MUI */
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Experiencia = () => {
    const auth = getAuth(firebaseApp);
    const [user, loading, error] = useAuthState(auth);
    const [uid, setUid] = useState('');
    const { loading: usuarioLoading, error: usuarioError, data = { getUsuario: [] } } = useQuery(READ_USUARIO, { variables: { uid: uid } });
    const [open, setOpen] = useState(false);
    const [experiencia, setExperiencia] = useState('');
    const [crearExperiencia, { loading: expLoading, error: expError, data: expData }] = useMutation(CREATE_EXPERIENCIA, {
        refetchQueries: ['getUsuario']
    });

    useEffect(() => {
        if (!user) return;
        setUid(user.uid);
    }, []);

    if (usuarioError || expError) console.log({
        "Usuario Error": usuarioError,
        "Exp Error": expError
    });

    if (usuarioLoading || expLoading) return <p>Cargando...</p>;

    if (data) {
        console.log("User", data);
    }

    const closeModal = () => setOpen(false);

    const handleExperiencia = (valor, nombre) => {
        setExperiencia({ ...experiencia, [nombre]: valor });
    }

    const ingresarExperiencia = () => {
        console.log("Exp", experiencia);
        crearExperiencia({
            variables: {
                cargo: experiencia.cargo,
                empresa: experiencia.empresa,
                fechaDesde: experiencia.fecha_desde,
                fechaHasta: experiencia.fecha_hasta,
                descripcion: experiencia.descripcion,
                usuarioId: parseInt(data.getUsuario[0].id)
            }
        })
    }

    const columns = [{
        field: 'cargo', headerName: 'Cargo', width: '200'
    }, {
        field: 'empresa', headerName: 'Empresa', width: '200'
    }, {
        field: 'fecha_desde', headerName: 'Desde', width: '150'
    }, {
        field: 'fecha_hasta', headerName: 'Hasta', width: '150'
    },{
        field: 'id', headerName: 'ID', hide: true
    }];


    return (
        <Container>
            <Box sx={{ justifyContent: 'center', display: 'flex', alignItems: 'center', marginTop: 3 }}>
                <Stack spacing={2} direction='row'>
                    <Typography variant="h6" sx={{ alignItems: 'center', display: 'flex' }}>
                        Agregue su experiencia laboral
                    </Typography>
                    <Button variant="contained" onClick={() => setOpen(true)}>Agregar Experiencia</Button>
                </Stack>
            </Box>
            <Box sx={{ margin: 3 }}>
                <div style={{ height: 600, width: '100%' }}>
                    <DataGrid 
                        columns={columns} 
                        rows={data.getUsuario ? data.getUsuario[0].experiencias : []} 
                    />
                </div>
            </Box>
            <Modal
                open={open}
                onClose={closeModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <AppBar>
                        <Typography id="modal-modal-title" variant="h6" component="h2" align="center" style={{ marginBottom: 10 }}>
                            Añadir Experincia
                        </Typography>
                    </AppBar>
                    {/* <FormGroup>
                        <FormControlLabel control={<Checkbox onChange={(e)=>onChangeCarta(e)} />} label="Carta de aviso?" />
                    </FormGroup> */}
                    <Grid container spacing={2} mt={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="cargo"
                                label="Cargo"
                                variant="standard"
                                required
                                onChange={(e) => handleExperiencia(e.target.value, "cargo")}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="empresa"
                                label="Empresa"
                                variant="standard"
                                required
                                onChange={(e) => handleExperiencia(e.target.value, "empresa")}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={esLocale}>
                                <DatePicker
                                    label="Desde"
                                    value={experiencia.fecha_desde ? experiencia.fecha_desde : ""}
                                    onChange={(newValue) => handleExperiencia(newValue.toISOString(), "fecha_desde")}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={esLocale}>
                                <DatePicker
                                    label="Hasta"
                                    value={experiencia.fecha_hasta ? experiencia.fecha_hasta : ""}
                                    onChange={(newValue) => handleExperiencia(newValue.toISOString(), "fecha_hasta")}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="descripcion"
                                label="Descripcion"
                                variant="standard"
                                multiline
                                rows={4}
                                onChange={(e) => handleExperiencia(e.target.value, "descripcion")}
                            />
                        </Grid>
                    </Grid>
                    <Divider variant='middle' sx={{ marginTop: 3 }}></Divider>
                    <Box sx={{ alignItems: 'end', marginTop: 3, display: 'flex', justifyContent: 'right' }}>
                        <Button variant="contained" onClick={ingresarExperiencia}>Agregar Experiencia</Button>
                    </Box>
                </Box>
            </Modal>
        </Container>
    )
}

export default Experiencia;