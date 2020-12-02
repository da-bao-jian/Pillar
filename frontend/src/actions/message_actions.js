import { getMessages} from '../util/message_api_util';

export const RECEIVE_MESSAGES = "RECEIVE_MESSAGES";
// export const RECEIVE_USER_TWEETS = "RECEIVE_USER_TWEETS";
// export const RECEIVE_NEW_TWEET = "RECEIVE_NEW_TWEET";

export const receiveMessages = messages => ({
  type: RECEIVE_MESSAGES,
  messages
});

// export const receiveUserTweets = tweets => ({
//   type: RECEIVE_USER_TWEETS,
//   tweets
// });

// export const receiveNewTweet = tweet => ({
//   type: RECEIVE_NEW_TWEET,
//   tweet
// })

export const fetchMessages = () => dispatch => (
  getMessages()
    .then(messages => dispatch(receiveMessages(messages)))
    .catch(err => console.log(err))
);

// export const fetchUserTweets = id => dispatch => (
//   getUserTweets(id)
//     .then(tweets => dispatch(receiveUserTweets(tweets)))
//     .catch(err => console.log(err))
// );

// export const composeTweet = data => dispatch => (
//   writeTweet(data)
//     .then(tweet => dispatch(receiveNewTweet(tweet)))
//     .catch(err => console.log(err))
// );