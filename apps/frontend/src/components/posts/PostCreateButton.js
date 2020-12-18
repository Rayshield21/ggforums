import React, { Component, Fragment } from 'react'

export class PostCreateButton extends Component {
  render() {
    const { handleClick } = this.props
    return (
      <Fragment>
        <div className="card card-body">
          <button className='btn btn-secondary text-left' onClick={handleClick}>What is on your mind?</button>
        </div>
      </Fragment>
    )
  }
}

export default PostCreateButton
