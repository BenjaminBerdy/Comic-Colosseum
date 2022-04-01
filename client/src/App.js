import './App.css';
import {React} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Container from '@mui/material/Container';
//import 'semantic-ui-css/semantic.min.css'; for some reason, when enabled, client compiles forever
import {UserProfile} from './components';
import { AuthContextProvider } from './auth';
import { GlobalStoreContextProvider } from './store';
import {
    AppBanner,
    HomeWrapper,
    RegisterScreen,
    LoginScreen,
    SplashScreen,
    ComicPage,
    StoryPage
} from './components';

function App() {
  return (
    <BrowserRouter>
      <Container>
        <Routes>
          <Route path='/' element ={<SplashScreen/>} />
          <Route path="/register/" element={<RegisterScreen/>} />
          <Route path="/login/"  element={<LoginScreen/>} /> 
          <Route path="/comicpage/"  element={<ComicPage/>} />
          <Route path="/storypage/"  element={<StoryPage/>} /> 
          <Route path= "/userprofile" element = {<UserProfile/>}/>
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
