import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Container from '@mui/material/Container';
//import 'semantic-ui-css/semantic.min.css'; for some reason, when enabled, client compiles forever
import {
    RegisterScreen,
    LoginScreen,
    ForgotPassword,
    ResetPassword,
    ChangePassword,
    SplashScreen,
    HomePage,
    CreateComicScreen,
    CreateStoryScreen,
    ViewContentScreen,
    ViewUserScreen,
    UserProfile
} from './components';
import { AuthProvider } from './context/auth';

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Container>
        <Routes>
          <Route path='/' element ={<SplashScreen/>} />
          <Route path="/register/" element={<RegisterScreen/>} />
          <Route path="/login/"  element={<LoginScreen/>} /> 
          <Route path="/:comicstory/homepage/"  element={<HomePage/>} />
          <Route path= ":comicstory/userprofile/:id" element = {<UserProfile/>}/>
          <Route path= "/forgotpassword/" element={<ForgotPassword/>}/>
          <Route path="/resetpassword/:id/:token/" element={<ResetPassword/>}/>
          <Route path="/changepassword/:id" element={<ChangePassword/>}/>
          <Route path= "/createcomic/:id/" element={<CreateComicScreen/>}/>
          <Route path= "/createstory/:id/" element={<CreateStoryScreen/>}/>
          <Route path= "/:comicstory/viewcontent/:id/" element={<ViewContentScreen/>}/>
          <Route path= "/:comicstory/viewuser/:id/" element={<ViewUserScreen/>}/>
        </Routes>
      </Container>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
