import React, { Component, Fragment } from 'react'
import Form from './Form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import Avatar from './Avatar';

export class Bio extends Component {
  state = {
    showEditProfile: false,
  }

  static propTypes = {
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
  }

  handleCallBack = (formState) => {
    this.setState({showEditProfile: formState})
  }

  toggleEdit = () => this.setState({ showEditProfile: true })

  render() {
    const { user:authUser } = this.props.auth
    const { first_name, last_name, bio, user:profileUser } = this.props.profile
    const { showEditProfile } = this.state
    const showButton = !authUser || !profileUser ? '' : authUser.username == profileUser.username ? (
      <button className="btn btn-outline-primary w-100" onClick={this.toggleEdit}>Edit Profile</button>
    ) : ''
    const showForm = (
      <Form profile={this.props.profile} bioCallback={this.handleCallBack}/>
    )

    if(!profileUser) return <div/>;
    return (
      <Fragment>
        <Avatar />
        <h3 className='text-center'>{profileUser.username}'s Profile</h3>
        <p>{first_name} {last_name}</p>
        <p>{bio}</p>
        { showEditProfile ? showForm : showButton} 
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile.profile,
})

export default connect(mapStateToProps)(Bio)

