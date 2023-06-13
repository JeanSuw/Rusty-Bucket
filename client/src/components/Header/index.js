
// export default Header;
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText } from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';
import { Menu as MenuIcon } from '@material-ui/icons';
import Auth from '../../utils/auth';
import { css } from '@emotion/css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const activePage = location.pathname;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
    // redirect users back to homepage after logging out
    window.location.href = '/';
  };

  return (
    <AppBar position="static">
      <Toolbar className={css`
        background-color: #654321;
      `}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleMenu}
          className={css`
            @media (min-width: 600px) {
              display: none;
            }
          `}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Rusty Bucket
        </Typography>

        <div className={css`
          @media (max-width: 600px) {
            display: none;
          }
        `}>
          <Button
            component={Link}
            to="/"
            color="inherit"
            className={activePage === '/' ? css`
              border: 1px solid white;
            ` : ''}
          >
            Home
          </Button>
          {Auth.loggedIn() && (
            <Button
              component={Link}
              to="/profile"
              color="inherit"
              className={activePage === '/profile' ? css`
                border: 1px solid white;
              ` : ''}
            >
              {Auth.getProfile().data.username}'s Profile
            </Button>
          )}
          {Auth.loggedIn() ? (
            <Button
              component={Link}
              onClick={logout}
              color="inherit"
              className={activePage === '/logout' ? css`
                border: 1px solid white;
              ` : ''}
            >
              Log Out
            </Button>
          ) : (
            <Button
              component={Link}
              to="/signup-login"
              color="inherit"
              className={activePage === '/signup-login' ? css`
                border: 1px solid white;
              ` : ''}
            >
              Sign In / Sign Up
            </Button>
          )}
        </div>
      </Toolbar>

      <Drawer anchor="left" open={isMenuOpen} onClose={toggleMenu}>
        <List>
          <ListItem
            button
            component={Link}
            to="/"
            className={activePage === '/' ? css`
              border: 1px solid white;
            ` : ''}
          >
            <ListItemText primary="Home" />
          </ListItem>
          {Auth.loggedIn() && (
            <ListItem
              button
              component={Link}
              to="/profile"
              className={activePage === '/profile' ? css`
                border: 1px solid white;
              ` : ''}
            >
              <ListItemText primary={`${Auth.getProfile().data.username}'s Profile`} />
            </ListItem>
          )}
          {Auth.loggedIn() ? (
            <ListItem
              button
              onClick={logout}
              className={activePage === '/logout' ? css`
                border: 1px solid white;
              ` : ''}
            >
              <ListItemText primary="Log Out" />
            </ListItem>
          ) : (
            <ListItem
              button
              component={Link}
              to="/signup-login"
              className={activePage === '/signup-login' ? css`
                border: 1px solid white;
              ` : ''}
            >
              <ListItemText primary="Sign In / Sign Up" />
            </ListItem>
          )}
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Header;
