import React, { Component } from 'react'
import { 
  StyleSheet, 
  View,
  Dimensions, 
  ToastAndroid,
  Alert
} from 'react-native'
import {connect} from 'react-redux'
import * as actions from '../actions'

import TableProducts from "./TableProducts/index"
import TableHeader from "./TableProducts/TableHeader"
import TotalScreen from "./Totales/index"
import OpenModal from "./Totales/OpenModal"

const height = Dimensions.get('window').height * .9;
class GetTotal extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.vertical}>
        <TableHeader />
        <TableProducts />
        <TotalScreen />
        <OpenModal />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {ventas: state.ventas}
}

export default connect(mapStateToProps, actions)(GetTotal);

const styles = StyleSheet.create({
  vertical: {
		height,
		justifyContent: 'flex-end'
  }
});