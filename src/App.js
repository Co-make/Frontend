import React, { useState } from "react";
import List from "./components/List";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import AddIssue from "./components/AddIssue";
import { Route, Redirect } from "react-router-dom";
import { useLocalStorage } from "./hooks/useLocalStorage";
import Layout from "./components/Layout";

function App() {
  const [token, setToken] = useLocalStorage("token", null);
  const [localId, setLocalId] = useLocalStorage("id", "");
  const [zipCode, setZipCode] = useLocalStorage("zipcode", "");
  const [message, setMessage] = useState("");

  return (
    <div className="App">
<<<<<<< HEAD
      <header className="App-header">
        <nav className="nav-container">
          <Nav>
            <div className="logotext">
              <img className="logo" src={Logo}></img>omake
            </div>
            <a href="https://flamboyant-mayer-055230.netlify.com/aboutus.html">
              About
            </a>
            {token ? (
              <Link to="/login">
                <Button color="facebook" size="medium" onClick={logOut}>
                  Logout
                </Button>
              </Link>
            ) : token === "" ? (
              <></>
=======
      <Layout token={token} setToken={setToken} localId={localId}>
        <Route
          exact
          path="/"
          render={props =>
            localStorage.getItem("token") ? (
              <List {...props} />
>>>>>>> master
            ) : (
              <Redirect to="/login" />
            )
          }
        />
        <Route
          exact
          path="/profile"
          render={props =>
            localStorage.getItem("token") ? (
              <Profile {...props} />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
        <Route
          exact
          path="/login"
          render={props => (
            <Login
              setToken={setToken}
              setLocalId={setLocalId}
              message={message}
              setMessage={setMessage}
              setZip={setZipCode}
              {...props}
            />
          )}
        />

        <Route
          path="/register"
          render={props => (
            <Register
              setToken={setToken}
              message={message}
              setMessage={setMessage}
              {...props}
            />
          )}
        />

        <Route
          path="/addIssue"
          render={props => (
            <AddIssue
              setToken={setToken}
              message={message}
              setMessage={setMessage}
              {...props}
            />
          )}
        />
      </Layout>
    </div>
  );
}

export default App;
