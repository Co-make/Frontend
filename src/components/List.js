import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import ListCard from './ListCard';
import FooterNav from './FooterNav';
import ListTable from './ListTable';
import { Button, Image, Card, Icon } from 'semantic-ui-react'
import styles from '../styles/listStyles.css';

function List(props) {
  const [issues, setIssues] = useState([]);
  const [currentUser, setCurrentUser] = useState({})
  const [issuesCreated, setIssuesCreated] = useState([]);

  let localId = JSON.parse(localStorage.getItem('id'))
  let token = JSON.parse(localStorage.getItem('token'))
  useEffect(() => {
      axios
        .get('https://co-make.herokuapp.com/issues', {
          headers: {
            Authorization: token
          }
         })
        .then( res => {
          setIssues(res.data);
          axios
           .get(`https://co-make.herokuapp.com/users/${localId}/issues`, {
              headers: {
                Authorization: token
              }
             })
            .then( res => {
            console.log("USER DATA FROM SERVER", res)
            setCurrentUser(res.data)
            setIssuesCreated(res.data.issues.length)
          })
            .catch( err => console.log("OH NO AN ERROR HAPPENED", err))

      })
        .catch( err => console.log("OH NO AN ERROR HAPPENED", err))
    },[])

  return (
    <>
      <Card className="user-card"
        raised
        centered
        image={currentUser.picture}
        header={currentUser.username}
        meta={currentUser.zipCode}
        description={`You have posted ${issuesCreated} times since joining Comake!`}
      />

      <ListWrapper>

        {/* Issues List */}

        <ListTable issues={issues}/>

        {/* Fixed Footer */}

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
      </ListWrapper>
    </>
  )
}

const ListWrapper = styled.div`
  max-width: 1024px;
  width: 100%;
  margin: 0 auto;

`

const UserWrapper = styled.div`
  width: 100%;
  padding-top: 50px;
  padding-bottom: 30px;
  border-bottom: 1px solid black;
  height: 500px;
`

const WelcomeImage = styled.img`
  height: 200px;
  width: 200px;
`

const UserInfo = styled.p`
  margin: 0px;
  font-weight: bold;
  font-size: 36px;
  text-align: center;
`

const UserAddress = styled.address`
  color: darkgray;
  font-size: 18px;
`

const LocationWrapper = styled.div`
  margin-top: 30px;
`

const LocationInfo = styled.p`
  margin: 0px;
  padding-left: 150px;
  padding-bottom: 10px;
  font-weight: bold;
`

const Nav = styled.nav`
display: flex;
border: none;
justify-content: space-evenly;
align-items: center;
font-family: 'helvetica', sans serif;
a {color:#eb472c;
  text-decoration: none}
height: 50px;
font-size: 1.2rem;
font-weight: bold;
`

export default List;