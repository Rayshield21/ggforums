import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

export class PostImages extends Component {
  static propTypes = {
    images: PropTypes.array.isRequired,
  }
  render() {
    const { images } = this.props
    return (
      <Fragment>
        {
          images.length > 0 ? 
          images.map((image, index) => (
            <div key={index} className='imageContainer'>
              <img className='img-thumbnail previewImage' src={image.image} />
            </div>
          )) 
          : ''
        }
      </Fragment>
    )
  }
}

export default PostImages
