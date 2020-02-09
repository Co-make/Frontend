import React, { useState, useEffect } from "react";
import styled from "styled-components";
// import {ReactComponent as CoMakeLogo} from "../images/logo2.svg";
import CoMakeLogo from "../images/CoMakeCircle.png";
import { Link, useLocation } from "react-router-dom";
// import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import HomeIcon from "@material-ui/icons/Home";
import InfoIcon from "@material-ui/icons/Info";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Drawer from "@material-ui/core/Drawer";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";

const Layout = props => {
  const [menu, setMenu] = useState(false);
  let location = useLocation();

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
        <Link to="/">
          <Logo src={CoMakeLogo} />
        </Link>

        {/* Side Bar */}
        <IconButton color="default" onClick={() => setMenu(!menu)}>
          <MenuRoundedIcon fontSize="large" />
        </IconButton>
        <SideBar anchor="right" open={menu} onClose={() => setMenu(false)}>
          <List component="nav" aria-label="main">
            <Link to="/">
              <ListItem button>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
            </Link>
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
                  <ListItemText primary="Log Out" />
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

      {/*--Important-- This renders all children */}
      {props.children}

      {/* Footer */}
      {location.pathname !== "/login" && location.pathname !== "/register" ?
      <FooterNav path={location.pathname}>
        <AddIssueLink to="/addIssue">
          <Fab aria-label="add">
            <AddIcon fontSize="large" />
          </Fab>
        </AddIssueLink>
        <ButtonGroup size="large" variant="text">
          <HomeBottomLink to="/">
            <IconButton>
              <HomeIcon style={location.pathname === "/" ? {color: "#3fff3f"} : {}} fontSize="large" />
            </IconButton>
          </HomeBottomLink>
          <ProfileBottomLink data-testid="profile-button" to="/profile">
            <IconButton>
              <AccountCircleIcon style={location.pathname === "/profile" ? {color: "#3fff3f"} : {}} fontSize="large" />
            </IconButton>
          </ProfileBottomLink>
        </ButtonGroup>
      </FooterNav>
      : <></>
      }
    </div>
  );
};

// Styles

const Logo = styled.img`
  width: 75px;
`;

const AddIssueLink = styled(Link)`
  /* right: 50%; */
  position: absolute;
  bottom: 20px;
`;
const ProfileBottomLink = styled(Link)`
  /* right: 50%; */
  width: 50%;
  /* border-radius: 5%; */
`;

const HomeBottomLink = styled(Link)`
  /* right: 50%; */
  width: 50%;
  /* border-radius: 5%; */
`;

const SideBar = styled(Drawer)`
  .MuiDrawer-paper {
    width: 300px;
    @media (max-width: 600px) {
      width: 150px;
    }
  }
  .MuiDrawer-paperAnchorRight {
    background: #5477bb;
    span {
      color: yellow;
    }
    .MuiSvgIcon-root {
      color: yellow;
      font-size: 2rem;
    }
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #5477bb;
  font-family: "helvetica", sans serif;
  a {
    color: #ffff;
  }
  height: 80px;
  margin-bottom: 10px;
  font-size: 1.2rem;
  font-weight: bold;
  width: 100%;
  padding: 25px;
  @media (max-width: 600px) {
    /* background: red; */
  }
`;

const FooterNav = styled.footer`
  display: flex;
  width: 100vw;
  border: none;
  justify-content: center;
  /* align-items: center; */
  font-family: "helvetica", sans serif;
  height: 50px;
  font-size: 1.2rem;
  font-weight: bold;
  position: fixed;
  bottom: 0;
  background-color: #5477bb;

  &&& {
    .MuiButtonGroup-root {
      width: 50%;
      align-self: center;
    }
    .MuiIconButton-root {
      //  background-color: yellow;
      //  width: 50%;
      border-radius: 5%;
      width: 100%;
    }
    .MuiFab-root {
      width: 70px;
      height: 70px;
      border-radius: 100%;
      z-index: 5;
      color: white;
      background-color: ${props => props.path === "/addIssue" ? "#3fff3f" : "#5477bb"};
      //  border: 1px solid red;
    }
  }
`;


export default Layout;
