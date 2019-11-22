import React, {useState} from 'react'
import axios from 'axios';
import { Button, Checkbox, Form } from 'semantic-ui-react';

function EditProfile(props) {
    const [input, setInput] = useState({
        email: props.currentUser.email,
        picture: props.currentUser.picture,
        zipCode: props.currentUser.zipCode,
        username: props.currentUser.username,
        password: props.currentUser.password

      });
    const updateHandler = e => {
        e.preventDefault();
        updateUser(input);
        props.handleEdit();
      };

      const handleInput = e => {
        setInput({ ...input, [e.target.name]: e.target.value });
      };

      const updateUser = () => {
        let token = JSON.parse(localStorage.getItem('token'))
        let localId = JSON.parse(localStorage.getItem('id'))
        console.log("input", input)
        axios
           .put(`https://co-make.herokuapp.com/users/${localId}`, input, {
              headers: {
                Authorization: token
              }
             })
            .then( res => {
              axios.get(`https://co-make.herokuapp.com/users/${localId}/issues`, {
                headers: {
                  Authorization: token
                }
               }).then( res => {
                 console.log("NEW DATA FROM SERVER", res)
                 props.setCurrentUser(res.data)
               }).catch( err => {
                 console.log("OH NO", err)
               })
          })
            .catch( err => console.log("OH NO AN ERROR HAPPENED", err))
      }

    return (
        <div>
          <div>
          <h1>Edit</h1>
          {/* <form onSubmit={updateHandler}>
            <div>
              <label htmlFor="username">
                Username:{" "}
                <input
                  type="text"
                  value={input.username}
                  name="username"
                  onChange={handleInput}
                />
              </label>
              <label htmlFor="picture">
                Image:{" "}
                <input
                  type="text"
                  value={input.picture}
                  name="picture"
                  onChange={handleInput}
                />
              </label>
              <label htmlFor="email">
                Email:{" "}
                <input
                  type="text"
                  value={input.email}
                  name="email"
                  onChange={handleInput}
                />
              </label>
              <label htmlFor="location">
                Zip Code:{" "}
                <input
                  type="text"
                  value={input.zipCode}
                  name="zipCode"
                  onChange={handleInput}
                />
              </label>
            </div>

            <button>Update</button>
          </form> */}
          <Form onSubmit={updateHandler} className='formstyle'>
    <Form.Field>
      <label>Username</label>
      <input type='text' value={input.username} name='username' onChange={handleInput} placeholder='Username' />
    </Form.Field>
    <Form.Field>
      <label>Profile Picture</label>
      <input type='text' value={input.picture} name='picture' onChange={handleInput} placeholder='Profile Picture' />
    </Form.Field>
    <Form.Field>
      <label>Email</label>
      <input type='text' value={input.email} name='email' onChange={handleInput} placeholder='Email' />
    </Form.Field>
    <Form.Field>
      <label>Zip Code</label>
      <input type='text' value={input.zipCode} name='zip code' onChange={handleInput} placeholder='Zip Code' />
    </Form.Field>
    <Button type='submit'>Submit</Button>
    <Button onClick={props.handleEdit}>Back</Button>
  </Form>
          {/* <button onClick={props.handleEdit}>Back</button> */}
        </div>
        </div>
    )
}

export default EditProfile
