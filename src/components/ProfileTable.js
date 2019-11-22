import React from 'react';
import { Table, Header, Image } from 'semantic-ui-react';
import ProfileTableRow from './ProfileTableRow';
import styles from '../styles/ProfileStyles.css';

// const PTable = styled.table` 
//     width: 400px;
//     margin-bottom: 10px;
//     padding: 10px;


// `

function ProfileTable(props) {
    return (
    <Table className='tablestyle' basic='very' celled collapsing>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Issues</Table.HeaderCell>
        <Table.HeaderCell></Table.HeaderCell>
        <Table.HeaderCell>Edit</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
    { !props.currentUser.issues ? <p>Loading...</p>
        : props.currentUser.issues.map( issue =>
          <ProfileTableRow issue={issue} handleEditIssue={props.handleEditIssue} deleteIssue={props.deleteIssue} />
        )}
    </Table.Body>
    </Table>
      )
}

export default ProfileTable;

