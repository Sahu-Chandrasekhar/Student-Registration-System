import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { NavLink } from 'react-router-dom';
import style from "./style.module.css"
import AdminLogo from "../../../../Assets/Auth/adminIcon.webp";
import MenuIcon from '@mui/icons-material/Menu';
// import PostAddIcon from '@mui/icons-material/PostAdd';
// import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
// import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const drawerWidth = 240;


export default function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <List style={{ marginTop: -64 }}>
        <NavLink to="/admin/dashboard" style={{ textDecoration: "none" }}>
          {({ isActive }) => (
            <ListItem disablePadding>
              <ListItemButton className={isActive ? style.dashboard_active_link : style.dashboard}>
                <ListItemIcon>
                  <DashboardIcon style={{ color: isActive ? "#ff9018" : "white" }} />
                </ListItemIcon>
                <ListItemText >
                  <p className={isActive ? style.title_active_link : style.title}>Dashboard</p>
                </ListItemText>
              </ListItemButton>
            </ListItem>
          )}
        </NavLink>

        <NavLink to="/admin/admission" style={{ textDecoration: "none" }}>
          {({ isActive }) => (
            <ListItem disablePadding>
              <ListItemButton className={isActive ? style.addStudent_active_link : style.addStudent}>
                <ListItemIcon>
                  <GroupAddIcon style={{ color: isActive ? "#ff9018" : "white" }} />
                </ListItemIcon>
                <ListItemText >
                  <p className={isActive ? style.title_active_link : style.title}>Admission</p>
                </ListItemText>
              </ListItemButton>
            </ListItem>
          )}
        </NavLink>

      </List>

    </div>
  );
  const container = window !== undefined ? () => window().document.body : undefined;

  // const handleLogout = () => {
  //   window.location.href = '/login';
  // };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "#133b65"
        }}

      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Grid style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
            <Typography variant="h6" noWrap component="div">
              Administrator
            </Typography>
            <ExitToAppIcon style={{ cursor: "pointer" }} />
          </Grid>

        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"

      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          PaperProps={{
            sx: {
              marginTop: -1,
              backgroundColor: "#143b64",
              // color: "black",
              border: "none",
              height: "110vh",

            }
          }}

        >
          <Grid style={{ backgroundColor: "#ff9018", height: 63, display: "flex", gap: 10 }}>
            <img src={AdminLogo} alt='Admin Logo' style={{ width: "25%", paddingTop: 10, marginLeft: 10 }} />
            <h2 style={{ paddingTop: 25, color: "white", letterSpacing: 10 }}>SAMS</h2>
          </Grid>
          {drawer}
        </Drawer>

        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },

          }}
          open
          PaperProps={{
            sx: {
              marginTop: -1,
              backgroundColor: "#143b64",
              // color: "black",
              border: "none",
              height: "110vh",

            }
          }}
        >
          <Grid style={{ backgroundColor: "#ff9018", height: 72, display: "flex", gap: 4 }}>
            <img src={AdminLogo} alt='Admin Logo' style={{ width: "25%", paddingTop: 10, marginLeft: 10 }} />
            <h2 style={{ paddingTop: 25, color: "white", letterSpacing: 10 }}>SAMS</h2>
          </Grid>
          {drawer}
        </Drawer>
      </Box>

    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};