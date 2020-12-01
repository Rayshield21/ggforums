import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { createPost } from '../../actions/posts'  
import PropTypes from 'prop-types'

export class Form extends Component {
  imageInput = React.createRef()
  state = {
    showModal: false,
    title: '',
    message: '',
    image: '',
    imageFiles: [],
    images: [],
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    createPost: PropTypes.func.isRequired
  }

  closeModal = () => {
    this.setState({
      showModal: false,
      title: '',
      message: '',
      image: '',
      imageFiles: [],
      images: []
    })
  }

  openModal = () => {
    this.setState({ showModal: true })
  }

  onChange = e => { this.setState({ [e.target.name]: e.target.value }) }
  
  onSubmit = e => {
    e.preventDefault()
    const { title, imageFiles, message } = this.state
    const post =  { title, message, post_images: imageFiles }
    this.props.createPost(post)
    this.closeModal()
  }

  imageUploadHandler = () =>{
    this.imageInput.current.click()
  }

  imageInputHandler = (e) => {
    const imageURL = URL.createObjectURL(e.target.files[0])
    this.setState(prevState => ({
      [e.target.name]: e.target.value,
      imageFiles: [...prevState.imageFiles, e.target.files[0]],
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
    const { showModal, showRemoveBtn, title, message, image, images } = this.state
    if(showModal && !this.props.isAuthenticated){
      return <Redirect to='/login' />
    }
    return (
      <Fragment>
        <div className="card card-body">
          <input className='form-control' type="text" name="" placeholder='Create Post' onClick={this.openModal}/>
        </div>
        <Modal show={showModal} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Create Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <input className='form-control' onChange={this.onChange} type="text" value={title} placeholder='Title' name="title"/>
              </div>
              <div className="form-group">
                <div className="d-flex flex-row flex-wrap previewGallery">
                  {
                    images.length > 0 ? images.map((imageItem, index) => (
                      <div className='imageContainer' key={index}>
                        <img src={imageItem} className='img-thumbnail previewImage' />
                        <button onClick={this.removePreviewImage.bind(this, index)}  type='button' className='removeImageBtn'><i className='fas fa-times'></i></button> 
                      </div>
                    )) : ''
                  }
                </div>
                <button type='button' className='btn btn-info mt-3' onClick={this.imageUploadHandler}>Upload Images</button>
                <input ref={this.imageInput} value={image} onChange={this.imageInputHandler} className='imageInput' type="file" name="image" accept='image/*'/>
              </div>
              <div className="form-group">
                <textarea className='formTextBox form-control' name="message" placeholder="What's on your mind?" value={message} rows="10" onChange={this.onChange} />
              </div>
              <div className="form-group">
                <button type='button' className="btn btn-info" onClick={this.closeModal}>
                  Cancel
                </button>
                <input type="submit" value="Create Post" className="btn btn-primary"/>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { createPost })(Form)
