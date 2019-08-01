import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import ListCard from './ListCard';
import FooterNav from './FooterNav';
import ListTable from './ListTable';

function List(props) {
  const [issues, setIssues] = useState([]);
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
          // axios.get('')
          // let thisUser = res.data.filter( user => user.id === localId )
          console.log(res.data)
          setIssues(res.data);

      })
        .catch( err => console.log("OH NO AN ERROR HAPPENED", err))
    },[])

  return (
    <ListWrapper>
      <UserWrapper>
        <UserInfo>Robert Downey</UserInfo>
        <UserAddress></UserAddress>
        <LocationWrapper>
            <LocationInfo></LocationInfo>
            <LocationInfo>Filter</LocationInfo>
            <LocationInfo>Sort by:</LocationInfo>
        </LocationWrapper>
      </UserWrapper>

      {/* Issues List */}
      <ListTable issues={issues}/>

    <div className="footer-wrapper">
      {/* <FooterNav /> */}
    </div>

    </ListWrapper>
  )
}

const ListWrapper = styled.div`
  max-width: 1024px;
  width: 100%;
  margin: 0 auto;
  border: 1px solid black;
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
  padding-left: 150px;
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

export default List;