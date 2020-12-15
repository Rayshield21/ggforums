import React, { Component, Fragment } from 'react'
import { getPostDetail } from '../../actions/posts';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import Posts from './Posts'
import Items from '../common/Items'

export class PostDetail extends Component {
  
  static propTypes = {
    getPostDetail: PropTypes.func.isRequired,
  }

  componentDidMount(){
    const { id } = this.props.match.params
    this.props.getPostDetail(id)
  }

  render() {
    const { posts } = this.props
    return (
      <Fragment>
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

export default connect(mapStateToProps, { getPostDetail })(PostDetail)
