import * as React from 'react';
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
import {useHistory} from 'react-router-dom';
import axios from "axios"
import {useState} from 'react';
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" >
        SWASTH
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
    const history = useHistory()
    const [error1,setError1]=useState();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('uname'),
      password: data.get('password'),
    });
    axios({
        method:"get",
        url:`http://localhost:3030/DoctorLogin/${data.get('uname')}/${data.get('password')}`
    })
    .then((res)=>{
        if(res.data.error1){
            console.log("USER NOT FOUND")
            setError1("USER NOT FOUND")
        } 
        else if(res.data.incorrect){
            console.log("PASSWORD IS INCORRECT")
            setError1("PASSWORD IS INCORRECT")
        }
    
        else if(res.data.success){
            console.log(res.data.success)
            const y=res.data.success;
            localStorage.setItem("doctInfo",JSON.stringify({docname:y.docname,hierarchy:y.hierarchy,hospcode:y.hospcode,hospname:y.hospname,patients:y.patients,place:y.place,qualification:y.qualification,referrals:y.referrals,username:y.username,specialisation:y.specialisation}))
            console.log("DOCTOR LOGGED IN")
            // setMes("DOCTOR LOGGED IN")
            history.push("/Docdashboard")
        } 
        else{
            // setError1("FAILED TO LOGIN")
            console.log("Failed to login")
        }
    })
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
              label="User Name"
              name="uname"
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
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
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