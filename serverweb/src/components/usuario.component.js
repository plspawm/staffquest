import React, { useState, useContext, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, Outlet } from "react-router-dom";
import DrawerUsuario from "./common/DrawerUsuario";

/** Material UI */
import { Drawer, ListItem, ListItemIcon, ListItemText, Button, AppBar, Typography, useTheme, useMediaQuery, Box, Toolbar } from "@mui/material";
import {
    CheckBoxOutlineBlankOutlined,
    DraftsOutlined,
    HomeOutlined,
    InboxOutlined,
    MailOutline,
    ReceiptOutlined,
} from "@mui/icons-material";

const data = [
    {
        name: "Home",
        icon: <HomeOutlined />,
    },
    { name: "Inbox", icon: <InboxOutlined />, enlace: "https://www.google.cl" },
    { name: "Outbox", icon: <CheckBoxOutlineBlankOutlined /> },
    { name: "Sent mail", icon: <MailOutline /> },
    { name: "Draft", icon: <DraftsOutlined /> },
    { name: "Trash", icon: <ReceiptOutlined /> },
];


const Usuario = () => {
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));

    const getList = () => (
        <div style={{ width: 250 }} onClick={() => setOpen(false)}>
            {data.map((item, index) => (
                <ListItem button key={index} components="a" href="https://www.google.cl">
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.name} />
                </ListItem>
            ))}
        </div>
    );

    const drawer = (
        <Drawer open={open} variant="permanent" anchor="left" onClose={() => setOpen(false)}>
            <AppBar position="static">
                <Typography variant="h5">Usuario</Typography>
            </AppBar>
            {getList()}
        </Drawer>
    );

    return (
        <div>
            <main>
                {isMatch ? (
                    <>
                        <Box sx={{ flexGrow: 1 }}>
                            <AppBar>
                                <Toolbar>
                                    <DrawerUsuario menu={true} />
                                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>PRUEBA</Typography>
                                </Toolbar>
                            </AppBar>
                        </Box>
                        <div style={{ marginTop: 100 }}>
                            <Outlet />
                        </div>
                    </>
                ) : (
                    <div style={{ marginLeft: 260 }}>
                        <DrawerUsuario permanente={true} />
                        <Typography>NO RESPONSIVE</Typography>
                        <Outlet />
                    </div>
                )}
            </main>
        </div>
    )
}

export default Usuario;