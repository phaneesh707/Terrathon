import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import { Link } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useHistory } from 'react-router-dom';
import CoronavirusIcon from '@mui/icons-material/Coronavirus'

export const mainListItems = (
  
  <React.Fragment>


    <Link href="/A1">
    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Add Patient" />
    </ListItemButton>
    </Link>

    <Link href="/A2">

    <ListItemButton>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Add Doctor" />
    </ListItemButton>

    </Link>

    <Link href="/Model">

    <ListItemButton>
      <ListItemIcon>
        <CoronavirusIcon />
      </ListItemIcon>
      <ListItemText primary="Predict Disease" />
    </ListItemButton>

    </Link>

  </React.Fragment>
);
