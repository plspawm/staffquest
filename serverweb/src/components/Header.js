import React, { useState } from "react";
import {
  AppBar,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import AddBusinessRoundedIcon from "@mui/icons-material/AddBusinessRounded"; //#063970
import { useNavigate } from "react-router-dom";
import DrawerComp from "./Drawer";
const Header = (props) => {
  const [value, setValue] = useState(0);
  const theme = useTheme();
  console.log(theme);
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  console.log(isMatch);
  const { cerrarSesion, login, user } = props;
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <AppBar sx={{ background: "#1a628a" }}>
        <Toolbar>
          {/* <AddBusinessRoundedIcon sx={{ transform: "scale(2)" }} /> */}
          <img src="/img/logo.png" width="100" height="70" />
          {isMatch ? (
            <>
              <Typography sx={{ fontSize: "2rem", paddingLeft: "10%" }}>
                StaffQuest
              </Typography>
              <DrawerComp />
            </>
          ) : (
            <>
              <Tabs
                sx={{ marginLeft: "auto" }}
                indicatorColor="secondary"
                textColor="inherit"
                value={value}
                onChange={(e, value) => setValue(value)}
              >
                <Tab label="Inicio" href="#intro" />
                <Tab label="Servicios" href="#servicios" />
                <Tab label="Nosotros" href="#nosotros" />
                <Tab label="Contacto" />
              </Tabs>
              {user ? (
                <>
                  <p>Bienvenido</p>
                  <Button sx={{ marginLeft: "10px" }} variant="contained" onClick={cerrarSesion}>
                    Salir
                  </Button>
                </>
              ) : (
                <>
                  <Button sx={{ marginLeft: "10px" }} variant="contained" onClick={()=>navigate("/login")}>
                    Persona
                  </Button>
                  <Button sx={{ marginLeft: "10px" }} variant="contained">
                    Empresa
                  </Button>
                </>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Header;