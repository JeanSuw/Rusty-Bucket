// export default Header;
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import { css } from '@emotion/css';

const Header = () => {
    const logout = (event) => {
    event.preventDefault();
    Auth.logout();
    //redirect users back to homepage after logging out //
    window.location.href = '/';
  };
  return (
    <AppBar position="static">
      <Toolbar className={css`
      background-color: #654321;`
      }>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
         Rusty Bucket
        </Typography>
        <Button component={Link} to="/" color="inherit">Home</Button>
        {Auth.loggedIn() && (
          <Button component={Link} to="/profile" color="inherit">{Auth.getProfile().data.username}'s Profile</Button>
        )}
        {Auth.loggedIn() ? (
          <Button component={Link} onClick={logout} color="inherit">Log Out</Button>
        ) : (
          <Button component={Link} to="/signup-login" color="inherit">Sign In / Sign Up</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
