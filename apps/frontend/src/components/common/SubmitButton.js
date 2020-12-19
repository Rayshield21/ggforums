import React from 'react'

const SubmitButton = ({writeAction}) => (
  <input type='submit' className='btn btn-primary' value={writeAction}/>
)

export default SubmitButton