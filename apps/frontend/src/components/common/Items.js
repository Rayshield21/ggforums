const Items = ({resource, render}) => (
  resource.map(data => render(data))
)

export default Items
