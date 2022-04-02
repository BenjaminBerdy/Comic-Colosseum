import React from "react";
import '../App.css';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function SplashScreen(){
    return(
        <div id="splash-screen">
            <div id="splash-welcome"><h5>Welcome to <br/> Comic Colosseum</h5></div>
            <div id="splash-message"><i>Read and Make epic<br/></i>
            Comics and Stories<br/>
            </div>
            <Link to='/storypage/'><Button class="splash-button1">Stories</Button></Link>
            <Link to='/comicpage/'><Button class="splash-button2">Comics</Button></Link>
        </div>
    )
}
export default SplashScreen;