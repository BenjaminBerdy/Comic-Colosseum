import React from "react";
import AuthContext from '../auth';
import { GlobalStoreContext } from '../store';
import { Link } from 'react-router-dom';
import { useContext } from "react";
import AppBanner from "./AppBanner";

function StoryPage(){
    return(
        <div>
            <AppBanner/>
            <h1>The Story Page</h1>
        </div>
    );

}
export default StoryPage;