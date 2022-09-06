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
import CircularProgress from "@mui/material/CircularProgress";
import SaveIcon from '@mui/icons-material/Save';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

/** GRAPHQL */
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from 'graphql-tag';

/** Firebase */
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import firebaseApp from "../../firebase/credentials";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const CREATE_CV = gql`
    mutation CreateCv($nombre: String, $ruta: String, $usuarioId: Int) {
        createCv(nombre: $nombre, ruta: $ruta, usuarioId: $usuarioId) {
            nombre
            ruta
            id
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
            uid
            certificados {
                id,
                nombre,
                ruta
            }
            cvs {
                id
                nombre
                ruta
            }
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
                    {`${props.value}%`}
                </Typography>
            </Box>
        </Box>
    );
}

const CV = () => {
    const auth = getAuth(firebaseApp);
    const storage = getStorage(firebaseApp);
    const [user, loading, error] = useAuthState(auth);
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState("");
    const [uid, setUid] = useState('');
    const [percent, setPercent] = useState(0);
    const { loading: usuarioLoading, error: usuarioError, data = { getUsuario: [] } } = useQuery(READ_USUARIO, { variables: { uid: uid } });
    const [crearCV, { loading: cvLoading, error: cvError, data: cvData }] = useMutation(CREATE_CV,{
        refetchQueries: ['getUsuario']
    });

    useEffect(() => {
        if (!user) return;
        setUid(user.uid);
    }, [user, loading]);

    if (usuarioLoading || cvLoading) return <p>Cargando ...</p>;
    if (usuarioError || cvError) return console.log({
        "usuario": usuarioError,
        "cert": cvError
    });

    // progress
    

    const closeModal = () => setOpen(false);

    // Handle file upload event and update state
    function handleChange(event) {
        setFile(event.target.files[0]);
    }

    const handleUpload = () => {
        if (!file) {
            alert("Please upload an image first!");
        }

        const storageRef = ref(storage, `/files/${file.name}`);

        // progress can be paused and resumed. It also exposes progress updates.
        // Receives the storage reference and the file to upload.
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );

                // update progress
                setPercent(percent);
            },
            (err) => console.log(err),
            () => {
                // download url
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    console.log(url);
                    //Creamos el CV
                    crearCV({variables: {
                        nombre: "CV",
                        ruta: url,
                        usuarioId: parseInt(data.getUsuario[0].id)
                    }})
                });
            }
        );
    };

    const columns = [{
        field: 'id', headerName: 'ID'
    }, {
        field: 'nombre', headerName: 'Nombre'
    },{
        field: "ruta", headerName: "Descarga", flex: 1, renderCell: (cellValues) => {
            return (
                <a href={cellValues.row.ruta} target="_blank"><Button variant="contained" ><PictureAsPdfIcon /></Button></a>
            );
        }
    }];

    return (
        <Container>
            <Grid container spacing={2} sx={{ marginTop: 10, alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
                <Grid item xs sm={4}>
                    <Button variant="contained" component="label">
                        <input hidden multiple type="file" onChange={handleChange} />
                        <CloudUploadIcon />
                    </Button>
                    {' '}
                    <Button variant="outlined" onClick={handleUpload}>
                        <SaveIcon />
                    </Button>
                </Grid>
                {percent > 0 ? (
                    <Grid item xs sm={4}>
                        <CircularProgressWithLabel value={percent} />
                    </Grid>
                ) : ""}
                <Grid item xs={12} sm={12} sx={{ alignItems: 'center', display: 'flex' }}>
                    <div style={{ height: 300, width: '100%' }}>
                        <DataGrid columns={columns} rows={data.getUsuario[0] ? data.getUsuario[0].cvs : []} />
                    </div>
                </Grid>
            </Grid>
            <Modal
                open={open}
                onClose={closeModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <AppBar>
                        <Typography id="modal-modal-title" variant="h6" component="h2" align="center" style={{ marginBottom: 10 }}>
                            Añadir CV
                        </Typography>
                    </AppBar>
                    {/* <FormGroup>
                        <FormControlLabel control={<Checkbox onChange={(e)=>onChangeCarta(e)} />} label="Carta de aviso?" />
                    </FormGroup> */}
                    <Grid container spacing={2} mt={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="nombre"
                                label="Nombre"
                            />
                            <input type="file" onChange={handleChange} />
                            <p>{percent} "% done"</p>
                        </Grid>
                    </Grid>
                    <Divider variant='middle' sx={{ marginTop: 3 }}></Divider>
                    <Box sx={{ alignItems: 'end', marginTop: 3, display: 'flex', justifyContent: 'right' }}>
                        <Button variant="contained" onClick={handleUpload}>Subir CV</Button>
                    </Box>
                </Box>
            </Modal>
        </Container>
    )
}

export default CV;