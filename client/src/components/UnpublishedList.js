import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';
import { useLocation } from 'react-router-dom';
import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks';
import { useContext } from "react";
import { AuthContext } from '../context/auth';
import Link from '@mui/material/Link';


const GET_COMICS = gql`
  query{
    getComics{
      id
      title
      author
      authorId
      publishDate
      likes
    }
}`;

const GET_STORIES = gql`
  query{
    getStories{
      id
      title
      author
      authorId
      publishDate
      likes
    }
}`;


let contentData;
let comicstory;
let rows = [];

function renderRow(props) {
  const { index, style } = props;
  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton component={Link} href={'/create'+ comicstory +'/' + rows[index].id} style={{ color: 'white', textDecoration: 'none'}}>
        <ListItemText primary={rows[index].title} />
      </ListItemButton>
    </ListItem>
  );
}

export default function UnpublishedList() {
  rows = [];
  const location = useLocation();
  const{user}= useContext(AuthContext);

  let query;
  if (location.pathname.includes("comic")) {
    comicstory = "comic"
    query = GET_COMICS;
  }else if(location.pathname.includes("story")){
    comicstory = "story";
    query = GET_STORIES;
  }  
  const {loading, data} = useQuery(query);
 
  if(loading === true){
    return(<h1 style={{color:"white"}}>Loading...</h1>)
  }else{
    if (location.pathname.includes("comic")) {
      contentData = data.getComics
    }else if(location.pathname.includes("story")){
      contentData = data.getStories
    }

  for(let i = 0; i < contentData.length; i++){
    if(contentData[i].publishDate === "" && contentData[i].authorId === user.id){
      rows.push(contentData[i]);
    }
  }

  return (
    <div><h2>Unpublished Content</h2>
      <FixedSizeList
        height={300}
        width={250}
        itemSize={46}
        itemCount={rows.length}
        overscanCount={5}
      >
        {renderRow}
      </FixedSizeList></div>
  );
  }
}