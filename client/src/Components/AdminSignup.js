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
import axios from 'axios';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        SWASTH
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    console.log({
      email: data.get('HospitalName'),
      password: data.get('password'),
      place:data.get('place'),
      username:data.get('Uname'),
      password:data.get('password')
    });
    const admin= Object({hospitalname:data.get('HospitalName'),hospcode:data.get('HospitalCode'),place:data.get('place'),username:data.get('Uname'),password:data.get('password')});
        console.log(admin)
        axios({
            method:"POST",
            url:"http://localhost:3030/AdminSignup",
            data:admin
        })
        .then((res)=>{
            console.log(res)
            if(res.data.error1){
                window.scrollBy("",window.screen.height)
                console.log("USER ALREADY EXIST")
                // setErr("USER ALREADY EXIST")
            }
            if(res.data.error2){
                console.log("FAILED TO ADD")
                // setErr("FAILED TO ADD")
            }
            if(res.data.success){
                console.log("ADMIN ADDEDD SUCCESSFULLY")
                // setMes("ADMIN ADDEDD SUCCESSFULLY")
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  required
                  fullWidth
                  id="HospitalName"
                  label="Hospital Name"
                  name="HospitalName"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="HospitalCode"
                  label="Hospital Code"
                  name="HospitalCode"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="place"
                  label="Place"
                  name="place"
                //   autoComplete="email"
                />


              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="Uname"
                  label="User Name"
                  type="Uname"
                  id="Uname"
                  autoComplete="new-password"
                />

                </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />

              </Grid>
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/Admin_in" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}