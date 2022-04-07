import * as React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';




function renderComicRow(props) {
  const { index, style } = props;

  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton component={Link} to={'/comic/viewuser/' + (index+1)} style={{ color: 'white', textDecoration: 'none'}}>
        <ListItemText primary={`Creator ${index + 1}`} />
      </ListItemButton>
    </ListItem>
  );
}

function renderStoryRow(props) {
  const { index, style } = props;

  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton component={Link} to={'/story/viewuser/' + (index+1)} style={{ color: 'white', textDecoration: 'none'}}>
        <ListItemText primary={`Creator ${index + 1}`} />
      </ListItemButton>
    </ListItem>
  );
}

export default function VirtualizedList() {
  const location = useLocation();

  let renderRow;
  if (location.pathname.includes("comic")) {
    renderRow = renderComicRow; 
  }else if(location.pathname.includes("story")){
    renderRow = renderStoryRow;
  }

  return (
    <Box
      sx={{position:"fixed", left: 0, width: '100%', height: '100%', maxWidth: 250, bgcolor: '#4B284F', color: "white", textAlign: "center"}}
    >
    <h2 styles={{fontFamily: "fantasy", textAlign: "center"}}>Followed Creators</h2>
      <FixedSizeList
        height={600}
        width={250}
        itemSize={46}
        itemCount={200}
        overscanCount={5}
      >
        {renderRow}
      </FixedSizeList>
    </Box>
  );
}