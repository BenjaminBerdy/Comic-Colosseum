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
import Link from '@mui/material/Link';
import {useNavigate } from 'react-router-dom';
import { createTheme } from '@mui/material/styles';
import { useContext } from "react";
import { useLocation } from 'react-router-dom';
import { AuthContext} from '../context/auth';

export default function MenuAppBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const{user,logout}= useContext(AuthContext);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = (event) => {
    setAnchorEl(null);
    logout();
    navigate('/')
  };
  const theme = createTheme({
    palette: {
      primary: {
        main: '#B40000',     
      }
    }
  });

  let header;
  let comicstory;
  if (location.pathname.includes("comic")) {
    header = <Link href='/' style={{ color: 'white', textDecoration: 'none', fontFamily: 'fantasy' }}>Comic Colosseum</Link>
    comicstory = 'comic'
  }else if(location.pathname.includes("story")){
    header = <Link href='/' style={{ color: 'white', textDecoration: 'none', fontFamily: 'fantasy' }}>Story Colosseum</Link>
    comicstory = 'story'
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" theme={theme}>
        <Toolbar>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
          {header}
          </Typography>
         {user && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Typography variant="h6" component="div" sx={{flexGrow: 1 }}>{user.username}</Typography><br/> 
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
                <MenuItem component={Link} href={'/'+ comicstory +'/userprofile/' + user.id}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>LogOut</MenuItem>
              </Menu>
            </div>
          )}
          {!user && (
            <div>
              <Button href='/login/' color="inherit" style={{ fontFamily: 'system-ui' }}>Login</Button>
              |
              <Button href='/register/'color="inherit" style={{ fontFamily: 'system-ui' }}>Register</Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}