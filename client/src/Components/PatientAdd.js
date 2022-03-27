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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import "../css/PatientAdd.css"
import axios from 'axios';
import {useState,useEffect} from 'react'
import { useHistory } from 'react-router-dom';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Swasth
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function PatientAdd() {
    const history=useHistory()
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);


    console.log({
      email: data.get('PatientName'),
    //   password: data.get('password'),
    })
    
    const patient=Object({
        pname:data.get('PatientName'),
        gender:data.get('Gender'),
        phnumber:data.get('PhoneNumber'),
        age:data.get('Age'),
        place:data.get('Address'),
        deptname:data.get('DoctorId'),
        pcode:data.get('AadharNumber')
    })
    console.log(patient)
        axios({
                method:"POST",
                url:"http://localhost:3030/PatientAdd",
                data:patient
            })
        .then((res)=>{
                if(res.data.error1){
                    console.log("FAILED TO ADD PATIENT")  
                    setTimeout(()=>{
                       
                        history.push("/AdminDashboard")
                    },3000)
                }
                
                if(res.data.error2){
                    console.log("FAILED")
                    setTimeout(()=>{
                        history.push("/AdminDashboard")
                    },3000)

                }
                if(res.data.error3){
                    
                    setTimeout(()=>{
                       
                        history.push("/AdminDashboard")
                    },3000)
                }
                if(res.data.success){
                    console.log("PATIENT ADDED")
                    

                    setTimeout(()=>{
                     
                        history.push("/AdminDashboard")
                    },3000)
                }
            })
            .catch((e)=>{
                console.log(e)
              

                setTimeout(()=>{
                 
                    history.push("/AdminDashboard")
                },3000)
            })
        }     
  

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
            Add Patient
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="PatientName"
                  required
                  fullWidth
                  id="PatientName"
                  label="Patient Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="Age"
                  label="Age"
                  name="Age"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="AadharNumber"
                  label="Aadhar Number"
                  type="number"
                  id="AadharNumber"
                //   autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="PhoneNumber"
                  label="Phone Number"
                  name="PhoneNumber"
                //   autoComplete="email"
                />

              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="Address"
                  label="Address"
                  name="Address"
                //   autoComplete="email"
                />
                
              </Grid>

              {/* </Grid> */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="Gender"
                  label="Gender"
                  name="Gender"
                //   autoComplete="email"
                />
                
              </Grid>




              
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="DoctorId"
                  label="Doctor Id"
                //   type=""
                  id="DoctorId"
                //   autoComplete="new-password"
                />
              </Grid>
              
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I CONFIRM THAT ALL THE DETAILS PROVIDED ARE CORRECT."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add Patient
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                {/* <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link> */}
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  )}





