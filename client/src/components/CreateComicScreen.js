import React from "react";
//import { useParams } from "react-router-dom";
import { Stage, Layer, Line,Rect , Text } from 'react-konva';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button'
import CreateIcon from '@mui/icons-material/Create';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import { Typography } from "@mui/material";
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import AppBanner from "./AppBanner";
import { Icon } from '@iconify/react';
import gql from 'graphql-tag'
import { useParams } from "react-router-dom";
import {useQuery, useMutation} from '@apollo/react-hooks'

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
      points
      strokeWidth
      stroke
      fontFamily
      fontSize
      text
      textx
      texty
    }
}`;

const UPDATE_COMIC = gql`
  mutation updateComic($id: ID!, $title: String!, $backgroundColor: String!, $points: [[Int]]!, $strokeWidth: [Int]!, $stroke: [String]!, 
            $fontFamily: [String]!, $fontSize: [Int]!, $text: [String]!, $textx: [Int]!, $texty: [Int]!){
    updateComic(id:$id, title:$title, backgroundColor:$backgroundColor, points:$points, strokeWidth:$strokeWidth, stroke:$stroke, 
            fontFamily:$fontFamily, fontSize:$fontSize, text:$text, textx:$textx, texty:$texty)
    {
      id
      points
    }
  }`;


let history = [[]];
let historyStep = 0;


  export default function CreateComicScreen(){
    const { id } = useParams();
    const {loading, data} = useQuery(GET_COMIC, {variables: {id}});
    const [tool, setTool] = React.useState(['draw',false]);
    const [lines, setLines] = React.useState(history[0]);
    const [valuetext, setvaluetext] = React.useState("Text")
    const [text,setText] = React.useState([])
    const isDrawing = React.useRef(false);
    const [currentpage, setCurrentPage] = React.useState('Page 1');
    const [fontSize, setFontSize] = React.useState(30);
    const [strokewidth, setStrokeWidth] = React.useState(5);
    const [color,setColor] = React.useState('#000000'); 
    const [backgroundColor, setBackgroundColor] = React.useState('#ffffff')
    const [title, setTitle] = React.useState('Untitled Comic')
    const [saveComic] = useMutation(UPDATE_COMIC,{
      update(_,{data}){
        console.log(data)
      },
      onError(err){
        console.log(err)
        console.log(err.graphQLErrors[0].extensions.errors)
      },
      variables: {
        id: id,
        title: title,
        backgroundColor: backgroundColor,
        points: lines,
        strokeWidth: lines.strokewidth,
        stroke: lines.stroke,
        fontFamily: text.fontFamily,
        fontSize: text.fontsize,
        text: text.text,
        textx: text.x,
        texty: text.y
      }
    })

  if(loading){
    return(<h1 style={{color:"white"}}>Loading...</h1>)
  }else{
  console.log(data.getComic)

  const handleUndo = () => {
      if (historyStep === 0) {
        return;
      }
      historyStep -= 1;
      const previous = history[historyStep];
      setLines(previous);
    };

  const handleRedo = () => {
      if (historyStep === history.length - 1) {
        return;
      }
      historyStep += 1;
      const next = history[historyStep];
      setLines(next);
    };

  const handlePageChange = (event) => {
    setCurrentPage(event.target.value);
  };

 
   const handleMouseDown = (e) => {
    if(tool[0] === 'draw'){
      isDrawing.current = true;
      const pos = e.target.getStage().getPointerPosition();
      setLines([...lines, {points: [pos.x, pos.y], stroke:color, strokewidth:strokewidth }]);
      }else if(tool[0] === 'erase'){
        
    }
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
    if(tool[0] === 'draw'){
      isDrawing.current = false;
      history.push(lines);
      historyStep += 1;
      console.log(history);
      console.log(lines.strokeWidth)  
    }
    //console.log(lines)
  };

  const handleUpdateComic = (event) =>{
    event.preventDefault();
    saveComic();
  }

  const handleChangeTitle = (e) => {
    setTitle(e.target.value)
  }

  const handleChangeValueText = (e) =>{
    setvaluetext(e.target.value)
  }

  const handleColorChange = (e) =>{
    setColor(e.target.value);
  }

  const handleBackgroundColorChange = (e) =>{
    setBackgroundColor(e.target.value);
  }

  const handleFontSliderChange = (e) => {
    setFontSize(e.target.value);
  };

  const handleStrokeWidthChange = (e) =>{
    setStrokeWidth(e.target.value);
  }

  const handleAddText = (e) =>{
    setText([...text, {x: 20, y:20, text:valuetext,fontFamily:"Arial", fontSize:fontSize, fill:color}]);
  }


    return(
        <div>
          <AppBanner/>
        <div id="editbar" style={{ fontFamily: 'system-ui' }}>
          <h3 style={{ textAlign: 'center' }}>Comic Creation Tools:</h3>
        <TextField
          id="standard-helperText"
          label="Title"
          value = {title}
          onChange = {handleChangeTitle}
          variant="standard"
          style={{ marginBottom: '2vw' }}
          sx={{ input: { color: 'white' } }}
          color="secondary"
          focused
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
        <br/>
        <Typography id="input-slider" gutterBottom>Current tool: {tool[0]}</Typography>
        <div className="rowC">
        <Button onClick={() => {setTool(['draw',false]);}} variant="text" style={{marginLeft: "3vw", marginTop: "1vw", color: "white"}}><CreateIcon/></Button>
        <Button onClick={() => {setTool(['erase',false])}} variant="text" style={{marginTop: "1vw", color: "white"}}><Icon icon="mdi:eraser" color="white" width="24" height="24"/></Button>
        <Button onClick={() => {setTool(['select',true])}} variant="text" style={{marginTop: "1vw", color: "white"}}><FormatColorFillIcon/></Button>
        </div>
        <br/>
            <Box sx={{ width: 250 }}>
            <Typography id="input-slider" gutterBottom>Stroke Width</Typography>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs>
                <Slider
                    value={strokewidth}
                    onChange={handleStrokeWidthChange}
                    aria-labelledby="input-slider"
                    color="secondary"
                    valueLabelDisplay="auto"
                />
                </Grid>
                <Grid item>
                </Grid>
            </Grid>
            </Box>
            <Box sx={{ width: 250 }}>
            <Typography id="input-slider" gutterBottom>Font Size</Typography>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs>
                <Slider
                    value={fontSize}
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
          value={valuetext}
          variant="standard"
          style={{ marginBottom: '2vw' }}
          sx={{ input: { color: 'white' } }}
          color="secondary"
          focused
          onChange={handleChangeValueText}
        />
        <Button onClick={handleAddText}id="whitebuttontext" size="small" variant="outlined" color="secondary" style={{marginLeft: "1vw", height: "3vw", color: "white"}}>Add Text</Button>
        </div>
        <div>
        Current Color: <input id="color" type="color" value ={color} onChange={handleColorChange}/>
        <br/><br/>
        Background Color: <input id="color" type="color" value ={backgroundColor} onChange={handleBackgroundColorChange}/>
        </div>
        <div className="rowC">
        <Button onClick={handleUndo} id="whitebuttontext" size="small" variant="outlined" color="secondary" style={{marginTop: "2vw", marginLeft: "3vw", height: "3vw", color: "white"}}>Undo</Button>
        <Button onClick={handleRedo} id="whitebuttontext" size="small" variant="outlined" color="secondary" style={{marginTop: "2vw", marginLeft: "3vw", height: "3vw", color: "white"}}>Redo</Button>
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
              draggable = {tool[1]}
              text = {txt.text}
              fill ={txt.fill}
              onClick={(e) =>{
                if(tool[0] === 'erase'){
                  text.splice(i,1);
                  e.target.destroy()
                }
              }}
              
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
              draggable = {tool[1]}
              onClick={(e) =>{
                if(tool[0] === 'erase'){
                  lines.splice(i,1);
                  e.target.destroy()
                  history.push(lines);
                  historyStep += 1;
                  console.log(history);

                }
              }}
            />
          ))}
        </Layer>
      </Stage>
    </div>
    <div id="buttonDiv" style={{backgroundColor: "#4B284F", width: 1050.6, height: 50, position: "absolute", right: 84.5, bottom: 45}}>
        <div id = "save-publish-delete" className="rowC">
            <Button onClick={handleUpdateComic}id="whitebuttontext" variant="outlined" size="small" color="secondary" style={{marginRight: "1vw", color: "white", height: "2.5vw"}}>Save</Button>
            <Button id="whitebuttontext" variant="outlined" size="small" color="secondary" style={{marginRight: "1vw", color: "white", height: "2.5vw"}}>Publish</Button>
            <Button id="whitebuttontext" variant="outlined" size="small" color="secondary" style={{marginRight: "1vw", color: "white", height: "2.5vw"}}>Delete</Button>
        </div>
    </div>
    </div>
    );
  }
}