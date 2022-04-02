import React from "react";
import AppBanner from "./AppBanner";
import SideBar from "./SideBar";
import { useParams } from "react-router-dom";


export default function ViewUsercreen(){
    const { id } = useParams();
    return(
        <div>
            <h1>View User Page</h1>
            <text>{id}</text>

        </div>
    );

}