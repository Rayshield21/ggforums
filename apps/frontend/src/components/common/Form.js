import React from 'react'

const Form = ({resource, render, fields}) => {
  const keys = Object.keys(resource)
  const includedFields = keys.filter(key => fields.includes(key))
  return (
    render(resource, includedFields)
  )
}

export default Form;