import React from "react";
//import { useParams } from "react-router-dom";
import { Stage, /*Layer ,Text*/ } from 'react-konva';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button'
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import { Typography } from "@mui/material";
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import AppBanner from "./AppBanner";
import { Icon } from '@iconify/react';






  export default function CreateStoryScreen(){
    //const { id } = useParams();
    const [tool] = React.useState('pen');
    const [lines, setLines] = React.useState([]);
    const isDrawing = React.useRef(false);
    const [currentpage, setCurrentPage] = React.useState('Page 1');
    const [fontsize, setFontSize] = React.useState(30);


  const handlePageChange = (event) => {
    setCurrentPage(event.target.value);
  };

 
   const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { tool, points: [pos.x, pos.y] }]);
  };

  const handleMouseMove = (e) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const handleFontSliderChange = (event, newFontSize) => {
    setFontSize(newFontSize);
  };
    
return(
  <div>
    <AppBanner/>
  <div id="editbar" style={{ fontFamily: 'system-ui' }}>
    <h3 style={{ textAlign: 'center' }}>Story Creation Tools:</h3>
  <TextField
    id="standard-helperText"
    label="Title"
    defaultValue="Untitled Comic"
    variant="standard"
    style={{ marginBottom: '2vw' }}
    sx={{ input: { color: 'white' } }}
    color="secondary"
  />
  <div className='rowC'>
  <FormControl >
      <InputLabel id="demo-simple-select-label" sx={{ input: { color: 'white' } }}
    color="secondary" focused>Current Page</InputLabel>
      <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={currentpage}
          label="Current Page"
          onChange={handlePageChange}
          color="secondary"
          style={{width: "8vw", marginRight: "2vw", color: "white"}}
      >
          <MenuItem value={"Page 1"}>Page 1</MenuItem>
          <MenuItem value={"Page 2"}>Page 2</MenuItem>
          <MenuItem value={"Page 3"}>Page 3</MenuItem>
      </Select>
  </FormControl>
  <Button id="whitebuttontext" size="small" variant="outlined" color="secondary" style={{marginLeft: "2vw", color: "white", height: "3.6vw", width: "8vw"}}>Add Page</Button>
  <Button variant="outlined" size="small" color="secondary" style={{marginLeft: ".5vw", color: "white", height: "3.6vw"}}>Remove Page</Button>
  </div>
  <div className="rowC">
  <Button variant="text" style={{marginLeft: "5vw", marginTop: "1vw", color: "white"}}><Icon icon="mdi:eraser" color="white" width="24" height="24"/></Button>
  <Button variant="text" style={{marginTop: "1vw", color: "white"}}><FormatColorFillIcon/></Button>
  </div>
  <br/>
      <Box sx={{ width: 250 }}>
      <Typography id="input-slider" gutterBottom>Font Size</Typography>
      <Grid container spacing={2} alignItems="center">
          <Grid item xs>
          <Slider
              value={typeof fontsize === 'number' ? fontsize : 0}
              onChange={handleFontSliderChange}
              aria-labelledby="input-slider"
              color="secondary"
              valueLabelDisplay="auto"
          />
          </Grid>
          <Grid item>
          </Grid>
      </Grid>
      </Box>
  <br/>
  <div className="rowC">           
  <TextField
    id="standard-helperText"
    label="Text"
    defaultValue="Untitled Text"
    variant="standard"
    style={{ marginBottom: '2vw' }}
    sx={{ input: { color: 'white' } }}
    color="secondary"
  />
  <Button id="whitebuttontext" size="small" variant="outlined" color="secondary" style={{marginLeft: "1vw", height: "3vw", color: "white"}}>Add Text</Button>
  </div>
  <div>
  Current Color: <input id="backgroundColor" type="color"/>
  </div>
  <div className="rowC">
  <Button id="whitebuttontext" size="small" variant="outlined" color="secondary" style={{marginTop: "2vw", marginLeft: "3vw", height: "3vw", color: "white"}}>Undo</Button>
  <Button id="whitebuttontext" size="small" variant="outlined" color="secondary" style={{marginTop: "2vw", marginLeft: "3vw", height: "3vw", color: "white"}}>Redo</Button>
  </div>
  <br/>
  </div>

  <div id="canvas">
<Stage
  width={1050}
  height={600}
  onMouseDown={handleMouseDown}
  onMousemove={handleMouseMove}
  onMouseup={handleMouseUp}
>
</Stage>
</div>
<div id="buttonDiv" style={{backgroundColor: "#4B284F", width: 1050.6, height: 50, position: "absolute", right: 76, bottom: 45}}>
  <div id = "save-publish-delete" className="rowC">
      <Button id="whitebuttontext" variant="outlined" size="small" color="secondary" style={{marginRight: "1vw", color: "white", height: "2.5vw"}}>Save</Button>
      <Button id="whitebuttontext" variant="outlined" size="small" color="secondary" style={{marginRight: "1vw", color: "white", height: "2.5vw"}}>Publish</Button>
      <Button id="whitebuttontext" variant="outlined" size="small" color="secondary" style={{marginRight: "1vw", color: "white", height: "2.5vw"}}>Delete</Button>
  </div>
</div>
</div>
);

}