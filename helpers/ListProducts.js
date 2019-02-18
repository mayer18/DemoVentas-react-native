import React, { Component } from 'react';
import { ImageBackground, Image, StyleSheet, Text, View, FlatList, Dimensions, TouchableHighlight } from 'react-native';

const data = [
];

const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow++;
  }

  return data;
};

const numColumns = 3;
class ListProducts extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data
		};
		this.proccessMoney = this.proccessMoney.bind(this);
	}
	
	componentDidMount() {
		//console.log(this.state.data)
		console.log('test')
	}

	proccessMoney(price) {
		console.log(price)
	}

  formatPrice(n) {
    const val = Math.round(Number(n) * 100) / 100;
    let parts = val.toString().split(".");
    const num = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".") + (parts[1] ? "," + parts[1] : "");
    //console.log(num)
    return num
  }

  renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
			<TouchableHighlight style={styles.item} onPress={() => this.proccessMoney(item.price)}>
        <View >
          <View style={{height: 200}}>
            <Image source={{ uri: item.url }} style={{
              width: '100%',
              height: '60%',
              //position: 'absolute',
              //resizeMode: 'contain',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: .5
            }}></Image>
            <Text style={styles.itemText}>${this.formatPrice(item.price)}</Text>
            <Text style={styles.itemPrice}>{item.name}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  };

  render() {
    return (
      <FlatList
        data={formatData(this.state.data, numColumns)}
        style={styles.container}
        renderItem={this.renderItem}
        numColumns={numColumns}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  }
}

export default ListProducts;

const styles = StyleSheet.create({
  
  item: {
    backgroundColor: '#ddd',
    flex: 1,
    margin: 10,
    borderRadius: 8,
    height: Dimensions.get('window').width * .5 / numColumns,
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemText: {
    backgroundColor: '#bbb',
    color: '#32be32',
    
    textAlign: 'center',
    height: '15%',
    
    //color: 'black'
  },
  itemPrice: {
    height: '15%',
    backgroundColor: '#ddd',
    textAlign: 'center',
    color: '#fff',
    borderRadius: 8
  }
});