import './App.css';
import NavBar from './Components/Navbar';
import { BrowserRouter as Router,Switch , Route } from 'react-router-dom';
import Home from './Components/Home'
// import AdminLogin from './Components/AdminLogin';
import Navbar from './Components/Navbar';
// import DoctorLogin from './Components/DoctorLogin.js'
import AddDoc from './Components/AddDoc'
// import AddPatient from './Components/AddPatient';
import AdminDashboard from './Components/AdminDashboard';
import NewNav from './Components/NewNav'
import PrivateRoute from './Components/PrivateRoute';
import Docdashboard from './Components/docdashboard';
import PatientShow from './Components/PatientShow';
import DoctorRoute from './Components/DoctorRoute'
import Refer from './Components/Refer'
import About from './Components/Aboutus'
import Contact from './Components/Contact'
import SignIn from './Components/DoctorLogin'
import AdminIn from './Components/AdminLogin';
import SignUp from './Components/AdminSignup'
// import DashboardContent from './Components/Dashboard'
import PatientAdd from './Components/PatientAdd';
import DoctorAdd from './Components/DoctorAdd';
import Dashboard from './Components/Dashboard';
import PatientRecord from './Components/patRecord'
import ReferDash from './Components/referDash'
import AdminDashboard1 from './Components/AdminDash';
import A1 from './Components/A1'
import A2 from './Components/A2'
import Model from './Components/ModelPred';

function App() {

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
              <NavBar />
              <Home />
          </Route>

          <Route exact path="/Admin_up">
              <Navbar />
              <SignUp />
          </Route>
          <Route exact path="/Doc_in">
              <NavBar />
              {/* <DoctorLogin /> */}
              <DoctorRoute exact path="/Doc_in" component={SignIn} />
          </Route>
          <Route exact path="/Admin_in">
              <NavBar />
              {/* <AdminLogin /> */}
              <PrivateRoute exact path="/Admin_in" component={AdminIn} />
          </Route>
          <Route exact path="/Contact">
              <NavBar />
              <Contact />
          </Route>
          <Route exact path="/AddDoc">
              <NewNav/>
              {/* <AddDoc /> */}
              <DoctorAdd />
          </Route>
          <Route exact path="/AddPat">

              {/* <NewNav /> */}
              <AdminDashboard1 />
              {/* <AddPatient /> */}
              {/* <PatientAdd /> */}
          </Route>
          <Route exact path="/AdminDashboard">
              {/* <NewNav /> */}
              <AdminDashboard1 />
          </Route>

          <Route exact path="/Docdashboard">
              {/* <NewNav /> */}
              <Dashboard />
              {/* <AdminDashboard /> */}
          </Route>

          <Route exact path="/PatientShow">
              <NewNav />
              <PatientShow />
          </Route>
          <Route exact path="/About">
              <NavBar />
              <About />
          </Route>
          <Route exact path="/Refer">
              {/* <NewNav /> */}
              <ReferDash />
          </Route>
          <Route exact path="/Patrecord">
                <NewNav />
                <PatientRecord />
              
          </Route>

          <Route exact path="/AdBo">

              <AdminDashboard1 />
              {/* <Refer /> */}
              {/* <DashboardContent /> */}
              
          </Route>
        
          <Route exact path="/A1">
                {/* <NewNav /> */}
              {/* <Refer /> */}
              {/* <DashboardContent /> */}
              <A1 />
          </Route>

          <Route exact path="/A2">
                {/* <NewNav /> */}
              {/* <Refer /> */}
              {/* <DashboardContent /> */}
              <A2 />
          </Route>

          <Route exact path="/123">
                {/* <NewNav /> */}
              {/* <Refer /> */}
              {/* <DashboardContent /> */}
              <A2 />
          </Route>
          <Route exact path="/Model">
                <NewNav />
              {/* <Refer /> */}
              {/* <DashboardContent /> */}
              <Model />
          </Route>
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
