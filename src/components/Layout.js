import React from "react";
import styled from "styled-components";
import Logo from "../images/logo.png";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";

const Layout = props => {
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
            <Button color="facebook" size="medium" onClick={logOut}>
              Logout
            </Button>
          </Link>
        ) : props.token === "" ? (
          <></>
        ) : (
          <></>
        )}
      </Nav>

      {props.children}

      <FooterNav className="bottom-nav">
        <Button.Group widths="3" size="big">
          <Button
            icon="list alternate outline"
            content="Feed"
            onClick={() => props.history.push("#")}
          />
          <Button
            icon="add"
            content="Create Issue"
            onClick={() => props.history.push("/addIssue")}
          />
          <Button
            icon="user"
            content="Profile"
            onClick={() => props.history.push(`/profile/${props.localId}`)}
          />
        </Button.Group>
      </FooterNav>
    </div>
  );
};

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
  height: 90px;
  margin-bottom: 30px;
  font-size: 1.2rem;
  font-weight: bold;
  width: 100%;
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
`;

export default Layout;
