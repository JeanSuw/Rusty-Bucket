// Importing the decorating CSS aspects
import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';

import { useState } from 'react';

import Auth from '../utils/auth';
import { useMutation } from '@apollo/client';
import {LOGIN_USER} from '../utils/mutation';

// This link is where you can get more sign up forms
// https://mui.com/material-ui/react-text-field/

export default function InputAdornments() {
    // Showing password 
    const [showPassword, setShowPassword] = React.useState(false);
    
    // Filling forms parts
    const [formState, setFormState] = useState({ email: '', password: '' });
    
    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    const [login, { error/*, data*/ }] = useMutation(LOGIN_USER);

    const handleChange = (event) => {
        const { name, value } = event.target;
    
        setFormState({
          ...formState,
          [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        
        try {
          const { data } = await login({
            variables: { ...formState },
          });
    
          Auth.login(data.login.token);
        } catch (e) {
          console.error(e);
        }
    
        // clear form values
        setFormState({
          email: '',
          password: '',
        });
      };

    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
          <form onSubmit={handleFormSubmit}>
            {/* Login for the users who already have sign up*/}
            <TextField
              label="Welcome back!"
              id="filled-start-adornment"
              sx={{ m: 1, width: '25ch' }}
              InputProps={{
                startAdornment: <InputAdornment position="start"></InputAdornment>,
              }}
              variant="filled"
              className="form-input"
              placeholder="Username"
              name="username"
              value={formState.username}
              onChange={handleChange}
            />
            
            <FormControl sx={{ m: 1, width: '25ch' }} variant="filled">
              <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
              <FilledInput
                id="filled-adornment-password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                className="form-input"
                placeholder="******"
                name="password"
                value={formState.password}
                onChange={handleChange}
              />
            </FormControl>
            <Button variant="contained">Submit</Button>
            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
            </form>
        </Box>
    );
}