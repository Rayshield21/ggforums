import { GET_PROFILE, EDIT_PROFILE, GET_FAIL } from '../actions/types';

const initialState = {
  profile: {}
}

export default function(state=initialState, action){
  switch(action.type){
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload
      }
    case EDIT_PROFILE:
      return{
        ...state,
        profile: {...state.profile, ...action.payload}
      }
    default:
      return state;
  }
}