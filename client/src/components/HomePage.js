import React from "react";
import AppBanner from "./AppBanner";
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import EnhancedTable from "./EnhancedTable";
import FollowedCreatorsBar from "./followedCreatorsBar";
import { useContext } from "react";
import { AuthContext } from '../context/auth';


export default function HomePage(){
  const {user} = useContext(AuthContext);
    return(
        <div>
            <AppBanner/>               
            {user && <FollowedCreatorsBar/>}
            <div id="enhancedtable">
            <EnhancedTable/>
            </div>
            
        </div>
    );

}