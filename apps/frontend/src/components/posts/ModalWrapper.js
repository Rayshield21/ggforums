import React, { Component, Fragment } from 'react'
import { Modal } from 'react-bootstrap'
import Form from '../common/Form'
import PostForm from './PostForm'

const ModalWrapper = ({instance, showModal, closeModal, action}) => (
  <Modal show={showModal} onHide={closeModal}>
    <Modal.Header closeButton>
      <Modal.Title>{action}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form
        fields={['title', 'message', 'post_images']}
        resource={instance}
        render={ (post, fields) => <PostForm instance={post} fields={fields} 
          action={action} closeModal={closeModal}/>}
      />
    </Modal.Body>
  </Modal>
)

export default ModalWrapper