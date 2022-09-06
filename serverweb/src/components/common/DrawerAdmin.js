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
        name: "Inicio",
        icon: <HomeOutlined />
    },
    { name: "Usuarios", icon: <PermIdentityIcon />, enlace: "/admin/usuarios" },
    { name: "Ofertas Publicadas", icon: <SchoolIcon /> },
    { name: "Empleadores", icon: <SchoolIcon /> },
];

const DrawerAdmin = (props) => {
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
                    <Typography variant="h6" style={{margin: 'auto'}}>Panel de Control</Typography>
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

export default DrawerAdmin;