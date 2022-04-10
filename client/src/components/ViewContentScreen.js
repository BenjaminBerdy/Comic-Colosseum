import React from "react";
import { useParams } from "react-router-dom";
import { Stage} from 'react-konva';
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

    let authorlink;
    let title;
    if (location.pathname.includes("comic")) {
        authorlink = <h3>By:<Link to='/comic/viewuser/6252f1926f3fc25327a13160' style={{ color: '#B23CFD', textDecoration: 'none'}}> Author </Link></h3>
        title = <h3>Comic {id}</h3>
    }else if(location.pathname.includes("story")){
        authorlink = <h3>By:<Link to='/story/viewuser/6252f1926f3fc25327a13160' style={{ color: '#B23CFD', textDecoration: 'none'}}> Author </Link></h3>
        title = <h3>Story {id}</h3>
    }

    return(
    <div>
      <AppBanner/>
    <div id="editbar">
        {title} 
        {authorlink}  
        <h3>Published: 1/1/1 </h3>  
        <div id = "Comments">
        <h2 style={{textAlign: "left"}}>Community Interaction</h2>
        {user && (<div><TextField
          label="Comment"
          defaultValue="Add a comment..."
          variant="standard"
          sx={{ input: { color: 'white' } }}
          color="secondary"
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
      <Stage width={1050} height={600}/>
    </div>
    <div id="buttonDiv" style={{backgroundColor: "#4B284F", width: 1050.6, height: 50, position: "absolute", right: 76, bottom: 45}}>
        {user && (
        <div id = "likefollow" className="rowC">
            <Button id="whitebuttontext" variant="outlined" size="small" color="secondary" style={{marginRight: "1vw", color: "white", height: "2.5vw"}}>Like</Button>
            <Button id="whitebuttontext" variant="outlined" size="small" color="secondary" style={{color: "white", height: "2.5vw"}}>Follow Creator</Button>
        </div>
        )}
        <div id = "pageselection" className="rowC">
            <Button id="whitebuttontext" variant="outlined" size="small" color="secondary" style={{marginRight: "1vw", color: "white", height: "2.5vw"}}>Previous Page</Button>
            <Button id="whitebuttontext" variant="outlined" size="small" color="secondary" style={{color: "white", height: "2.5vw"}}>Next Page</Button>
        </div>
    </div>
    </div>
    );

}