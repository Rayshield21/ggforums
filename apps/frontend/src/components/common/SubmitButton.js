import React from 'react'

const SubmitButton = ({action}) => (
  <input type='submit' className='btn btn-primary' value={action}/>
)

export default SubmitButton