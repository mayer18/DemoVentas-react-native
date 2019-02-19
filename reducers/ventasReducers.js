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
    default:
      return state
  }
}