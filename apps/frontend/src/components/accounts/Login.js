import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { login } from '../../actions/auth';
import PropTypes from 'prop-types'

export class Login extends Component {
  state = {
    username: '',
    password: ''
  }
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    login: PropTypes.func.isRequired
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value })

  onSubmit = e => {
    e.preventDefault()
    const { username, password } = this.state
    this.props.login(username, password)
  }
  render() {
    const { username, password } = this.state
    if(this.props.isAuthenticated){
      return <Redirect to='/'/>
    } 
    return (
      <div className="card card-body mt-4 mb-4">
        <h2>Log In</h2>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input type="text" name="username" value={username} onChange={this.onChange} className="form-control"/>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" value={password} onChange={this.onChange} className="form-control"/>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">Log In</button>
          </div>
          <p>You don't have an account? <Link to='/register'>Register</Link></p>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps, { login })(Login)
