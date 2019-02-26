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

import {connect} from 'react-redux'
import * as actions from '../../actions'


const stylesTable = StyleSheet.create({
  header: { maxHeight: 20, height: 10, marginTop: 20, backgroundColor: '#f1f8ff', flex: 1, flexDirection: 'row' },
});

class TableHeader extends Component {
	constructor(props) {
		super(props);
		this.state = {
      
		};
  }

  getTotalProducts() {
    return this.props.ventas.length
  }

	render() {
		return (
			<View style={stylesTable.header}>
          <Text>Productos ({this.getTotalProducts()})</Text>
          <Text>Cant.</Text>
          <Text>Total</Text>
          <Text>Subtotal</Text>
      </View>
		);
	}
}

const mapStateToProps = state => {
  return {ventas: state.ventas}
}

export default connect(mapStateToProps, actions)(TableHeader);
