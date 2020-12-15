import React, { Component } from 'react'

const Items = ({resource, render}) => (
  resource.map(data => render(data))
)

export default Items
