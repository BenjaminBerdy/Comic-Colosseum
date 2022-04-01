import React from "react";
import '../App.css';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'

function SplashScreen(){
    return(
        <div id="splash-screen">
            <div id="splash-welcome"><h5>Welcome to <br/> Comic Colessuem</h5></div>
            <div id="splash-message">A place where anyone can <br/>
            create and read their <br/>
            Comics and Stories<br/>
            </div>
            <Button class="splash-button1">Stories</Button>
            <Button class="splash-button2">Comics</Button>
        <div id="splash-student"><strong>©</strong></div>
        </div>
    )
}
export default SplashScreen;
/*
import { useContext } from 'react'
//import Button from '@mui/material/Button';
import AuthContext from '../auth'
import { GlobalStoreContext } from '../store'
import { Link } from 'react-router-dom'

export default function SplashScreen() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const guestLogin = () => {

    }


    return (
        <div id="splash-screen">
            <div id="splash-welcome"><h5>Welcome to <br/> Comic Colessuem</h5></div>
        </div>
    )
    /*
    <div id="splash-welcome"><h5>Welcome to <br/> Comic Colessuem</h5></div>
            <div id="splash-message">A place where anyone can <br/>
            create and read their <br/>
            Comics and Stories<br/>
            </div>
            <Link to='/register/'><Button class="splash-button1">Create Account</Button></Link>
            <Link to='/login/'><Button class="splash-button2">Login</Button></Link>
            <Button class="splash-button3" onClick = {guestLogin}>Continue as Guest</Button>
        <div id="splash-student"><strong>©</strong></div>
    }
*/