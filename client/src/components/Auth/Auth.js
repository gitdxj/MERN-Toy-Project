import React, { useEffect, useState } from 'react';
// Google Authentication
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import dotenv from 'dotenv';

import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

import Input from './input.js';
import Icon from './icon.js';

import useStyles from './styles';

import { signup, signin } from '../../actions/auth.js';

const initialState = {firstName:'', lastName:'', email:'', password:'', confirmPassword:''}

const Auth = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const clientId = "338159092446-gjnhq00ojdaarfo32url72a03bcqrv2a.apps.googleusercontent.com";
  // dotenv.config();
  // const clientId = process.env.CLIENT_ID;
  // console.log(clientId);

  useEffect(() => {
    const initClient = () => {
          gapi.client.init({
          clientId: clientId,
          scope: ''
        });
     };
     gapi.load('client:auth2', initClient);
 });

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("handleSubmit");
    // console.log(formData);
    if(isSignup){
      dispatch(signup(formData, navigate));
    } else { // Sign In
      dispatch(signin(formData, navigate));
    }
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup); 
  };

  const googleSuccess = async (res) => {
    // console.log("Sign in");
    // console.log(res);
    const result = res.profileObj;
    const token = res.tokenId;

    try {
      dispatch({type: 'AUTH', data: {result, token}});
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = (error) => {
    console.log(error);
    console.log("Google Sign in was unseccessful");
  };

  // error: 'idpiframe_initialization_failed',
  // details: "Not a valid origin for the client: http://localhos…egister this origin for your project's client ID."


  return (
    // <div>Auth</div>
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            { isSignup && (
                <>
                  <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                  <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
            { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
          </Grid>

          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            { isSignup ? "Sign Up" : "Sign In"}
          </Button>

          {/* google log in button  */}
          <GoogleLogin 
            clientId={clientId}
            render={ (renderProps) => (
              <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">Google Sign In</Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
          <Grid container justifyContent="flex-end">
              <Button onClick={switchMode}>
                { isSignup ? 'Already Have an account? Sign in' : "Don't have an account? Sign up"}
              </Button>
          </Grid>

        </form>
      </Paper>
    </Container>
  );
}

export default Auth;