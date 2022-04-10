import React from "react";
import AppBanner from "./AppBanner";
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import Toolbar from '@mui/material/Toolbar';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import StoryEnhancedTable from "./StoryEnhancedTable";
import ComicEnhancedTable from "./ComicEnhancedTable";
import Button from '@mui/material/Button'
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { AuthContext } from '../context/auth';
import { useContext } from "react";




function renderComicRow(props) {
  const { index, style } = props;

  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton component={Link} to={'/createcomic/' + (index+1)} style={{ color: 'white', textDecoration: 'none'}}>
        <ListItemText primary={`Comic ${index + 1}`} />
      </ListItemButton>
    </ListItem>
  );
}

function renderStoryRow(props) {
  const { index, style } = props;

  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton component={Link} to={'/createcomic/' + (index+1)} style={{ color: 'white', textDecoration: 'none'}}>
        <ListItemText primary={`Story ${index + 1}`} />
      </ListItemButton>
    </ListItem>
  );
}




export default function UserProfile(props){
  const{user}= useContext(AuthContext);
  const [open, setOpen] = React.useState(false);
  const [msg] = React.useState('Deletion is permanent and cannot be undone. Continue?');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(3),
          width: 'auto',
        },
      }));
    
      const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }));
    
      const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
          padding: theme.spacing(1, 1, 1, 0),
          // vertical padding + font size from searchIcon
          paddingLeft: `calc(1em + ${theme.spacing(4)})`,
          transition: theme.transitions.create('width'),
          width: '100%',
          [theme.breakpoints.up('md')]: {
            width: '20ch',
          },
        },
      }));

    const location = useLocation();
    let table;
    let createbutton;
    let unpublishedbar;
    if (location.pathname.includes("comic")) {
      table = <ComicEnhancedTable/>
      createbutton= <Link to='/createcomic/123'><Button id="whitebuttontext" variant="outlined" size="small" color="secondary" style={{marginLeft: ".5vw", color: "white", height: "2.5vw"}}>Create Comic</Button></Link>
      unpublishedbar = <div><h2>Unpublished Comics</h2>
      <FixedSizeList
        height={300}
        width={250}
        itemSize={46}
        itemCount={200}
        overscanCount={5}
      >
        {renderComicRow}
      </FixedSizeList></div>
    }else if(location.pathname.includes("story")){
      table = <StoryEnhancedTable/>
      createbutton= <Link to='/createstory/123'><Button id="whitebuttontext" variant="outlined" size="small" color="secondary" style={{marginLeft: ".5vw", color: "white", height: "2.5vw"}}>Create Story</Button></Link>
      unpublishedbar = <div><h2>Unpublished Stories</h2>
      <FixedSizeList
        height={300}
        width={250}
        itemSize={46}
        itemCount={200}
        overscanCount={5}
      >
        {renderStoryRow}
      </FixedSizeList></div>
    }

    return(

        <div>
          <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete Account?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {msg}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button onClick={handleClose}>Confirm</Button>
          <Button onClick={handleClose} autoFocus>
            Dismiss
          </Button>
        </DialogActions>
      </Dialog>

          
            <AppBanner/>  
            <div id = "userbar" style={{backgroundColor: '#4B284F', color: "white", width: "100%", maxWidth: 250, textAlign: "center"}}>
            <h1>{user.username}</h1>
            <h3>Followers: 10</h3> <h3>Likes: 10</h3>
            {createbutton}
            <Box
                sx={{position:"fixed", left: 0, width: '100%', height: '100%', maxWidth: 250, bgcolor: '#4B284F' }}
              >
              <br/>
              {unpublishedbar}
            </Box>
            <Link to={'/changepassword/'+user.id}><Button variant="outlined" size="small" color="secondary" style={{marginLeft: "-11.5vw", position: "absolute", fontSize: 10, bottom: "4.2vw", color: "white", width: "7vw", height: "3vw"}}>Change Password</Button></Link>
            <Button onClick={handleClickOpen} variant="outlined" size="small" color="secondary" style={{marginLeft: "-4vw", marginRight: "50vw", position: "absolute", fontSize: 10, bottom: "4.2vw", color: "white", width: "7vw", height: "3vw"}}>Delete Profile</Button>
            </div>    
            <React.Fragment>
            <Toolbar id="toolbar">
                <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                    <Search>
                        <SearchIconWrapper>
                        <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                    />
                    </Search>
                </Box>
                </Toolbar>
            </React.Fragment>
            <div id="enhancedtable">
            {table}
            </div>
            
        </div>
    );

}