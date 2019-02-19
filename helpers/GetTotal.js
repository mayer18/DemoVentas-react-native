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
  Animated,
  Alert
} from 'react-native'
import {connect} from 'react-redux'
import { Table, TableWrapper, Row, Rows, Col, Cell } from 'react-native-table-component'
import * as actions from '../actions'

const height = Dimensions.get('window').height;
class GetTotal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tableData: [
      ]
    }
  }

  componentDidMount() {
		//console.log(this.state.data)
	}

  getFormat(type) {// nombre del campo en el endpoint (total, subtotal o tax)
    const totales = this.props.ventas.map((a) => a.price[type])
    return totales.length > 0 ? totales.reduce((a, b) => parseFloat(a) + parseFloat(b)): '0.00'
  }

  getTotal() {
    return this.getFormat('total')
  }

  getSubTotal() {
    return this.getFormat('subtotal')
  }

  getIva() {
    return this.getFormat('tax')
  }

  getTotalProducts() {
    return this.props.ventas.length
  }

  Click() {
    console.log('click')
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
              <Text style={styles.cellRow}>{1}</Text>
              <Text style={styles.cellRow}>{item.price.total}</Text>
              <Text style={styles.cellRow}>{item.price.subtotal}</Text>
            </View>
          ))
        }
      </ScrollView>
    );
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