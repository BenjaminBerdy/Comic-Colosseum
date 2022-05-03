import React from "react";
import AppBanner from "./AppBanner";
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