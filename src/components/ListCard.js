
// import React, {useState, useEffect} from 'react';
// import { Icon } from 'semantic-ui-react';
// import styled from 'styled-components';
// import axios from 'axios'

// function ListCard(props) {
//   const [count, setCount] = useState(0);
//   const [upvotes, setUpvotes] = useState(0)
//   let token = JSON.parse(localStorage.getItem('token'))
//   useEffect(() => {
//     axios
//       .get(`https://co-make.herokuapp.com/upvotes/issue/${props.data.id}`, {
//         headers: {
//           Authorization: token
//         }
//        })
//       .then( res => {
//         // let thisUser = res.data.filter( user => user.id === localId )
//         console.log("upvote data", res)
//         setUpvotes(res.data);

//     })
//       .catch( err => console.log("OH NO AN ERROR HAPPENED", err))
//   },[])
//   upvoteHandler = () => {
//     axios
//       .post('https://co-make.herokuapp.com/issues', {
//           headers: {
//             Authorization: token
//           },
//           body: {
//             user_id:  2,
//             issue_id: 3
//           }
//          })
//   }

//   return (

//     <ListCardWrapper>
//       <IssueWrapper>

//         <ProjectImage src={props.data.picture} />
//         <ProjectDescription>
//           <ProjectTitle>{props.data.issue_name}</ProjectTitle>
//           <p>Categories:  {props.data.category}</p>
//           <address>Location:  {props.data.zipCode}</address>
//           <p>Description:  {props.data.description}</p>
//           <UpvoteCount>
//             <Icon name="arrow up" onClick={ upvoteHandler} />
//             {count} upvotes
//           </UpvoteCount>
//         </ProjectDescription>
//       </IssueWrapper>


//     </ListCardWrapper>
//   )
// }

// const ListCardWrapper = styled.section`
//   padding: 30px 0px;
//   border-bottom: 1px solid black;
// `

// const IssueWrapper = styled.div`
//   display: flex;
//   justify-content: space-around;
// `

// const ProjectImage = styled.img`
//   text-align: center;
//   height: 175px;
//   width: 175px;
// `

// const ProjectDescription = styled.div`
//   margin-left: 200px;
//   width: 50%;
// `

// const ProjectTitle = styled.p`
//   margin: 0px;
//   font-weight: bold;
// `

// const ProjectLocation = styled.address`
//   margin: 0px;
// `

// const UpvoteCount = styled.span`
//   margin-left: 200px;
//   padding-top: 30px;
// `

// export default ListCard;