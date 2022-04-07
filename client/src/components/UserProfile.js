import React from "react";
import AppBanner from "./AppBanner";
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import Toolbar from '@mui/material/Toolbar';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import EnhancedTable from "./EnhancedTable";
import Button from '@mui/material/Button'
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';
import { Link } from 'react-router-dom';


function renderRow(props) {
  const { index, style } = props;

  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton component={Link} to={'/viewcomic/' + (index+1)} style={{ color: 'black', textDecoration: 'none' }}>
        <ListItemText primary={`Comic ${index + 1}`} />
      </ListItemButton>
    </ListItem>
  );
}




export default function UserProfile(){
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

    return(
        <div>
            <AppBanner/>  
            <div id = "userbar">
            <h1>Username</h1>
            <Button href="/createcomic/123" variant="text">Create Comic</Button>
            <Button href="/createstory/123" variant="text">Create Story</Button>
            <Box
                sx={{position:"fixed", left: 0, width: '100%', height: '100%', maxWidth: 250, bgcolor: '#4B284F' }}
              >
              <br/>
              <h2>Unpublished Comics</h2>
                <FixedSizeList
                  height={600}
                  width={250}
                  itemSize={46}
                  itemCount={200}
                  overscanCount={5}
                >
                  {renderRow}
                </FixedSizeList>
            </Box>
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
            <EnhancedTable /> 
            </div>
            
        </div>
    );

}