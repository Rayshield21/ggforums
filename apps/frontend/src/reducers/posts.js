import { 
  GET_POSTS, 
  GET_POST_DETAIL, 
  CREATE_POST, 
  UPDATE_POST, 
  DELETE_POST } from '../actions/types'

const initialState = {
  posts: []
}

export default function(state = initialState, action){
  switch(action.type){
    case GET_POSTS:
    // case GET_POST_PostDetail:
      return {
        ...state,
        posts: action.payload
      }
    case GET_POST_DETAIL:
      return {
        ...state,
        posts: [action.payload]
      }
    case CREATE_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload]
      }
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.payload)
      }
    case UPDATE_POST:
      return {
        ...state,
        posts: state.posts.map(post => post.id == action.payload.id ? {...post, ...action.payload} : {...post})
      }
    default:
      return state
  }
}