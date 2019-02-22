export default (state = {
    total: '0.00',
    bill: 0,
    method: 0
  }, action) => {
  switch(action.type) {
    case 'setTotalPago':
      return {
        total: action.payload,
        bill: state.bill,
        method: state.method
      }
    case 'cleanTotalPago':
      return {
        total: '0.00',
        bill: state.bill,
        method: state.method
      }
    default:
      return state
  }
}