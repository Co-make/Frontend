import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import axios from "axios";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import ThumbDownOutlinedIcon from "@material-ui/icons/ThumbDownOutlined";

const useStyles = makeStyles(theme => ({
  card: {
    width: 400,
    // marginBottom: 20,
    margin: 30
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
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
  avatar: {
    backgroundColor: red[500]
  }
}));

function IssueCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const issue = props.issue;
  const [count, setCount] = useState(0);
  const [upvotes, setUpvotes] = useState(0);
  const [upvoteId, setUpvoteId] = useState(null);
  let localId = JSON.parse(localStorage.getItem("id"));
  let token = JSON.parse(localStorage.getItem("token"));
  useEffect(() => {
    axios
      .get(`https://co-make.herokuapp.com/upvotes/issue/${props.issue.id}`, {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        // let thisUser = res.data.filter( user => user.id === localId )
        console.log("upvote data", res);
        setUpvotes(res.data.upvotes);
      })
      .catch(err => console.log("OH NO AN ERROR HAPPENED", err));
  }, []);

  let upvoteHandler = () => {
    console.log("User Id", props.issue.user_id);
    console.log("Issue Id", props.issue.id);
    console.log("token", token);
    axios
      .post(
        "https://co-make.herokuapp.com/upvotes/issue",
        {
          user_id: localId,
          issue_id: props.issue.id
        },
        {
          headers: {
            authorization: token
          }
        }
      )
      .then(res => {
        console.log("UPVOTE SUCCESS", res);
        setUpvoteId(res.data.id);
        axios
          .get(
            `https://co-make.herokuapp.com/upvotes/issue/${props.issue.id}`,
            {
              headers: {
                Authorization: token
              }
            }
          )
          .then(res => {
            setUpvotes(res.data.upvotes);
          })
          .catch(err => console.log("OH NO AN ERROR HAPPENED", err));
      })
      .catch(err => console.log("UPVOTE FAIL", err));
  };
  let downvoteHandler = () => {
    console.log("User Id", props.issue.user_id);
    console.log("Issue Id", props.issue.id);
    console.log("token", token);
    axios
      .delete(`https://co-make.herokuapp.com/upvotes/${props.issue.id}/issue`, {
        headers: {
          authorization: token
        }
      })
      .then(res => {
        console.log("DOWNVOTE SUCCESS", res);
        axios
          .get(
            `https://co-make.herokuapp.com/upvotes/issue/${props.issue.id}`,
            {
              headers: {
                Authorization: token
              }
            }
          )
          .then(res => {
            setUpvotes(res.data.upvotes);
          })
          .catch(err => console.log("OH NO AN ERROR HAPPENED", err));
      })
      .catch(err => console.log("DOWNVOTE FAIL", err));
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  console.log("props", props.issue);
  return (
    <Card raised className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={issue.issue_name}
        subheader={issue.zipCode}
      />
      <CardMedia className={classes.media} image={issue.picture} />
      {/* <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {issue.description}
        </Typography>
      </CardContent> */}
      <CardActions className={classes.postActivity} disableSpacing>
        <IconButton aria-label="add to favorites" onClick={upvoteHandler}>
          <ThumbUpAltOutlinedIcon />
        </IconButton>
        <IconButton aria-label="add to favorites">{upvotes} upvotes</IconButton>
        <IconButton aria-label="share" onClick={downvoteHandler}>
          <ThumbDownOutlinedIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Description:</Typography>
          <Typography paragraph>{issue.description}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default IssueCard;
