import React from 'react';
import { withRouter } from 'react-router-dom';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      password2: '',
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  // componentWillReceiveProps(nextProps) {
  //   if (this.props.formType === 'Sign up') {
  //     if (nextProps.signedIn === true) {
  //       this.props.history.push('/pillar');
  //     }
  //     this.setState({errors: nextProps.errors})
  //   }
  // }

  // componentDidUpdate(prevProps){
  //   if (this.props.formType === 'Sign up') {      
  //     if(this.props.authenticated !== prevProps.authenticated){
  //       this.setState({is_authenticated: true})
  //     }
  // }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let newUser = Object.assign({}, this.state);
    delete newUser['errors'];

    let existingUser = {
      email: this.state.email,
      password: this.state.password
    };
    
    let user = (this.props.formType === 'Sign up') ? newUser : existingUser;
    
    this.props.processForm(user)
      .then(this.props.closeModal)
  }
    
  renderErrors() {
    return(
      <ul>
        {Object.keys(this.state.errors).map((error, i) => (
          <li key={`error-${i}`}>
            {this.state.errors[error]}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    const { formType, switchForm, closeModal } = this.props;
    const sessionFormInputs = (
      <div className='session-form-text-inputs'>
          <input type='text'
            className='session-form-input'
            id='email'
            value={this.state.email}
            placeholder="Email"
            onChange={this.update('email')}
          />
        {formType === 'Sign up' ? (
        <div className='signup-form-additionals'>
            <input type='text'
              className="session-form-input"
              value={this.state.username}
              placeholder="Username"
              onChange={this.update('username')}
            />
        </div>
        ) : null}
          <input type='password'
            className="session-form-input"
            id='password'
            value={this.state.password}
            placeholder="Password"
            onChange={this.update('password')}
          />
        {formType === 'Sign up' ? (
        <div className='signup-form-additionals'> 
            <input type='password'
              className="session-form-input"
              value={this.state.password2}
              placeholder="Confirm password"
              onChange={this.update('password2')}
            />
        </div>
        ) : null}
      </div>
    );

    const switchFormLink = (    
      <div className="switch-form-link" onClick={switchForm}>
        {formType === "Sign up" ?
        "Log in" :
        "Sign up"}
      </div>
    );

    return (
      <div className="session-form-container">
        <h1>Communication Made Better by PILLR</h1>
        <div className="close-session-form-icon-container" onClick={closeModal}>
          <i className="fas fa-times" id="close-session-form-icon"></i>
        </div>
        <form className="session-form" onSubmit={this.handleSubmit}>
          {/* <div className="session-form-icon-container">
            <i className="fab fa-weebly" id="session-form-icon"></i>
          </div> */}
          <div className="session-form-inputs">
            {sessionFormInputs}
            {this.renderErrors()}
            <input type="submit"
              className="session-form-button-input"
              id="form-action"
              value={formType}
            />
            <div className="session-form-spacer"></div>
            {switchFormLink}
          </div>
        </form>
      </div>
    );
  }
}



export default withRouter(SessionForm);
