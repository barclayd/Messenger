import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Comment } from 'semantic-ui-react';
import { Messages } from '../components/MainLayout';
import {
  messagesQuery,
  newChannelMessageSubscription,
} from '../graphql/message';
import FileUpload from '../components/FileUpload';

class MessageContainer extends Component {
  componentWillMount() {
    const { channelId } = this.props;
    this.unsubscribe = this.subscribe(channelId);
  }

  componentWillReceiveProps({ channelId }) {
    const { props } = this;
    if (props.channelId !== channelId) {
      if (this.unsubscribe) {
        this.unsubscribe();
      }
      const {
        data: { subscribeToMore },
      } = this.props;
      this.unsubscribe = subscribeToMore({
        document: newChannelMessageSubscription,
        variables: {
          channelId,
        },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData) {
            return prev;
          }
          return {
            ...prev,
            messages: [
              ...prev.messages,
              subscriptionData.data.newChannelMessage,
            ],
          };
        },
      });
    }
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  subscribe = (channelId) => {
    const {
      data: { subscribeToMore },
    } = this.props;
    return subscribeToMore({
      document: newChannelMessageSubscription,
      variables: {
        channelId,
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) {
          return prev;
        }
        return {
          ...prev,
          messages: [...prev.messages, subscriptionData.data.newChannelMessage],
        };
      },
    });
  };

  render() {
    const {
      data: { loading, messages },
    } = this.props;
    return loading ? null : (
      <Messages>
        <FileUpload disableClick>
          <Comment.Group>
            {messages.map(m => (
              <Comment key={`${m.id}-message`}>
                <Comment.Content>
                  <Comment.Author as="a">{m.user.username}</Comment.Author>
                  <Comment.Metadata>
                    <>
                      {new Date(parseInt(m.createdAt, 10))
                        .toLocaleDateString('en-GB', {
                          weekday: 'long',
                          day: 'numeric',
                          month: 'long',
                        })
                        .replace(',', '')
                        .trim()}
                      {new Date(parseInt(m.createdAt, 10))
                        .toTimeString()
                        .substring(0, 5)}
                    </>
                  </Comment.Metadata>
                  <Comment.Text>{m.text}</Comment.Text>
                  <Comment.Actions>
                    <Comment.Action>Reply</Comment.Action>
                  </Comment.Actions>
                </Comment.Content>
              </Comment>
            ))}
          </Comment.Group>
        </FileUpload>
      </Messages>
    );
  }
}

export default graphql(messagesQuery, {
  variables: props => ({ channelId: props.channelId }),
  options: {
    fetchPolicy: 'network-only',
  },
})(MessageContainer);
