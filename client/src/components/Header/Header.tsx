import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import {
  makeStyles,
  Button,
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import FilterIcon from '@material-ui/icons/Filter';
import HomeIcon from '@material-ui/icons/Home';
// import CodeIcon from '@material-ui/icons/Code';
import './Header.css';

import * as ROUTES from '../../routes';
import { LANGUAGES } from '../../interfaces';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 250
  },
  link: {
    textDecoration: 'none',
    color: 'white',
    width: '100%',
    height: '100%',
    display: 'block',
    "&:hover, &:focus": {
      color: 'white',
      textDecoration: 'none',
      backgroundColor: 'lightseagreen'
    },
  },
  button: {
    textDecoration: 'none',
    color: 'white',
    width: '100%',
    height: '100%',
    "&:hover, &:focus": {
      color: 'white',
      textDecoration: 'none',
      backgroundColor: 'lightseagreen'
    },
  },
  paper: {
    color: "white",
    background: "rgba(29, 32, 33, 0.5)"
  }
}));

export const Header = () => {
  const classes = useStyles();
  const history = useHistory();
  const [ open, setOpen ] = useState(false);

  const MenuList = () => (
    <div className={ classes.list }>
      <List>
        <NavLink className={classes.link} to={ROUTES.ROOT} activeClassName="navActive"
          isActive={(match, location) => location.pathname === ROUTES.ROOT } 
          onClick={e => setOpen(false)}>
          <ListItem button>
            <ListItemIcon><HomeIcon htmlColor={"white"}/></ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </NavLink>
        <Divider />

        <NavLink className={classes.link} to={ ROUTES.TYPING } activeClassName="navActive"
          isActive={(match, location) => location.pathname.indexOf(ROUTES.TYPING) !== -1 } 
          onClick={e => setOpen(false)}>
          <ListItem button>
            <ListItemIcon><FilterIcon htmlColor={"white"}/></ListItemIcon>
            <ListItemText primary="Languages" />
          </ListItem>
        </NavLink>
        <Divider />
        {
          Object.keys(LANGUAGES).map((k: string, index) => {
            const language = k as keyof typeof LANGUAGES;
            return (
              <ListItem button key={index} className="subItem" onClick={() => {
                setOpen(false);
                history.push(`${ROUTES.TYPING}/${language}`);
              }}>
                {/* <ListItemIcon><CodeIcon htmlColor={"white"}/></ListItemIcon> */}
                <ListItemText primary={language} />
              </ListItem>
              )
            })
          }

      </List>
    </div>
  )

  return (
    <div id="header">
      <Button onClick={e => setOpen(true)}>
        <MenuIcon htmlColor='white'/>
      </Button>
      <Drawer open={open} onClose={ e => setOpen(false)} classes={{ paper: classes.paper }}>
        { MenuList() }
      </Drawer>
    </div>
  );
}
