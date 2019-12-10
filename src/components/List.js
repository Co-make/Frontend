import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import IssuesList from "./IssuesList";
import { Button, Image, Card, Icon } from "semantic-ui-react";
import { Pagination } from "semantic-ui-react";
import Scroll from "react-scroll";
import CircularProgress from "@material-ui/core/CircularProgress";

function List(props) {
  const [issues, setIssues] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [issuesCreated, setIssuesCreated] = useState([]);
  const [activePage, setActivepage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [issuesPerPage] = useState(5);

  var scroll = Scroll.animateScroll;
  let localId = JSON.parse(localStorage.getItem("id"));
  let token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://co-make.herokuapp.com/issues", {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        setIssues(res.data);
        axios
          .get(`https://co-make.herokuapp.com/users/${localId}/issues`, {
            headers: {
              Authorization: token
            }
          })
          .then(res => {
            console.log("USER DATA FROM SERVER", res);
            setCurrentUser(res.data);
            setIssuesCreated(res.data.issues.length);
            setLoading(false);
          })
          .catch(err => {
            console.log("OH NO AN ERROR HAPPENED", err);
            setLoading(false);
          });
      })
      .catch(err => {
        console.log("OH NO AN ERROR HAPPENED", err);
        setLoading(false);
      });
  }, []);
  // Scroll to top on page change
  useEffect(() => {
    scroll.scrollToTop({ smooth: false });
  }, [activePage]);
  // On page change set active page
  const paginate = pageNumber => {
    return setActivepage(pageNumber);
  };

  // Pagination
  const indexOfLastIssue = activePage * issuesPerPage;
  const indexOfFirstIssue = indexOfLastIssue - issuesPerPage;
  const currentIssues = issues.slice(indexOfFirstIssue, indexOfLastIssue);

  return (
    <>
      {" "}
      {loading ? (
        <LoaderWrapper>
          <CircularProgress />
        </LoaderWrapper>
      ) : (
        <>
          <ListCard currentUser={currentUser} />
          {/* <Card className="user-card"
        raised
        centered
        image={currentUser.picture}
        header={currentUser.username}
        meta={currentUser.zipCode}
        description={`You have posted ${issuesCreated} times since joining Comake!`}
      /> */}

          <ListWrapper>
            {/* Issues List */}

            <IssuesList issues={currentIssues} />

            <PaginationStyles>
              <Pagination
                totalPages={Math.ceil(issues.length / issuesPerPage)}
                onPageChange={(e, { activePage }) => paginate(activePage)}
                boundaryRange={0}
                defaultActivePage={1}
                ellipsisItem={null}
                firstItem={null}
                lastItem={null}
                siblingRange={2}
              />
            </PaginationStyles>
          </ListWrapper>
        </>
      )}
    </>
  );
}

const LoaderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
`;

const ListWrapper = styled.div`
  max-width: 1024px;

  width: 100%;
  margin: 0 auto 2rem auto;
`;

const PaginationStyles = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 100px;
`;

const UserWrapper = styled.div`
  width: 100%;
  padding-top: 50px;
  padding-bottom: 30px;
  border-bottom: 1px solid black;
  height: 500px;
`;

const WelcomeImage = styled.img`
  height: 200px;
  width: 200px;
`;

const UserInfo = styled.p`
  margin: 0px;
  font-weight: bold;
  font-size: 36px;
  text-align: center;
`;

const UserAddress = styled.address`
  color: darkgray;
  font-size: 18px;
`;

const LocationWrapper = styled.div`
  margin-top: 30px;
`;

const LocationInfo = styled.p`
  margin: 0px;
  padding-left: 150px;
  padding-bottom: 10px;
  font-weight: bold;
`;

export default List;
