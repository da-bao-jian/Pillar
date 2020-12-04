import { connect } from 'react-redux';
import { createRoom, fetchRooms, fetchUserRooms } from '../../actions/room_actions';
import SideBar from './sidebar';



const mapStateToProps = (state) => {
   ;
   return {
      user: state.session.user,
      messages: state.messages,
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      createRoom: room => dispatch(createRoom(room)),
      fetchRooms: () => dispatch(fetchRooms()),
      fetchUserRooms: userId => dispatch(fetchUserRooms(userId))
         // ;
   }
}


export default connect(
   mapStateToProps,
   mapDispatchToProps
)(SideBar);