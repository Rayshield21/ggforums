import { CREATE_MESSAGE, GET_ERRORS } from './types';

// CREATE MESSAGE
export const getMessage = msg => {
  return {
    type: CREATE_MESSAGE,
    payload: msg
  }
}
// GET ERRORS

export const getErrors = (msg, status) => {
  return {
    type: GET_ERRORS,
    action: { msg, status }
  }
}