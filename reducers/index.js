import {combineReducers} from 'redux'
import ventasReducers from './ventasReducers'

export default combineReducers ({
  ventas: ventasReducers
})