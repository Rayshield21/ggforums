import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class UploadPreview extends Component {
  static propTypes = {
    images: PropTypes.array.isRequired,
    removePreviewImage: PropTypes.func.isRequired
  }
  
  render() {
    const { images, removePreviewImage } = this.props
    return (
      <div className="d-flex flex-row flex-wrap previewGallery">
        {
          images.length > 0 ? images.map((imageItem, index) => (
            <div className='imageContainer' key={index}>
              <img src={imageItem} className='img-thumbnail previewImage' />
              <button onClick={removePreviewImage.bind(this, index)}  type='button' className='removeImageBtn'><i className='fas fa-times'></i></button> 
            </div>
          )) : ''
        }
      </div>
    )
  }
}

export default UploadPreview
