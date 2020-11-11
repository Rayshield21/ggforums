import React, { Component, Fragment } from 'react'

export class Avatar extends Component {
  render() {
    return (
      <Fragment>
        <div className="card bg-transparent border-light">
          <img src={avatar ? avatar : '../../../../static/frontend/icons/person-circle.svg'} className='card-img' alt=""/>
          <div className="card-img-overlay">
            <button className='avatarBtn'>
              <img src="../../../../static/frontend/icons/plus-square.svg" width="25" height="25"/>
            </button>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default Avatar;
