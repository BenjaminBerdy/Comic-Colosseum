import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, {useState } from 'react';
import gql from 'graphql-tag'
import {useMutation} from '@apollo/react-hooks'
import { useParams } from "react-router-dom";


const theme = createTheme();
const RESET_PASSWORD = gql`
  mutation resetPassword($token:String!,$id:ID!,$newpassword:String!,$confirmpassword:String!){
    resetPassword(token:$token,id:$id,newpassword:$newpassword,confirmpassword:$confirmpassword){
     id
     username
     email
    }
}`;


export default function ResetPassword() {
  const { id, token } = useParams();
  const [values, setValues] = useState({
    token: token,
    id: id,
    newpassword: '',
    confirmpassword: '',
  })
  const [errors,setErrors] = useState({})

  const [resetUserPassword] = useMutation(RESET_PASSWORD,{
    update(_,{data:{login:userData}}){
      setErrors(["Password Reset"]);
    },
    onError(err){
      console.log(err.name)
      if(err.message.includes("JsonWebTokenError")){
        setErrors(["Invalid Token"]);
      }else{
      console.log(err.graphQLErrors[0].extensions.errors)
      setErrors(err.graphQLErrors[0].extensions.errors);
      }
    },
    variables: values
  })

  const onChange = (event) =>{
    setValues({...values, [event.target.name]: event.target.value})
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    resetUserPassword();
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
              Reset Password
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} >
                <TextField
                    required
                    fullWidth
                    id="newpassword"
                    label="New password"
                    name="newpassword"
                    autoComplete="New Password"
                    value={values.newpassword}
                    error={errors.newpassword ? true : false}
                    onChange={onChange}
                  />
                </Grid>
                <Grid item xs={12} >
                <TextField
                    required
                    fullWidth
                    id="confirmpassword"
                    label="Confirm New Password"
                    name="confirmpassword"
                    autoComplete="Confirm New Password"
                    value={values.confirmpassword}
                    error={errors.confirmpassword ? true : false}
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
                Reset Password
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
            <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    );
  }
