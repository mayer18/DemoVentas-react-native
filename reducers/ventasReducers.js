export default (state = [], action) => {
  switch(action.type) {
    case 'addProduct':
      const newObject = action.payload
      newObject.qty = 1;
      const addProduct = [
        ...state,
        newObject
      ]
      return addProduct
    case 'deleteProduct':
      const filter = state.filter((a) => {
       return a.id !== action.payload.id
      })
      return filter
    default:
      return state
  }
}