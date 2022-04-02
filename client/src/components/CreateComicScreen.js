import React from "react";
import AppBanner from "./AppBanner";
import SideBar from "./SideBar";
import { useParams } from "react-router-dom";


export default function CreateComicScreen(){
    const { id } = useParams();
    return(
        <div>
            <h1>Create Comic Page</h1>
            <text>{id}</text>
        </div>
    );

}