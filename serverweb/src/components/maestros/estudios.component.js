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
import InputAdornment from '@mui/material/InputAdornment';
import { DataGrid, esES } from '@mui/x-data-grid';

/** GRAPHQL */
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from 'graphql-tag';

const READ_ESTUDIOS = gql`
    query getEstudios {
        getEstudios {
            id,
            nombre
        }
    }
`;

const CREATE_ESTUDIO = gql`
    mutation createEstudio($nombre: String!) {
        createEstudio(nombre: $nombre) {
            id,
            nombre
        }
    }
`;


const Estudios = () => {
    const theme = createTheme();
    const [estudios, setEstudios] = useState([]);
    const [estudio, setEstudio] = useState('');
    const { loading: estudioLoading, error: estudioError, data: estudioData } = useQuery(READ_ESTUDIOS);
    const [crearEstudio, { loading, error, data }] = useMutation(CREATE_ESTUDIO, {
        refetchQueries: ['getEstudios']
    });

    if (estudioLoading || loading) return <p>Loading ...</p>;
    if (estudioError || error) console.error({
        "Error get": estudioError,
        "Error insert": error
    });

    const onChangeEstudio = (valor, nombre) => {
        setEstudio({ ...estudio, [nombre]: valor });
    }

    const ingresar = () => {
        if (!estudio) {
            alert("Falta completar campo");
            return;
        }
        console.log("Estudio", estudio);
        crearEstudio({
            variables: {
                nombre: estudio.nombre
            }
        });
    }

    const columns = [{
        field: 'nombre', headerName: "Nombre", flex: 1
    },{
        field: 'id', headerName: "ID", flex: 1
    }];

    return (
        <Container component="main" maxWidth="md">
            <Box
                sx={{
                    marginTop: 3,
                    display: 'flex',
                    alignItems: 'center'
                }}
            >
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            required
                            name="nombre"
                            id="nombre"
                            label="Nombre Estudio"
                            onChange={(e) => onChangeEstudio(e.target.value, 'nombre')}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Button
                            variant="contained"
                            sx={{ mt: 1 }}
                            onClick={ingresar}
                        >
                            Ingresar
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <p>Tabla de Estudios.</p>
                        <div style={{ height: 450, width: '100%' }}>
                            <DataGrid
                                sx={{
                                    boxShadow: 2,
                                    border: 2,
                                    borderColor: 'primary.light',
                                    '& .MuiDataGrid-cell:hover': {
                                        color: 'primary.main',
                                    },
                                }}
                                rows={estudioData ? estudioData.getEstudios : []}
                                columns={columns}
                                localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                            />
                        </div>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}

export default Estudios;