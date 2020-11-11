import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { editProfile } from '../../../actions/profile';

export class Form extends Component {
  state = {
    first_name: '',
    last_name: '',
    bio: ''
  }

  onClick = e => this.props.bioCallback(false)

  onChange = e => this.setState({ [e.target.name]: e.target.value})

  onSubmit = e => {
    e.preventDefault()
    const { user } = this.props.profile 
    const { first_name, last_name, bio } = this.state
    const profileData = { first_name, last_name, bio }
    this.props.editProfile(user.username, profileData)
    this.props.bioCallback(false)
  }

  componentDidMount(){
    const { first_name, last_name, bio } = this.props.profile
    this.setState({
      first_name,
      last_name,
      bio
    })
  }

  render() {
    const { first_name, last_name, bio } = this.state
    if(!this.props.profile.user) return <div/>
    return (
      <Fragment>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <input type="text" name="first_name" value={first_name} placeholder='First Name' className="form-control" onChange={this.onChange}/>
          </div>
          <div className="form-group">
            <input type="text" name="last_name" value={last_name} placeholder='Last Name' className="form-control" onChange={this.onChange}/>
          </div>
          <div className="form-group">
            <textarea name="bio" value={bio} placeholder='Bio' className='w-100' rows='10' onChange={this.onChange}/>
          </div>
          <input type="submit" value="Edit Profile" className="btn btn-primary mr-3"/>
          <button className="btn btn-warning" onClick={this.onClick}>Cancel</button>
        </form>
      </Fragment>
    )
  }
}

export default connect(null, { editProfile })(Form)
