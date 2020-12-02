import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { getPosts } from '../../actions/posts'
import PropTypes from 'prop-types'
import './style.css'
import CreatePostModal from './CreatePostModal'
export class Posts extends Component {
  static propTypes = {
    posts: PropTypes.array.isRequired,
    getPosts: PropTypes.func.isRequired
  }

  componentDidMount(){
    this.props.getPosts()
  }
  render() {
    const { posts } = this.props
    return (
      <Fragment>
        <CreatePostModal />
          { posts.length > 0 ? 
            posts.map(post => (
            <div className='card card-body' key={post.id}>
              <h3>{post.title}</h3>
              <small>Posted by {post.author} {post.created_at}</small>
              <p>{post.message}</p>
              <div className="d-flex flex-row flex-wrap">
                {post.post_images ? post.post_images.map(image => (
                  <div key={image.id} className='imageContainer'>
                    <img className='img-thumbnail previewImage' src={image.image} />
                  </div>
                )) : ''}
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

export default connect(mapStateToProps, { getPosts })(Posts)
