import React, { useState, useContext, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";

/** Material UI */
import { Drawer, ListItem, ListItemIcon, ListItemText, Button, AppBar, Typography, IconButton, Box } from "@mui/material";
import {
    CheckBoxOutlineBlankOutlined,
    DraftsOutlined,
    Height,
    HomeOutlined,
    InboxOutlined,
    MailOutline,
    ReceiptOutlined,
} from "@mui/icons-material";
import SchoolIcon from '@mui/icons-material/School';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import LabelIcon from '@mui/icons-material/Label';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import BadgeIcon from '@mui/icons-material/Badge';
import MenuIcon from "@mui/icons-material/Menu";

const data = [
    {
        name: "Home",
        icon: <HomeOutlined />,
        enlace: "/usuario"
    },
    { name: "Info Personal", icon: <PermIdentityIcon />, enlace: "/usuario/home" },
    { name: "Formación Academica", icon: <SchoolIcon />, enlace: "/usuario/formacion" },
    { name: "CV", icon: <CoPresentIcon />, enlace: "/usuario/cv" },
    { name: "Certificados", icon: <DraftsOutlined />, enlace: "/usuario/certificado" },
    { name: "Etiquetas", icon: <LabelIcon /> },
    { name: "Experiencia Laboral", icon: <BadgeIcon />, enlace: "/usuario/experiencia" },
];

const DrawerUsuario = (props) => {
    const [open, setOpen] = useState(false);
    const { permanente, menu } = props;

    const getList = () => (
        <div style={{ width: 250 }} onClick={() => setOpen(false)}>
            {data.map((item, index) => (
                <ListItem button key={index} component={Link} to={item.enlace ? item.enlace : ""}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.name} />
                </ListItem>
            ))}
        </div>
    );

    return (
        <React.Fragment>
            <Drawer open={open} variant={permanente ? "permanent" : ""} anchor="left" onClose={() => setOpen(false)}>
                <Box sx={{
                    alignItems: 'center',
                    height: 150
                }}>
                    <img style={{ textAlign: 'center' }} src="/img/logo.png" width="200" height="120" />
                </Box>
                <AppBar position="static" sx={{
                    alignItems: 'center',
                    height: 50,
                }}>
                    <Typography variant="h5" style={{margin: 'auto'}}>Perfil</Typography>
                </AppBar>
                {getList()}
            </Drawer>
            {menu ? (
                <IconButton
                    sx={{ color: "white", marginLeft: "auto" }}
                    onClick={() => setOpen(!open)}
                >
                    <MenuIcon color="white" />
                </IconButton>
            ) : ""}

        </React.Fragment>
    )
}

export default DrawerUsuario;