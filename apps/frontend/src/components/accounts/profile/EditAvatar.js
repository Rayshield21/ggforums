import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { editAvatar } from '../../../actions/profile';
import PropTypes from 'prop-types'

export class EditAvatar extends Component {
  state = {
    avatar: '',
    avatarPreviewURL: this.props.profile.avatar ? this.props.profile.avatar : '',
    file: '',
  }

  static propTypes = {
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
  }

  handleEvent = (e) => {
    switch(e.type){
      case "click":
        console.log('child');
        return this.props.handleClick()
      case "change":
        return this.setState({ 
          [e.target.name]: e.target.value,
          avatarPreviewURL: URL.createObjectURL(e.target.files[0]),
          file: e.target.files[0]
        })
      case "submit":
        const { username } = this.props.auth.user
        e.preventDefault()
        this.props.editAvatar(username, this.state.file)
        return this.props.handleClick()
      default:
        return console.log('no event type')
    }
  }


  render() {
    const { avatar:profileAvatar } = this.props.profile
    const { avatar, avatarPreviewURL } = this.state;
    return (
      <Fragment>
        <div className="card editAvatar">
          <div className="card-header">
          <img style={{height: 300}} className='previewImg img-fluid card-img-top' src={profileAvatar ? avatarPreviewURL : '../../../../static/frontend/icons/person-circle.svg'} alt=""/>
          </div>
          <div className="card-body">
            <form onSubmit={this.handleEvent}>
              <div className="form-group">
                <input className='form-control-file' type="file" accept='image/*' name="avatar" value={avatar} onChange={this.handleEvent} />
              </div>
              <input type="submit" value="Edit Avatar" className="btn btn-primary"/>
              <button type='button' onClick={this.handleEvent} className="btn btn-secondary">Cancel</button>
            </form>
          </div>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile.profile
})

export default connect(mapStateToProps, { editAvatar })(EditAvatar)
