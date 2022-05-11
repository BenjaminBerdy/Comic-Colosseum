import React from "react";
import { Stage, Layer, Rect , Text } from 'react-konva';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import MouseIcon from '@mui/icons-material/Mouse';
import PanToolIcon from '@mui/icons-material/PanTool';
import TextFormatIcon from '@mui/icons-material/TextFormat';
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

const UPDATE_STORY = gql`
  mutation updateStory($id: ID!, $title: String!, $backgroundColor: String!, $fontFamily: [String]!, $fontSize: [Int]!, $fontStyle: [String]!
      $textDecoration: [String]!, $text: [String]!, $textColor: [String]!, $textx: [Int]!, $texty: [Int]!){
    updateStory(id:$id, title:$title, backgroundColor:$backgroundColor, fontFamily:$fontFamily, fontSize:$fontSize, 
      fontStyle:$fontStyle, textDecoration:$textDecoration, text:$text, textColor:$textColor, textx:$textx, texty:$texty)
    {
      id
      backgroundColor
      text
    }
  }`;

const PUBLISH_STORY = gql`
mutation publishStory($id: ID!){
  publishStory(id:$id)
  {
    id
    publishDate
  }
}`;

const DELETE_STORY = gql`
mutation deleteStory($id: ID!, $authorId: ID!){
  deleteStory(id:$id, authorId:$authorId)
}`;


let history = [];
let historyStep = 0;
let saved = false;
let loadhistory = false;
let edithistory = false;
let unselect = false;

  export default function CreateStoryScreen() {
    const { id } = useParams();
    const navigate = useNavigate();
    const{user}= useContext(AuthContext);
    const userid = user.id;
    const {loading, data} = useQuery(GET_STORY, {variables: {id}});
    const [tool, setTool] = React.useState(['select',false]);
    const [valuetext, setValueText] = React.useState("Text")
    const [text,setText] = React.useState([])
    const [highlight, setHighlight] = React.useState("");
    //const [currentpage, setCurrentPage] = React.useState('Page 1');
    const [fontSize, setFontSize] = React.useState(30);
    const [fontFamily, setFontFamily]= React.useState("Arial");
    const [fontStyle, setFontStyle] = React.useState("normal");
    const [textDecoration, setTextDecoration] = React.useState("normal")
    const [textColor,setTextColor] = React.useState('#000000');
    const [title,setTitle] = React.useState('Untitled Story'); 
    const [backgroundColor,setBackgroundColor] = React.useState('#FFFFFF');  
    const [currentselection, setCurrentSelection] = React.useState("");
    const [values, setValues] = React.useState({
        id: id,
        title: 'Untitled Story',
        backgroundColor: '#FFFFFF',
        fontFamily: [],
        fontSize: [],
        fontStyle: [],
        textDecoration: [],
        text: [],
        textx: [],
        texty: [],
        textColor: []
    })

    React.useEffect(()=>{
      if(loadhistory === true){
        loadhistory = false;
        let newtext = JSON.parse(JSON.stringify(text));
        history = [newtext]
        console.log(history);
      }
    }, [title]) // eslint-disable-line react-hooks/exhaustive-deps

    React.useEffect(()=>{
      if(edithistory === true){
        edithistory = false;
        let newtext = JSON.parse(JSON.stringify(text));
        history.push(newtext);
        historyStep += 1;
        console.log(history);
      }
    }, [text]) // eslint-disable-line react-hooks/exhaustive-deps

    React.useEffect(() => {
      if(loading === false){
        loadhistory = true;
        for(let i = 0; i < data.getStory.text.length; i++){
          setText((oldValue) => [...oldValue, {x: data.getStory.textx[i], y:data.getStory.texty[i], text:data.getStory.text[i], 
          fontFamily:data.getStory.fontFamily[i], fontSize:data.getStory.fontSize[i], fill:data.getStory.textColor[i], 
          fontStyle: data.getStory.fontStyle[i], textDecoration: data.getStory.textDecoration[i], highlight: ""}]);
        }
        setBackgroundColor(data.getStory.backgroundColor)
        setTitle(data.getStory.title);
      } 
  }, [data]) // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    if(saved === true){
      saved = false;
      console.log(values);
      saveStory(); 
    }
}, [values]) // eslint-disable-line react-hooks/exhaustive-deps

React.useEffect(() => {
  if(currentselection !== ""){
      let temptext = Array.from(text)
      temptext[currentselection.attrs.index].fill = textColor;
      edithistory = true;
      setText(temptext);
  }
}, [textColor]) // eslint-disable-line react-hooks/exhaustive-deps

React.useEffect(() => {
  if(currentselection !== ""){
      let temptext = Array.from(text)
      temptext[currentselection.attrs.index].text = valuetext;
      edithistory = true;
      setText(temptext);
  }
}, [valuetext]) // eslint-disable-line react-hooks/exhaustive-deps

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
    temptext[currentselection.attrs.index].fontStyle = fontStyle;
    edithistory = true;
    setText(temptext);
  }
}, [fontStyle]) // eslint-disable-line react-hooks/exhaustive-deps

React.useEffect(() => {
  if(currentselection !== ""){
    let temptext = Array.from(text)
    temptext[currentselection.attrs.index].textDecoration = textDecoration;
    edithistory = true;
    setText(temptext);
  }
}, [textDecoration]) // eslint-disable-line react-hooks/exhaustive-deps

React.useEffect(() => {
    if(highlight !== ""){
      let temptext = Array.from(text)
      temptext[currentselection.attrs.index].highlight = highlight;
      setText(temptext);
    }else if(unselect === true && currentselection !== ""){
      let temptext = Array.from(text)
      temptext[currentselection.attrs.index].highlight = highlight;
      setText(temptext);
      setCurrentSelection("");
    }
}, [highlight]) // eslint-disable-line react-hooks/exhaustive-deps

React.useEffect(() => {
  if(currentselection !== ""){
    setHighlight("#ff00ff")
  } 
}, [currentselection]) // eslint-disable-line react-hooks/exhaustive-deps

  const [saveStory] = useMutation(UPDATE_STORY,{
      onCompleted(updatedata){
        console.log(updatedata)
        navigate("/story/userProfile/"+ userid);
      },
      onError(err){
        console.log(err)
        console.log(err.graphQLErrors[0].extensions.errors)
      },
      variables: values
    })

    const [publishstory] = useMutation(PUBLISH_STORY,{
      onCompleted(data){
        console.log(data);
        navigate("/story/userProfile/"+ userid);
      },
      onError(err){
        console.log(err)
        console.log(err.graphQLErrors[0].extensions.errors)
      },
      variables: {id}
    })

    const [deletestory] = useMutation(DELETE_STORY,{
      update(_,{data}){
        console.log(data);
        navigate("/story/userProfile/"+ userid);
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
      setCurrentSelection("");
      if (historyStep === 0) {
        return;
      }
      historyStep -= 1;
      const previous = history[historyStep];
      setText(previous);
    };

  const handleRedo = () => {
      setCurrentSelection("");
      if (historyStep === history.length - 1) {
        return;
      }
      historyStep += 1;
      const next = history[historyStep];
      setText(next);
    };

    const handleMouseDown = (e) => {
      if(tool[0] === 'text'){
        if(valuetext.trim() !== ""){
          const pos = e.target.getStage().getPointerPosition();
          edithistory = true;
          setText([...text, {x: Math.round(pos.x), y:Math.round(pos.y), text:valuetext,fontFamily:fontFamily, fontSize:fontSize, fill:textColor, fontStyle: fontStyle, textDecoration: textDecoration, highlight:""}]);
        }
      }else if(tool[0] === 'select'){
        unselect = true;
        setHighlight("");
      }
    };

  const handleUpdateStory = (event) =>{
    event.preventDefault();

    let tempfontFamily = [];
    let tempfontSize = [];
    let tempfontStyle = [];
    let temptextDecoration = [];
    let temptext = [];
    let temptextx = [];
    let temptexty = [];
    let temptextColor = [];

    for(let i = 0; i < text.length; i++){
      tempfontFamily.push(text[i].fontFamily);
      tempfontSize.push(text[i].fontSize);
      tempfontStyle.push(text[i].fontStyle);
      temptextDecoration.push(text[i].textDecoration);
      temptext.push(text[i].text);
      temptextx.push(text[i].x);
      temptexty.push(text[i].y);
      temptextColor.push(text[i].fill);
    }

    saved = true;

    setValues({
        id: id,
        title: title,
        backgroundColor: backgroundColor,
        fontFamily: tempfontFamily,
        fontSize: tempfontSize,
        fontStyle: tempfontStyle,
        textDecoration: temptextDecoration,
        text: temptext,
        textx:  temptextx,
        texty: temptexty,
        textColor: temptextColor
    });  
  }

  const handlePublishStory = (event) =>{
    handleUpdateStory(event);
    publishstory();
  }

  const handleDeleteStory = (event) =>{
    event.preventDefault();
    deletestory();
  }

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  }

  const handleChangeValueText = (e) =>{
    setValueText(e.target.value)
  }

  const handleTextColorChange = (e) =>{
    setTextColor(e.target.value);
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

  const handleChangeFontStyle = (e) => {
    setFontStyle(e.target.value);
  }

  const handleChangeTextDecoration = (e) => {
    setTextDecoration(e.target.value);
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
        <Button onClick={() => {setTool(['select',false]);}} variant="text" style={{marginTop: "1vw", color: "white"}}><MouseIcon/></Button>
        <Button onClick={() => {unselect = true; setHighlight(""); setTool(['erase',false]);  }} variant="text" style={{marginTop: "1vw", color: "white"}}><Icon icon="mdi:eraser" color="white" width="24" height="24"/></Button>
        <Button onClick={() => {unselect = true; setHighlight(""); setTool(['drag',true]); }} variant="text" style={{marginTop: "1vw", color: "white"}}><PanToolIcon/></Button>
        <Button onClick={() => {unselect = true; setHighlight(""); setTool(['text',false]); }} variant="text" style={{marginTop: "1vw", color: "white"}}><TextFormatIcon/></Button>

        </div>
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
                    size="small"
                />
                </Grid>
                <Grid item>
                </Grid>
            </Grid>
            </Box>
        <br/>
        <Box sx={{minWidth: 80 }} style={{marginBottom: ".8vw", marginTop: "-1vw"}}>
      <FormControl focused> 
        <InputLabel id="demo-simple-select-label" variant="filled" color="secondary" focused>Font</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={fontFamily}
          onChange={handleChangeFontFamily}
          color="secondary"
          style={{color:"white", height:"4vw"}}
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
    <Box sx={{minWidth: 80 }} style={{marginBottom: ".5vw"}}>
      <FormControl focused> 
        <InputLabel id="demo-simple-select-label" variant="filled" color="secondary" focused>Font Style</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={fontStyle}
          onChange={handleChangeFontStyle}
          color="secondary"
          style={{color:"white"}}
        >
          <MenuItem value={"normal"}>Normal</MenuItem>
          <MenuItem value={"bold"}>Bold</MenuItem>
          <MenuItem value={"italic"}>Italic</MenuItem>
          <MenuItem value={"italic bold"}>Italic Bold</MenuItem>
        </Select>
      </FormControl>
    </Box>
    <Box sx={{minWidth: 80 }} style={{marginBottom: ".5vw", marginLeft: "1vw"}}>
      <FormControl focused sx={{minWidth: 120}}> 
        <InputLabel id="demo-simple-select-label" variant="filled" color="secondary" focused>Text Decoration</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={textDecoration}
          onChange={handleChangeTextDecoration}
          color="secondary"
          style={{color:"white"}}
        >
          <MenuItem value={"normal"}>Normal</MenuItem>
          <MenuItem value={"underline"}>Underline</MenuItem>
          <MenuItem value={"line-through"}>Line-Through</MenuItem>
        </Select>
      </FormControl>
    </Box>
    </div>
        <div className="rowC">           
        <TextField
          id="standard-helperText"
          label="Text"
          rows={4}
          value={valuetext}
          variant="standard"
          style={{ marginBottom: '1vw', width:"20vw" }}
          sx={{ input: { color: 'white' } }}
          color="secondary"
          focused
          multiline
          inputProps={{ style: { color: "white" } }}
          onChange={handleChangeValueText}
        />
        </div>
        <div>
        Text Color: <input style={{marginBottom: ".5vw"}} id="color" type="color" value ={textColor} onChange={handleTextColorChange}/>
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
              stroke = {(currentselection !== "" && currentselection.attrs.index === i) ? txt.highlight : ""}
              strokeWidth= {.5}
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
    <div id="buttonDiv" style={{backgroundColor: "#4B284F", width: 1050.6, height: 50, position: "absolute", right: 76, bottom: 10}}>
        <div id = "save-publish-delete" className="rowC">
            <Button onClick={handleUpdateStory} id="whitebuttontext" variant="outlined" size="small" color="secondary" style={{marginRight: "1vw", color: "white", height: "2.5vw"}}>Save</Button>
            <Button onClick={handlePublishStory} id="whitebuttontext" variant="outlined" size="small" color="secondary" style={{marginRight: "1vw", color: "white", height: "2.5vw"}}>Publish</Button>
            <Button onClick={handleDeleteStory} id="whitebuttontext" variant="outlined" size="small" color="secondary" style={{marginRight: "1vw", color: "white", height: "2.5vw"}}>Delete</Button>
        </div>
    </div>
    </div>
    );
  }
}