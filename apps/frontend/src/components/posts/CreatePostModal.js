import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import CreatePostForm from './CreatePostForm'

export class CreatePostModal extends Component {
  
  state = {
    showModal: false,
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
  }

  closeModal = () => {
    this.setState({
      showModal: false,
    })
  }

  openModal = () => {
    this.setState({ showModal: true })
  }

  render() {
    const { showModal } = this.state 
    if(showModal && !this.props.isAuthenticated){
      return <Redirect to='/login' />
    }
    return (
      <Fragment>
        <div className="card card-body">
          <button className='btn btn-secondary text-left' onClick={this.openModal}>What is on your mind?</button>
        </div>
        <Modal show={showModal} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Create Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CreatePostForm closeModal={this.closeModal}/>
          </Modal.Body>
        </Modal>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(CreatePostModal)
