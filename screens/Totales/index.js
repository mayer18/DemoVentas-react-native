import React, { Component } from "react";
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
  Image,
  TouchableOpacity,
	ScrollView
} from "react-native";
import { OpenModal } from "./OpenModal";

import {connect} from 'react-redux'
import * as actions from '../../actions'


const styles = {
  
  ivaContainer: {
    marginBottom: 10,
		justifyContent: 'space-between',
		flexDirection: 'row',
  },
  iva: {

  },
	total: {
		justifyContent: 'space-between',
		flexDirection: 'row',
		
  },
}

class TotalScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {};
  }

  componentDidMount() {
    console.log('totalScreen')
	}

  getFormat(type) {
    const currency = this.props.currency.thousands_sep
    const totales = this.props.ventas.map((a) => a.price[type])
    return totales.length > 0 ? totales.reduce(
      (a, b) => {
        let fixA, fixB
        if (type !== 'tax') {
          if(currency === ',') {
            fixA = typeof a === 'number' || !a ? a:a.replace(/,/, '')
            fixB = typeof b === 'number' || !b ? b:b.replace(/,/, '')
          } else {
            fixA = typeof a === 'number' ? a:a.replace(/./, '')
            fixB = typeof b === 'number' ? b:b.replace(/./, '')
          }
          fixA = fixA ? fixA: 0
          fixB = fixB ? fixB: 0
        } else {

          fixA = a
          fixB = b
        }
        return parseFloat(fixA) + parseFloat(fixB)
      }
    ): '0.00'
  }

  getSubTotal() {
    const subtotal = this.getFormat('subtotal')
    return this.numberWithCommas(subtotal)
  }

  getIva() {
    const iva = this.getFormat('tax')
    return this.numberWithCommas(iva)
  }

  numberWithCommas(x) {
    const aux_str = typeof x === 'number' ? x.toString(): x
    if( aux_str.indexOf(".") === -1){
      const parts = x.toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, this.props.currency.thousands_sep);
      return parts.join(".");
    }
    return x;
  }

	render() {
		return (
      <View>
        <View style={styles.total}>
          <Text style={{ textAlign: 'center' }}>Subtotal</Text>
          <Text style={{ textAlign: 'center' }}>$ {this.getSubTotal()}</Text>
        </View>
        <View style={styles.ivaContainer}>
          <Text style={styles.iva}>IVA</Text>
          <Text style={styles.iva}>$ {this.getIva()}</Text>
        </View>
      </View>
		);
	}
}

const mapStateToProps = state => {
  return {ventas: state.ventas, currency: state.currency}
}

export default connect(mapStateToProps, actions)(TotalScreen);
