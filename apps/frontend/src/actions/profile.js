import axios from 'axios'
import { GET_PROFILE, EDIT_PROFILE, EDIT_PROFILE_FAIL, GET_FAIL } from './types'
import { tokenConfig } from './auth'

export const getProfile = username => dispatch => {
  // console.log('axios fire')
  axios.get(`/api/profile/${username}`)
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(`data:${err.response.data}\nstatus:${err.response.status}`)
    })
} 

export const editProfile = (username, profileData) => (dispatch, getState) => {
  const body = JSON.stringify(profileData)
  axios.put(`api/profile/${username}/`, body, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: EDIT_PROFILE,
        payload: res.data
      })
    })
    .catch(err =>{
      dispatch({type: EDIT_PROFILE_FAIL})
      console.log(err.response.data)
      console.log(err.response.status)
      console.log(err.request)
    })
}

export const editAvatar = (username, avatarFormData) => (dispatch, getState) => {
  let formData = new FormData()
  formData.append('avatar', avatarFormData, avatarFormData.name)
  const config = tokenConfig(getState)
  config.headers['Content-Type'] = 'multipart/form-data'
  // console.log(formData.get('avatar'))
  axios.put(`api/profile/avatar/${username}/`, formData, config)
    .then(res => {
      console.log(res.data)
      dispatch({
        type: EDIT_PROFILE,
        payload: res.data
      });
    })
    .catch(err=> {
      dispatch({type: EDIT_PROFILE_FAIL})
      console.log(err.response.data)
      console.log(err.response.status)
      console.log(err.request)
    })
}