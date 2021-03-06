import React from 'react';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const ChannelWrapper = styled.div`
  grid-column: 2;
  grid-row: 1 / 4;
  background-color: #4e3a4c;
  color: #958993;
`;

const paddingLeft = 'padding-left: 10px';

const TeamNameHeader = styled.h1`
  color: #fff;
  font-size: 20px;
  padding-top: 10px;
`;

const SideBarList = styled.ul`
  width: 100%;
  list-style: none;
  padding-left: 0;
`;

const SideBarListItem = styled.li`
  padding: 2px;
  ${paddingLeft};
  color: #b1a8af;
  text-decoration: none;
  &:hover {
    background: #3e313c;
  }
`;

const SideBarHeaderList = styled.li`
  ${paddingLeft};
`;

const channel = ({ id, name }, teamId) => (
  <Link to={`/view-team/${teamId}/${id}`} key={`channel-${id}`}>
    <SideBarListItem># {name}</SideBarListItem>
  </Link>
);

const Green = styled.span`
  color: #38978d;
`;

const Bubble = ({ on = true }) => (on ? <Green>•</Green> : 'o');

const PushLeft = styled.div`
  ${paddingLeft};
`;

const AddNewUsers = styled.div`
  ${paddingLeft};
  color: #b1a8af;
  cursor: pointer;
`;

const user = ({ id, username }, teamId) => (
  <Link
    to={`/view-team/user/${parseInt(teamId, 10)}/${id}`}
    key={`user-${id + username}`}
  >
    <SideBarListItem>
      <Bubble /> {username}
    </SideBarListItem>
  </Link>
);

export default ({
  teamName,
  username,
  channels,
  users,
  onAddChannelClick,
  onAddUsersClick,
  teamId,
  isOwner,
  onDirectMessageClick,
}) => (
  <ChannelWrapper>
    <PushLeft>
      <TeamNameHeader>{teamName}</TeamNameHeader>
      {username}
    </PushLeft>
    <div>
      <SideBarList>
        <SideBarHeaderList>
          Channels{' '}
          {isOwner && (
            <Icon
              onClick={onAddChannelClick}
              style={{ cursor: 'pointer' }}
              name="add circle"
            />
          )}
        </SideBarHeaderList>
        {channels.map(c => channel(c, teamId))}
      </SideBarList>
    </div>
    <div>
      <SideBarList>
        <SideBarHeaderList>
          Direct Messages
          <Icon
            onClick={onDirectMessageClick}
            style={{ cursor: 'pointer' }}
            name="add circle"
          />
        </SideBarHeaderList>
        {users.map(u => user(u, teamId))}
      </SideBarList>
    </div>
    {isOwner && (
      <AddNewUsers onClick={onAddUsersClick}>
        <Icon name="add" />
        Invite People
      </AddNewUsers>
    )}
  </ChannelWrapper>
);
