import React from "react";
import { useParams, useNavigate} from "react-router-dom";
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
import {useQuery, useMutation} from '@apollo/react-hooks';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

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
      id
      title
      author
      authorId
      publishDate
      likes
      backgroundColor
      fontFamily
      fontSize
      fontStyle
      textDecoration
      text
      textx
      texty
      textColor
    }
}`;

const DELETE_COMIC = gql`
mutation deleteComic($id: ID!, $authorId: ID!){
  deleteComic(id:$id, authorId:$authorId)
}`;

const DELETE_STORY = gql`
mutation deleteStory($id: ID!, $authorId: ID!){
  deleteStory(id:$id, authorId:$authorId)
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
    const navigate = useNavigate();
    const {user} = useContext(AuthContext);
    let userid;
    if(user){userid = user.id}
    const location = useLocation();
    const [lines, setLines] = React.useState([]);
    const [text,setText] = React.useState([])
    const [backgroundColor,setBackgroundColor] = React.useState('#FFFFFF');  
    const [open, setOpen] = React.useState(false);
    const [msg] = React.useState('Are sure you want delete a published content? Deletion is permanent and cannot be undone. Continue?');
    let query;
    let comicstory;
    let contentData;
    let deleteButton;
    let canvas;
    if (location.pathname.includes("comic")) {
        comicstory = 'comic'
        query = GET_COMIC
    }else if(location.pathname.includes("story")){
        comicstory = 'story'
        query = GET_STORY
    }
    const [deletecomic] = useMutation(DELETE_COMIC,{
      update(_,{data}){
        console.log(data);
        navigate("/comic/homepage/");
      },
      onError(err){
        console.log(err)
        console.log(err.graphQLErrors[0].extensions.errors)
      },
      variables: {id: id, authorId: userid}
    });
    const [deletestory] = useMutation(DELETE_STORY,{
      update(_,{data}){
        console.log(data);
        navigate("/story/homepage/");
      },
      onError(err){
        console.log(err)
        console.log(err.graphQLErrors[0].extensions.errors)
      },
      variables: {id: id, authorId: userid}
    });
    const {loading, data} = useQuery(query, {variables: {id}});

    const handleDelete = (event) => {
      event.preventDefault();
      if(comicstory === "comic"){
        deletecomic();
      }else if(comicstory === "story"){
        deletestory()
      }
    };    
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    

    React.useEffect(() => {
      if(loading === false && comicstory === "comic"){
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
      }else if(loading === false && comicstory === "story"){
        for(let i = 0; i < data.getStory.text.length; i++){
          setText((oldValue) => [...oldValue, {x: data.getStory.textx[i], y:data.getStory.texty[i], text:data.getStory.text[i], 
          fontFamily:data.getStory.fontFamily[i], fontSize:data.getStory.fontSize[i], fill:data.getStory.textColor[i], 
          fontStyle: data.getStory.fontStyle[i], textDecoration: data.getStory.textDecoration[i], highlight: ""}]);
        }
        setBackgroundColor(data.getStory.backgroundColor)
      }


  }, [data]) // eslint-disable-line react-hooks/exhaustive-deps

    if(loading === true){
        return(<h1 style={{color:"white"}}>Loading...</h1>)
    }else{
        if(location.pathname.includes("comic")){
            contentData = data.getComic
            canvas = <div id="canvas">
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
          }else if(location.pathname.includes("story")){
            contentData = data.getStory
            canvas =  <div id="canvas">
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
                    index = {i}
                    stroke = {txt.highlight}
                    strokeWidth= {"0.2"}
                    fontFamily= {txt.fontFamily}
                    fontSize={txt.fontSize}
                    fontStyle = {txt.fontStyle}
                    textDecoration = {txt.textDecoration}
                    text = {txt.text}
                    fill ={txt.fill}
                  />
                ))}
              </Layer>
            </Stage>
          </div>
          }
    if(user && user.id === contentData.authorId){
      deleteButton = <Button onClick={handleClickOpen} id="whitebuttontext" variant="outlined" size="small" color="secondary" style={{marginLeft: "1vw", marginTop: "1vw",color: "white", height: "2.5vw"}}>Delete</Button>
    }
    
    return(
    <div>
      <AppBanner/>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete Published Content?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {msg}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button onClick={handleDelete}>Confirm</Button>
          <Button onClick={handleClose} autoFocus>
            Dismiss
          </Button>
        </DialogActions>
      </Dialog>
    <div id="editbar">
    <div className="rowC">
      <h2>{contentData.title}</h2>
      {deleteButton}
    </div>
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
    {canvas}
    </div>
    );
    }
}

/*
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

    <div id="canvas">
      <Stage
        width={1050}
        height={600}
        onMouseDown={handleMouseDown}

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
              index = {i}
              stroke = {txt.highlight}
              strokeWidth= {"0.2"}
              fontFamily= {txt.fontFamily}
              fontSize={txt.fontSize}
              fontStyle = {txt.fontStyle}
              textDecoration = {txt.textDecoration}
              draggable = {tool[1]}
              text = {txt.text}
              fill ={txt.fill}
              onClick={(e) =>{
                if(tool[0] === 'erase'){
                  edithistory = true;
                  setText(text.filter((_, j) => j !== i))
                }else if(tool[0] === 'select'){
                  setCurrentSelection(e.target)
                  setFontFamily(e.target.attrs.fontFamily)
                  setFontSize(e.target.attrs.fontSize)
                  setTextColor(e.target.attrs.fill)
                  setValueText(e.target.attrs.text)
                  setFontStyle(e.target.attrs.fontStyle)
                  setTextDecoration(e.target.attrs.textDecoration)
                  setHighlight("#00ffff")
                }
              }}
              onDragEnd={(e) => {
                let temptext = Array.from(text)
                temptext[i].x = e.target.x();
                temptext[i].y = e.target.y();
                edithistory = true;
                setText(temptext);
              }}
              
            />
          ))}
        </Layer>
      </Stage>
    </div>
*/