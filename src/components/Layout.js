import React, {useState} from "react";
import styled from "styled-components";
import Logo from "../images/logo.png";
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';

const Layout = props => {
  const [menu, setMenu] = useState(false)

  const logOut = () => {
    localStorage.removeItem("zipcode");
    localStorage.removeItem("id");
    props.setToken("");
    localStorage.removeItem("token");
    // return <Redirect to="/login" />
  };

  return (
    <div>
      <Nav>
        <div className="logotext">
          <img className="logo" src={Logo}></img>omake
        </div>
        <a href="https://flamboyant-mayer-055230.netlify.com/index.html">
          Home
        </a>
        <a href="https://flamboyant-mayer-055230.netlify.com/aboutus.html">
          About Us
        </a>
        {props.token ? (
          <Link to="/login">
            <Button color="facebook" fontSize="medium" onClick={logOut}>
              Logout
            </Button>
          </Link>
        ) : props.token === "" ? (
          <></>
        ) : (
          <></>
        )}
      <IconButton onClick={()=> setMenu(!menu)}><MenuRoundedIcon fontSize="large" /></IconButton>
      <SideBar anchor="right" open={menu} onClose={()=> setMenu(false)}>
      <List component="nav" aria-label="main">
        <ListItem button>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText primary="About" />
        </ListItem>
        {props.token ? (
          <Link to="/login">
            <ListItem button onClick={logOut}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
          </Link>
        ) : (
          <Link to="/login">
            <ListItem button>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Log In" />
        </ListItem>
          </Link>
        )}

      </List>
      </SideBar>
      </Nav>

      {props.children}

      {/* <FooterNav className="bottom-nav">
        <Button.Group widths="3" size="big">
          <Link to="/">
          <Button
            icon="list alternate outline"
            content="Feed"

          />
          </Link>
          <Link to="/addIssue">
          <Button
            icon="add"
            content="Create Issue"
            // onClick={() => props.history.push("/addIssue")}
          />
          </Link>
          <Link to="/profile/:id">
          <Button
            icon="user"
            content="Profile"
            // onClick={() => props.history.push(`/profile/${props.localId}`)}
          />
          </Link>
        </Button.Group>
      </FooterNav> */}
    </div>
  );
};


const SideBar = styled(Drawer)`
.MuiDrawer-paper {
  width: 300px;
}
 .MuiDrawer-paperAnchorRight {
background: #5477bb;
}
`

const Nav = styled.nav`
  display: block;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: #5477bb;
  font-family: "helvetica", sans serif;
  a {
    color: #ffff;
  }
  height: 50px;
  margin-bottom: 30px;
  font-size: 1.2rem;
  font-weight: bold;
  width: 100%;
  @media (max-width: 600px) {
    background: red;
  }
`;

const FooterNav = styled.footer`
  display: flex;
  border: none;
  justify-content: space-evenly;
  align-items: center;
  font-family: "helvetica", sans serif;
  height: 50px;
  font-size: 1.2rem;
  font-weight: bold;
  position: fixed;
  bottom: 0;
`;

export default Layout;
