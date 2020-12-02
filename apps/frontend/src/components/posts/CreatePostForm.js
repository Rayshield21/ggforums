import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { createPost } from '../../actions/posts';
import UploadPreview from './UploadPreview'
import PropTypes from 'prop-types';

export class CreatePostForm extends Component {
  imageInput = React.createRef()

  state = {
    title: '',
    message: '',
    imageFiles: [],
    images: [],
  }

  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    createPost: PropTypes.func.isRequired, 
  }

  onChange = e => { this.setState({ [e.target.name]: e.target.value }) }
  
  onSubmit = e => {
    e.preventDefault()
    const { title, imageFiles, message } = this.state
    const post =  { title, message, post_images: imageFiles }
    this.props.createPost(post)
    this.props.closeModal()
  }

  imageUploadHandler = () =>{
    this.imageInput.current.click()
  }

  imageInputHandler = (e) => {
    const imageFile = e.target.files[0]
    console.log(imageFile)
    const imageURL = URL.createObjectURL(imageFile)
    this.setState(prevState => ({
      imageFiles: [...prevState.imageFiles, imageFile], 
      images: [...prevState.images, imageURL]
    }))
  }

  removePreviewImage = (indexKey) => {
    this.setState(prevState => ({
      images: prevState.images.filter( (image,index) => index != indexKey),
      imageFiles: prevState.imageFiles.filter((file, index) => index != indexKey)
    }))
  }

  render() {
    const { title, message, images } = this.state
    return (
      <Fragment>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <input className='form-control' onChange={this.onChange} type="text" value={title} placeholder='Title' name="title"/>
          </div>
          <div className="form-group">
            <UploadPreview images={images} removePreviewImage={this.removePreviewImage}/>
            <button type='button' className='btn btn-info mt-3' onClick={this.imageUploadHandler}>Upload Images</button>
            <input ref={this.imageInput} onChange={this.imageInputHandler} className='imageInput' type="file" name="image" accept='image/*'/>
          </div>
          <div className="form-group">
            <textarea className='formTextBox form-control' name="message" placeholder="What's on your mind?" value={message} rows="10" onChange={this.onChange} />
          </div>
          <div className="form-group">
            <button type='button' className="btn btn-info" onClick={this.props.closeModal}>
              Cancel
            </button>
            <input type="submit" value="Create Post" className="btn btn-primary"/>
          </div>
        </form>
      </Fragment>
    )
  }
}

export default connect(null, { createPost })(CreatePostForm)
