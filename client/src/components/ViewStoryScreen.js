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


function renderRow(props) {
    const { index, style } = props;
    return (
        <ListItem style={style} key={index} component="div" disablePadding alignItems="flex-start">
            <ListItemText
            primary="Username : 1/1/1"
            secondary={"Hello Loved the Story"}/>
        </ListItem>
    );
  }

  export default function ViewStoryScreen(){
    const { id } = useParams();

    return(
    <div>
      <AppBanner/>
    <div id="editbar">
        <h3>Story {id}</h3> 
        <h3>By: Author</h3>  
        <h3>Published: 1/1/1 </h3>  
        <div id = "Comments">
        <h1>Comments</h1>
        <TextField id="outlined-basic" label="Add a comment..." variant="outlined" />
        <Button>Comment</Button>
            <Box
            sx={{position:"fixed", left: 0, width: '100%', height: '100%', maxWidth: 450, bgcolor: 'background.paper', marginTop:'1%', marginLeft:'1%'}}
            >
            <br/>
            <FixedSizeList
                height={350}
                width={450}
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
            <Button>Like</Button>
            <Button>Follow Creator</Button>
        </div>
        <div id = "pageselection" className="rowC">
            <Button>Previous Page</Button>
            <Button>Next Page</Button>
        </div>
    
    </div>
    );

}