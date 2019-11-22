import React, { useState, useEffect } from 'react';
import { Table, Header, Image, Icon } from 'semantic-ui-react';
import styled from 'styled-components';
import axios from 'axios';

function ListTableRow(props) {
    const [count, setCount] = useState(0);
    const [upvotes, setUpvotes] = useState(0)
    const [upvoteId, setUpvoteId] = useState(null)
    let localId = JSON.parse(localStorage.getItem('id'))
    let token = JSON.parse(localStorage.getItem('token'))
    useEffect(() => {
      axios
        .get(`https://co-make.herokuapp.com/upvotes/issue/${props.issue.id}`, {
          headers: {
            Authorization: token
          }
         })
        .then( res => {
          // let thisUser = res.data.filter( user => user.id === localId )
          console.log("upvote data", res)
          setUpvotes(res.data.upvotes);

      })
        .catch( err => console.log("OH NO AN ERROR HAPPENED", err))
    },[])

    let upvoteHandler = () => {
      console.log("User Id",props.issue.user_id)
      console.log("Issue Id",props.issue.id)
      console.log("token",token)
      axios
      .post('https://co-make.herokuapp.com/upvotes/issue',
      {
        user_id:  localId,
        issue_id: props.issue.id
      },{
          headers: {
            authorization: token
          }
        })
         .then(res => {
           console.log("UPVOTE SUCCESS", res)
           setUpvoteId(res.data.id)
           axios
        .get(`https://co-make.herokuapp.com/upvotes/issue/${props.issue.id}`, {
          headers: {
            Authorization: token
          }
         })
        .then( res => {
          setUpvotes(res.data.upvotes);
      })
        .catch( err => console.log("OH NO AN ERROR HAPPENED", err))
         })
         .catch(err => console.log("UPVOTE FAIL", err))
  }
  let downvoteHandler = () => {
    console.log("User Id",props.issue.user_id)
    console.log("Issue Id",props.issue.id)
    console.log("token",token)
    axios
    .delete(`https://co-make.herokuapp.com/upvotes/${props.issue.id}/issue`,
    {
        headers: {
          authorization: token
        }
      })
       .then(res => {
         console.log("DOWNVOTE SUCCESS", res)
         axios
      .get(`https://co-make.herokuapp.com/upvotes/issue/${props.issue.id}`, {
        headers: {
          Authorization: token
        }
       })
      .then( res => {
        setUpvotes(res.data.upvotes);
    })
      .catch( err => console.log("OH NO AN ERROR HAPPENED", err))
       })
       .catch(err => console.log("DOWNVOTE FAIL", err))
}

    return (
      <Table.Row>
        <Table.Cell>
        <Image src={props.issue.picture} rounded size='small' />
        </Table.Cell>
        <Table.Cell>
          <Header as='h4' image>
           
            <Header.Content>
              {props.issue.issue_name}
              <Header.Subheader>{props.issue.description}</Header.Subheader>
            </Header.Content>
          </Header>
        </Table.Cell>
        <Table.Cell>
            <UpvoteCount>

                <Icon className="arrow circle up large" onClick={ upvoteHandler} />
                <Icon className="arrow circle down large" onClick={ downvoteHandler} />
                {upvotes} upvotes
            </UpvoteCount>

        </Table.Cell>
      </Table.Row>
      )
}

const UpvoteCount = styled.span`
  padding: 0;
`

export default ListTableRow;
