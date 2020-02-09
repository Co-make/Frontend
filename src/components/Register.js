import React, {useState} from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment, Dimmer, Loader } from 'semantic-ui-react'
import axios from 'axios';
import Success from '../images/bermuda/bermuda-success.png'


function Register(props) {
  const [inputData, setInputData] = useState({email: "", password:"", username:"", zipCode:""})
  const [isLoading, setIsLoading] = useState(false);

  const handleInput = e => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const loginHandler = e => {
    e.preventDefault()
    setIsLoading(true)
    const url =
        "https://co-make.herokuapp.com/auth/register";
      axios
        .post(url, inputData)
        .then( res => {

          props.setMessage("Successfully Registered!")
          console.log("Success!", res)
          props.history.push("/");
          setIsLoading(false);
        })

        .catch(err => {
          console.log("Register PROBLEM0", err);
        });
  }

  return (
    <>
    <Dimmer active={ isLoading ? true : false }>
        <Loader>Loading</Loader>
      </Dimmer>
    <Grid textAlign='center'  verticalAlign='top'>
      <Grid.Column style={{ maxWidth: 450 }}>
          <Image src={Success} centered size='tiny' />
        <Header as='h2' color='teal' textAlign='center'>
          Create a new account
        </Header>
        <Header as="h4" color='green' textAlign='center'>{props.message}</Header>
        <Form size='large' onSubmit={loginHandler}>
          <Segment stacked>
            <Form.Input
            fluid icon='mail'
            name="email"
            value={inputData.email}
            onChange={handleInput}
            iconPosition='left'
            placeholder='E-mail address'
             />

            <Form.Input
              fluid
              icon='user'
              iconPosition='left'
              placeholder='Username'
              type='username'
              name="username"
              value={inputData.username}
              onChange={handleInput}
            />
            <Form.Input
              fluid
              icon='map'
              iconPosition='left'
              placeholder='Zipcode'
              type='zipCode'
              name="zipCode"
              value={inputData.zipCode}
              onChange={handleInput}
            />

            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
              name="password"
              value={inputData.password}
              onChange={handleInput}
            />

            <Button type="submit" color='facebook' fluid size='large'>
              Register
            </Button>
          </Segment>
        </Form>
        <Message>
          Return to Login?
          <Button className="register-button"
          onClick={()=> props.history.push('/login')}
          content='Back'
          positive
          size='mini' />
        </Message>
      </Grid.Column>
    </Grid>
    </>
  )
}

export default Register
