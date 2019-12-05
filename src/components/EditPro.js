import React, { useState } from "react";
import axios from "axios";
import { Button, Checkbox, Form } from "semantic-ui-react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  dense: {
    marginTop: theme.spacing(2)
  },
  menu: {
    width: 200
  }
}));

function EditProfile(props) {
  const classes = useStyles();
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
    let token = JSON.parse(localStorage.getItem("token"));
    let localId = JSON.parse(localStorage.getItem("id"));
    console.log("input", input);
    axios
      .put(`https://co-make.herokuapp.com/users/${localId}`, input, {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        axios
          .get(`https://co-make.herokuapp.com/users/${localId}/issues`, {
            headers: {
              Authorization: token
            }
          })
          .then(res => {
            console.log("NEW DATA FROM SERVER", res);
            props.setCurrentUser(res.data);
          })
          .catch(err => {
            console.log("OH NO", err);
          });
      })
      .catch(err => console.log("OH NO AN ERROR HAPPENED", err));
  };

  return (
    <FormContainer>
      <h1>Edit Profile</h1>

      <form onSubmit={updateHandler}>
        <label>Username</label>
        <TextField
          id="outlined-with-placeholder"
          label="With placeholder"
          placeholder="Profile Picture"
          className={classes.textField}
          margin="normal"
          variant="outlined"
          value={input.username}
          onChange={handleInput}
        />

        <label>Picture</label>
        <TextField
          id="outlined-with-placeholder"
          label="With placeholder"
          placeholder="Profile Picture"
          className={classes.textField}
          margin="normal"
          variant="outlined"
          value={input.picture}
          onChange={handleInput}
        />

        <label>Email</label>
        <TextField
          id="outlined-with-placeholder"
          label="With placeholder"
          placeholder="Profile Picture"
          className={classes.textField}
          margin="normal"
          variant="outlined"
          value={input.email}
          onChange={handleInput}
        />

        <label>Zip Code</label>
        <TextField
          id="outlined-with-placeholder"
          label="With placeholder"
          placeholder="Profile Picture"
          className={classes.textField}
          margin="normal"
          variant="outlined"
          value={input.zipCode}
          onChange={handleInput}
        />
      </form>

      <Button type="submit">Submit</Button>
      <Button onClick={props.handleEdit}>Back</Button>
    </FormContainer>
  );
}

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default EditProfile;
