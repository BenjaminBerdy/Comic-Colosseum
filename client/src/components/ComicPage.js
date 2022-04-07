import React from "react";
import AppBanner from "./AppBanner";
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import Toolbar from '@mui/material/Toolbar';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import ComicEnhancedTable from "./ComicEnhancedTable";
import FollowedCreatorsBar from "./followedCreatorsBar";
import { useContext } from "react";
import { authContext } from "../App";
import { Button } from "@mui/material";





export default function ComicPage(){
  const {auth} = useContext(authContext);
    
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
            {auth && <FollowedCreatorsBar/>}
            <React.Fragment>
            <Toolbar id="toolbar">
                <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                    {auth && <Button id="whitebuttontext"   sx={{ minWidth: 150 }}>New Comics</Button>}
                    {auth && <Button id="whitebuttontext" sx={{ minWidth: 150 }}>Followers Comics</Button>}
                    {auth && <Button id="whitebuttontext" sx={{ minWidth: 150 }}>Liked Comics</Button>}
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
            <ComicEnhancedTable /> 
            </div>
            
        </div>
    );

}