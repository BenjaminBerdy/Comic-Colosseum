import React from "react";
import AuthContext from '../auth'
import { GlobalStoreContext } from '../store'
import { useContext } from "react";
import AppBanner from "./AppBanner";
import SideBar from "./SideBar";

export default function ComicPage(){
    return(
        <div>
            <SideBar/>
            <AppBanner/>
            <h1>The Comic Page</h1>
        </div>
    );

}