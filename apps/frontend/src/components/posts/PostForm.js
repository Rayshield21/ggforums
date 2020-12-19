import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts'
import SubmitButton from '../common/SubmitButton'
import UploadPreview from './UploadPreview'
import UploadImageButton from './UploadImageButton'

export class PostForm extends Component {
  state = {
    title: '',
    message: '',
    images: [],
    imageFiles: [],
  }
  
  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  componentDidMount() {
    const {instance: post, fields} = this.props
    const [title, message, post_images] = fields
    post && this.setState({
      title: post[title],
      message: post[message],
      images: post[post_images].length ? post[post_images].map(post_image => 
        post_image.image) : [],
      imageFiles: post[post_images].length ? post[post_images].map(post_image =>
        post_image.image_file_str) : [],
    })
  }

  onSubmit = e => {
    e.preventDefault()
    const { instance, createPost, updatePost, closeModal } = this.props
    const { title, imageFiles, message } = this.state
    const postData =  { title, message, post_images: imageFiles }
    if(instance) {
      updatePost(postData, instance.id)
    } else {
      createPost(postData)
    }
    closeModal()
  }

  removePreviewImage = indexKey => {
    this.setState(prevState => ({
      images: prevState.images.filter((image, index) => index != indexKey),
      imageFiles: prevState.imageFiles.filter((image, index) => index != indexKey)
    }))
  }

  handleImageInput = e => {
    const imageFile = e.target.files[0]
    const imageURL = URL.createObjectURL(imageFile)
    this.setState(prevState => ({
      images: [...prevState.images, imageURL],
      imageFiles: [...prevState.imageFiles, imageFile]
      }))
  }

  render() {
    const { title, message, images } = this.state
    const { closeModal, action } = this.props 
    return (
      <Fragment>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <input className='form-control' onChange={this.onChange} type="text" value={title} placeholder='Title' name="title"/>
          </div>
          <div className="form-group">
            {Boolean(images.length) && <UploadPreview images={images} 
              removePreviewImage={this.removePreviewImage}/>}
            <UploadImageButton handleImageInput={this.handleImageInput} />
          </div>
          <div className="form-group">
            <textarea className='formTextBox form-control' name="message" placeholder="What's on your mind?" value={message} rows="10" onChange={this.onChange} />
          </div>
          <div className="form-group">
            <button type='button' className="btn btn-info" onClick={closeModal}>
              Cancel
            </button>
            <SubmitButton action={action}/>
          </div>  
        </form> 
      </Fragment>
    )
  }
}

export default connect(null, {createPost, updatePost})(PostForm)
