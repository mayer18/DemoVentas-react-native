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
  TouchableHighlight
} from "react-native";
import { Ionicons } from '@expo/vector-icons';

let { width, height } = Dimensions.get('window');
const marginLateral = 20;

const BLUE = '#428AF8'
const LIGTH_GRAY = '#D3D3D3'
const GREEN = '#61ce70'
const numColumns = 3;

const styles = {
  itemCircle: {
    backgroundColor: '#61ce70',
    borderRadius: 50,
    width: '35%',
    padding: 5
  },
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
    height: 100 / numColumns,
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemText: {
    color: '#fff',
    textAlign: 'center'
  },
}

class ModalPago extends Component {
	constructor(props) {
		super(props);
		this.state = {
      bills: ['1000.00','5000.00','10000.00','50000.00'],
      total: '0.00',
      isFocused: false,
      methods: ['Efectivo','Tarjeta de crédito','Tarjeta debito'],
      active: false,
      indexItem: '-1',
      indexItemBill: '-1',
      bill: 0,
      method: 0,
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

  componentDidMount() {
    this.setState({total: this.props.total})
    console.log(this.total)
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

  touchKey(key) {
    console.log(key)
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

  onActiveItem(i, item) {
    this.setState({indexItem: i})
    this.setState({method: item})
  }

  onActiveItemBills(i, item) {
    this.setState({indexItemBill: i})
    this.setState({bill: item})
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
			<View style={styles.container}>
        <View style={styles.header}>
          <Text>Total Recibido </Text>
          <TextInput 
            style={styles.textInput}
            keyboardType='numeric'
            onChangeText={(total) => this.setState({total})}
            value={this.state.total}
          />
          <Text>Descuento</Text>
        </View>
        <View style={styles.containerMethodsOfPayments}>
          {
            this.state.methods.map((method, i) => renderLists(method, i, 'itemMethodsOfPayments', '', this))
          }
        </View>
        <ScrollView style={{height: height * .4}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            {renderResume(this.props.total)}
            <FlatList
              data={formatData(this.state.keys, numColumns)}
              style={styles.containerFlat}
              renderItem={this.renderItem}
              numColumns={numColumns}
              keyExtractor={(item, index) => index.toString()}
            />
            <View 
            //style={{width: width * .3}}
            >
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

const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow++;
  }

  return data;
};

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
      <Text>{symbol}{item}</Text>
    </View>
  </TouchableOpacity>
);

const renderResume = (total) => (
  <View style={{
    justifyContent: 'center',
    //width: width *.7,
    //backgroundColor: '#eee'
  }}>
    <Text style={{
      color: BLUE,
      textAlign: 'center'
    }}>Resumen de pago</Text>
    <View>
      <Text style={styles.itemResumen}>Total + Propina: ${total} </Text>
      <Text style={styles.itemResumen}>Restante a pagar: ${total}</Text>
      <Text style={styles.itemResumen}>Total Recibido: ${total}</Text>
      <Text style={styles.itemResumen}>Descuento: ${total}</Text>
      <Text style={styles.itemResumen}>Propina: ${total}</Text>
      <Text style={styles.itemResumenCambio}>Cambio: ${total}</Text>
    </View>
  </View>
)

export default ModalPago;
