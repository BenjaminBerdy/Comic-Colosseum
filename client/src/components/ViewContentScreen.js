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
import {Typography } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import Link from '@mui/material/Link';
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

const GET_COMMENT = gql`
  query($comicOrStoryId: String!){
    getComments(comicOrStoryId:$comicOrStoryId){
      id
      body
      username
      createdAt
      comicOrStoryId
      userId
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

const LIKE_COMIC = gql`
mutation likeComic($id: ID!, $likedComicId: ID!){
  likeComic(id:$id, likedComicId:$likedComicId)
  {
    id
    username
    likedComics
  }
}`;

const LIKE_STORY = gql`
mutation likeStory($id: ID!, $likedStoryId: ID!){
  likeStory(id:$id, likedStoryId:$likedStoryId)
  {
    id
    username
    likedStories
  }
}`;

const GET_USER = gql`
  query($id:ID!){
    getUser(id:$id){
      id
      username
      likedComics
      likedStories
    }
}`;

const CREATE_COMMENT = gql`
mutation createComment($body: String!, $username: String!, $comicOrStoryId: String!, $userId: String!){
  createComment(body: $body, username: $username, comicOrStoryId: $comicOrStoryId, userId: $userId)
  {
    id
    body
    username
    createdAt
    comicOrStoryId
    userId
  }
}`;

const DELETE_COMMENT = gql`
mutation deleteComment($id: ID!, $username: String!){
  deleteComment(id: $id, username: $username)
}`;

  let liked = false;
  export default function ViewContentScreen(){
    const [isLiked, setIsLiked] = React.useState(false)
    const [change, setChange] = React.useState(0)
    const [commentText, setCommentText] = React.useState("");
    const { id } = useParams();
    const navigate = useNavigate();
    const {user} = useContext(AuthContext);
    let userid;
    let username;
    if(user){userid = user.id; username = user.username}
    const location = useLocation();
    const [lines, setLines] = React.useState([]);
    const [text,setText] = React.useState([])
    const [backgroundColor,setBackgroundColor] = React.useState('#FFFFFF');  
    const [open, setOpen] = React.useState(false);
    const [commentId, setCommentId] = React.useState("");
    const [dialogTitle,setDialogTitle] = React.useState("");
    const [dialogMessage,setDialogMessage] = React.useState("");


    let query;
    let comicstory;
    let contentData = "";
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
    const [likecomic] = useMutation(LIKE_COMIC,{
      onCompleted(data){
        console.log(data);
      },
      onError(err){
        console.log(err)
        console.log(err.graphQLErrors[0].extensions.errors)
      },
      variables: {
        id: userid, 
        likedComicId: id,
      }
    })
    const [likestory] = useMutation(LIKE_STORY,{
      onCompleted(data){
        console.log(data);
      },
      onError(err){
        console.log(err)
        console.log(err.graphQLErrors[0].extensions.errors)
      },
      variables: {
        id: userid, 
        likedStoryId: id,
      }
    });

    const [createcomment] = useMutation(CREATE_COMMENT,{
      onCompleted({data}){
        console.log(data);
        getComments.refetch()
      },
      onError(err){
        console.log(err)
        console.log(err.graphQLErrors[0].extensions.errors)
      },
      variables: {
        body: commentText,
        username: username,
        comicOrStoryId: id,
        userId: userid
      }
    });

    const [deletecomment] = useMutation(DELETE_COMMENT,{
      onCompleted({data}){
        console.log(data);
        getComments.refetch()
      },
      onError(err){
        console.log(err)
        console.log(err.graphQLErrors[0].extensions.errors)
      },
      variables: {id: commentId, username: username}
    });

  const getUser = useQuery(GET_USER, {variables: {id: userid},fetchPolicy: "network-only"})

  if(user && getUser.loading !== true){
      var likedContent
      if(comicstory === "comic"){
        likedContent = getUser.data.getUser.likedComics
      }else if(comicstory === "story"){
        likedContent = getUser.data.getUser.likedStories
      }
      if(likedContent.includes(id) && liked === false){
        liked = true;
        setIsLiked(true)
      }
  }

    const {loading, data} = useQuery(query, {variables: {id}, fetchPolicy: "network-only"});


    const handleDelete = (event) => {
      event.preventDefault();
      if(commentId !== ""){
        handleClose();
        deletecomment();
      }else{
        if(comicstory === "comic"){
          deletecomic();
        }else if(comicstory === "story"){
          deletestory()
        }
      }
    };    
  
    const handleClickOpen = (title,message,id) => {
      setCommentId(id)
      setDialogTitle(title)
      setDialogMessage(message)
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleLike = () => {
      if(!isLiked && !liked){
        setChange(1);
      }else if(isLiked && liked){
        setChange(-1)
      }else{
        setChange(0);
      }
      setIsLiked(!isLiked)
      if(comicstory === "comic"){
        likecomic()
      }else if(comicstory === "story"){
        likestory()
      }
    }

    const handleCommentText = (e) =>{
      setCommentText(e.target.value)
    }

    const handleCreateComment = (event) => {
      event.preventDefault();
      if(commentText.trim() !== ""){
        createcomment();
      }
    }
    
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


  function renderRow(props) {
    const { index, style } = props;
    let pagename = '/viewuser/'
    if(userid && (getComments.data.getComments[index].userId === userid)){
      pagename = '/userprofile/'
    }

    let clearicon;
    if(username === getComments.data.getComments[index].username){
      clearicon = <Button onClick={()=>{handleClickOpen("Delete Comment?","Are you sure you want to delete your comment? This action cannot be undone.",getComments.data.getComments[index].id)}} variant="text" style={{color: "white"}}><ClearIcon/></Button>
    }
    return (
        <ListItem style={style} key={index} component="div" disablePadding alignItems="flex-start">
            <ListItemText 
            primary= {<Typography>{<Link href={'/' + comicstory + pagename + getComments.data.getComments[index].userId} style={{ color: '#D23CFD', textDecoration: 'none'}}>
              {getComments.data.getComments[index].username}</Link>}{": "+ getComments.data.getComments[index].createdAt}</Typography>}
            secondary={<Typography style={{ color: '#999999' }}>{getComments.data.getComments[index].body}</Typography>}
            />
          {clearicon}
        </ListItem>
    );
}

if(loading !== true){
  if(location.pathname.includes("comic")){
    contentData = data.getComic
  }else if(location.pathname.includes("story")){
    contentData = data.getStory
  }

}

const getComments = useQuery(GET_COMMENT, {variables: {comicOrStoryId: id},fetchPolicy: "network-only"})


    if(loading === true || getUser.loading === true || getComments.data === undefined){
        return(<h1 style={{color:"white"}}>Loading...</h1>)
    }else{
        if(location.pathname.includes("comic")){
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
                </Layer>
              </Stage>
            </div>
          }else if(location.pathname.includes("story")){
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
    let page = '/viewuser/'
    if(user && user.id === contentData.authorId){
      deleteButton = <Button onClick={()=>{handleClickOpen("Delete Published Content?","Are you sure you want to delete published content? This action cannot be undone.","")}} id="whitebuttontext" variant="outlined" size="small" color="secondary" style={{marginLeft: "1vw", marginTop: "1vw",color: "white", height: "2.5vw"}}>Delete</Button>
      page = '/userprofile/'
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
          {dialogTitle}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogMessage}
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
        <h3>By: <Link href={'/' + comicstory + page + contentData.authorId} style={{ color: '#B23CFD', textDecoration: 'none'}}>{contentData.author}</Link></h3>

        <h3>Published: {contentData.publishDate}</h3>
        <div className="rowC">
          <h3>Likes: {contentData.likes + change}</h3>  
          {user && !isLiked && (<Button onClick={handleLike} id="whitebuttontext" variant="outlined" size="small" color="secondary" style={{marginLeft: "2vw", color: "white", height: "2.5vw"}}>Like</Button>)}
          {user && isLiked && (<Button onClick={handleLike} id="whitebuttontext" variant="outlined" size="small" color="secondary" style={{marginLeft: "2vw", color: "white", height: "2.5vw"}}>Remove Like</Button>)}
        </div>  
        <div id = "Comments">
        <h2 style={{textAlign: "left"}}>Community Interaction</h2>
        {user && (<div className="rowC"><TextField
          label="Comment"
          placeholder="Add a comment..."
          variant="standard"
          sx={{ input: { color: 'white' }}}
          color="secondary"
          focused
          value={commentText}
          onChange={handleCommentText}
        />
        <Button onClick={handleCreateComment} id="whitebuttontext" variant="outlined" size="small" color="secondary" style={{marginTop: "1vw", marginLeft: "1vw", color: "white", height: "2.5vw"}}>Comment</Button></div>)}
        <Box
            sx={{ width: '100%', height: '100%', color: "white", bgcolor: '#4B284F', marginTop:'1%', marginLeft:'1%'}}
            >
            <br/>
            <FixedSizeList
                height={290}
                width={'100%'}
                itemSize={100}
                itemCount={getComments.data.getComments.length}
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