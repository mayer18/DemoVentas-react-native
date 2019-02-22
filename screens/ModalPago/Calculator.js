import React, { Component } from "react";
import {
	View,
  Text,
  FlatList,
  TouchableOpacity,
	Dimensions
} from "react-native";
import {connect} from 'react-redux'
import * as actions from '../../actions'

let { width } = Dimensions.get('window');
const numColumns = 3;

const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow++;
  }
  return data;
};

class Calculator extends Component {
	constructor(props) {
		super(props);
		this.state = {
      keys: [
        { key: '1' },
        { key: '2' },
        { key: '3' },
        { key: '4' },
        { key: '5' },
        { key: '6' },
        { key: '7' },
        { key: '8' },
        { key: '9' },
        { key: '0' },
        { key: '00' }
      ]
		};
  }

  touchKey(key) {
    const total = parseFloat((parseInt(this.props.pagos.total) + '' + key))
    this.props.setTotalPago(total)
  }

  renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
			<TouchableOpacity style={styles.item} onPress={() => this.touchKey(item.key)}>
        <View style={styles.itemCircle}>
          <Text style={styles.itemText}>{item.key}</Text>
        </View>
      </TouchableOpacity>
    );
  };

	render() {
		return (
			<FlatList
        data={formatData(this.state.keys, numColumns)}
        style={styles.containerFlat}
        renderItem={this.renderItem}
        numColumns={numColumns}
        keyExtractor={(item, index) => index.toString()}
      />
		);
	}
}

const mapStateToProps = state => {
  return {pagos: state.pagos}
}

export default connect(mapStateToProps, actions)(Calculator);

const styles = {
  containerFlat: {
    width: 100,
    maxWidth: width * .3
  },
  item: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 4,
    height: 150 / numColumns,
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemText: {
    color: '#fff',
    textAlign: 'center'
  },
  itemCircle: {
    backgroundColor: '#61ce70',
    borderRadius: 50,
    width: 50,
    height: 50,
    padding: 5
  }
}