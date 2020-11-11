import React, { Component, Fragment } from 'react'
import Form from './Form';
import { connect } from 'react-redux';
import { getProfile } from '../../../actions/profile';
import PropTypes from 'prop-types'
import Avatar from './Avatar';

export class Bio extends Component {
  state = {
    isShowEdit: false,
  }

  static propTypes = {
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    getProfile: PropTypes.func.isRequired,
  }

  componentDidMount(){
    this.props.getProfile(this.props.userTargetURL)
  }

  handleCallBack = (formState) => {
    this.setState({isShowEdit: formState})
  }

  toggleEdit = () => this.setState({ isShowEdit: true })

  render() {
    const { user:authUser } = this.props.auth
    const { first_name, last_name, bio, avatar, user } = this.props.profile
    const { isShowEdit } = this.state
    const showButton = (
      <button className="btn btn-outline-primary w-100" onClick={this.toggleEdit}>Edit Profile</button>
    )
    const showForm = (
      <Form profile={this.props.profile} bioCallback={this.handleCallBack}/>
    )

    if(!user || !authUser) return <div/>;

    return (
      <Fragment>
        <Avatar />
        <h3 className='text-center'>{user.username}'s Profile</h3>
        <p>{first_name} {last_name}</p>
        <p>{bio}</p>
        { isShowEdit ? showForm : authUser.username == user.username ? showButton : ''} 
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile.profile,
})

export default connect(mapStateToProps, { getProfile })(Bio)

