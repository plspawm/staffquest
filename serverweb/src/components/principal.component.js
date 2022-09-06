import React, { useState, useContext, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

/** Material UI */
import TextField from '@mui/material/TextField';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Toolbar from "@mui/material/Toolbar";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';

/** Firebase */
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import firebaseApp from "../firebase/credentials";

/** Componentes */
import Header from './Header';
import NavbarHeader from "./Navbar";

const drawerWidth = 240;

const Principal = (props) => {
    const { window } = props;
    const auth = getAuth(firebaseApp);
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                <ListItem key={"LISTA1"}>
                    <ListItemButton>
                        <ListItemText primary="LISTA 1" />
                    </ListItemButton>
                </ListItem>
                <ListItem key={"LISTA2"}>
                    <ListItemButton href="#nosotros">
                        <ListItemText primary="LISTA 2" />
                    </ListItemButton>
                </ListItem>
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    useEffect(() => {
        if (loading) return;
        //if (!user) return navigate("/login");
    }, [user, loading]);


    const logout = () => {
        signOut(auth);
    };

    return (
        <>
            <Header 
                cerrarSesion={()=>logout()}
                user={user}
            />
            <section id="intro">
                <div className="cabecera">
                    <div className="container items-center justify-center flex-column text-white jss3">
                        <Paper
                            component="form"
                            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                        >
                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="Buscar empleo ..."
                                inputProps={{ 'aria-label': 'search google maps' }}
                            />
                            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                                <SearchIcon />
                            </IconButton>
                        </Paper>
                        <br/>
                        {/* <Button variant="contained" onClick={logout}>Cerrar</Button> */}
                    </div>
                </div>
            </section>
            <section id="cv">
                <h2 style={{ textAlign: "center", color: "#af8c16" }}>DEJA TU CV CON NOSOTROS</h2>
                <Box alignItems="center" width="400" justifyContent="center" display="flex">
                    <Stack direction="row" spacing={3}>
                        <TextField placeholder="Nombre" />
                        <Button variant="contained" component="label">
                            Subir
                            <input hidden accept="image/*" multiple type="file" />
                        </Button>
                        <LoadingButton
                            color="success"
                            //onClick={handleClick}
                            //loading={loading}
                            loadingPosition="start"
                            startIcon={<SaveIcon />}
                            variant="contained"
                        >
                            Guardar
                        </LoadingButton>
                    </Stack>
                </Box>
            </section>
            <section id="nosotros">
                <h2 style={{ textAlign: "center", color: "#af8c16" }}>NOSOTROS</h2>
                <p style={{ padding: "25px 25px 25px 25px", justifyContent: "center" }}>
                    STAFFQUEST es una empresa creada
                    para brindar soluciones integrales en la
                    búsqueda de talento calificado y ayudar
                    a mejorar la productividad de las
                    empresas.
                    Ofrecemos servicios de Reclutamiento
                    de personal, Acreditación para faena,
                    Gestión de auditoría, tenemos la eficacia
                    a la hora de dar soluciones a nuestros
                    clientes, impactando positivamente en
                    su organización. ¡Hacemos tus objetivos
                    nuestros!
                </p>
            </section>
            <section id="mision">
                <h2 style={{ textAlign: "center", color: "#af8c16" }}>MISIÓN</h2>
                <p style={{ padding: "25px 25px 25px 25px", justifyContent: "center" }}>
                    Integrar personal idoneo en las empresas aliadas, y
                    contribuir al desarrollo de equipos eficaces, siendo
                    íntegros en nuestra labor, responsables, honestos y
                    comprometidos con el cumplimiento de tus metas,
                    prestando el mejor servicio con calidad.
                </p>
            </section>
            <section id="vision">
                <h2 style={{ textAlign: "center", color: "#af8c16" }}>VISIÓN</h2>
                <p style={{ padding: "25px 25px 25px 25px", justifyContent: "center" }}>
                    Ser en el 2025 una empresa
                    reconocida a nivel nacional,
                    consolidados como la mejor
                    alternativa en búsqueda de
                    personal, acreditación y gestión de
                    auditorías, siendo competitivos,
                    únicos en lo que hacemos, ,
                    sustentables y con los mejores
                    estándares de calidad y servicio del
                    mercado.
                </p>
            </section>
            <section id="contacto">
                <h2 style={{ textAlign: "center", color: "#af8c16" }}>Contacto</h2>
                <p>
                </p>
            </section>
        </>
    )
}

Principal.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default Principal;