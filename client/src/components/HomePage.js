import React from "react";
import AppBanner from "./AppBanner";
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import Toolbar from '@mui/material/Toolbar';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import EnhancedTable from "./EnhancedTable";
import FollowedCreatorsBar from "./followedCreatorsBar";
import { useContext } from "react";
import { AuthContext } from '../context/auth';
import { Button } from "@mui/material";
import { useLocation } from 'react-router-dom';


export default function HomePage(){
  const {user} = useContext(AuthContext);
  const location = useLocation();
    
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

      let filterbuttons;
      if (location.pathname.includes("comic")) {
        filterbuttons = <div>
        <Button id="whitebuttontext" variant="outlined" size="small" color="secondary" style={{marginLeft: ".5vw", color: "white", height: "2.5vw"}}>New Comics</Button>
        <Button id="whitebuttontext" variant="outlined" size="small" color="secondary" style={{marginLeft: ".5vw", color: "white", height: "2.5vw"}}>Liked Comics</Button>
        </div>;
      }else if(location.pathname.includes("story")){
        filterbuttons = <div>
        <Button id="whitebuttontext" variant="outlined" size="small" color="secondary" style={{marginLeft: ".5vw", color: "white", height: "2.5vw"}}>New Stories</Button>
        <Button id="whitebuttontext" variant="outlined" size="small" color="secondary" style={{marginLeft: ".5vw", color: "white", height: "2.5vw"}}>Liked Stories</Button>
        </div>;
      }

    return(
        <div>
            <AppBanner/>               
            {user && <FollowedCreatorsBar/>}
            <React.Fragment>
            <Toolbar id="toolbar">
                <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                    {user && (filterbuttons)}
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
            <EnhancedTable/>
            </div>
            
        </div>
    );

}