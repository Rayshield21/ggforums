import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PostImages from './PostImages'
import PropTypes from 'prop-types'
import './style.css'
export class Posts extends Component {
  static propTypes = {
    posts: PropTypes.array.isRequired 
  }

  render() {
    const { posts } = this.props
    return (
      <Fragment>
          { posts.length > 0 ? 
            posts.map(post => (
            <div className='card card-body' key={post.id}>
              <h3><Link to={`/posts/${post.id}`}>{post.title}</Link></h3>
              <small>Posted by {post.author} {post.created_at}</small>
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

export default connect(mapStateToProps)(Posts)