import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

/** Material UI */
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

/** Firebase */
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import firebaseApp from "../firebase/credentials";

/** GRAPHQL */
//import { useQuery, gql, useMutation, defaultDataIdFromObject } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from 'graphql-tag';


const READ_EMPLEADOR = gql`
    query getEmpleador($uid: String!) {
        getEmpleador(uid: $uid) {
            nombres
        }
    }
`;

const READ_EMPLEADORES = gql`
    query getEmpleadores {
        getEmpleadores {
            nombres
        }
    }
`;


function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                StaffQuest.cl
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

function GetEmpleado({ uid }) {
    console.log(uid);
    const { loading, error, data } = useQuery(READ_EMPLEADOR, { variables: { uid } });
    if (loading) return null;
    if (error) console.error(error);
    if (data) {
        console.log(data);
        return data;
    }

}

const theme = createTheme();

export default function Login() {
    const auth = getAuth(firebaseApp);
    const [user, loading] = useAuthState(auth);
    const [uid, setUid] = useState('');
    const navigate = useNavigate();
    const { data, error } = useQuery(READ_EMPLEADOR, { variables: { uid: uid } });

    if(error) console.error(error);
    if(data) {
        console.log("DATA", data);
    }

    useEffect(() => {
        if (loading) {
            // maybe trigger a loading screen
            return;
        }
        //if (user) navigate("/inicio");
    }, [user, loading])

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });

        signInWithEmailAndPassword(auth, data.get('email'), data.get('password'))
            .then(resp => {
                console.log("RESP", resp);
                setUid(resp.user.uid);
                if(data) {
                    navigate("/inicio");
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Perdio la contraseña?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/" variant="body2">
                                    {"No tienes cuenta? Registrate"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}