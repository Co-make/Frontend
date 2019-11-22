import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Grid, Header, Image, Message, Segment, Dimmer, Loader } from 'semantic-ui-react'
import '../styles/addIssue.css'
import Upgrade from '../images/bermuda/bermuda-upgrade.png'

function AddIssue(props) {
  const [createIssue, setCreateIssue] = useState({ zipCode: localStorage.getItem("zipcode"), user_id: localStorage.getItem("id"), category: "" });
  const [isLoading, setIsLoading] = useState(false)

  // Functionality for Post Request
  const addIssue = data => {
      console.log("passIn data", data);
      let token = JSON.parse(localStorage.getItem('token'))
      let localId = JSON.parse(localStorage.getItem('id'))
      axios
        .post('https://co-make.herokuapp.com/issues', data, {
          headers: {
            Authorization: token
          }
         })
        .then( res => {
          // let thisUser = res.data.filter( user => user.id === localId )
          console.log("SUCCESS", res.data)

          props.history.push('/')
          setIsLoading(false);
      })
        .catch( err => console.log("OH NO AN ERROR HAPPENED", err))
  }

  function handleChange(event) {
    const updatedIssues = { ...createIssue, [event.target.name]: event.target.value };
    console.log(
      "handleChange",
      event.target.name,
      event.target.value,
      updatedIssues
    );
    setCreateIssue(updatedIssues);
  };

  function handleSubmit(event) {
    setIsLoading(true);
    event.preventDefault();
    console.log("createIssue", createIssue);
    addIssue(createIssue);
    setCreateIssue({ issue_name: "", category: "", description: "", zipCode: localStorage.getItem("zipcode"), user_id: localStorage.getItem("id") });
  };

  return (
    <>
    <Dimmer active={ isLoading ? true : false }>
        <Loader>Loading</Loader>
      </Dimmer>
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
          <Image src={Upgrade} centered size="small" />
        <Header as='h2' textAlign='center'>
          Add a new Issue
        </Header>
        <Form size='large' onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
            fluid
            icon='flag'
            name="issue_name"
            value={createIssue.issue_name}
            onChange={handleChange}
            iconPosition='left'
            placeholder='Issue Name'
            />

            <Form.Input
              fluid
              icon='address card'
              iconPosition='left'
              placeholder='Description'
              type='text'
              name="description"
              value={createIssue.description}
              onChange={handleChange}
            />
            <Form.Input
              fluid
              icon='image'
              iconPosition='left'
              placeholder='Picture'
              type='text'
              name="picture"
              value={createIssue.picture}
              onChange={handleChange}
            />

            <Button type="submit" color='facebook' fluid size='large'>
              Add
            </Button>
          </Segment>
        </Form>
        <Message>
            Cancel?
            <Button className="register-button"
            onClick={()=> props.history.push('/')}
            content='Go Back'
            positive
            size='medium' />
          </Message>
      </Grid.Column>
    </Grid>
</>

  )


}

export default AddIssue;


