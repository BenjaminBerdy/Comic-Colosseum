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
    SplashScreen,
    ComicPage,
    StoryPage,
    CreateComicScreen,
    CreateStoryScreen,
    ViewComicScreen,
    ViewStoryScreen,
    ViewUserScreen,
    UserProfile
} from './components';

export const authContext = React.createContext();


function App() {
  const [auth, setAuth] = React.useState(false);

  return (
    <authContext.Provider value = {{auth,setAuth}}>
    <BrowserRouter>
      <Container>
        <Routes>
          <Route path='/' element ={<SplashScreen/>} />
          <Route path="/register/" element={<RegisterScreen/>} />
          <Route path="/login/"  element={<LoginScreen/>} /> 
          <Route path="/comicpage/"  element={<ComicPage/>} />
          <Route path="/storypage/"  element={<StoryPage/>} /> 
          <Route path= ":comicstory/userprofile/" element = {<UserProfile/>}/>
          <Route path= "/forgotpassword/" element={<ForgotPassword/>}/>
          <Route path="/resetpassword/:id/:token/" element={<ResetPassword/>}/>
          <Route path= "/createcomic/:id/" element={<CreateComicScreen/>}/>
          <Route path= "/createstory/:id/" element={<CreateStoryScreen/>}/>
          <Route path= "/viewcomic/:id/" element={<ViewComicScreen/>}/>
          <Route path= "/viewstory/:id/" element={<ViewStoryScreen/>}/>
          <Route path= "/:comicstory/viewuser/:id/" element={<ViewUserScreen/>}/>
        </Routes>
      </Container>
    </BrowserRouter>
    </authContext.Provider>
  );
}

export default App;
