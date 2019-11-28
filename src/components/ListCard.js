import React from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import { red } from "@material-ui/core/colors";
import profile from "../images/walter-avi.png";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles(theme => ({
  card: {
    width: "100%",
    marginTop: 100
    // marginBottom: 50
    // position: "fixed"
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
    backgroundSize: "contain"
  },
  postActivity: {
    justifyContent: "space-between",
    borderTop: "1px solid lightgray",
    padding: 0,
    paddingLeft: 10,
    paddingRight: 20,
    alignItems: "center"
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  button: {
    padding: ".3rem"
  },
  chip: {
    margin: "0 1rem"
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

function ListCard(props) {
  const classes = useStyles();
  const currentUser = props.currentUser;

  return (
    <Card raised className={classes.card}>
      <CardHeader
        avatar={
          currentUser ? (
            <Avatar
              aria-label="recipe"
              className={classes.avatar}
              src={!currentUser.picture ? profile : currentUser.picture}
            ></Avatar>
          ) : (
            <Avatar
              aria-label="recipe"
              className={classes.avatar}
              src={profile}
            ></Avatar>
          )
        }
        title={currentUser.username}
        subheader={
          currentUser.issues
            ? `${currentUser.issues.length} issues created`
            : currentUser.zipCode
        }
      />
    </Card>
  );
}

// const ListCardWrapper = styled.section`
//   padding: 30px 0px;
//   border-bottom: 1px solid black;
// `;

// const IssueWrapper = styled.div`
//   display: flex;
//   justify-content: space-around;
// `;

// const ProjectImage = styled.img`
//   text-align: center;
//   height: 175px;
//   width: 175px;
// `;

// const ProjectDescription = styled.div`
//   margin-left: 200px;
//   width: 50%;
// `;

// const ProjectTitle = styled.p`
//   margin: 0px;
//   font-weight: bold;
// `;

// const ProjectLocation = styled.address`
//   margin: 0px;
// `;

// const UpvoteCount = styled.span`
//   margin-left: 200px;
//   padding-top: 30px;
// `;

export default ListCard;
