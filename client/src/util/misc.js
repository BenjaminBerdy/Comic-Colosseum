/*

import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import api from '../api'

const AuthContext = createContext();
console.log("create AuthContext: " + AuthContext);

// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH STATE THAT CAN BE PROCESSED
export const AuthActionType = {
    GET_LOGGED_IN: "GET_LOGGED_IN",
    REGISTER_USER: "REGISTER_USER",
    LOGGED_USER: "LOGGED_USER",
    LOGGED_OUT_USER: "LOGGED_OUT_USER",
    ERROR_DISPLAY: "ERROR_DISPLAY",
    CLOSE_ERROR_DISPLAY: "CLOSE_ERROR_DISPLAY",
}

function AuthContextProvider(props) {
    const [auth, setAuth] = useState({
        user: null,
        loggedIn: false,
        error: null
    });
    const history = useNavigate();

    useEffect(() => {
        auth.getLoggedIn();
    }, []);

    const authReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case AuthActionType.GET_LOGGED_IN: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn
                    ,error: null
                });
            }
            case AuthActionType.REGISTER_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true
                    ,error: null
                })
            }
            case AuthActionType.LOGGED_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true
                    ,error: null
                })
                
            }
            case AuthActionType.LOGGED_OUT_USER: {
                return setAuth({
                    user: null,
                    loggedIn: false
                    ,error: null
                })
            }
            case AuthActionType.ERROR_DISPLAY: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn
                    ,error: payload.error
                })
            }
            case AuthActionType.CLOSE_ERROR_DISPLAY: {
                return setAuth({
                    user: auth.user,
                    loggedIn: auth.loggedIn
                    ,error: null
                })
            }
            default:
                return auth;
        }
    }

    auth.getLoggedIn = async function () {
        const response = await api.getLoggedIn();
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.GET_LOGGED_IN,
                payload: {
                    loggedIn: response.data.loggedIn,
                    user: response.data.user
                }
            });
        }
    }

    auth.registerUser = async function(userData, store) {
        try{
            const response = await api.registerUser(userData);      
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.REGISTER_USER,
                    payload: {
                        user: response.data.user
                    }
                })
                history.push("/");
                store.loadIdNamePairs();
            }
        } catch (errorMsg) { 
            authReducer({
                type: AuthActionType.ERROR_DISPLAY,
                payload: {
                    error: errorMsg.response.data.errorMessage

                }
            })
        }
    }

    auth.loginUser = async function(userData, store) {
        try{
            const response = await api.loginUser(userData)
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.LOGGED_USER,
                    payload: {
                        user: response.data.user,
                    }
                })
                history.push("/");
                store.loadIdNamePairs();
            }
        } catch (errorMsg){
            authReducer({
                type: AuthActionType.ERROR_DISPLAY,
                payload: {
                    error: errorMsg.response.data.errorMessage
                }
            })
        }
    }

    auth.logoutUser = async function () {
        const response = await api.logoutUser();
        if(response.status === 200) {
            authReducer({
                type: AuthActionType.LOGGED_OUT_USER,
                payload: null
            })
            history.push("/");
        }
    }

    auth.closeError = function () {
        authReducer({
            type: AuthActionType.CLOSE_ERROR_DISPLAY,
            payload: null
        })
    }

    return (
        <AuthContext.Provider value={{
            auth
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export { AuthContextProvider };
















if (!data.get('username') || !data.get('email') || !data.get('password') || !data.get('confirmPassword')){
      console.log("Please enter all required fields!");
      changeMsg('Please enter all required fields!');
      handleClickOpen();
    }
    else if (data.get('password').length < 8){
      console.log("Password must be at least 8 characters long");
      changeMsg('Password must be at least 8 characters long');
      handleClickOpen();
    }
    else if (data.get('password') !== data.get('confirmPassword')){
      console.log("Please enter the same password twice!");
      changeMsg('Please enter the same password twice!');
      handleClickOpen();
    }
    else if (data.get('username') === 'username'){
      console.log("Username already taken");
      changeMsg('Username already taken');
      handleClickOpen();
    }
    else if (data.get('email') === 'email@email.com'){
      console.log("Email already in use'");
      changeMsg('Email already in use');
      handleClickOpen();
    }
    else navigate('/');

<Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Invalid Input"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {msg}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Dismiss
          </Button>
        </DialogActions>
      </Dialog>
*/