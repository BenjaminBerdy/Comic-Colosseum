import React from "react";
import AppBanner from "./AppBanner";
import Toolbar from '@mui/material/Toolbar';
import EnhancedTable from "./EnhancedTable";
import { useParams } from "react-router-dom";
import Button from '@mui/material/Button'
//import { useLocation } from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from '../context/auth';
import gql from 'graphql-tag'
import {useQuery, useMutation} from '@apollo/react-hooks'


const GET_USER = gql`
  query($id:ID!){
    getUser(id:$id){
     username
     followedCreators
     totallikes
     totalfollowers
    }
}`;

const FOLLOW_USER = gql`
mutation follow($id: ID!, $followeduserid: ID!){
  follow(id:$id, followeduserid:$followeduserid)
  {
    id
    username
    followedCreators
  }
}`;
  

let followed = false;
export default function ViewUsercreen(){
  const [isFollowed, setIsFollowed] = React.useState(false)
  const [change, setChange] = React.useState(0)
  const {user} = useContext(AuthContext);
  var userid;
  if(user){
    userid = user.id
  }
  const {id} = useParams();
  //const location = useLocation();
  const getUser = useQuery(GET_USER, {variables: {id: userid},fetchPolicy: "network-only"})
  if(user && getUser.loading !== true){
      var followedcreators = getUser.data.getUser.followedCreators
      if(followedcreators.includes(id) && followed === false){
        followed = true;
        setIsFollowed(true)
      }
  }
  const {loading, data} = useQuery(GET_USER, {variables: {id},fetchPolicy: "network-only"});
  const [followUser] = useMutation(FOLLOW_USER,{
    onCompleted(data){
      console.log(data);
    },
    onError(err){
      console.log(err)
      console.log(err.graphQLErrors[0].extensions.errors)
    },
    variables: {
      id: userid, 
      followeduserid: id,
    }
  })

  const handleFollow = () => {
      if(!isFollowed && !followed){
        setChange(1);
      }else if(isFollowed && followed){
        setChange(-1)
      }else{
        setChange(0);
      }
      setIsFollowed(!isFollowed)
      followUser()
  }

  if(loading === true || getUser.loading === true){
    return(<h1 style={{color:"white"}}>Loading...</h1>)
  }else{
    return(
        <div>
            <AppBanner/>               
            <div id = "userbar" style={{backgroundColor: '#4B284F', color: "white", width: "100%", maxWidth: 250, textAlign: "center"}}>
            <h2 styles={{fontFamily: "fantasy"}}>{data.getUser.username}</h2>
            <h3>Followers: {data.getUser.totalfollowers + change}</h3> <h3>Likes: {data.getUser.totallikes}</h3>
            {user && !isFollowed && (<Button onClick={handleFollow} variant="outlined" size="small" color="secondary" style={{color: "white", height: "3.6vw", width: "8vw"}}>Follow</Button>)}
            {user && isFollowed && (<Button onClick={handleFollow} variant="outlined" size="small" color="secondary" style={{color: "white", height: "3.6vw", width: "8vw"}}>Unfollow</Button>)}
            </div>
            <Toolbar id="toolbar"/>
            <div id="enhancedtable">
            <EnhancedTable/>
            </div>
            
        </div>
    );
  }
}