import React from "react";
import AppBanner from "./AppBanner";
import UnpublishedList from "./UnpublishedList";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import EnhancedTable from "./EnhancedTable";
import Button from '@mui/material/Button'
import { useNavigate, useLocation } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { AuthContext } from '../context/auth';
import { useContext } from "react";
import gql from 'graphql-tag'
import {useQuery, useMutation} from '@apollo/react-hooks'
import Link from '@mui/material/Link';


const GET_USER = gql`
  query($id:ID!){
    getUser(id:$id){
     username
     totallikes
     totalfollowers
    }
}`;

const DELETE_USER = gql`
  mutation deleteUser($id:ID!){
    deleteUser(id: $id)
}`;

const CREATE_COMIC = gql`
  mutation createComic($author: String!, $authorId: String!){
    createComic(author:$author, authorId:$authorId){
      id
    }
  }`;

const CREATE_STORY = gql`
mutation createStory($author: String!, $authorId: String!){
  createStory(author:$author, authorId:$authorId){
    id
  }
}`;

export default function UserProfile(props){
  const navigate = useNavigate();
  const{user, logout}= useContext(AuthContext);
  const id = user.id;
  const username = user.username;
  const {loading, data} = useQuery(GET_USER, {variables: {id}});

  const [open, setOpen] = React.useState(false);
  const [msg] = React.useState('Deletion is permanent and cannot be undone. Continue?');

  const [createNewComic] = useMutation(CREATE_COMIC,{
    onCompleted(data){
      navigate("/createcomic/" + data.createComic.id + "/")
    },
    onError(err){
      console.log(err)
      console.log(err.graphQLErrors[0].extensions.errors)
    },
    variables: {
      author: username, 
      authorId: id
    }
  })
  const [createNewStory] = useMutation(CREATE_STORY,{
    onCompleted(data){
      navigate("/createstory/" + data.createStory.id + "/")
    },
    onError(err){
      console.log(err)
      console.log(err.graphQLErrors[0].extensions.errors)
    },
    variables: {
      author: username, 
      authorId: id
    }
  })

  const [deletedUser] = useMutation(DELETE_USER,{
    update(_,{data}){
      if(location.pathname.includes("comic")){
        navigate('/comic/homepage/')
      }else if(location.pathname.includes("story")){
        navigate('/story/homepage/')
      }
      logout()
    },
    onError(err){
      console.log(err)
      console.log(err.graphQLErrors[0].extensions.errors)
    },
    variables: {id}
  })

  const handleCreateComic = (event) =>{
    event.preventDefault();
    createNewComic();
  }

  const handleCreateStory = (event) =>{
    event.preventDefault();
    createNewStory();
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    deletedUser();
  };    

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
   
    const location = useLocation();
    let createbutton;
    if (location.pathname.includes("comic")) {
      createbutton= <Button onClick={handleCreateComic}id="whitebuttontext" variant="outlined" size="small" color="secondary" style={{marginLeft: ".5vw", color: "white", height: "2.5vw"}}>Create Comic</Button>
    }else if(location.pathname.includes("story")){
      createbutton= <Button onClick={handleCreateStory}id="whitebuttontext" variant="outlined" size="small" color="secondary" style={{marginLeft: ".5vw", color: "white", height: "2.5vw"}}>Create Story</Button>
    }


    if(loading === true){
      return(<h1 style={{color:"white"}}>Loading...</h1>)
    }else{
    return(

        <div>
          <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete Account?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {msg}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button onClick={handleSubmit}>Confirm</Button>
          <Button onClick={handleClose} autoFocus>
            Dismiss
          </Button>
        </DialogActions>
      </Dialog>
          
            <AppBanner/>  
            <div id = "userbar" style={{backgroundColor: '#4B284F', color: "white", width: "100%", maxWidth: 250, textAlign: "center"}}>
            <h1>{user.username}</h1>
            <h3>Followers: {data.getUser.totalfollowers}</h3> <h3>Likes: {data.getUser.totallikes}</h3>
            {createbutton}
            <Box
                sx={{position:"fixed", left: 0, width: '100%', height: '100%', maxWidth: 250, bgcolor: '#4B284F' }}
              >
              <br/>
              <UnpublishedList/>
            </Box>
            <Link href={'/changepassword/'+user.id}><Button variant="outlined" size="small" color="secondary" style={{marginLeft: "-11.5vw", position: "absolute", fontSize: 10, bottom: "4.2vw", color: "white", width: "7vw", height: "3vw"}}>Change Password</Button></Link>
            <Button onClick={handleClickOpen} variant="outlined" size="small" color="secondary" style={{marginLeft: "-4vw", marginRight: "50vw", position: "absolute", fontSize: 10, bottom: "4.2vw", color: "white", width: "7vw", height: "3vw"}}>Delete Profile</Button>
            </div>    
            <Toolbar id="toolbar"/>
            <div id="enhancedtable">
            <EnhancedTable/>
            </div>
            
        </div>
    );
  }
}