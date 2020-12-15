import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import CreatePostModal from './CreatePostModal'
import PropTypes from 'prop-types'
import { getPosts } from '../../actions/posts'
import Items from '../common/Items'
import Posts from './Posts'

export class PostList extends Component {
  static propTypes={
    posts: PropTypes.array.isRequired,
    getPosts: PropTypes.func.isRequired,
  }

  componentDidMount(){
    this.props.getPosts()
  }

  render() {
    const { posts } = this.props
    return (
      <Fragment>
        <CreatePostModal/>
        <Items 
          resource={posts}
          render={post => <Posts post={post} key={post.id}/>}            
        />
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  posts: state.posts.posts
})

export default connect(mapStateToProps, { getPosts })(PostList)

