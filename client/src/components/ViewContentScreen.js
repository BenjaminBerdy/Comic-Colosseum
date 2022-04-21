import React from "react";
import { useParams } from "react-router-dom";
import AppBanner from "./AppBanner";
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';
import { useContext } from "react";
import { AuthContext } from '../context/auth';
import { Typography } from "@mui/material";
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import gql from 'graphql-tag';
import { Stage, Layer, Line,Rect , Text } from 'react-konva';
import {useQuery } from '@apollo/react-hooks';

const GET_COMIC = gql`
  query($id:ID!){
    getComic(id:$id){
      id
      title
      author
      authorId
      publishDate
      likes
      backgroundColor
      linex
      liney
      points
      strokeWidth
      stroke
      fontFamily
      fontSize
      text
      textx
      texty
      textcolor
    }
}`;

const GET_STORY = gql`
  query($id:ID!){
    getStory(id:$id){
      title
      author
      authorId
      publishDate
      likes
    }
}`;



function renderRow(props) {
    const { index, style } = props;
    return (
        <ListItem style={style} key={index} component="div" disablePadding alignItems="flex-start">
            <ListItemText 
            primary="Username commented on: 1/1/1"
            secondary={<Typography style={{ color: '#999999' }}>Hey! I love your content!!</Typography>}/>
        </ListItem>
    );
  }

  export default function ViewContentScreen(){
    const { id } = useParams();
    const {user} = useContext(AuthContext);
    const location = useLocation();
    const [lines, setLines] = React.useState([]);
    const [text,setText] = React.useState([])
    const [backgroundColor,setBackgroundColor] = React.useState('#FFFFFF');  
    let query;
    let comicstory;
    let contentData;
    if (location.pathname.includes("comic")) {
        comicstory = 'comic'
        query = GET_COMIC
    }else if(location.pathname.includes("story")){
        comicstory = 'story'
        query = GET_STORY
    }

    const {loading, data} = useQuery(query, {variables: {id}});

    React.useEffect(() => {
      if(loading === false){
        console.log(data)
        for(let i = 0; i < data.getComic.points.length; i++){
          setLines((oldValue) => [...oldValue, {x:data.getComic.linex[i], y:data.getComic.liney[i], points: data.getComic.points[i], 
            stroke:data.getComic.stroke[i], strokewidth:data.getComic.strokeWidth[i] }]);
        }
        for(let i = 0; i < data.getComic.text.length; i++){
          setText((oldValue) => [...oldValue, {x: data.getComic.textx[i], y:data.getComic.texty[i], text:data.getComic.text[i], 
            fontFamily:data.getComic.fontFamily[i], fontSize:data.getComic.fontSize[i], fill:data.getComic.textcolor[i]}]);
        }
        setBackgroundColor(data.getComic.backgroundColor)
      } 
  }, [data]) // eslint-disable-line react-hooks/exhaustive-deps

    if(loading === true){
        return(<h1 style={{color:"white"}}>Loading...</h1>)
    }else{
        if(location.pathname.includes("comic")){
            contentData = data.getComic
          }else if(location.pathname.includes("story")){
            contentData = data.getStory
          }
    return(
    <div>
      <AppBanner/>
    <div id="editbar">
        <h3>{contentData.title}</h3>
        <h3>By: <Link to={'/' + comicstory + '/viewuser/' + contentData.authorId} style={{ color: '#B23CFD', textDecoration: 'none'}}>{contentData.author}</Link></h3>
        <h3>Published: {contentData.publishDate}</h3>
        <div className="rowC">
          <h3>Likes: {contentData.likes}</h3>  
          <Button id="whitebuttontext" variant="outlined" size="small" color="secondary" style={{marginLeft: "2vw", color: "white", height: "2.5vw"}}>Like</Button>
        </div>  
       
        <div id = "Comments">
        <h2 style={{textAlign: "left"}}>Community Interaction</h2>
        {user && (<div><TextField
          label="Comment"
          defaultValue="Add a comment..."
          variant="standard"
          sx={{ input: { color: 'white' } }}
          color="secondary"
          focused
        />
        <Button id="whitebuttontext" variant="outlined" size="small" color="secondary" style={{marginTop: "1vw", marginLeft: "4vw", color: "white", height: "2.5vw"}}>Comment</Button></div>)}
        <Box
            sx={{ width: '100%', height: '100%', color: "white", bgcolor: '#4B284F', marginTop:'1%', marginLeft:'1%'}}
            >
            <br/>
            <FixedSizeList
                height={350}
                width={'100%'}
                itemSize={46}
                itemCount={20}
                overscanCount={5}
            >
                {renderRow}
            </FixedSizeList>
            </Box>

        </div>
    </div>

    <div id="canvas">
    <Stage
        width={1050}
        height={600}
      >
        <Layer>
        <Rect
          x={0}
          y={0}
          width={1050}
          height={600}
          fill={backgroundColor}
          shadowBlur={10}
        />
        {text.map((txt, i) => (
            <Text
              x = {txt.x}
              y = {txt.y}
              key={i}
              fontFamily= {txt.fontFamily}
              fontSize={txt.fontSize}
              text = {txt.text}
              fill ={txt.fill}      
              
            />
          ))}
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke={line.stroke}
              strokeWidth={line.strokewidth}
              tension={0.5}
              lineCap="round"
            />
          ))}
        </Layer>
      </Stage>
    </div>
    
    </div>
    );
    }
}