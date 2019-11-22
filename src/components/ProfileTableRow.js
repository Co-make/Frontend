
import { Table, Header, Image, Icon } from 'semantic-ui-react';
import styled from 'styled-components';
import React, {useState, useEffect} from 'react';


// const Row = styled.div`
// width: 100px;
// `

function ProfileTableRow(props) {

    return (
      <Table.Row>
        <Table.Cell>
        <Image src={props.issue.picture} rounded size='small' />
        </Table.Cell>
        <Table.Cell>
          <Header as='h4' image>
            
            <Header.Content>
              {props.issue.issue_name}
              <Header.Subheader>{props.issue.description}</Header.Subheader>
            </Header.Content>
          </Header>
        </Table.Cell>
        <Table.Cell className='iconcell' width={3}>
         {/* upvote placeholder   */}
         <span className= 'iconstyle'>
        <i className="pencil alternate icon" onClick={()=> props.handleEditIssue(props.issue.id)}></i>
        {' '}

        <i className="trash alternate outline icon" onClick={()=> props.deleteIssue(props.issue.id)}></i>
        </span>
        </Table.Cell>
      </Table.Row>
      )
}



{/* <button onClick={()=> props.deleteIssue(props.issue.id)}>delete</button>
<button onClick={()=> props.handleEditIssue(props.issue.id)}>Edit</button> */}

export default ProfileTableRow;

