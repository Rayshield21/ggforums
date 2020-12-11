import React, { Component, Fragment } from 'react'
import { getPostDetail } from '../../actions/posts';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import Posts from './Posts'

export class PostDetail extends Component {
  
  static propTypes = {
    getPostDetail: PropTypes.func.isRequired,
  }

  componentDidMount(){
    const { id } = this.props.match.params
    this.props.getPostDetail(id)
  }

  render() {
    return (
      <Fragment>
        <Posts />
      </Fragment>
    )
  }
}

export default connect(null, { getPostDetail })(PostDetail)
