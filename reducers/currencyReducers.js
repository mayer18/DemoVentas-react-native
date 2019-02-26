export default (state = {
  decimals: '2',
  decimals_sep: '.',
  symbol: '$',
  thousands_sep: ','
}, action) => {
  switch(action.type) {
    case 'setCurrency':
      return action.payload
    default:
      return state
  }
}