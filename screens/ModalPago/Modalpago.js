import React, { Component } from "react";
import {
	View,
	Text,
	StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
  ToastAndroid,
  TouchableHighlight
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import Calculator from "./Calculator";

import {connect} from 'react-redux'
import * as actions from '../../actions'

let { width, height } = Dimensions.get('window');
const marginLateral = 20;

const BLUE = '#428AF8'
const LIGTH_GRAY = '#D3D3D3'
const GREEN = '#61ce70'

const config = { urlApi: 'http://apibeta.vendty.com/api/v1' }
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImEyNjk0ODhmYTg1ZGE0YWRjMDdiNzI3NzZjNWFkYjgzMDJiOWRiNGUzZWUyYjU1MTdiMTQ0YjhlMjg3ODYyZTgwYjY3ZTE2NWNmMzM3ZGZlIn0.eyJhdWQiOiIxMSIsImp0aSI6ImEyNjk0ODhmYTg1ZGE0YWRjMDdiNzI3NzZjNWFkYjgzMDJiOWRiNGUzZWUyYjU1MTdiMTQ0YjhlMjg3ODYyZTgwYjY3ZTE2NWNmMzM3ZGZlIiwiaWF0IjoxNTUwMTg0NTYzLCJuYmYiOjE1NTAxODQ1NjMsImV4cCI6MTU4MTcyMDU2Mywic3ViIjoiMTEyOSIsInNjb3BlcyI6W119.dtGgO8EfYPezohfVLfBs34VU0QE92wt7X4PNNWTeXuD7rQWezsX_Lg7amU-3KBXpPSA9A5NtJvp4MLJUUJ6aD3zbzcg13qpvAg4erLMdW_wwHkqHqHuQvoBuFIAdGhNcoAY1-PSuLDaSK5ndTcq8BHYi7oJNn5kva8QDylVCppmWycGUmZvq7csWRzd3HhBsbPQmCsPKUqyfJbf2gqwVqwfA5DjdoSbnn-yg0Ra9mJqp1YImHpS-R0nr4rCfqL53QlC6My01wd-Iw85FUrmd_Kaw9TmaZsdJ4zImBZYzlVbdZZG5e04HY9vFf2A86S6SZUSnyiCEquhgBze_28-Jjcqk1HVMJy4BHxdloa9KBT5IHoAhFyiv1cKXuw7s8QsPFUuiIoc5__8zc8NGvGaKvVAKOK1JHPxNOPWduzyBVcbu3SbHFkAPgm_jskCoSKWhPZptDMF8sEvgXTv5mlSEC0tSGyFJpMrBnWz_y_YqN-hr280F7JrVLRrl3zLV5G5mldnP-SnO8KdK9htWnV41y3kElBNd3B7WzNK3naiPFjIoYF-XIbgOwABf6HDG3axDVn1KJ5UqAQnqI--tpeef_T6ot_ugn8AOe8vvHinDLo87BKyCSD2B3VVtkeF0-Ku9qBlkk8V9tba4O_hyjbti5-qaDB7bYe1xEen_5JVD608"

const styles = {
  
  itemResumen: {
    //textAlign: 'right'
  },
  itemResumenCambio: {
    color: 'red'
  },
  itemBills: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#61ce70',
    borderRadius: 5,
    borderWidth: .5,
    width: width * .1,
    margin: 5,
    marginLeft: 0,
  },
	container: {
    marginRight: marginLateral,
    marginLeft: marginLateral,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderRadius: 10,
    borderWidth: 0.5,
    margin: 10,
    marginBottom: 20,
    borderColor: '#d6d7da',
    padding: 15,
  },
	containerMethodsOfPayments: {
    flexDirection: 'row',
    paddingLeft: marginLateral,
    paddingRigth: marginLateral,
    margin: 10,
    justifyContent: 'space-around'

  },
  itemMethodsOfPayments: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#61ce70',
    borderRadius: 5,
    borderWidth: .5,
    width: width * .18
  },
  textInput: {
    borderColor: BLUE,
    borderBottomWidth: .5,
    width: width * .3
  },
}

class ModalPago extends Component {
	constructor(props) {
		super(props);
		this.state = {
      descuento: [],
      bills: ['1000'],
      isFocused: false,
      methods: [],
      active: false,
      indexItem: '-1',
      indexItemBill: '-1',
      bill: 0,
      method: 0
		};
  }

  componentDidMount() {
    this.props.setTotalPago(this.props.total)
    this.getBills()
    this.getMethods()
    
  }

  getMethods() {
    fetch(`${config.urlApi}/payment-methods`, {
      method: "GET",
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then((response) => response.json())
      .then((responseJson) => {

        console.log(responseJson.data)
        this.setState({methods: responseJson.data})
      })
      .catch((error) => {
        console.log('error Currency');
        console.error(error);
      });
  }

  getBills() {

    fetch(`${config.urlApi}/checkout/help-pay-amounts`, {
      method: "POST",
      headers: {
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        amount: this.props.total
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({bills: responseJson})
      })
      .catch((error) => {
        console.log('error Currency');
        console.error(error);
      });
  }

  onFocus() {
    this.setState({
      backgroundColor: 'green',
      color: '#fff'
    })
  }

  onBlur() {
    this.setState({
      backgroundColor: 'transparent'
    })
  }

  customStyle(i) {
    if ( i === this.state.indexItem) {
      return {
        backgroundColor: GREEN,
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
        color: '#fff',
        width: '100%'
      }
    } else {
      return {
      }
    }
  }

  customStyleBills(i) {
    if (i === this.state.indexItemBill) {
      return {
        backgroundColor: GREEN,
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
        width: '100%'
      }
    } else {
      return {
      }
    }
  }

  getRestante() {
    const total = parseFloat(this.props.total)
    const x = this.state.descuento.length > 0 ? this.state.descuento.reduce((a, b) => parseFloat(a) + parseFloat(b)): '0.00'
    const restante = parseFloat(x)
    return (total - restante).toFixed(2)
  }

  getRecibido() {
    return this.state.descuento.length > 0 ? this.state.descuento.reduce((a, b) => parseFloat(a.bill) + parseFloat(b.bill)): '0.00'
  }

  showToast(msg) {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  }

  cleanTotal() {
    this.setState({
      bill: 0,
      method: 0
    })
    this.props.setTotalPago('0.00')
    this.customStyle(-1)
    this.customStyleBills(-1)
  }

  getBalance(x) {
    const total = parseFloat(this.props.total)
    const restante = parseFloat(this.getRecibido())
    const calc = total - x - restante
    return calc > 0
  }

  addTotal(method) {
    const bill = this.props.pagos.total
    if (this.getBalance(parseFloat(bill))) {
      const x = this.state.descuento.find(a => a.method === method)
      
      if (x) {
        const filter = this.state.descuento.map((a) => {
          if (a.method === method) {
            a.bill = (parseFloat(a.bill) + parseFloat(bill)).toFixed(2)
          }
          return a;
        })
        this.setState({descuento: filter})
      } else {
        this.setState({
          descuento: [
            ...this.state.descuento,
            {
              bill,
              method
            }
          ]
        })
      }
    } else {
      this.showToast('Por favor verifique el monto')
    }
  }

  onActiveItem(i, item) {
    this.setState({indexItem: i})
    if (this.state.bill !== 0) {
      this.addTotal(item)
      this.cleanTotal()
    } else {
      //this.showToast('Por favor selecciona metodo de pago')
    }
  }

  onActiveItemBills(i, item) {
    this.setState({indexItemBill: i})
    this.setState({bill: item})
    this.props.setTotalPago(item)
    if(this.state.method === 0) {
      this.showToast('Por favor agrega metodo de pago')
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

  getRestante() {
    const total = parseFloat(this.props.total)
    let restante = this.getRecibido()
    return (total - restante)
  }

  getRecibido() {
    let descuento = 0
    if (this.state.descuento.length > 1) {
      descuento = this.state.descuento.reduce((a, b) => {
        let fixA = typeof a === 'number' ? a: a.bill
        let fixB = typeof b === 'number' ? b: b.bill
        return  parseFloat(fixA) + parseFloat(fixB);
      })
    } else if(this.state.descuento.length === 1) {
      descuento = parseFloat(this.state.descuento[0].bill)
    }
    return descuento
  }

	render() {
		return (
			<View style={styles.container}>
        <View style={styles.header}>
          <Text>Total Recibido </Text>
          <TextInput 
            style={styles.textInput}
            keyboardType='numeric'
            onChangeText={(total) => this.props.setTotalPago(total)}
            value={this.numberWithCommas(this.props.pagos.total)}
          />
          <Text>Descuento</Text>
        </View>
        <View style={styles.containerMethodsOfPayments}>
          {
            this.state.methods.map((method, i) => renderLists(method.name, i, 'itemMethodsOfPayments', '', this))
          }
        </View>
        <ScrollView style={{height: height * .4}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            {renderResume(this.props.total, this)}
            <Calculator />
            <View>
              {
                this.state.bills.map((a, i) => renderLists(a, i, 'itemBills', '$', this))
              }
            </View>
          </View>
        </ScrollView>
			</View>
		);
	}
}

const renderLists = (item, i, className, symbol, app) => (
  <TouchableOpacity 
    key={className + i}
    style={styles[className]}
    onPress={ 
      () => className === 'itemMethodsOfPayments' 
      ? app.onActiveItem((className + i), item)
      :app.onActiveItemBills((className + i), item)
    }
  >
    <View style={className === 'itemMethodsOfPayments' ? app.customStyle(className + i): app.customStyleBills(className + i)}>
      <Text>{symbol}{app.numberWithCommas(item)}</Text>
    </View>
  </TouchableOpacity>
);

const renderResume = (total, app) => (
  <View style={{
    justifyContent: 'center',
  }}>
    <Text style={{
      color: BLUE,
      textAlign: 'center'
    }}>Resumen de pago</Text>
    <View>
      {
        app.state.descuento.map((item, i) => (
          <View key={i}>  
            <Text style={styles.itemResumen}>{item.method} ${item.bill} </Text>
          </View>
        ))
      }
      <Text style={styles.itemResumen}>Total + Propina: ${app.numberWithCommas(total)} </Text>
      <Text style={styles.itemResumen}>Restante a pagar: ${app.numberWithCommas(app.getRestante())}</Text>
      <Text style={styles.itemResumen}>Total Recibido: ${app.numberWithCommas(app.getRecibido())}</Text>
      <Text style={styles.itemResumen}>Descuento: ${0.00}</Text>
      <Text style={styles.itemResumen}>Propina: ${0.00}</Text>
      <Text style={styles.itemResumenCambio}>Cambio: ${0.00}</Text>
    </View>
  </View>
)

const mapStateToProps = state => {
  return {pagos: state.pagos, currency: state.currency}
}

export default connect(mapStateToProps, actions)(ModalPago);
