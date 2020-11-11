import axios from 'axios';
import { USER_LOADING, 
  USER_LOADED, 
  LOGIN_SUCCESS, 
  LOGIN_FAIL, 
  REGISTER_SUCCESS, 
  REGISTER_FAIL, 
  LOGOUT_SUCCESS,
  AUTH_ERROR } from './types';
import { getErrors } from './messages';
  // Token Config Helper Function

export const tokenConfig = getState => {
  const token = getState().auth.token

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  }

  if(token){
    config.headers['Authorization'] = `Token ${token}`;
  }

  return config;
}

// LOAD USER

export const loadUser = (dispatch, getState) => {
  dispatch({type: USER_LOADING})

  axios.get('/api/auth/user', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(getErrors(err.response.data, err.response.status))
      dispatch({ type: AUTH_ERROR })
    })
}

// REGISTER

export const register = ({username, email, password}) => dispatch => {
  dispatch({type: USER_LOADING})

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  }

  const body = JSON.stringify({ username, email, password })

  axios.post('/api/auth/register', body, config)
    .then(res => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(getErrors(err.response.data, err.response.status))
      dispatch({
        type: REGISTER_FAIL
      });
    })
}

// LOGIN 

export const login = (username, password) => dispatch => {
  dispatch({type: USER_LOADING})
  
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  }

  const body = JSON.stringify({ username, password })

  axios.post('/api/auth/login', body, config)
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(getErrors(err.response.data, err.response.status))
      dispatch({
        type:LOGIN_FAIL
      });
    })
}

// LOGOUT

export const logout = () => (dispatch, getState) => {
  axios.post('/api/auth/logout', null, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: LOGOUT_SUCCESS
      });
    })
    .catch(err => dispatch(getErrors(err.response.data, err.response.status)))
}

