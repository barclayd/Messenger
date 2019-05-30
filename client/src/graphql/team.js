import gql from 'graphql-tag';

export const meQuery = gql`
  {
  me {
    username
    id
    teams {
      name
      channels {
        id
        name
      }
    }
  }
}
`;

export const createChannelMutation = gql`
  mutation($teamId: Int!, $name: String!) {
    createChannel(teamId: $teamId, name: $name) {
      ok
      channel {
        name
        id
      }
    }
  }
`;

export const addTeamMemberMutation = gql`
  mutation($email: String!, $teamId: Int!) {
    addTeamMember(email: $email, teamId: $teamId) {
      ok
      errors {
        path
        message
      }
    }
  }
`;
