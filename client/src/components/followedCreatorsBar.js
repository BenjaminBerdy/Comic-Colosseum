import * as React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';
import { Link } from 'react-router-dom';



function renderRow(props) {
  const { index, style } = props;

  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton component={Link} to={'/viewuser/' + (index+1)} style={{ color: 'black', textDecoration: 'none' }}>
        <ListItemText primary={`Creator ${index + 1}`} />
      </ListItemButton>
    </ListItem>
  );
}

export default function VirtualizedList() {
  return (
    <Box
      sx={{position:"fixed", left: 0, width: '100%', height: '100%', maxWidth: 250, bgcolor: 'background.paper' }}
    >
    <br/>
    <h2>Followed Creators</h2>
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