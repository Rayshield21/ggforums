import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types'
import EditAvatar from './EditAvatar';
export class Avatar extends Component {
  
  state = {
    showEditAvatar: false,
  }

  // showEditAvatar state toggler
  handleClick = () => {
    this.setState(prevState => ({showEditAvatar: !prevState.showEditAvatar}))
  }

  static propTypes = {
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
  }

  render() {
    const { user:authUser } = this.props.auth
    const { avatar, user:profileUser } = this.props.profile
    const showButton = !authUser ? '' : authUser.username == profileUser.username ? (
      <div className="card-img-overlay">
        <button onClick={this.handleClick} className='avatarBtn'>
          <img src="../../../../static/frontend/icons/pencil-fill.svg" width="25" height="25"/>
        </button>
      </div> 
    ) : ''

    return (
      <Fragment>
        <div className="card bg-transparent border-light">
          <img src={avatar ? avatar : '../../../../static/frontend/icons/person-circle.svg'} className='card-img' alt=""/> {showButton}       
          <CSSTransition
          in={this.state.showEditAvatar}
          classNames='editAvatar'
          timeout={1000}
          unmountOnExit
        >
          <EditAvatar handleClick={this.handleClick}/>
        </CSSTransition>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile.profile
})

export default connect(mapStateToProps)(Avatar);
