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

/** GRAPHQL */
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from 'graphql-tag';

/** Firebase */
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import firebaseApp from "../../firebase/credentials";

const CREAR_ACADEMICA = gql`
    mutation createAcademica($input: AcademicaInput) {
        createAcademica(input: $input) {
            id,
            titulo
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

const theme = createTheme({
    //MUI v5
    "& .MuiDataGrid-columnHeaders": {
        backgroundColor: "rgba(0,0,255,0.6)",
        color: "rgba(255,0,0,0.7)",
        fontSize: 16
    }
});

const FormacionAcademica = () => {
    const auth = getAuth(firebaseApp);
    const [user, loading, error] = useAuthState(auth);
    const [open, setOpen] = useState(false);
    const [crearAcademica, { loading: academicaLoading, error: errorAcademica, data: dataAcademica }] = useMutation(CREAR_ACADEMICA);
    const [academica, setAcademica] = useState('');

    useEffect(() => {
        let id_user = sessionStorage.getItem('ID USER');
        if (!user) return <p>Error</p>;
        setAcademica({ ...academica, ['usuarioId']: parseInt(id_user) });
    }, [user, loading]);

    if (errorAcademica) return console.error(errorAcademica);
    if (academicaLoading) return <p>Cargando ...</p>

    const closeModal = () => setOpen(false);

    const handleAcademica = (valor, nombre) => {
        console.log("VALOR", valor);
        setAcademica({ ...academica, [nombre]: valor });
    }

    const ingresarAcademica = () => {
        console.log("Academica", academica);
        crearAcademica({
            variables: {
                input: academica
            }
        })
            .then(resp => {
                console.log(resp.data);
            })
            .catch(err => {
                console.error(err);
            });
    }

    /* useEffect(()=>{
        let authToken = sessionStorage.getItem('Auth Token');
        console.log(authToken);
    }, []); */

    const columns = [{
        field: 'titulo', headerName: 'Titulo', flex: 1
    }, {
        field: 'institucion', headerName: 'Institución', flex: 1
    }, {
        field: 'periodo', headerName: 'Periodo', flex: 1
    }]

    return (
        <ThemeProvider theme={theme}>
            <Container>
                <Box sx={{ alignItems: 'center', p: 2, width: '100%', justifyContent: 'center', display: 'flex' }}>
                    <Stack spacing={2} direction='row' sx={{ alignContent: 'center' }}>
                        <Typography variant="h5" alignItems='center'>Añadir titulo</Typography>
                        <Button variant="contained" onClick={() => setOpen(true)}>Añadir</Button>
                    </Stack>
                </Box>
                <div style={{ height: 300, width: '100%' }}>
                    <DataGrid
                        rows={[]}
                        columns={columns}
                        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                    />
                </div>
                {/** Modal para agregar titulo */}
                <Modal
                    open={open}
                    onClose={closeModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <AppBar>
                            <Typography id="modal-modal-title" variant="h6" component="h2" align="center" style={{ marginBottom: 10 }}>
                                Añadir Titulo
                            </Typography>
                        </AppBar>
                        {/* <FormGroup>
                        <FormControlLabel control={<Checkbox onChange={(e)=>onChangeCarta(e)} />} label="Carta de aviso?" />
                    </FormGroup> */}
                        <Grid container spacing={2} mt={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="titulo"
                                    label="Titulo"
                                    onChange={(e) => handleAcademica(e.target.value, "titulo")}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="institucion"
                                    label="Institución"
                                    onChange={(e) => handleAcademica(e.target.value, "institucion")}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={esLocale}>
                                    <DatePicker
                                        label="Desde"
                                        onChange={(newValue) => handleAcademica(newValue.toString(), "fecha_desde")}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={esLocale}>
                                    <DatePicker
                                        label="Hasta"
                                        onChange={(newValue) => handleAcademica(newValue.toString(), "fecha_hasta")}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="nivel">Estado</InputLabel>
                                    <Select
                                        labelId="estado"
                                        id="estado"
                                        label="Estado"
                                        onChange={(e) => handleAcademica(e.target.value, "estado")}
                                    >
                                        <MenuItem key="Titulado" value="Titulado">Titulado</MenuItem>
                                        <MenuItem key="Egresado" value="Egresado">Egresado</MenuItem>
                                        <MenuItem key="No terminado" value="No terminado">No Terminado</MenuItem>
                                        <MenuItem key="En curso" value="En curso">En curso</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Divider variant='middle' sx={{ marginTop: 3 }}></Divider>
                        <Box sx={{ alignItems: 'end', marginTop: 3, display: 'flex', justifyContent: 'right' }}>
                            <Button variant="contained" onClick={ingresarAcademica}>ADD</Button>
                        </Box>
                    </Box>
                </Modal>
            </Container>
        </ThemeProvider>
    )
}

export default FormacionAcademica;