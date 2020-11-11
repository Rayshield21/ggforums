import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types'

export class Register extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    password2: ''
  }
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    register: PropTypes.func.isRequired
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value })

  onSubmit = e => {
    e.preventDefault()
    const { username, email, password, password2 } = this.state
    if(password != password2){
      console.log('passwords not match')
    } else {
      const newUser = {
        username,
        email,
        password
      }
      this.props.register(newUser)
    }
  }
  
  render() {
    const { username, email, password, password2 } = this.state
    if(this.props.isAuthenticated) return <Redirect to='/'/>
    return (
      <div className='card card-body mt-4 mb-4'>
        <h2>Register</h2>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input type="text" name="username" value={username} onChange={this.onChange} className="form-control"/>
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={email} onChange={this.onChange} className="form-control"/>
          </div>
          <div className="form-group">
            <label>password</label>
            <input type="password" name="password" value={password} onChange={this.onChange} className="form-control"/>
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" name="password2" value={password2} onChange={this.onChange} className="form-control"/>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">Register</button>
          </div>
          <p>You already have an account? <Link to='/login'>Log In</Link></p>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { register })(Register)
