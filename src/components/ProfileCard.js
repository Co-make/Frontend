import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react';
import '../styles/ProfileStyles.css';



const ProfileCard = (props) => (
  <Card className='cardstyle' raised='true'>
    <Image src={props.currentUser.picture} wrapped ui={false} />
    <Card.Content>
      <Card.Header>{props.currentUser.username}</Card.Header>
      <Card.Meta>
        <span className='date'><i class="map pin icon"></i>{props.currentUser.zipCode}</span>
      </Card.Meta>
      <Card.Description>
        {props.currentUser.email}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name='user' />
        <i class="pencil alternate icon" onClick={props.dog}></i>
      </a>
    </Card.Content>
  </Card>
)

export default ProfileCard;

