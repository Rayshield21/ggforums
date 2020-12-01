import { combineReducers } from 'redux';
import auth from './auth'
import errors from './errors'
import profile from './profile'
import posts from './posts'
export default combineReducers({
  auth,
  profile,
  posts
  // errors
})