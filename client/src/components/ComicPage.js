import React from "react";
import AuthContext from '../auth'
import { GlobalStoreContext } from '../store'
import { useContext } from "react";
import AppBanner from "./AppBanner";

export default function ComicPage(){
    return(
        <div>
            <AppBanner/>
            <h1>The Comic Page</h1>
        </div>
    );

}