import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems} from './listItems2';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {useHistory} from 'react-router-dom'
import TextField from '@mui/material/TextField';
import axios from 'axios';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import PatientAdd from './PatientAdd';
import FormControlLabel from '@mui/material/FormControlLabel';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

// import Orders from './Orders';

function Copyright(props) {
  return (
      <>
      </>
    // <Typography variant="body2" color="text.secondary" align="center" {...props}>
    //   {'Copyright © '}
    //   <Link color="inherit">
    //     SWASTH
    //   </Link>{' '}
    //   {new Date().getFullYear()}
    //   {'.'}
    // </Typography>
  );
}

const drawerWidth = 240;
const theme = createTheme();

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();


var new1=JSON.parse(localStorage.getItem("doctInfo"))
// var patList = new1.patients;
const name=[]

if(new1){
  console.log(new1.patients)
  for(let i=0;i<new1.patients.length;i++){
    var nam=new1.patients[i].slice(0,new1.patients[i].length-13)
    // var addr = new1.patients[i] - nam
    const n1=new Object({name:nam,aadhar:new1.patients[i].slice(-12)})
    name.push(n1)
  }
  console.log(name)
}




// export 
// function createData(name,patCode) {
//   return { name , patCode};
// }



function DashboardContent() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const history=useHistory()
 function presBtn(e){

   console.log(e.target.value)
   
   localStorage.setItem("ptn",JSON.stringify({Name:e.target.value.slice(0,e.target.value.length-13),Aadhar:e.target.value.slice(-12)}))
   history.push("/patientShow")  
 }

 function hanClick(){
     localStorage.removeItem("adminInfo")
     history.push("/")
 }

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
    var regexp=/^[2-9]{1}[0-9]{3}\s{1}[0-9]{4}\s{1}[0-9]{4}$/;
    console.log(regexp.test(patient.pcode))
    if(regexp.test(patient.pcode))
    {

    
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
          else{
            window.alert("Sorry, Invalid Aadhar no.");
          }
        }     

 
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h4"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            <IconButton onClick={hanClick}  color="inherit">
              {/* <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge> */}
              LOGOUT
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {/* {secondaryListItems} */}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              
              {/* Recent Deposits */}
              
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  
                    <React.Fragment>
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
                    </React.Fragment>

                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>

        </Box>
      </Box>
    </ThemeProvider>
  );
}



export default function A1() {
  return <DashboardContent />;
}