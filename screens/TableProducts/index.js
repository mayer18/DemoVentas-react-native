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
import { Ionicons } from '@expo/vector-icons';

import { Table } from 'react-native-table-component'

import {connect} from 'react-redux'
import * as actions from '../../actions'

const stylesTable = StyleSheet.create({
  container: { flex: 1, paddingTop: 30, backgroundColor: '#fff' },
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, backgroundColor: '#f6f8fa' },
  text: { margin: 6 },
  row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
  btn: { width: 58, height: 18, backgroundColor: '#78B7BB',  borderRadius: 2 },
  btnText: { textAlign: 'center', color: '#fff' }
});

const styles = {
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
}

class TableProducts extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: 'Nombre de la empresa',
			currency: {
        decimals: '2',
        decimals_sep: '.',
        symbol: '$',
        thousands_sep: ','
      }
		};
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
          currency: responseJson,
        });
      })
      .catch((error) => {
        console.error('error');
        console.error(error);
      });
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

  deleteItem(item) {
    this.props.deleteProduct(item)
  }
	
	render() {
		const state = this.state;
    const props = this.props;
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
              <Text style={styles.cellRow}>{this.numberWithCommas(item.price.total)}</Text>
              <Text style={styles.cellRow}>{this.numberWithCommas(item.price.subtotal)}</Text>
              <TouchableOpacity style={styles.middle} onPress={() => this.deleteItem(item)}>
                <Ionicons name="md-trash" size={32} color="red" />
              </TouchableOpacity>
            </View>
          ))
        }
      </ScrollView>
    );
	}
}

const mapStateToProps = state => {
  return {ventas: state.ventas, currency: state.currency}
}

export default connect(mapStateToProps, actions)(TableProducts);