import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Posts from './Posts';
import CreatePostModal from './CreatePostModal'
import PropTypes from 'prop-types'
import { getPosts } from '../../actions/posts'
export class PostList extends Component {
  static propTypes={
    getPosts: PropTypes.func.isRequired,
  }

  componentDidMount(){
    this.props.getPosts()
  }

  render() {
    return (
      <Fragment>
        <CreatePostModal/>
        <Posts/>
      </Fragment>
    )
  }
}

export default connect(null, { getPosts })(PostList)

