import React, { Component } from "react";
import {
	View,
	Text,
  TouchableOpacity,
  TouchableHighlight
} from "react-native";
import Modal from "react-native-modal";

import {connect} from 'react-redux'
import * as actions from '../../actions'

import ModalPago from "../ModalPago/Modalpago"

class OpenModal extends Component {
	constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false
    }
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

  getTotal() {
    const total = this.getFormat('total')
    return this.numberWithCommas(total)
  }

  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

  Click() {
    if (parseFloat(this.getTotal()) > 0) {
      this._toggleModal()
    } else {
      this.showToast('Por favor agrega productos')
    }
  }

  getFormat(type) {// nombre del campo en el endpoint (total, subtotal o tax)
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

	render() {
		return (
      <View>
        <TouchableHighlight style={styles.totalFinal} onPress={() => this.Click()}>
          <View style={styles.totalButton}>
            <Text style={styles.colorButton}>Total</Text>
            <Text style={styles.colorButton}>$ {this.getTotal()}</Text>
          </View>
        </TouchableHighlight>
        <Modal isVisible={this.state.isModalVisible}>
          <View style={{ flex: 1, backgroundColor: 'white' }}>
            <ModalPago total={this.getFormat('total')} />
            <View style={styles.bodyModal}> 
              <TouchableOpacity style={styles.toggle} onPress={this._toggleModal}>
                <Text style={{ color: '#fff' }}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.togglePrint} onPress={this._toggleModal}>
                <Text style={{ color: '#fff' }}>Imprimir</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>  
      </View>
		);
	}
}

const mapStateToProps = state => {
  return {ventas: state.ventas, currency: state.currency}
}

export default connect(mapStateToProps, actions)(OpenModal);

const styles = {
  totalButton: {
    backgroundColor: '#61ce70',
    color: '#fff',
    fontSize: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 20
  },
  colorButton: {
    color: '#fff',
    textAlign: 'center'
  },
  bodyModal: {
    flex:1,
    flexDirection: 'row',
    justifyContent: "space-around",
    height: 50,
    maxHeight: 50,
  },
  toggle: {
    backgroundColor: '#ddd',
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  togglePrint: {
    backgroundColor: '#61ce70',
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  }
}