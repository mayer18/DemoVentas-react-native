import React, { Component } from 'react'
import { 
  ImageBackground,
  Image, 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  Dimensions, 
  TouchableHighlight,
  Animated
} from 'react-native'
import {connect} from 'react-redux'
import * as actions from '../actions'

const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow++;
  }

  return data;
};

const config = { urlApi: 'http://apibeta.vendty.com/api/v1' }
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImEyNjk0ODhmYTg1ZGE0YWRjMDdiNzI3NzZjNWFkYjgzMDJiOWRiNGUzZWUyYjU1MTdiMTQ0YjhlMjg3ODYyZTgwYjY3ZTE2NWNmMzM3ZGZlIn0.eyJhdWQiOiIxMSIsImp0aSI6ImEyNjk0ODhmYTg1ZGE0YWRjMDdiNzI3NzZjNWFkYjgzMDJiOWRiNGUzZWUyYjU1MTdiMTQ0YjhlMjg3ODYyZTgwYjY3ZTE2NWNmMzM3ZGZlIiwiaWF0IjoxNTUwMTg0NTYzLCJuYmYiOjE1NTAxODQ1NjMsImV4cCI6MTU4MTcyMDU2Mywic3ViIjoiMTEyOSIsInNjb3BlcyI6W119.dtGgO8EfYPezohfVLfBs34VU0QE92wt7X4PNNWTeXuD7rQWezsX_Lg7amU-3KBXpPSA9A5NtJvp4MLJUUJ6aD3zbzcg13qpvAg4erLMdW_wwHkqHqHuQvoBuFIAdGhNcoAY1-PSuLDaSK5ndTcq8BHYi7oJNn5kva8QDylVCppmWycGUmZvq7csWRzd3HhBsbPQmCsPKUqyfJbf2gqwVqwfA5DjdoSbnn-yg0Ra9mJqp1YImHpS-R0nr4rCfqL53QlC6My01wd-Iw85FUrmd_Kaw9TmaZsdJ4zImBZYzlVbdZZG5e04HY9vFf2A86S6SZUSnyiCEquhgBze_28-Jjcqk1HVMJy4BHxdloa9KBT5IHoAhFyiv1cKXuw7s8QsPFUuiIoc5__8zc8NGvGaKvVAKOK1JHPxNOPWduzyBVcbu3SbHFkAPgm_jskCoSKWhPZptDMF8sEvgXTv5mlSEC0tSGyFJpMrBnWz_y_YqN-hr280F7JrVLRrl3zLV5G5mldnP-SnO8KdK9htWnV41y3kElBNd3B7WzNK3naiPFjIoYF-XIbgOwABf6HDG3axDVn1KJ5UqAQnqI--tpeef_T6ot_ugn8AOe8vvHinDLo87BKyCSD2B3VVtkeF0-Ku9qBlkk8V9tba4O_hyjbti5-qaDB7bYe1xEen_5JVD608"

const numColumns = 3;
class ListProducts extends Component {

  constructor(props) {
    super(props);
    this.state = {
      products: [],
      categories: []
		};
		this.proccessMoney = this.proccessMoney.bind(this);
	}
	
	componentDidMount() {
    this.getProducts(18)
  }
  
  getProducts(id) {

    fetch(`${config.urlApi}/products/category/${id}`, {
      method: "GET",
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // this.setState({
        //   products: responseJson.data,
        // });
        this.props.setProduct(responseJson.data)
      })
      .catch((error) => {
        console.error('error');
        console.error(error);
      });
  }

	proccessMoney(item) {
    this.props.addProduct(item)
	}

  formatPrice(n) {
    const val = Math.round(Number(n) * 100) / 100;
    let parts = val.toString().split(".");
    const num = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".") + (parts[1] ? "," + parts[1] : "");
    return num;
  }

  renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
			<TouchableHighlight style={styles.item} onPress={() => this.proccessMoney(item)}>
        <View >
          <View style={{height: 100}}>
            {
            <Image source={{ uri: item.images[0] }} style={{
              width: '100%',
              height: '60%',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0
            }}></Image>
          }
            <Text style={styles.itemText}>${item.price.total}</Text>
            <Text style={styles.itemPrice}>{item.name}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  };

  render() {
    return (
      <FlatList
        data={formatData(this.props.products, numColumns)}
        style={styles.container}
        renderItem={this.renderItem}
        numColumns={numColumns}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  }
}

const mapStateToProps = state => {
  return {ventas: state.ventas, products: state.products}
}

export default connect(mapStateToProps, actions)(ListProducts);

const styles = StyleSheet.create({
  
  item: {
    backgroundColor: '#ddd',
    flex: 1,
    margin: 10,
    borderRadius: 8,
    height: Dimensions.get('window').width * .3 / numColumns,
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemText: {
    backgroundColor: '#bbb',
    color: '#32be32',
    
    textAlign: 'center',
    height: '19%',
    
    //color: 'black'
  },
  itemPrice: {
    height: '19%',
    backgroundColor: '#ddd',
    textAlign: 'center',
    color: '#fff',
    borderRadius: 8
  }
});