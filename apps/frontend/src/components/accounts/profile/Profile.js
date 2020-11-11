import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Bio from './Bio';
import ProfileContent from './ProfileContent';
import { getProfile } from '../../../actions/profile';
import PropTypes from 'prop-types'
import './ProfileStyle.css';

export class Profile extends Component {

  static propTypes = {
    profile: PropTypes.object.isRequired,
    getProfile: PropTypes.func.isRequired
  }

  componentDidMount(){
    const { username } = this.props.match.params
    this.props.getProfile(username)
  }

  render() {
    return (
      <Fragment>
        <div className="row">
          <div className="col-md-4">
            <Bio />
          </div>
          <div className="col-md-8">
            <ProfileContent />
          </div>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  profile: state.profile.profile
})

export default connect(mapStateToProps, { getProfile })(Profile)
