import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function FooterNav(props) {
  let localId = JSON.parse(localStorage.getItem('id'))
  return (
    // <FooterWrapper>
        <footer className="footer-nav">
          <Nav className="bottom-nav">

            <Button.Group widths="3" size="big">
              <Button icon="list alternate outline"
                      content='Feed'
                      onClick={() => props.history.push("#")}
              />
              <Button icon="add"
                      content='Create Issue'
                      onClick={() => props.history.push("/addIssue")}
              />
              <Button icon="user"
                      content='Profile'
                      onClick={() => props.history.push(`/profile/${localId}`)}
              />
            </Button.Group>
          </Nav>
        </footer>
    // {/* </FooterWrapper> */}
  )
}

const FooterWrapper = styled.div`
  max-width: 1024px;
  width: 100%;
`

const Button = styled.button`
  background: lightgray;
`


const Nav = styled.nav`
display: flex;
border: none;
justify-content: space-evenly;
align-items: center;
font-family: 'helvetica', sans serif;
height: 50px;
font-size: 1.2rem;
font-weight: bold;

`

export default FooterNav;