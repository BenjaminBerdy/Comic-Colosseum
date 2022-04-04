import React from "react";
//import { useParams } from "react-router-dom";
import { Stage, Layer, Line /*,Text*/ } from 'react-konva';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button'
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import { Typography } from "@mui/material";
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import { styled } from '@mui/material/styles';
import AppBanner from "./AppBanner";







  export default function CreateComicScreen(){
    //const { id } = useParams();
    const [tool] = React.useState('pen');
    const [lines, setLines] = React.useState([]);
    const isDrawing = React.useRef(false);
    const [currentpage, setCurrentPage] = React.useState('Page 1');
    const [fontsize, setFontSize] = React.useState(30);
    const [strokewidth, setStrokeSize] = React.useState(30);


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

  const handleFontInputChange = (event) => {
    setFontSize(event.target.fontsize === '' ? '' : Number(event.target.fontsize));
  };

  const handleFontBlur = () => {
    if (fontsize < 0) {
        setFontSize(0);
    } else if (fontsize > 100) {
        setFontSize(100);
    }
  };

  const handleStrokeSliderChange = (event, newstrokewidth) => {
    setStrokeSize(newstrokewidth);
  };

  const handleStrokeInputChange = (event) => {
    setStrokeSize(event.target.strokewidth === '' ? '' : Number(event.target.strokewidth));
  };

  const handleStrokeBlur = () => {
    if (strokewidth < 0) {
        setStrokeSize(0);
    } else if (strokewidth > 100) {
        setStrokeSize(100);
    }
  };

  const Input = styled(MuiInput)`
  width: 42px;
`;
    
    return(
        <div>
          <AppBanner/>
        <div id="editbar">
        <h3>Toolbar</h3>
        <TextField
          id="standard-helperText"
          label="Title"
          defaultValue="Untitled Comic"
          variant="standard"
        />
        <br/><br/>
        <div className='rowC'>
        <FormControl >
            <InputLabel id="demo-simple-select-label">Current Page</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={currentpage}
                label="Current Page"
                onChange={handlePageChange}
            >
                <MenuItem value={"Page 1"}>Page 1</MenuItem>
                <MenuItem value={"Page 2"}>Page 2</MenuItem>
                <MenuItem value={"Page 3"}>Page 3</MenuItem>
            </Select>
        </FormControl>
        <Button id="whitebuttontext" variant="text">Add Page</Button>
        <Button variant="text">Remove Current Page</Button>
        </div>
        <br/><br/>
        <div className="rowC">
        <Button variant="text"><CreateIcon/></Button>
        <Button variant="text"><DeleteIcon/></Button>
        <Button variant="text"><FormatColorFillIcon/></Button>
        <TextField
          id="standard-read-only-input"
          label="Current Tool"
          defaultValue="Pen"
          InputProps={{
            readOnly: true,
          }}
          variant="standard"
        />
        </div>
        <br/><br/>
            <Box sx={{ width: 250 }}>
            <Typography id="input-slider" gutterBottom>Stroke Width</Typography>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs>
                <Slider
                    value={typeof strokewidth === 'number' ? strokewidth : 0}
                    onChange={handleStrokeSliderChange}
                    aria-labelledby="input-slider"
                />
                </Grid>
                <Grid item>
                <Input
                    value={strokewidth}
                    size="small"
                    onChange={handleStrokeInputChange}
                    onBlur={handleStrokeBlur}
                    inputProps={{
                    step: 10,
                    min: 0,
                    max: 100,
                    type: 'number',
                    'aria-labelledby': 'input-slider',
                    }}
                />
                </Grid>
            </Grid>
            </Box>
            <Box sx={{ width: 250 }}>
            <Typography id="input-slider" gutterBottom>Font Size</Typography>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs>
                <Slider
                    value={typeof fontsize === 'number' ? fontsize : 0}
                    onChange={handleFontSliderChange}
                    aria-labelledby="input-slider"
                />
                </Grid>
                <Grid item>
                <Input
                    value={fontsize}
                    size="small"
                    onChange={handleFontInputChange}
                    onBlur={handleFontBlur}
                    inputProps={{
                    step: 10,
                    min: 0,
                    max: 100,
                    type: 'number',
                    'aria-labelledby': 'input-slider',
                    }}
                />
                </Grid>
            </Grid>
            </Box>
        <br/><br/>
        <div className="rowC">           
        <TextField
          id="standard-helperText"
          label="Text"
          defaultValue=""
          variant="standard"
        />
        <Button id="whitebuttontext" variant="text">Add Text</Button>
        </div>
        <br/><br/>           
        <div className="rowC">
        <Button id="whitebuttontext" variant="text">Undo</Button>
        <Button variant="text">Redo</Button>
        </div>
        
        </div>

        <div id="canvas">
      <Stage
        width={800}
        height={600}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
      >
        <Layer>
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke="#df4b26"
              strokeWidth={5}
              tension={0.5}
              lineCap="round"
              globalCompositeOperation={
                line.tool === 'eraser' ? 'destination-out' : 'source-over'
              }
            />
          ))}
        </Layer>
      </Stage>
    </div>
    </div>
    );

}