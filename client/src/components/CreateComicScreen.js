import React from "react";
import { Stage, Layer, Line,Rect , Text } from 'react-konva';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import CreateIcon from '@mui/icons-material/Create';
import MouseIcon from '@mui/icons-material/Mouse';
import PanToolIcon from '@mui/icons-material/PanTool';
import { Typography } from "@mui/material";
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import AppBanner from "./AppBanner";
import { Icon } from '@iconify/react';
import gql from 'graphql-tag'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useNavigate, useParams } from "react-router-dom";
import {useQuery, useMutation} from '@apollo/react-hooks'
import { useContext } from "react";
import { AuthContext } from '../context/auth';


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

const UPDATE_COMIC = gql`
  mutation updateComic($id: ID!, $title: String!, $backgroundColor: String!, $linex: [Int]!, $liney: [Int]!, $points: [[Float]]!, $strokeWidth: [Int]!, 
        $stroke: [String]!, $fontFamily: [String]!, $fontSize: [Int]!, $text: [String]!, $textcolor: [String]!, $textx: [Int]!, $texty: [Int]!){
    updateComic(id:$id, title:$title, backgroundColor:$backgroundColor, linex:$linex, liney:$liney, points:$points, strokeWidth:$strokeWidth, 
        stroke:$stroke, fontFamily:$fontFamily, fontSize:$fontSize, text:$text, textcolor:$textcolor, textx:$textx, texty:$texty)
    {
      id
      backgroundColor
      points
    }
  }`;

const PUBLISH_COMIC = gql`
mutation publishComic($id: ID!){
  publishComic(id:$id)
  {
    id
    publishDate
  }
}`;

const DELETE_COMIC = gql`
mutation deleteComic($id: ID!, $authorId: ID!){
  deleteComic(id:$id, authorId:$authorId)
}`;


let history = [[]];
let historyStep = 0;
let saved = false;
let loadhistory = false;
let edithistory = false;
let currentselectionbar;

  export default function CreateComicScreen() {
    const { id } = useParams();
    const navigate = useNavigate();
    const{user}= useContext(AuthContext);
    const userid = user.id;
    const {loading, data} = useQuery(GET_COMIC, {variables: {id}});
    const [tool, setTool] = React.useState(['select',false]);
    const [lines, setLines] = React.useState([]);
    const [valuetext, setvaluetext] = React.useState("Text")
    const [text,setText] = React.useState([])
    const isDrawing = React.useRef(false);
    //const [currentpage, setCurrentPage] = React.useState('Page 1');
    const [fontSize, setFontSize] = React.useState(30);
    const [fontFamily, setFontFamily]= React.useState("Arial");
    const [strokeWidth, setStrokeWidth] = React.useState(5);
    const [stroke,setStroke] = React.useState('#000000');
    const [title,setTitle] = React.useState('Untitled Comic'); 
    const [backgroundColor,setBackgroundColor] = React.useState('#FFFFFF');  
    const [currentselection, setCurrentSelection] = React.useState("");
    const [values, setValues] = React.useState({
        id: id,
        title: 'Untitled Comic',
        backgroundColor: '#FFFFFF',
        linex: [],
        liney: [],
        points: [],
        strokeWidth: [],
        stroke: [],
        fontFamily: [],
        fontSize: [],
        text: [],
        textx: [],
        texty: [],
        textcolor: []
    })

    React.useEffect(()=>{
      if(loadhistory === true){
        loadhistory = false;
        history = [[lines,text]]
        console.log(history);
      }
    }, [title]) // eslint-disable-line react-hooks/exhaustive-deps

    React.useEffect(()=>{
      if(edithistory === true){
        console.log("history changed");
        edithistory = false;
        history.push([lines,text]);
        historyStep += 1;
        console.log(history);
      }
    }, [text]) // eslint-disable-line react-hooks/exhaustive-deps

    React.useEffect(()=>{
      if(edithistory === true){
        console.log("history changed");
        edithistory = false;
        history.push([lines,text]);
        historyStep += 1;
        console.log(history);
      }
    }, [lines]) // eslint-disable-line react-hooks/exhaustive-deps

    
   
    React.useEffect(() => {
      if(loading === false){
        loadhistory = true;
        for(let i = 0; i < data.getComic.points.length; i++){
          setLines((oldValue) => [...oldValue, {x:data.getComic.linex[i], y:data.getComic.liney[i], points: data.getComic.points[i], 
            stroke:data.getComic.stroke[i], strokeWidth:data.getComic.strokeWidth[i] }]);
        }
        for(let i = 0; i < data.getComic.text.length; i++){
          setText((oldValue) => [...oldValue, {x: data.getComic.textx[i], y:data.getComic.texty[i], text:data.getComic.text[i], 
            fontFamily:data.getComic.fontFamily[i], fontSize:data.getComic.fontSize[i], fill:data.getComic.textcolor[i]}]);
        }
        setBackgroundColor(data.getComic.backgroundColor)
        setTitle(data.getComic.title);
      } 
  }, [data]) // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    if(saved === true){
      saved = false;
      console.log(values);
      saveComic(); 
    }
}, [values]) // eslint-disable-line react-hooks/exhaustive-deps

React.useEffect(() => {
  if(currentselection !== ""){
    if(currentselection.attrs.text){
      let temptext = Array.from(text)
      temptext[currentselection.attrs.index].fill = stroke;
      edithistory = true;
      setText(temptext);
    }else{
      let templines = Array.from(lines)
      templines[currentselection.attrs.index].stroke = stroke;
      edithistory = true;
      setLines(templines);
    }
  }
}, [stroke]) // eslint-disable-line react-hooks/exhaustive-deps

React.useEffect(() => {
  if(currentselection !== ""){
    let temptext = Array.from(text)
    temptext[currentselection.attrs.index].fontFamily = fontFamily;
    edithistory = true;
    setText(temptext);
  }
}, [fontFamily]) // eslint-disable-line react-hooks/exhaustive-deps

React.useEffect(() => {
  if(currentselection !== ""){
    let temptext = Array.from(text)
    temptext[currentselection.attrs.index].fontSize = fontSize;
    edithistory = true;
    setText(temptext);
  }
}, [fontSize]) // eslint-disable-line react-hooks/exhaustive-deps

React.useEffect(() => {
  if(currentselection !== ""){
    let temptext = Array.from(text)
    temptext[currentselection.attrs.index].fontSize = fontSize;
    edithistory = true;
    setText(temptext);
  }
}, [fontSize]) // eslint-disable-line react-hooks/exhaustive-deps

React.useEffect(() => {
  if(currentselection !== ""){
    let templines = Array.from(lines)
    templines[currentselection.attrs.index].strokeWidth = strokeWidth;
    edithistory = true;
    setLines(templines);
  }
}, [strokeWidth]) // eslint-disable-line react-hooks/exhaustive-deps

    const [saveComic] = useMutation(UPDATE_COMIC,{
      update(_,{updatedata}){
        console.log(updatedata)
        navigate("/comic/userProfile/"+ userid);
      },
      onError(err){
        console.log(err)
        console.log(err.graphQLErrors[0].extensions.errors)
      },
      variables: values
    })

    const [publishcomic] = useMutation(PUBLISH_COMIC,{
      update(_,{data}){
        console.log(data);
        navigate("/comic/userProfile/"+ userid);
      },
      onError(err){
        console.log(err)
        console.log(err.graphQLErrors[0].extensions.errors)
      },
      variables: {id}
    })

    const [deletecomic] = useMutation(DELETE_COMIC,{
      update(_,{data}){
        console.log(data);
        navigate("/comic/userProfile/"+ userid);
      },
      onError(err){
        console.log(err)
        console.log(err.graphQLErrors[0].extensions.errors)
      },
      variables: {id: id, authorId: userid}
    })
    
  if(loading){
    return(<h1 style={{color:"white"}}>Loading...</h1>)
  }else{
  
  const handleUndo = () => {
      if (historyStep === 0) {
        return;
      }
      historyStep -= 1;
      const previous = history[historyStep];
      setLines(previous[0]);
      setText(previous[1]);
    };

  const handleRedo = () => {
      if (historyStep === history.length - 1) {
        return;
      }
      historyStep += 1;
      const next = history[historyStep];
      setLines(next[0]);
      setText(next[1]);
    };

   const handleMouseDown = (e) => {
    if(tool[0] === 'draw'){
      isDrawing.current = true;
      const pos = e.target.getStage().getPointerPosition();
      setLines([...lines, {x:0, y:0, points: [pos.x, pos.y], stroke:stroke, strokeWidth:strokeWidth }]);
      }else if(tool[0] === 'select'){
        setCurrentSelection("");
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
      history.push([lines,text]);
      historyStep += 1;
      console.log(history);
    }
    
  };

  const handleUpdateComic = (event) =>{
    event.preventDefault();

    let templinex = []
    let templiney = []
    let temppoints = [];
    let tempstrokeWidth = [];
    let tempstroke = [];
    let tempfontFamily = [];
    let tempfontSize = [];
    let temptext = [];
    let temptextx = [];
    let temptexty = [];
    let temptextcolor = [];

    for(let i = 0; i < lines.length; i++){
      templinex.push(lines[i].x);
      templiney.push(lines[i].y);
      temppoints.push(lines[i].points);
      tempstrokeWidth.push(lines[i].strokeWidth);
      tempstroke.push(lines[i].stroke);
    }

    for(let i = 0; i < text.length; i++){
      tempfontFamily.push(text[i].fontFamily);
      tempfontSize.push(text[i].fontSize);
      temptext.push(text[i].text);
      temptextx.push(text[i].x);
      temptexty.push(text[i].y);
      temptextcolor.push(text[i].fill);
    }

    saved = true;

    setValues({
        id: id,
        title: title,
        backgroundColor: backgroundColor,
        linex: templinex,
        liney: templiney,
        points: temppoints,
        strokeWidth: tempstrokeWidth,
        stroke: tempstroke,
        fontFamily: tempfontFamily,
        fontSize: tempfontSize,
        text: temptext,
        textx:  temptextx,
        texty: temptexty,
        textcolor: temptextcolor
    });  
  }

  const handlePublishComic = (event) =>{
    handleUpdateComic(event);
    publishcomic();
  }

  const handleDeleteComic = (event) =>{
    event.preventDefault();
    deletecomic();
  }

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  }

  const handleChangeValueText = (e) =>{
    setvaluetext(e.target.value)
  }

  const handleColorChange = (e) =>{
    setStroke(e.target.value);
  }

  const handleBackgroundColorChange = (e) =>{
      setBackgroundColor(e.target.value);
  }

  const handleFontSliderChange = (e) => {
    setFontSize(e.target.value);
  };

  const handleChangeFontFamily = (e) => {
    setFontFamily(e.target.value);
  }

  const handleStrokeWidthChange = (e) =>{
    setStrokeWidth(e.target.value);
  }

  const handleAddText = (e) =>{
    if(valuetext.trim() !== ""){
    edithistory = true;
    setText([...text, {x: 20, y:20, text:valuetext,fontFamily:fontFamily, fontSize:fontSize, fill:stroke}]);
    }
  }



  if(currentselection === ""){
    currentselectionbar = <Typography id="input-slider" style={{marginTop: "1vw",marginBottom: "1vw"}} gutterBottom>Current Selection: None</Typography>
  }else if(currentselection.attrs.text){
    currentselectionbar = <Typography id="input-slider" style={{marginTop: "1vw",marginBottom: "1vw"}} gutterBottom>Current Selection: {currentselection.attrs.text}</Typography>
  }else{
    currentselectionbar = <Typography id="input-slider" style={{marginTop: "1vw",marginBottom: "1vw"}} gutterBottom>Current Selection: Line {currentselection.attrs.index}</Typography>
  }

    return(
        <div>
          <AppBanner/>
        <div id="editbar" style={{ fontFamily: 'system-ui' }}>
          <TextField
          id="standard-helperText"
          label="Title"
          name = "title"
          value = {title}
          onChange = {handleChangeTitle}
          variant="standard"
          style={{ marginTop: '1.5vw', marginBottom: '1vw' }}
          sx={{ input: { color: 'white' } }}
          color="secondary"
          focused
        />  
        <Typography id="input-slider" gutterBottom>Current tool: {tool[0]}</Typography>
        <div className="rowC">
        <Button onClick={() => {setTool(['select',false])}} variant="text" style={{marginTop: "1vw", color: "white"}}><MouseIcon/></Button>
        <Button onClick={() => {setTool(['draw',false]);}} variant="text" style={{marginTop: "1vw", color: "white"}}><CreateIcon/></Button>
        <Button onClick={() => {setTool(['erase',false])}} variant="text" style={{marginTop: "1vw", color: "white"}}><Icon icon="mdi:eraser" color="white" width="24" height="24"/></Button>
        <Button onClick={() => {setTool(['drag',true]);}} variant="text" style={{marginTop: "1vw", color: "white"}}><PanToolIcon/></Button>
        </div>
        {currentselectionbar}
            <Box sx={{ width: 250 }}>
            <Typography id="input-slider" gutterBottom>Stroke Width</Typography>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs>
                <Slider
                    value={strokeWidth}
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
        <Box sx={{minWidth: 120 }} style={{marginBottom: "1vw"}}>
      <FormControl fullWidth> 
        <InputLabel sx={{color: 'white'}} id="demo-simple-select-label">Font</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={fontFamily}
          label="Age"
          onChange={handleChangeFontFamily}
          sx={{color: 'white'}}
        >
          <MenuItem value={"Arial"}>Arial</MenuItem>
          <MenuItem value={"Bahnschrift"}>Bahnschrift</MenuItem>
          <MenuItem value={"Cambria"}>Cambria</MenuItem>
          <MenuItem value={"Calibri"}>Calibri</MenuItem>
          <MenuItem value={"Candara"}>Candara</MenuItem>
          <MenuItem value={"Comic Sans MS"}>Comic Sans MS</MenuItem>
          <MenuItem value={"Consolas"}>Consolas</MenuItem>
          <MenuItem value={"Constantia"}>Constantia</MenuItem>
          <MenuItem value={"Corbel"}>Corbel</MenuItem>
          <MenuItem value={"Courier New"}>Courier New</MenuItem>
          <MenuItem value={"Ebrima"}>Ebrima</MenuItem>
          <MenuItem value={"Georgia"}>Georgia</MenuItem>
          <MenuItem value={"Impact"}>Impact</MenuItem>
          <MenuItem value={"Tahoma"}>Tahoma</MenuItem>
          <MenuItem value={"Times New Roman"}>Times New Roman</MenuItem>
          <MenuItem value={"Trebuchet MS"}>Trebuchet MS</MenuItem>
          <MenuItem value={"Verdana"}>Verdana</MenuItem>
          <MenuItem value={"Wingdings"}>Wingdings</MenuItem>
        </Select>
      </FormControl>
    </Box>
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
        Current Color: <input style={{marginBottom: "1vw"}} id="color" type="color" value ={stroke} onChange={handleColorChange}/>
        <br/>
        Background Color: <input id="backgroundcolor" type="color" value ={backgroundColor} onChange={handleBackgroundColorChange}/>
        </div>
        <div className="rowC">
        <Button onClick={handleUndo} id="whitebuttontext" size="small" variant="outlined" color="secondary" style={{marginTop: "1vw", marginLeft: "3vw", height: "3vw", color: "white"}}>Undo</Button>
        <Button onClick={handleRedo} id="whitebuttontext" size="small" variant="outlined" color="secondary" style={{marginTop: "1vw", marginLeft: "3vw", height: "3vw", color: "white"}}>Redo</Button>
        </div>
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
              index = {i}
              fontFamily= {txt.fontFamily}
              fontSize={txt.fontSize}
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
                  setStroke(e.target.attrs.fill)
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
          {lines.map((line, i) => (
            <Line
              key={i}
              x={line.x}
              y={line.y}
              index = {i}
              points={line.points}
              stroke={line.stroke}
              strokeWidth={line.strokeWidth}
              tension={0.5}
              lineCap="round"
              draggable = {tool[1]}
              onClick={(e) =>{
                if(tool[0] === 'erase'){
                  edithistory = true;
                  setLines(lines.filter((_, j) => j !== i))
                }else if(tool[0] === 'select'){
                  setCurrentSelection(e.target);
                  setStrokeWidth(e.target.attrs.strokeWidth);
                  setStroke(e.target.attrs.stroke);
                }
              }}
              onDragEnd={(e) => {
                let templines = Array.from(lines)
                templines[i].x = e.target.x();
                templines[i].y = e.target.y();
                edithistory = true;
                setLines(templines);
              }}
            />
          ))}
        </Layer>
      </Stage>
    </div>
    <div id="buttonDiv" style={{backgroundColor: "#4B284F", width: 1050.6, height: 50, position: "absolute", right: 76, bottom: 10}}>
        <div id = "save-publish-delete" className="rowC">
            <Button onClick={handleUpdateComic} id="whitebuttontext" variant="outlined" size="small" color="secondary" style={{marginRight: "1vw", color: "white", height: "2.5vw"}}>Save</Button>
            <Button onClick={handlePublishComic} id="whitebuttontext" variant="outlined" size="small" color="secondary" style={{marginRight: "1vw", color: "white", height: "2.5vw"}}>Publish</Button>
            <Button onClick={handleDeleteComic} id="whitebuttontext" variant="outlined" size="small" color="secondary" style={{marginRight: "1vw", color: "white", height: "2.5vw"}}>Delete</Button>
        </div>
    </div>
    </div>
    );
  }
}