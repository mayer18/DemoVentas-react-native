export default (state = [], action) => {
  switch(action.type) {
    case 'setProduct':
      return action.payload
    default:
      return state
  }
}