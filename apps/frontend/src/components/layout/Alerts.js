import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withAlert } from 'react-alert'
import PropTypes from 'prop-types'

export class Alerts extends Component {
  static propTypes = {
    error: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired
  }

  componentDidUpdate(prevProps){
    const { error, message } = this.props;
    if(error !== prevProps.error){
      for(let key in error.msg){
        if(key != 'detail'){
          if(error.msg[key]) console.log('error')
        }
      }
    }
  }
  render() {
    return <Fragment/>
  }
}

const mapStateToProps = state => ({
  error: state.errors,
  message: state.messages
})

export default connect(mapStateToProps)(withAlert()(Alerts))
