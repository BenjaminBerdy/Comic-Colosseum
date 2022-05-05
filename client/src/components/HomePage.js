import React from "react";
import AppBanner from "./AppBanner";
import EnhancedTable from "./EnhancedTable";
import FollowedCreatorsBar from "./followedCreatorsBar";
import { useContext } from "react";
import { AuthContext } from '../context/auth';
import Toolbar from '@mui/material/Toolbar';



export default function HomePage(){
  const {user} = useContext(AuthContext);
    return(
        <div>
            <AppBanner/>               
            {user && <FollowedCreatorsBar/>}
            <Toolbar id="toolbar"/>
            <div id="enhancedtable">
            <EnhancedTable/>
            </div>
            
        </div>
    );

}