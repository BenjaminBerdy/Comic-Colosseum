import * as React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks';

const GET_USERS = gql`
  query{
    getUsers{
     id
     username
    }
}`;


let userData;
let comicstory;

function renderRow(props) {
  const { index, style } = props;
  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton component={Link} to={'/'+ comicstory +'/viewuser/' + userData[index].id} style={{ color: 'white', textDecoration: 'none'}}>
        <ListItemText primary={userData[index].username} />
      </ListItemButton>
    </ListItem>
  );
}

export default function FollowedCreatorsBar() {
  const location = useLocation();
  const {loading, data} = useQuery(GET_USERS,{fetchPolicy: "network-only"});
 
  if(loading === true){
    return(<h1 style={{color:"white"}}>Loading...</h1>)
  }else{
    userData = data.getUsers
    if (location.pathname.includes("comic")) {
      comicstory = "comic"; 
    }else if(location.pathname.includes("story")){
      comicstory = "story";
    }
  return (
    <Box
      sx={{position:"fixed", left: 0, width: '100%', height: '100%', maxWidth: 250, bgcolor: '#4B284F', color: "white", textAlign: "center"}}
    >
    <h2 styles={{fontFamily: "fantasy", textAlign: "center"}}>Followed Creators</h2>
      <FixedSizeList
        height={600}
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