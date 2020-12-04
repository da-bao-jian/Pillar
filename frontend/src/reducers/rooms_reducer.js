import { RECEIVE_ROOM, 
        RECEIVE_ROOMS,
        DELETE_ROOM,
        UPDATE_ROOM } from '../actions/room_actions';

const RoomsReducer = (state = {}, action) => {
  Object.freeze(state);
  //  
  let newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_ROOM:
      newState[action.room.data._id] = action.room.data;
      debugger
      return newState;
    case RECEIVE_ROOMS:
      //  
      Object.assign({}, state, {rooms: action.rooms});
      return newState;
    case DELETE_ROOM:
      //  
      delete newState.rooms[action.roomId];
      return newState;
    case UPDATE_ROOM:
      newState.rooms[action.room.id] = action.room;
      return newState;
    default:
      return state;
  }
};

export default RoomsReducer;