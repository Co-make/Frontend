import React from "react";
import ListTableRow from "./ListTableRow";
import { Table, Header, Image, Dropdown } from "semantic-ui-react";
import styled from "styled-components";
import styles from "../styles/listTableStyles.css";
import IssueCard from "./IssueCard";

const dropdownOptions = [
  { key: "recent", text: "Most recent", value: "recent" },
  { key: "location", text: "Zip", value: "location" },
  { key: "category", text: "Category", value: "category" }
];

function ListTable(props) {
  return (
    <IssuesList>
      {/* { issues.map( issue => <ListCard key={issue.id} data={issue}  /> )}     */}
      {props.issues &&
        props.issues.map(issue => (
          // <ListTableRow issue={issue} />
          <IssueCard issue={issue} />
        ))}
    </IssuesList>
  );
}

// const FeedContainer = styled.div`
//   width: 100%;
//   display: flex;
//   // flex-wrap: nowrap;
//   // overflow-x: auto;
//   // margin-left: 1%;
// `;
const IssuesList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export default ListTable;
