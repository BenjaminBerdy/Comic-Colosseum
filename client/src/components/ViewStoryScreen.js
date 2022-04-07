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
import { authContext } from "../App";
import { Typography } from "@mui/material";




function renderRow(props) {
    const { index, style } = props;
    return (
        <ListItem style={style} key={index} component="div" disablePadding alignItems="flex-start">
            <ListItemText 
            primary="Username : 1/1/1"
            secondary={<Typography style={{ color: '#999999' }}>Hello loved the comic</Typography>}/>
        </ListItem>
    );
  }

  export default function ViewStoryScreen(){
    const { id } = useParams();
    const {auth} = useContext(authContext);

    return(
    <div>
      <AppBanner/>
    <div id="editbar">
        <h3>Story {id}</h3> 
        <h3>By: Author</h3>  
        <h3>Published: 1/1/1 </h3>  
        <div id = "Comments">
        <h1>Comments</h1>
        {auth && (<div><TextField id="outlined-basic" sx={{input: { color: '#999999' }}} label="Add a comment..." variant="outlined" />
        <Button id="whitebuttontext">Comment</Button></div>)}
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
      <Stage width={800} height={600}/>
    </div>

        <div id = "likefollow" className="rowC">
            <Button id="whitebuttontext">Like</Button>
            <Button id="whitebuttontext">Follow Creator</Button>
        </div>
        <div id = "pageselection" className="rowC">
            <Button id="whitebuttontext">Previous Page</Button>
            <Button id="whitebuttontext">Next Page</Button>
        </div>
    
    </div>
    );

}