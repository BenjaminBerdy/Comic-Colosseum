import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { createTheme } from '@mui/material/styles';
import { useContext } from "react";
import { authContext } from "../App";



export default function MenuAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const {auth,setAuth} = useContext(authContext);

  const handleChange = (event) => {
    setAuth(!auth);
    console.log(auth)
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = (event) => {
    setAnchorEl(null);
    setAuth(!auth);
    console.log(auth)
  };
  const theme = createTheme({
    palette: {
      primary: {
        main: '#B40000',     
      }
    }
  });
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" theme={theme}>
        <Toolbar>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
          <Link to='/' style={{ color: 'white', textDecoration: 'none' }}>
            Comic Colloseum
            </Link>
          </Typography>
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem component={Link} to='/userprofile/'>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>LogOut</MenuItem>
              </Menu>
            </div>
          )}
          {!auth && (
            <div>
              <Button onClick={handleChange} color="inherit">Login(Test)</Button>
              <Button href='/login/' color="inherit">Login</Button>
              <Button href='/register/'color="inherit">Register</Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}