import React, { useState, useContext, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";

/** Material UI */
import { Drawer, ListItem, ListItemIcon, ListItemText, Button, AppBar, Typography, IconButton } from "@mui/material";
import {
    CheckBoxOutlineBlankOutlined,
    DraftsOutlined,
    HomeOutlined,
    InboxOutlined,
    MailOutline,
    ReceiptOutlined
} from "@mui/icons-material";

import MenuIcon from "@mui/icons-material/Menu";

const data = [
    {
        name: "Home",
        icon: <HomeOutlined />,
        enlace: "/usuario"
    },
    { name: "Inbox", icon: <InboxOutlined />, enlace: "/usuario/home" },
    { name: "Outbox", icon: <CheckBoxOutlineBlankOutlined /> },
    { name: "Sent mail", icon: <MailOutline /> },
    { name: "Draft", icon: <DraftsOutlined /> },
    { name: "Trash", icon: <ReceiptOutlined /> },
];

const DrawerUsuario = (props) => {
    const [open, setOpen] = useState(false);
    const {permanente, menu} = props;

    const getList = () => (
        <div style={{ width: 250 }} onClick={() => setOpen(false)}>
            {data.map((item, index) => (
                <ListItem button key={index} component={Link} to={item.enlace ? item.enlace : ""}>
                    {console.log(item.enlace)}
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.name} />
                </ListItem>
            ))}
        </div>
    );

    return (
        <React.Fragment>
            <Drawer open={open} variant={permanente? "permanent":""} anchor="left" onClose={() => setOpen(false)}>
                <AppBar position="static">
                    <Typography variant="h5">Usuario</Typography>
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