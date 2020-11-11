import React, { Component, Fragment } from 'react';
import './ProfileStyle.css';
import Bio from './Bio';
import ProfileContent from './ProfileContent';

export class Profile extends Component {
  render() {
    const { username } = this.props.match.params;
    return (
      <Fragment>
        {/* <EditAvatar/> */}
        <div className="row">
          <div className="col-md-4">
            <Bio userTargetURL={username} />
          </div>
          <div className="col-md-8">
            <ProfileContent />
          </div>
        </div>
      </Fragment>
    )
  }
}

export default Profile
