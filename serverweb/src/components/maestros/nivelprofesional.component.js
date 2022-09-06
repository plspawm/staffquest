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

const READ_NIVEL = gql`
    query getNivelProfesionales {
        getNivelProfesionales {
            id,
            nombre
        }
    }
`;

const CREATE_NIVEL = gql`
    mutation createNivelprofesional($input: NivelInput!) {
        createNivelprofesional(input: $input) {
            id,
            nombre
        }
    }
`;


const NivelProfesional = () => {
    const theme = createTheme();
    const [estudios, setEstudios] = useState([]);
    const [estudio, setEstudio] = useState('');
    const { loading: nivelLoading, error: nivelError, data: nivelData } = useQuery(READ_NIVEL);
    const [crearNivel, { loading, error, data }] = useMutation(CREATE_NIVEL, {
        refetchQueries: ['getNivelProfesionales']
    });

    if (nivelLoading || loading) return <p>Loading ...</p>;
    if (nivelError || error) console.error({
        "Error get": nivelError,
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
        crearNivel({variables: {input: estudio}});
    }

    const columns = [{
        field: 'nombre', headerName: "Nombre", flex: 1
    },{
        field: 'id', headerName: "ID", flex: 1, hide: true
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
                                rows={nivelData ? nivelData.getNivelProfesionales : []}
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

export default NivelProfesional;