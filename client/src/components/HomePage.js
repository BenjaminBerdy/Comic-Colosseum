import React from "react";
import AppBanner from "./AppBanner";
import EnhancedTable from "./EnhancedTable";
import FollowedCreatorsBar from "./followedCreatorsBar";
import { useContext } from "react";
import { AuthContext } from '../context/auth';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';
import Link from '@mui/material/Link';
import { useLocation } from 'react-router-dom';
import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks';


const GET_USERS = gql`
  query{
    getUsers{
     id
     username
     totallikes
    }
}`;

let comicstory;
let pagename;
let userData;

export default function HomePage(){
  const {user} = useContext(AuthContext);
  const {loading, data} = useQuery(GET_USERS,{fetchPolicy: "network-only"});
  const location = useLocation();

  function renderRow(props) {
    const { index, style } = props;
    pagename = '/viewuser/'
    if(user && user.id === userData[index].id){
      pagename = '/userprofile/'
    }
    return (
      <ListItem style={style} key={index} component="div" disablePadding>
        <ListItemButton component={Link} href={'/' + comicstory + pagename + userData[index].id} style={{ color: 'white', textDecoration: 'none'}}>
          <ListItemText primary={index+1 + ": " + userData[index].username+" (Likes: " + userData[index].totallikes + ") "} />
        </ListItemButton>
      </ListItem>
    );
  }

  if(loading === true){
    return(<h1 style={{color:"white"}}>Loading...</h1>)
  }else{
    if (location.pathname.includes("comic")) {
      comicstory = "comic"; 
    }else if(location.pathname.includes("story")){
      comicstory = "story";
    }
    userData = data.getUsers
    console.log(userData)
    return(
        <div>
            <AppBanner/>
            <Box sx={{position:"fixed", left: 0, width: '100%', height: '100%', maxWidth: 250, bgcolor: '#4B284F', color: "white", textAlign: "center"}}>
                <h2 styles={{fontFamily: "fantasy", textAlign: "center"}}>Top Creators</h2>
                <FixedSizeList
                    height={200}
                    width={250}
                    itemSize={46}
                    itemCount={userData.length}
                    overscanCount={5}
                >
                    {renderRow}
                </FixedSizeList>
            </Box>               
            {user && <FollowedCreatorsBar/>}
            <Toolbar id="toolbar"/>
            <div id="enhancedtable">
            <EnhancedTable/>
            </div>
            
        </div>
    );
    }
}