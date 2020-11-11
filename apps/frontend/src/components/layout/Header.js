import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import PropTypes from 'prop-types'

export class Header extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
  }
  
  render() {
    const { isAuthenticated, user } = this.props.auth
    const username = user ? user.username : '';
    const profileLink = (
    <Link to={`/profile/${username}`}><strong>{username}</strong></Link>
    )
    const authLinks = (
      <ul className="navbar-nav ml-auto-2 mt-2 mt-lg-0">
        <span className='navbar-text mr-3'>
          {user ? profileLink : ''}
        </span>
        <li className="nav-item">
          <button className="nav-link btn btn-info btn-sm text-light" onClick={this.props.logout}>Logout</button>
        </li>
      </ul>
    )

    const guestLinks = (
      <ul className="navbar-nav ml-auto-2 mt-2 mt-lg-0">
        <li className="nav-item">
          <Link to='/register' className='nav-link'>Register</Link>
        </li>
        <li className="nav-item">
          <Link to='/login' className='nav-link'>Login</Link>
        </li>
      </ul>
    )
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-3">
        <div className="container">
          <a className="navbar-brand" href="#">GGForums</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarColor02">
            { isAuthenticated ? authLinks: guestLinks }            
          </div>
        </div>
      </nav>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logout })(Header);
