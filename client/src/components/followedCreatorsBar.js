import * as React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';
import Link from '@mui/material/Link';
import { useLocation } from 'react-router-dom';
import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks';
import { AuthContext } from '../context/auth';
import { useContext } from "react";

const GET_USERS = gql`
  query{
    getUsers{
     id
     username
    }
}`;

const GET_USER = gql`
  query($id:ID!){
    getUser(id:$id){
     id
     username
     followedCreators
    }
}`;

let userData;
let comicstory;

function renderRow(props) {
  const { index, style } = props;
  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton component={Link} href={'/'+ comicstory +'/viewuser/' + userData[index].id} style={{ color: 'white', textDecoration: 'none'}}>
        <ListItemText primary={userData[index].username} />
      </ListItemButton>
    </ListItem>
  );
}


export default function FollowedCreatorsBar() {
  const location = useLocation();
  const{user}= useContext(AuthContext);
  const {loading, data} = useQuery(GET_USERS,{fetchPolicy: "network-only"});
  const getUser = useQuery(GET_USER, {variables: {id: user.id},fetchPolicy: "network-only"})
 
  if(loading === true || getUser.loading === true){
    return(<h1 style={{color:"white"}}>Loading...</h1>)
  }else{
    userData = []
    if (location.pathname.includes("comic")) {
      comicstory = "comic"; 
    }else if(location.pathname.includes("story")){
      comicstory = "story";
    }
    console.log()
    for(let i = 0; i < data.getUsers.length; i++){
      if(getUser.data.getUser.followedCreators.includes(data.getUsers[i].id)){
        userData.push(data.getUsers[i])
      }
    }


  return (
    <Box
      sx={{position:"fixed", left: 0, top: 350, width: '100%', height: '100%', maxWidth: 250, bgcolor: '#4B284F', color: "white", textAlign: "center"}}
    >
    <h2 styles={{fontFamily: "fantasy", textAlign: "center"}}>Followed Creators</h2>
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
  );
  }
}