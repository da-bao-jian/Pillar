import { RECEIVE_MESSAGES, RECEIVE_NEW_MESSAGE } from '../actions/message_actions';

const MessagesReducer = (state = { }, action) => {
  Object.freeze(state);
  // debugger;
  let newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_MESSAGES:
      newState = action.messages;
      return newState;
    // case RECEIVE_USER_TWEETS:
    //   newState.user = action.tweets.data;
    //   return newState;
    case RECEIVE_NEW_MESSAGE:
      // debugger;
      newState.data.push(action.message);
      return newState;
    default:
      return state;
  }
};

export default MessagesReducer;