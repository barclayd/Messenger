export default `
  type Channel {
    id: ID!
    name: String!
    messages: [Message!]!
    public: Boolean!
    users: [User!]!
  }
  
   type Mutation {
    createChannel(teamId: Int!, name: String!, public: Boolean=false): Boolean!
  }
  
`;
