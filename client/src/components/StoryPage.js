import React from "react";
import AuthContext from '../auth';
import { GlobalStoreContext } from '../store';
import { Link } from 'react-router-dom';
import { useContext } from "react";
import AppBanner from "./AppBanner";
import SideBar from "./SideBar";

function StoryPage(){
    return(
        <div>
            <SideBar/>
            <AppBanner/>
            <h1>The Story Page</h1>
        </div>
    );

}
export default StoryPage;