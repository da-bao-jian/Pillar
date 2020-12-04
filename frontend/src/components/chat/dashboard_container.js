import { connect } from 'react-redux';
import { fetchRoom, createRoom, removeRoom, editRoom, fetchRooms } from '../../actions/room_actions';
import DashBoard from './dashboard';



const mapStateToProps = (state) => {
  debugger;
  return {
    user: state.session.user,
    rooms: state.rooms,
    // errors: state.errors.session
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRoom: (roomId) => dispatch(fetchRoom(roomId)),
    createRoom: (room) => dispatch(createRoom(room)),
    deleteRoom: (roomId) => dispatch(removeRoom(roomId)),
    editRoom: (room) => dispatch(editRoom(room)),
    fetchRooms: () => dispatch(fetchRooms())
    };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashBoard);