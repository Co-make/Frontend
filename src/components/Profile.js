import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import EditProfile from "./EditProfile";
import { Button, Card, Icon, Image, Table } from "semantic-ui-react";
import EditIssue from "./EditIssue";
import styled from "styled-components";
import ProfileTable from "./ProfileTable";
import ProfileCard from "./ProfileCard";
import styles from "../styles/listStyles.css";
import skyline from "../images/skyline.jpg";
import avi from "../images/walter-avi.png";
import EditIcon from "@material-ui/icons/Edit";
import RoomIcon from "@material-ui/icons/Room";
import IssuesList from "./IssuesList";
import { device } from "../styles/breakpoints";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;
const Body = styled.div`
  flex-direction: column;
`;

const PCard = styled.div`
  width: 500px;
`;
const Nav = styled.nav`
  display: flex;
  border: none;
  justify-content: space-evenly;
  align-items: center;
  font-family: "helvetica", sans serif;
  a {
    color: #eb472c;
    text-decoration: none;
  }
  height: 50px;
  font-size: 1.2rem;
  font-weight: bold;
`;

function Profile(props) {
  const [currentUser, setCurrentUser] = useState("");
  const [isEditingUser, setIsEditingUser] = useState(false);
  const [isEditingIssue, setIsEditingIssue] = useState(false);
  const [issueToUpdate, setIssueToUpdate] = useState({});
  let token = JSON.parse(localStorage.getItem("token"));
  let localId = JSON.parse(localStorage.getItem("id"));

  useEffect(() => {
    axios
      .get(`https://co-make.herokuapp.com/users/${localId}/issues`, {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        console.log("USER DATA FROM SERVER", res);
        setCurrentUser(res.data);
      })
      .catch(err => console.log("OH NO AN ERROR HAPPENED", err));
  }, []);

  const handleEdit = e => {
    setIsEditingUser(!isEditingUser);
  };
  const handleEditIssue = id => {
    let thisIssue = currentUser.issues.filter(issue => issue.id === id);
    setIssueToUpdate(...thisIssue);
    setIsEditingIssue(!isEditingIssue);
  };

  const deleteIssue = id => {
    axios
      .delete(`https://co-make.herokuapp.com/issues/${id}`, {
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
            setCurrentUser(res.data);
          })
          .catch(err => {
            console.log("OH NO", err);
          });
      })
      .catch(err => {
        console.log("Error on delete", err);
      });
  };

  return (
    <>
      <Container>
        {isEditingUser ? (
          <EditProfile
            handleEdit={handleEdit}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
        ) : isEditingIssue ? (
          <EditIssue
            setCurrentUser={setCurrentUser}
            setIsEditingIssue={setIsEditingIssue}
            isEditingIssue={isEditingIssue}
            issueToUpdate={issueToUpdate}
          />
        ) : (
          <ProfileContainer>
            <Banner>
              <BannerImage src={skyline} alt="Banner" />
            </Banner>
            <ImageCrop>
              <ProfileImage
                src={currentUser.picture ? currentUser.picture : avi}
                alt="Profile"
              />
            </ImageCrop>

            <MainProfile>
              <UserInfo>
                <h1>{currentUser.username}</h1>
                <h4>
                  <RoomIcon />
                  {currentUser.zipCode}
                </h4>
                <h4>{currentUser.email}</h4>
                <h6 onClick={handleEdit}>
                  <EditIcon /> Edit Profile
                </h6>
              </UserInfo>

              <UsersIssues>
                <h3>
                  {currentUser.username} has voted on # issues in the community
                </h3>
                <h3>{currentUser.username}'s created issues:</h3>
                <IssuesList issues={currentUser.issues} />
              </UsersIssues>
            </MainProfile>
            <footer className="footer-nav">
              <Nav className="bottom-nav">
                <Button.Group widths="3" size="big">
                  <Button
                    icon="list alternate outline"
                    content="Feed"
                    onClick={() => props.history.push("/")}
                  />
                  <Button
                    icon="add"
                    content="Create Issue"
                    onClick={() => props.history.push("/addIssue")}
                  />
                  <Button
                    icon="user"
                    content="Profile"
                    onClick={() => props.history.push(`/profile/${localId}`)}
                  />
                </Button.Group>
              </Nav>
            </footer>
          </ProfileContainer>
        )}
      </Container>
    </>
  );
}

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 7.1%;
  padding-bottom: 5rem;
  width: 100%;
  background-color: #f8f8ff;
`;

const Banner = styled.div``;

const BannerImage = styled.img`
  width: 100%
  border-bottom: 10px solid black;
  max-height: 225px;
  object-fit: cover;
  `;

const ImageCrop = styled.div`
  width: 150px;
  height: 150px;
  position: relative;
  overflow: hidden;
  border-radius: 50%;
  border: 1px solid white;
  margin-top: -8rem;
  margin-left: auto;
  margin-right: auto;
  background-color: white;
`;
const ProfileImage = styled.img`
  object-fit: cover;
  width: 150px;
  height: 150px;
`;

const MainProfile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  @media ${device.tablet} {
    flex-direction: row;
  }
`;

const UserInfo = styled.div`
  padding-left: 2rem;
  border-bottom: 1px solid lightgray;
  margin-bottom: 1rem;
  @media ${device.tablet} {
    border-bottom: none;
    margin-bottom: 0;
  }
  h1 {
    font-size: 3rem;
    @media ${device.tablet} {
      font-size: 4rem;
    }
  }
  h4 {
    font-size: 2rem;
  }
`;

const UsersIssues = styled.div`
  // margin-left: 2rem;
  text-align: center;
  @media ${device.tablet} {
    margin-top: 2rem;
  }
`;

export default Profile;
