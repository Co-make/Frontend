import React, { useState } from "react";
import axios from "axios";
// import { Button, Checkbox } from "semantic-ui-react";
import { device } from "../styles/breakpoints";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    width: "70%",
    maxWidth: "600px",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  dense: {
    marginTop: theme.spacing(2)
  },
  menu: {
    width: 200
  },
  button: {
    margin: theme.spacing(1),
    // marginTop: "3rem",
    width: "40%",
    maxWidth: "400px"
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

      <Form onSubmit={updateHandler}>
        <TextField
          id="outlined-with-placeholder"
          label="Username"
          placeholder="Profile Picture"
          className={classes.textField}
          margin="normal"
          variant="outlined"
          name="username"
          value={input.username}
          onChange={handleInput}
        />

        <TextField
          id="outlined-with-placeholder"
          label="Picture"
          placeholder="Profile Picture"
          className={classes.textField}
          margin="normal"
          variant="outlined"
          name="picture"
          value={input.picture}
          onChange={handleInput}
        />

        <TextField
          id="outlined-with-placeholder"
          label="Email"
          placeholder="Profile Picture"
          className={classes.textField}
          margin="normal"
          variant="outlined"
          name="email"
          value={input.email}
          onChange={handleInput}
        />

        <TextField
          id="outlined-with-placeholder"
          label="Zip Code"
          placeholder="Profile Picture"
          className={classes.textField}
          margin="normal"
          variant="outlined"
          name="zipCode"
          value={input.zipCode}
          onChange={handleInput}
        />

        <Button
          type="submit"
          variant="outlined"
          color="primary"
          className={classes.button}
        >
          Submit
        </Button>

        <Button
          variant="outlined"
          color="secondary"
          onClick={props.handleEdit}
          className={classes.button}
        >
          Back
        </Button>
      </Form>

      {/* <button type="submit">Submit</button>
      <button onClick={props.handleEdit}>Back</button> */}
    </FormContainer>
  );
}

const FormContainer = styled.div`
  margin-top: 25%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media ${device.tablet} {
    margin-top: 8%;
  }
  h1 {
    text-align: center;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default EditProfile;
