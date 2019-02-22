import React, { Component } from 'react'
import { 
  ImageBackground,
  Image, 
  StyleSheet, 
  Text, 
  View,
  ScrollView,
  FlatList, 
  Dimensions, 
  TouchableHighlight,
  TouchableOpacity,
  ToastAndroid,
  Animated,
  Alert
} from 'react-native'
import {connect} from 'react-redux'
import { Table, TableWrapper, Row, Rows, Col, Cell } from 'react-native-table-component'
import * as actions from '../actions'
import { Ionicons } from '@expo/vector-icons';
import Modal from "react-native-modal";
import ModalPago from "./ModalPago/Modalpago"

const config = { urlApi: 'http://apibeta.vendty.com/api/v1' }
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImEyNjk0ODhmYTg1ZGE0YWRjMDdiNzI3NzZjNWFkYjgzMDJiOWRiNGUzZWUyYjU1MTdiMTQ0YjhlMjg3ODYyZTgwYjY3ZTE2NWNmMzM3ZGZlIn0.eyJhdWQiOiIxMSIsImp0aSI6ImEyNjk0ODhmYTg1ZGE0YWRjMDdiNzI3NzZjNWFkYjgzMDJiOWRiNGUzZWUyYjU1MTdiMTQ0YjhlMjg3ODYyZTgwYjY3ZTE2NWNmMzM3ZGZlIiwiaWF0IjoxNTUwMTg0NTYzLCJuYmYiOjE1NTAxODQ1NjMsImV4cCI6MTU4MTcyMDU2Mywic3ViIjoiMTEyOSIsInNjb3BlcyI6W119.dtGgO8EfYPezohfVLfBs34VU0QE92wt7X4PNNWTeXuD7rQWezsX_Lg7amU-3KBXpPSA9A5NtJvp4MLJUUJ6aD3zbzcg13qpvAg4erLMdW_wwHkqHqHuQvoBuFIAdGhNcoAY1-PSuLDaSK5ndTcq8BHYi7oJNn5kva8QDylVCppmWycGUmZvq7csWRzd3HhBsbPQmCsPKUqyfJbf2gqwVqwfA5DjdoSbnn-yg0Ra9mJqp1YImHpS-R0nr4rCfqL53QlC6My01wd-Iw85FUrmd_Kaw9TmaZsdJ4zImBZYzlVbdZZG5e04HY9vFf2A86S6SZUSnyiCEquhgBze_28-Jjcqk1HVMJy4BHxdloa9KBT5IHoAhFyiv1cKXuw7s8QsPFUuiIoc5__8zc8NGvGaKvVAKOK1JHPxNOPWduzyBVcbu3SbHFkAPgm_jskCoSKWhPZptDMF8sEvgXTv5mlSEC0tSGyFJpMrBnWz_y_YqN-hr280F7JrVLRrl3zLV5G5mldnP-SnO8KdK9htWnV41y3kElBNd3B7WzNK3naiPFjIoYF-XIbgOwABf6HDG3axDVn1KJ5UqAQnqI--tpeef_T6ot_ugn8AOe8vvHinDLo87BKyCSD2B3VVtkeF0-Ku9qBlkk8V9tba4O_hyjbti5-qaDB7bYe1xEen_5JVD608"

const height = Dimensions.get('window').height * .9;
class GetTotal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
      currency: '',
      isModalVisible: false
    }
  }

  componentDidMount() {
    //console.log(this.state.data)
    this.getCurrency()
	}

  getFormat(type) {// nombre del campo en el endpoint (total, subtotal o tax)
    const currency = this.state.currency
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
          console.log(a)
          fixA = a
          fixB = b
        }
        return parseFloat(fixA) + parseFloat(fixB)
      }
    ): '0.00'
  }

  getCurrency() {
    fetch(`${config.urlApi}/data-currency`, {
      method: "GET",
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          currency: responseJson.thousands_sep,
        });
      })
      .catch((error) => {
        console.error('error');
        console.error(error);
      });
  }

  getTotal() {
    const total = this.getFormat('total')
    return total > 0 ? (total*100/100).toFixed(2):total
  }

  getSubTotal() {
    const subtotal = this.getFormat('subtotal')
    return subtotal > 0 ? (subtotal*100/100).toFixed(2):subtotal
  }

  getIva() {
    const iva = this.getFormat('tax')
    return iva > 0 ? (iva*100/100).toFixed(2):'0.00'
  }

  getTotalProducts() {
    return this.props.ventas.length
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

  deleteItem(item) {
    this.props.deleteProduct(item)
  }

  renderTable() {
    const state = this.state;
    const props = this.props;
    const buttonDelete = (data, index) => (
      <TouchableOpacity onPress={() => this._alertIndex(index)}>
        <View style={stylesTable.btn}>
          <Text style={stylesTable.btnText}>button</Text>
        </View>
      </TouchableOpacity>
    );
    return (
      <ScrollView style={stylesTable.container}>
        <Table/>
        {
          props.ventas.map((item, i) => (
            <View key={i} style={{
              flexDirection: 'row',
            }}>
              <Text style={styles.nameProduct}>{item.name}</Text>
              <Text style={styles.middle}>{1}</Text>
              <Text style={styles.cellRow}>{item.price.total}</Text>
              <Text style={styles.cellRow}>{item.price.subtotal}</Text>
              <TouchableOpacity style={styles.middle} onPress={() => this.deleteItem(item)}>
                <Ionicons name="md-trash" size={32} color="red" />
              </TouchableOpacity>
            </View>
          ))
        }
      </ScrollView>
    );
  }

  showToast(msg) {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  }

  _alertIndex(index) {
    Alert.alert(`This is row ${index + 1}`);
  }     

  render() {
    return (
      <View style={styles.vertical}>
        <View style={stylesTable.header}>
          <Text>Productos ({this.getTotalProducts()})</Text>
          <Text>Cant.</Text>
          <Text>Total</Text>
          <Text>Subtotal</Text>
        </View>
        {this.renderTable()}
        <View style={styles.total}>
          <Text style={{ textAlign: 'center' }}>Subtotal</Text>
          <Text style={{ textAlign: 'center' }}>$ {this.getSubTotal()}</Text>
        </View>
        <View style={styles.ivaContainer}>
          <Text style={styles.iva}>IVA</Text>
          <Text style={styles.iva}>$ {this.getIva()}</Text>
        </View>
        <TouchableHighlight style={styles.totalFinal} onPress={() => this.Click()}>
          <View style={styles.totalButton}>
            <Text style={styles.colorButton}>Total</Text>
            <Text style={styles.colorButton}>$ {this.getTotal()}</Text>
          </View>
        </TouchableHighlight>
        <Modal isVisible={this.state.isModalVisible}>
          <View style={{ flex: 1, backgroundColor: 'white' }}>
            <ModalPago total={this.getTotal()} />
            <View style={{
              flex:1,
              flexDirection: 'row',
              justifyContent: "space-around",
              height: 50,
              maxHeight: 50,

            }}> 
              <TouchableOpacity style={{
                backgroundColor: '#ddd',
                width: 150,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5
              }} onPress={this._toggleModal}>
                <Text style={{
                  color: '#fff'
                }}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{
                backgroundColor: '#61ce70',
                width: 150,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5
              }} onPress={this._toggleModal}>
                <Text style={{
                  color: '#fff'
                }}>Imprimir</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {ventas: state.ventas}
}

export default connect(mapStateToProps, actions)(GetTotal);

const stylesTable = StyleSheet.create({
  container: { flex: 1, paddingTop: 30, backgroundColor: '#fff' },
  header: { maxHeight: 20, height: 10, marginTop: 20, backgroundColor: '#f1f8ff', flex: 1, flexDirection: 'row' },
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, backgroundColor: '#f6f8fa' },
  text: { margin: 6 },
  row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
  btn: { width: 58, height: 18, backgroundColor: '#78B7BB',  borderRadius: 2 },
  btnText: { textAlign: 'center', color: '#fff' }
});

const styles = StyleSheet.create({
  middle: {
    flex: .5,

  },
  nameProduct: {
    flex: 2,
    alignSelf: 'stretch'
  },
  cellRow: {
    flex: 1,
    alignSelf: 'stretch',
  },
  vertical: {
		height,
		justifyContent: 'flex-end'
  },
  containerRow: { 
    flex: 1,
    alignSelf: 'stretch', 
    flexDirection: 'row',
    height: 100
  },
  idRow: {

  },
  td1: {
    flex: 1,
    alignSelf: 'stretch',
    fontSize: 8
  },
  td2: {
    fontSize: 8
  },
  td3: {
    fontSize: 8
  },
  td4: {
    flex: 1,
    alignSelf: 'stretch',
    fontSize: 8
  },
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
  totalFinal: {
  }
});