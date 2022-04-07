import React from "react";
import AppBanner from "./AppBanner";
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import Toolbar from '@mui/material/Toolbar';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import EnhancedTable from "./EnhancedTable";
import { useParams } from "react-router-dom";
import Button from '@mui/material/Button'



export default function ViewUsercreen(){
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

    const { id } = useParams();
    return(
        <div>
            <AppBanner/>               
            <div id = "userbar" style={{backgroundColor: '#4B284F', color: "white", width: "100%", maxWidth: 250, textAlign: "center"}}>
            <h1>Creator {id}</h1>
            <Button variant="text" size="small" variant="outlined" color="secondary" style={{color: "white", height: "3.6vw", width: "8vw"}}>Follow</Button>
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