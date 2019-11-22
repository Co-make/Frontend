import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function FooterNav() {
  let localId = JSON.parse(localStorage.getItem('id'))
  return (
    <FooterWrapper>
      <Button type="feed">Feed</Button>

      <Link to="/addIssue">
        <Button type="create">+</Button>
      </Link>


      <Link to={`/profile/${localId}`}>
        <Button type="profile">Profile</Button>
      </Link>
    </FooterWrapper>
  )
}

const FooterWrapper = styled.div`
  max-width: 1024px;
  width: 100%;
`

const Button = styled.button`
  background: lightgray;
`

export default FooterNav;