import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Grid,
  InputAdornment,
  makeStyles,
  TextField,
  Typography
} from "@material-ui/core";
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { useHistory } from 'react-router-dom';
import { auth } from '../../libs';
import { UserDao } from '../../daos';
import './Login.css';
import { ALERT_TYPE, AuthToken, FormValues, User } from "../../interfaces";
import { useAuthValue, useUserValue } from '../../contexts';
import { Socials } from "../LanguagePicker/Socials";
import { CustomizedAlert } from '../CustomizedAlert';
import { useAlert } from '../../hooks';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: '10px',
    width: '80%'
  },
}))

export const Login = () => {
  const classes = useStyles();
  const [values, setValues] = useState<FormValues>({});
  const { setAuthUser } = useAuthValue();
  const { user } = useUserValue();
  const history = useHistory();
const { openAlert, setOpenAlert, alertMessage, alertType, fireAlert} = useAlert();

  useEffect(() => {
    if (user) history.goBack();
  }, [user, history]);

  const handleFormChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> | undefined = (e) => {
    setValues(() => ({
      ...values,
      [e.target.name]: e.target.value
    }));
  }

  const handleRegister = async () => {
    const { email, name, password, verifyPassword } = values;
    try {
      if (email && name && password) {
        if (password !== verifyPassword) {
          fireAlert('Password mismatched. Please try again.', ALERT_TYPE.error);
          return;
        }
        const { user } = await auth.createUserWithEmailAndPassword(email, password);
        if (user) {
          const idToken = await user.getIdToken();
          const _user = new User(email, name, user.uid);
          
          const dao = new UserDao(user.uid);
          await dao.addOne(_user);

          localStorage.setItem("idToken", idToken);
          localStorage.setItem("uid", user.uid);

          const authToken = new AuthToken(user.uid, idToken);
          setAuthUser!(authToken);
          history.goBack();
        }
      }
    }
    catch (error) {
      if (error.code) {
        fireAlert(error.message, ALERT_TYPE.error);
      }
      console.log(error);
    }
  }

  const handleLogin = async () => {
    const { email, password } = values;
    try {
      if (email && password) {
        const { user } = await auth.signInWithEmailAndPassword(email, password);
        if (user) {
          const idToken = await user.getIdToken();
          localStorage.setItem("idToken", idToken);
          localStorage.setItem("uid", user.uid);
          const authToken = new AuthToken(user.uid, idToken);

          setAuthUser!(authToken);
          history.goBack();
        }
      }
    }
    catch (error) {
      if (error.code) {
        fireAlert(error.message, ALERT_TYPE.error);
      }
      console.log(error);
    }
  }

  return (
    <>
      <Container id='loginContainer'>
        <Typography variant="h3" align='center'>Typing Dev</Typography>
        <Socials />
        <Grid container>
          <Grid item xs={12} sm={6}>
            <div className="Login">
              <div className="Login-card ">
                <Typography variant="h4" color='textPrimary'>Login</Typography>
                <TextField 
                  onChange={handleFormChange}
                  name='email'
                  className='Login-field'
                  style={{
                    height: '40px',
                    margin: '5px'
                  }}
                  inputProps={{
                    style: { height: '3px'}
                  }}
                  label="Email" 
                  variant="outlined"
                  InputProps={{
                    startAdornment: <InputAdornment  
                  position="start"><EmailIcon fontSize='small' /></InputAdornment>,
                  }}
                />
                <TextField 
                  onChange={handleFormChange}
                  name='password'
                  className='Login-field'
                  style={{
                    height: '40px',
                    margin: '5px'
                  }}
                  inputProps={{
                    style: { height: '3px'}
                  }}
                  type="password" 
                  label="Password" 
                  variant="outlined"
                  InputProps={{
                    startAdornment: <InputAdornment  
                  position="start"><LockIcon fontSize='small' /></InputAdornment>,
                  }}
                />

                <Button
                  variant="contained"
                  color="default"
                  className={classes.button}
                  onClick={handleLogin}
                  disabled={!values.email || !values.password}
                >
                  Sign in
                </Button>
              </div>
            </div>
          </Grid>

          <Grid item xs={12} sm={6}>
            <div className="Login">
              <div className="Login-card ">
                <Typography variant="h4" color='textPrimary'>Register</Typography>
                <TextField 
                  onChange={handleFormChange}
                  name='name'
                  className='Login-field'
                  style={{
                    height: '40px',
                    margin: '5px'
                  }}
                  inputProps={{
                    style: { height: '3px'}
                  }}
                  label="Name" 
                  variant="outlined"
                  InputProps={{
                    startAdornment: <InputAdornment  
                  position="start"><AccountBoxIcon fontSize='small' /></InputAdornment>,
                  }}
                />
                <TextField 
                  onChange={handleFormChange}
                  name='email'
                  className='Login-field'
                  style={{
                    height: '40px',
                    margin: '5px'
                  }}
                  inputProps={{
                    style: { height: '3px'}
                  }}
                  label="Email" 
                  variant="outlined"
                  InputProps={{
                    startAdornment: <InputAdornment  
                  position="start"><EmailIcon fontSize='small' /></InputAdornment>,
                  }}
                />
                <TextField 
                  onChange={handleFormChange}
                  name='password'
                  className='Login-field'
                  style={{
                    height: '40px',
                    margin: '5px'
                  }}
                  inputProps={{
                    style: { height: '3px'}
                  }}
                  type="password" 
                  label="Password" 
                  variant="outlined"
                  InputProps={{
                    startAdornment: <InputAdornment  
                  position="start"><LockIcon fontSize='small' /></InputAdornment>,
                  }}
                />
                <TextField 
                  onChange={handleFormChange}
                  name='verifyPassword'
                  className='Login-field'
                  style={{
                    height: '40px',
                    margin: '5px'
                  }}
                  inputProps={{
                    style: { height: '3px'}
                  }}
                  type="password" 
                  label="Verify Password" 
                  variant="outlined"
                  InputProps={{
                    startAdornment: <InputAdornment  
                  position="start"><LockIcon fontSize='small' /></InputAdornment>,
                  }}
                />

                <Button
                  variant="contained"
                  color="default"
                  className={classes.button}
                  onClick={handleRegister}
                  disabled={!values.email || !values.password || !values.password || !values.verifyPassword}
                >
                  Register
                </Button>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
      <CustomizedAlert duration={5000} openAlert={openAlert} setOpenAlert={setOpenAlert} alertMessage={alertMessage} alertType={alertType}/>
    </>
  )
}