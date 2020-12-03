import { connect } from 'react-redux';
import { fetchMessages, afterMessageSent } from '../../actions/message_actions';
import DashBoard from './dashboard';



const mapStateToProps = (state) => {
   debugger;
   return {
      user: state.session.user,
      messages: state.messages,
      // errors: state.errors.session
   };
};

const mapDispatchToProps = (dispatch) => {
   return {
      getMessages: () => dispatch(fetchMessages()),
      afterMessageSent: (msg) => {
         dispatch(afterMessageSent(msg));
         // debugger;
      }
   }
}

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(DashBoard);