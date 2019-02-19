export default (state = [], action) => {
  switch(action.type) {
    case 'addProducts':
      const addProduct = [
        ...state,
        action.payload
      ]
      return addProduct
    default:
      return state
  }
}