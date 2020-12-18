import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { deletePost } from '../../actions/posts'
import PostImages from './PostImages'
import PropTypes from 'prop-types'
import './style.css'

const Posts = ({post, deletePost, handleUpdate}) => (
  <div className='card card-body'>
    <div className="title">
      <h3 className='d-inline-block'>
        <Link to={`/posts/${post.id}`}>{post.title}</Link>
      </h3>
      <div className="commandIcons float-right">
        <button className='btn btn-outline-danger btn-sm' 
          onClick={deletePost.bind(this, post.id)}
        >
          <i className="fas fa-trash-alt"></i>
        </button>
        <button className='btn btn-outline-warning btn-sm' 
          onClick={handleUpdate.bind(this, post)}>
          <i className="fas fa-edit"></i>
        </button>
      </div>
    </div>
    <small>
      Posted by <Link to={`/profile/${post.author}`}>{post.author}</Link> {post.created_at}
    </small>
    <p>{post.message}</p>
    <div className="d-flex flex-row flex-wrap">
      <PostImages images={post.post_images}/>
    </div>
  </div>
)

Posts.propTypes = {
  deletePost: PropTypes.func.isRequired,
}

export default connect(null, { deletePost })(Posts)