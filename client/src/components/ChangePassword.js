import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import React, { useContext,useState } from 'react';
import gql from 'graphql-tag'
import {useMutation} from '@apollo/react-hooks'
import { AuthContext } from '../context/auth';


const theme = createTheme();

const CHANGE_PASSWORD = gql`
  mutation changePassword($id:String!, $username:String!, $password:String!, $newpassword:String!){
    changePassword(id: $id, username: $username,password: $password, newpassword:$newpassword){
      id
      email
      username
      token
    }
}`;

export default function ChangePassword() {
  const navigate = useNavigate();
  const context = useContext(AuthContext); 
  const [values, setValues] = useState({
    id: context.user.id,
    username: '',
    password: '',
    newpassword: ''
  })
  const [errors,setErrors] = useState({})

  const [changeUserPassword] = useMutation(CHANGE_PASSWORD,{
    update(_,{data:{login:userData}}){
      context.login(userData);
      navigate('/');
    },
    onError(err){ 
      console.log(err)
      console.log(err.graphQLErrors[0].extensions.errors)
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values
  })

  const onChange = (event) =>{
    setValues({...values, [event.target.name]: event.target.value})
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    changeUserPassword();
  };
  
    return (
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: 'white',
              padding:3
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Change Password
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
              <Grid item xs={12} >
                <TextField
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="Username"
                    value={values.username}
                    error={errors.username ? true : false}
                    onChange={onChange}
                  />
                </Grid>
                <Grid item xs={12} >
                <TextField
                    required
                    fullWidth
                    id="password"
                    label="Current password"
                    name="password"
                    autoComplete="Current Password"
                    value={values.password}
                    error={errors.username ? true : false}
                    onChange={onChange}
                  />
                </Grid>
                <Grid item xs={12} >
                <TextField
                    required
                    fullWidth
                    id="newpassword"
                    label="New Password"
                    name="newpassword"
                    autoComplete="New Password"
                    value={values.newpassword}
                    error={errors.username ? true : false}
                    onChange={onChange}
                  />
                </Grid>
              </Grid>
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Change Password
              </Button>
              {Object.keys(errors).length > 0 &&(
              <div>
              <ul className="list">
                {Object.values(errors).map(value => (
                  <li key={value}>{value}</li>
                  ))}
              </ul>
            </div>
            )}
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    );
  }
