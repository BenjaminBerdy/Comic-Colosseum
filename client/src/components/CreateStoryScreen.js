import React from "react";
import AppBanner from "./AppBanner";
import { useParams } from "react-router-dom";


export default function CreateStoryScreen(){
    const { id } = useParams();
    return(
        <div>
            <AppBanner/><br/>
            <h1>Create Story Page</h1>
            <text>{id}</text>

        </div>
    );

}