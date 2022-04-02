import React from "react";
import AppBanner from "./AppBanner";
import { useParams } from "react-router-dom";


export default function CreateComicScreen(){
    const { id } = useParams();
    return(
        <div>
            <AppBanner/>
            <h1>Create Comic Page</h1>
            <text>{id}</text>
        </div>
    );

}