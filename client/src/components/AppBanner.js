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
import { Link, useNavigate } from 'react-router-dom';
import { createTheme } from '@mui/material/styles';
import { useContext } from "react";
import { useLocation } from 'react-router-dom';
import { AuthContext} from '../context/auth';
import gql from 'graphql-tag'
import {useMutation} from '@apollo/react-hooks'

const LOGIN_USER = gql`
  mutation login($username:String!,$password:String!){
    login(username: $username,password: $password){
      id
      email
      username
      token
    }
}`;



export default function MenuAppBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const{user,login,logout}= useContext(AuthContext);

  const [loginUser] = useMutation(LOGIN_USER,{
    update(_,{data:{login:userData}}){
      login(userData);
    },
    variables: {
      username: "testuser", 
      password: "testpassword"
    }
  })

  const handleTestLogin = (event) => {
    loginUser();
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = (event) => {
    setAnchorEl(null);
    logout();
    if(location.pathname.includes("create") || location.pathname.includes("userprofile")){
      if(location.pathname.includes("comic")){
        navigate('/comic/homepage/')
      }else if(location.pathname.includes("story")){
        navigate('/story/homepage/')
      }
    }
  };
  const theme = createTheme({
    palette: {
      primary: {
        main: '#B40000',     
      }
    }
  });

  let header;
  let profilebutton;
  if (location.pathname.includes("comic")) {
    header = <Link to='/' style={{ color: 'white', textDecoration: 'none', fontFamily: 'fantasy' }}>Comic Coloseum</Link>
    profilebutton = <MenuItem component={Link} to='/comic/userprofile/'>Profile</MenuItem>
  }else if(location.pathname.includes("story")){
    header = <Link to='/' style={{ color: 'white', textDecoration: 'none', fontFamily: 'fantasy' }}>Story Coloseum</Link>
    profilebutton = <MenuItem component={Link} to='/story/userprofile/'>Profile</MenuItem>
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
                {profilebutton}
                <MenuItem onClick={handleLogout}>LogOut</MenuItem>
              </Menu>
            </div>
          )}
          {!user && (
            <div>
              <Button onClick={handleTestLogin} color="inherit" style={{ fontFamily: 'system-ui' }}>Login(Test)</Button>
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