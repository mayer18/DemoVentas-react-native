import {combineReducers} from 'redux'
import ventasReducers from './ventasReducers'
import productsReducers from './productsReducers'

export default combineReducers ({
  ventas: ventasReducers,
  products: productsReducers
})