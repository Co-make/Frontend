import React, {useState} from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment, Dimmer, Loader } from 'semantic-ui-react'
import axios from 'axios';
import Welcome from '../images/bermuda/sign-in-4.png'


function Login(props) {
  const [inputData, setInputData] = useState({email: "", password:""})
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const handleInput = e => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const loginHandler = e => {
    setIsLoading(true)
    e.preventDefault()
    const url =
        "https://co-make.herokuapp.com/auth/login";
      axios
        .post(url, inputData)
        .then( res => {

          props.setMessage('')
          setErrorMessage('')
          console.log("Success!", res)
          props.setToken(res.data.token)
          props.setLocalId(res.data.id)
          props.setZip(res.data.zipCode)
          props.history.push("/");
          setIsLoading(false)
        })

        .catch(err => {
          console.log("Login PROBLEM0", err);
          setErrorMessage("Uh Oh, Looks like that didn't work. Try Again!")
          setIsLoading(false)
        });
  }

  return (
      <>
      <Dimmer active={ isLoading ? true : false }>
        <Loader>Loading</Loader>
      </Dimmer>
      <Grid textAlign='center' verticalAlign='middle'>

        <Grid.Column style={{ maxWidth: 450 }}>

          <Image src={Welcome} centered size='small' />
          <Header as='h2' color='teal' textAlign='center'>

             Log in to your account
          </Header>
          <Header as="h4" color='green' textAlign='center'>{props.message}</Header>
          <Header as="h4" color='red' textAlign='center'>{errorMessage}</Header>
          <Form size='large' onSubmit={loginHandler}>
            <Segment stacked>
              <Form.Input
              fluid icon='user'
              name="email"
              value={inputData.email}
              onChange={handleInput}
              iconPosition='left'
              placeholder='E-mail address'
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
                Log in
              </Button>
            </Segment>
          </Form>
          <Message>
            New to us?
            <Button className="register-button" data-testid="register-button"
            onClick={()=> props.history.push('/register')}
            content='Sign Up'
            positive
            size='mini' />
          </Message>
        </Grid.Column>
      </Grid>
      </>

  )
}

export default Login
