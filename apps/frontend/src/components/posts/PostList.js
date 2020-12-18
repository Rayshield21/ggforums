import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getPosts, getPostDetail } from '../../actions/posts'
import Items from '../common/Items'
import Posts from './Posts'
import PostCreateButton from './PostCreateButton'
import ModalWrapper from './ModalWrapper'
export class PostList extends Component {
  state = {
    showModal: false,
    instance: false,
  }

  static propTypes={
    posts: PropTypes.array.isRequired,
    getPosts: PropTypes.func.isRequired,
  }

  componentDidMount(){
    this.props.getPosts()
  }

  openModal = () => this.setState({showModal: true})

  closeModal = () => this.setState({showModal: false, instance: false})

  handleUpdate = postInstance => {
    this.setState({instance: postInstance, showModal: true})
  }

  render() {
    const { showModal, instance } = this.state
    const { posts } = this.props
    return (
      <Fragment>
        <PostCreateButton handleClick={this.openModal}/>
        <Items 
          resource={posts}
          render={post => 
            <Posts post={post} key={post.id} 
              handleUpdate={this.handleUpdate}
            />
          }            
        />
        {instance ? showModal && 
          <ModalWrapper instance={instance} action='Update Post' showModal={showModal}
            closeModal={this.closeModal}/> : 
          showModal && 
          <ModalWrapper instance={instance} action='Create Post' showModal={showModal}
            closeModal={this.closeModal}/>
        }
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  posts: state.posts.posts
})

export default connect(mapStateToProps, { getPosts })(PostList)

