import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { deletePost } from '../../actions/posts'
import PostImages from './PostImages'
import PropTypes from 'prop-types'
import './style.css'
export class Posts extends Component {
  static propTypes = {
    posts: PropTypes.array.isRequired 
  }

  render() {
    const { posts, deletePost } = this.props
    return (
      <Fragment>
        { posts.length > 0 ? 
          posts.map(post => (
          <div className='card card-body' key={post.id}>
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
                <button className='btn btn-outline-warning btn-sm'>
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
          ))
          : <h1>Empty</h1>
        }
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  posts: state.posts.posts
})

export default connect(mapStateToProps, { deletePost })(Posts)