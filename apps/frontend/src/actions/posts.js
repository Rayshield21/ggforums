import axios from 'axios'
import { 
  GET_POSTS,
  GET_SINGLE_POST,
  CREATE_POST,
  UPDATE_POST,
  DELETE_POST
} from './types'
import { tokenConfig } from './auth'

export const getPosts = () => dispatch => {
  axios.get('/api/posts/')
    .then(res => {
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    })
    .catch(err => {
      console.log(err.response.data)
      console.log(err.response.status)
      console.log(err.request)
    })
}

export const createPost = (post) => (dispatch, getState) => {
  const config = tokenConfig(getState)
  const formData = new FormData()
  formData.append('title', post.title)
  formData.append('message', post.message)
  if(post.post_images.length > 0){
    post.post_images.forEach((image, index) => {
      formData.append('post_images', image, image.name)
    })
  }
  config.headers['Content-Type'] = 'multipart/form-data'  
  axios.post('api/posts/', formData, config)
    .then(res => {
      dispatch({
        type: CREATE_POST,
        payload: res.data
      })
    })
    .catch(err => {
      console.log(err.response.data)
      console.log(err.response.status)
      console.log(err.request)
    })
}