//import data from ''
export default (state = {
  total: 0,
  subtotal: 0,
  iva: 0
}, action) => {
  switch(action.type) {
    case 'addProduct':
      return {
        total: state.total + action.payload.total,
        subtotal: state.subtotal + action.payload.subtotal,
        iva: state.iva + action.payload.iva
      }
    default:
      return state
  }
}