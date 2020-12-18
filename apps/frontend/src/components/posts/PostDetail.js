import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import { getPostDetail } from '../../actions/posts';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import Posts from './Posts'
import Items from '../common/Items'

export class PostDetail extends Component {
  state = {
    redirect: false,
  }

  static propTypes = {
    getPostDetail: PropTypes.func.isRequired,
  }

  componentDidMount(){
    const { id } = this.props.match.params
    this.props.getPostDetail(id)
  }

  componentDidUpdate(prevProps, prevState) {
    const { posts } = this.props
    if(prevProps.posts.length != posts.length && posts.length == 0){ 
      this.setState({redirect:true})
    } 
  }

  handleUpdate = (id) => console.log(id)

  render() {
    const { posts } = this.props
    if(this.state.redirect) return <Redirect to='/'/>
    return (
      <Fragment>
        <Items 
          resource={posts}
          render={post => {
            //console.log(post)
            return <Posts post={post} key={post.id} 
            handleUpdate={this.handleUpdate}/>}}
        />
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  posts: state.posts.posts
})

export default connect(mapStateToProps, { getPostDetail })(PostDetail)
