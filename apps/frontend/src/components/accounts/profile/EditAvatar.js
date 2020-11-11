import React, { Component, Fragment } from 'react'

export class EditAvatar extends Component {
  state = {
    avatar: '',
  }

  handleEvent = (e) => {
    switch(e.type){
      case "click":
        console.log('child');
        return this.props.handleClick()
      case "change":
        return this.setState({ [e.target.name]: e.target.value})
      case "submit":
        e.preventDefault()
        console.log('submit')
        return this.props.handleClick()
      default:
        return console.log('no event type')
    }
  }
  render() {
    const { avatar } = this.state;
    return (
      <Fragment>
        <div className="card card-body editAvatar">
          <form onSubmit={this.handleEvent}>
            <div className="form-group">
              <input className='form-control-file' type="file" accept='image/*' name="avatar" value={avatar} onChange={this.handleEvent} />
            </div>
            <input type="submit" value="Edit Avatar" className="btn btn-primary"/>
            <button type='button' onClick={this.handleEvent} className="btn btn-secondary">Cancel</button>
          </form>
        </div>
      </Fragment>
    )
  }
}

export default EditAvatar
