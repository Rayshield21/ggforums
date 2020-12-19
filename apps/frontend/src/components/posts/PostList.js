import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { getPosts, getPostDetail } from '../../actions/posts'
import Items from '../common/Items'
import Posts from './Posts'
import PostCreateButton from './PostCreateButton'
import ModalWrapper from './ModalWrapper'
export class PostList extends Component {
  state = {
    writeAction: '',
    redirect: false,
    showModal: false,
    instance: false,
  }

  static propTypes={
    posts: PropTypes.array.isRequired,
    getPosts: PropTypes.func.isRequired,
    getPostDetail: PropTypes.func.isRequired
  }

  componentDidMount(){
    const { match: { params }, getPosts, getPostDetail } = this.props
    if(!Object.keys(params).length){
      getPosts()
    } else {
      getPostDetail(params.id)
    }
  }

  componentDidUpdate(prevProps) {
    const { posts } = this.props
    if(prevProps.posts.length != posts.length && posts.length == 0){
      console.log('redirect') 
      this.setState({redirect:true})
    } 
  }

  handleCreate = () => this.setState({showModal: true, writeAction: 'Create Post'})

  closeModal = () => this.setState({
    showModal: false, 
    instance: false, 
    writeAction: 'Update Post'
  })

  handleUpdate = postInstance => {
    this.setState({instance: postInstance, showModal: true})
  }

  render() {
    const { showModal, instance, redirect, writeAction } = this.state
    const { posts } = this.props
    if( redirect ) {
      this.setState({redirect: false})
      return <Redirect to='/' />
    }
    return (
      <Fragment>
        <PostCreateButton handleClick={this.handleCreate}/>
        <Items 
          resource={posts}
          render={post => 
            <Posts post={post} key={post.id} 
              handleUpdate={this.handleUpdate}
            />
          }            
        />
        {showModal && <ModalWrapper instance={instance} writeAction={writeAction} 
          showModal={showModal} closeModal={this.closeModal}/>  
        }
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  posts: state.posts.posts
})

export default connect(mapStateToProps, { getPosts, getPostDetail })(PostList)

