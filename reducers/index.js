import {combineReducers} from 'redux'
import ventasReducers from './ventasReducers'
import productsReducers from './productsReducers'
import pagoReducers from './pagoReducers'

export default combineReducers ({
  ventas: ventasReducers,
  products: productsReducers,
  pagos: pagoReducers
})