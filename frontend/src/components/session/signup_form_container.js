import { connect } from 'react-redux';
import { signup, login } from '../../actions/session_actions';
import SignupForm from './signup_form';
import {withRouter} from 'react-router-dom'


const mapStateToProps = (state) => {
  return {
    errors: state.errors.session,
    authenticated: state.session.isAuthenticated,
    signedIn: state.session
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signup: user => dispatch(signup(user)),
    login: user => dispatch(login(user))

  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupForm));