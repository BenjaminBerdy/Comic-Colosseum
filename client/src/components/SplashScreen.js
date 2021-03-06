import React from "react";
import '../App.css';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

function SplashScreen(){
    return[
        <div id="splash-screen-left"></div>,
        <div id="splash-screen-right">
            <div id="splash-welcome">Entering the Colosseum</div>
            <div id="splash-message">Browse, create, and interact with stories and comics. Compete for likes for yours to be on the top!
            <br></br>
                <Link href='/story/homepage/'><Button class="splash-button1">Stories</Button></Link>
                <Link href='/comic/homepage/'><Button class="splash-button2">Comics</Button></Link>
            </div>
        </div>
    ]
}
export default SplashScreen;