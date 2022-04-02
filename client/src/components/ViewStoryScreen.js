import React from "react";
import AppBanner from "./AppBanner";
import { useParams } from "react-router-dom";


export default function ViewStoryScreen(){
    const { id } = useParams();
    return(
        <div>
            <AppBanner/><br/>
            <h1>View Comic Page</h1>
            <text>{id}</text>

        </div>
    );

}