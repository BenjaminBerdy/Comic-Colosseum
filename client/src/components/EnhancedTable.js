import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import { visuallyHidden } from '@mui/utils';
import Link from '@mui/material/Link';
import { useLocation } from 'react-router-dom';
import gql from 'graphql-tag';
import {useQuery } from '@apollo/react-hooks';
import { useParams } from "react-router-dom";
import { AuthContext } from '../context/auth';
import { useContext } from "react";
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

const GET_USER = gql`
  query($id:ID!){
    getUser(id:$id){
     id
     username
     likedComics
     likedStories
    }
}`;

const GET_COMICS = gql`
  query{
    getComics{
      id
      title
      author
      authorId
      publishDate
      likes
    }
}`;

const GET_STORIES = gql`
  query{
    getStories{
      id
      title
      author
      authorId
      publishDate
      likes
    }
}`;

function createData(title, author, date, likes, id ) {
  return {
    title,
    author,
    date,
    likes,
    id
  };
}

let rows = [];
let comicstory;
let header;
let contentData;

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'title',
    numeric: false,
    disablePadding: true,
    label: 'Title',
  },
  {
    id: 'author',
    numeric: true,
    disablePadding: false,
    label: 'Author',
  },
  {
    id: 'date',
    numeric: true,
    disablePadding: false,
    label: 'Publish Date',
  },
  {
    id: 'likes',
    numeric: true,
    disablePadding: false,
    label: 'Likes',
  },
];

function EnhancedTableHead(props) {
  const {order, orderBy, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            style={{ color: 'white'}}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
              style={{ color: 'white'}}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel >
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};



export default function EnhancedTable() {
  const[filter, setFilter] = React.useState("New")
  const[searchtext, setSearchText] = React.useState("")
  const[search,setSearch] = React.useState("")

  const EnhancedTableToolbar = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { numSelected } = props;
    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const handleFilterNew = () => {
      handleClose()
      setFilter("New")
      console.log(filter);
    }
  
    const handleFilterLiked = () => {
      handleClose()
      setFilter("Liked")
      console.log(filter);
    }

    const handleSearchText = (e) =>{
      setSearchText(e.target.value)
    }

    const handleSubmit = (event) => {
      event.preventDefault();
      setSearch(searchtext)
    }


    const Search = styled('div')(({ theme }) => ({
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    }));
  
    const SearchIconWrapper = styled('div')(({ theme }) => ({
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }));
  
    const StyledInputBase = styled(InputBase)(({ theme }) => ({
      color: 'inherit',
      '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
          width: '20ch',
        },
      },
    }));
  
    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: '1 1 100%' }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            sx={{ flex: '1 1 100%' }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            {header}
          </Typography>
        )}
        <React.Fragment>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                    <Search >
                        <SearchIconWrapper>
                        <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                        value={searchtext}
                        onChange={handleSearchText}
                        autoFocus
                    />
                    </Search>
                </Box>
            </React.Fragment>
        {user && (<div className='rowC'>
        <Typography style={{marginTop: ".5vw"}}>{filter}</Typography>
        <Tooltip title="Filter list">
          <IconButton onClick={handleMenu}>
            <FilterListIcon style={{ color: 'white'}}/>
          </IconButton>
        </Tooltip>
        </div>)}
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleFilterNew}>New {header}</MenuItem>
          <MenuItem onClick={handleFilterLiked}>Liked {header}</MenuItem>
        </Menu>
      </Toolbar>
    );
  };
  
  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };


  rows= []
  const { id } = useParams();
  const location = useLocation();
  const{user}= useContext(AuthContext);
  var userid;
  if(user){
    userid = user.id
  }
  let query;
  if (location.pathname.includes("comic")) {
    comicstory = "comic"
    header = "Comics"
    query = GET_COMICS;
  }else if(location.pathname.includes("story")){
    comicstory = "story";
    header = "Stories"
    query = GET_STORIES;
  }  
  const {loading, data} = useQuery(query,{fetchPolicy: "network-only"});

  const getUser = useQuery(GET_USER, {variables: {id: userid},fetchPolicy: "network-only"})


  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('title');
  const [selected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense] = React.useState(false);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const isSelected = (title) => selected.indexOf(title) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
 
  if(loading === true || getUser.loading === true){
    return(<h1 style={{color:"white"}}>Loading...</h1>)
}else{
  if(location.pathname.includes("comic")){
    contentData = data.getComics
  }else if(location.pathname.includes("story")){
    contentData = data.getStories
  }

  rows=[]
  let correctrows = [];
  let allrows= [];
  for(let i = 0; i < contentData.length; i++){
    if(contentData[i].publishDate !== ""){
      if(location.pathname.includes("user")){
        if(id === contentData[i].authorId){
          correctrows.push(contentData[i])
        }
      }else{
        correctrows.push(contentData[i])
      }
    }
  }

  for(let i = 0; i < correctrows.length; i++){
    if(search.trim() !== ""){
      if(correctrows[i].title.toLowerCase().includes(search.toLowerCase()) || correctrows[i].author.toLowerCase().includes(search.toLowerCase())){
        allrows.push(correctrows[i]);
      }
    }else{
      allrows = Array.from(correctrows);
    }
  }
  
  for(let i = 0; i < allrows.length; i++){
    if(filter === "New"){
      rows.push(createData(allrows[i].title, allrows[i].author, allrows[i].publishDate, allrows[i].likes, allrows[i].id))
    }else if(filter === "Liked"){
      if(comicstory === "comic"){
        if(getUser.data.getUser.likedComics.includes(allrows[i].id)){
          rows.push(createData(allrows[i].title, allrows[i].author, allrows[i].publishDate, allrows[i].likes, allrows[i].id))
        }
      }else if(comicstory === "story"){
        if(getUser.data.getUser.likedStories.includes(allrows[i].id)){
          rows.push(createData(allrows[i].title, allrows[i].author, allrows[i].publishDate, allrows[i].likes, allrows[i].id))
        }
      }
    }
  }

  return (
    <Box sx={{ width: '100%'}}>
      <Paper sx={{ width: '100%', mb: 2, backgroundColor: "#203487", color: "white" }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 40}}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * 5, page * 5 + 5)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.title);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      component={Link} href={'/'+ comicstory +'/viewcontent/' + row.id} style={{ color: 'white', textDecoration: 'none' }}
                      /*onClick={(event) => handleClick(event, row.title)}*/
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.title}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        style={{ color: 'white'}}
                      >
                        {row.title}
                      </TableCell>
                      <TableCell style={{ color: 'white'}} align="right">{row.author}</TableCell>
                      <TableCell style={{ color: 'white'}}align="right">{row.date}</TableCell>
                      <TableCell style={{ color: 'white'}}align="right">{row.likes}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5]}
          component="div"
          count={rows.length}
          rowsPerPage={5}
          page={page}
          onPageChange={handleChangePage}
          style={{ color: 'white'}}
        />
      </Paper>
    </Box>
  );
  }
}