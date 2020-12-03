import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
  }

  logoutUser(e) {
      e.preventDefault();
      this.props.logout();
  }

  // Selectively render links dependent on whether the user is logged in
  getLinks() {
      if (this.props.loggedIn) {
        return (
            <div className="NavBar">
                <Link className="link" to={'/chat'}>Dashboard</Link>
                <Link className="link" to={'/profile'}>Profile</Link>
                <button onClick={this.logoutUser}>Logout</button>
            </div>
        );
      } else {
        return (
            <div>
                <Link className="link" to={'/signup'}>Signup</Link>
                <Link className="link" to={'/login'}>Login</Link>
            </div>
        );
      }
  }

  render() {
      return (
        <div>
          <a className="logoa" href="/"><h1 className="logo">Pillr</h1></a>
            { this.getLinks() }
        </div>
      );
  }
}

export default NavBar;